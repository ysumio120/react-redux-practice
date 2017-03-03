import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream, removeStream } from '../actions/streamsActions'
import { addChat } from '../actions/chatActions'

class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      order: props.order,
      channel: "",
      player: null,
      dragging: false,
      drophover: false,
      top: 0,
      left: 0,
      xOffset: 0,
      yOffset: 0
    }
  }

  componentDidMount() {
    this.setState({
      channel: this.props.stream.streamChannel, 
      player: new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    })
  }

  setPosition() {
    this.setState({top: this.vid.offsetTop, left: this.vid.offsetLeft});
  }

  componentDidUpdate(prevProps, prevState) {
    // if(!this.state.dragging && this.state.left != this.props.dragdrop.dropLeft && this.state.top != this.props.dragdrop.dropTop) {
    //   this.setState({top: 0, left: 0})
    // }
    if(this.state.drophover && !this.props.dragging) {
      const top = (this.props.dragdrop.dragTop - this.props.dragdrop.dropTop);
      const left = (this.props.dragdrop.dragLeft - this.props.dragdrop.dropLeft);
    
      this.setState({drophover: false, top: this.state.top + top, left: this.state.left + left})
    }

    if(!this.state.dragging && this.props.dragging && (prevProps.cursor.x != this.props.cursor.x || prevProps.cursor.y != this.props.cursor.y)) {
      this.onDroppable();
    }

    if(this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onDrag.bind(this))
    }
    else if(!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onDrag.bind(this))
    }

  }

  dragStart(e) {
    e.preventDefault();
    console.log(e.pageY)
    console.log(e.target)

    const pos = {
      top: this.vid.offsetTop,
      left: this.vid.offsetLeft
    } 

    this.setState({dragging: true, xPos: e.pageX, yPos: e.pageY}, () => {
      this.props.toggleDragging(true, pos);
      this.props.setCursorPos({x: e.pageX, y: e.pageY});
    })
  }

  dragStop(e) {
    const top = (this.props.dragdrop.dropTop - this.props.dragdrop.dragTop);
    const left =  (this.props.dragdrop.dropLeft - this.props.dragdrop.dragLeft);

    this.setState({dragging: false, top: this.state.top + top, left:this.state.left + left, yOffset: 0, xOffset: 0}, () => {
      this.props.toggleDragging(false)
    })
  }

  onDrag(e) {
    //e.persist();
    if(!this.state.dragging && this.props.dragging) {
      this.onDroppable(e);
    }

    else if(this.state.dragging) {
      // console.log(this.vid.offsetLeft);
      // console.log(this.vid.offsetTop);
      const xOffset = e.pageX - this.state.xPos;
      const yOffset = e.pageY - this.state.yPos;

       // console.log(xOffset)
       // console.log(yOffset)

      this.setState({yOffset: yOffset, xOffset: xOffset}, () => {
        this.props.setCursorPos({x: e.pageX, y: e.pageY});
      });
    }
  }

  onDroppable() {
    if(this.props.dragging && !this.state.dragging) {
      const cursorX = this.props.cursor.x;
      const cursorY = this.props.cursor.y;
      const viewportPos = this.vid.getBoundingClientRect();

      const xHover = (cursorX > viewportPos.left) && (cursorX < viewportPos.left + this.props.width);
      const yHover = (cursorY > viewportPos.top) && (cursorY < viewportPos.top + this.props.height);

      console.log(viewportPos.left)
      console.log(xHover);

      if(xHover && yHover) { // hovering droppable element
        const pos = {
          top: this.vid.offsetTop,
          left: this.vid.offsetLeft
        }

        // const top = (this.props.dragdrop.dragTop - this.props.dragdrop.dropTop)
        // const left = (this.props.dragdrop.dragLeft - this.props.dragdrop.dropLeft)

        this.setState({drophover: true}, () => {
          this.props.setDroppable(pos);         
        });
      }
      else {
        this.setState({drophover: false});
      }
    }
  }

  onDrop(e) {

  }

  render() {
    console.log((this.state.top + this.state.yOffset))

    const generalStyle = {
      width: this.props.width + "px",
      height: this.props.height + "px",
      order: this.props.order,
      top: (this.state.top + this.state.yOffset) + "px",
      left: (this.state.left + this.state.xOffset) + "px"      
    }

    // const dragStyle = {
    //   top: (this.state.top + this.state.yOffest) + "px",
    //   left: (this.state.left + this.state.xOffset) + "px",
    // }

    const mainStyle = this.state.dragging ? {...generalStyle} : {...generalStyle};
  //  const mainStyle = this.state.dragging ? {...generalStyle, ...dragStyle} : {...generalStyle};


    const dragORdrop =  
                        this.state.dragging ? "dragging" : 
                          this.props.dragging ? "droppable" : "";

    return (
      <div 
        style={mainStyle} 
        ref={vid => this.vid = vid} 
        id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel} 
        className={"vid " + dragORdrop} 
        data-stream={this.props.stream.streamChannel}
      >
        <div className={this.state.dragging ? "drag-overlay" : this.props.dragging ? "drop-overlay" : ""}></div>
        <div className="overlay">
          <i onClick={() => this.props.removeStream(this.props.navChannel, this.props.stream.streamChannel)} className="fa fa-times" aria-hidden="true"></i>
          <div className="player-controls">
            <div>
              <i
                onMouseDown={this.dragStart.bind(this)} 
                onMouseUp={this.dragStop.bind(this)} 
                className="fa fa-arrows" 
                aria-hidden="true"
              ></i>
              <span className="control-text fa-arrows-text">Move</span>
              <i onClick={() => this.props.addChat(this.props.stream.streamChannel)} className="fa fa-commenting" aria-hidden="true"></i>
              <span className="control-text fa-commenting-text">Open Chat</span>
            </div>
          </div> 
        </div>  
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    width: ownProps.width,
    height: ownProps.height,
    order: ownProps.order,
    stream: ownProps.stream,
    navChannel: state.streams.activeChannel,
    dragging: state.dragdrop.dragging,
    dragdrop: state.dragdrop,
    cursor: state.dragdrop.cursorPos
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStream: (channel, player) => {
      dispatch( loadStream(channel, player) )
    },
    addChat: (channel) => {
      dispatch ( addChat(channel) )
      dispatch ( {type: "TOGGLE_CHAT", toggle: false} )
    },
    removeStream: (navChannel, streamChannel) => {
      dispatch( removeStream(navChannel, streamChannel) )
    },
    toggleDragging: (dragging, draggable) => {
      if(draggable) {
        dispatch( {type: "SET_DRAG_POS", pos: draggable})
      }
      dispatch ( {type: "TOGGLE_DRAGGING", dragging: dragging} )
    },
    setCursorPos: (pos) => {
      dispatch( {type: "SET_CURSOR_POS", pos: pos} )
    },
    setDroppable: (pos) => {
      dispatch ( {type: "SET_DROP_POS", pos: pos} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)