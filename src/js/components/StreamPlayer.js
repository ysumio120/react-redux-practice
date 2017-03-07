import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream, removeStream } from '../actions/streamsActions'
import { addChat } from '../actions/chatActions'

class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
      newOrder: this.props.order,
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

  // setPosition() {
  //   this.setState({top: this.vid.offsetTop, left: this.vid.offsetLeft});
  // }

  componentDidUpdate(prevProps, prevState) {

    if(prevProps.allStreams != this.props.allStreams || prevProps.width != this.props.width || prevProps.height != this.props.height) {
      this.setState({order: this.state.newOrder, top: 0, left: 0});
    }


    if(this.state.dragging && !prevState.dragging) {
      document.addEventListener('mousemove', this.onDrag.bind(this))
    }
    else if(!this.state.dragging && prevState.dragging) {
      document.removeEventListener('mousemove', this.onDrag.bind(this))
    }

    if(this.state.drophover && !this.props.dragActive) {
      const topDiff = (this.props.dragdrop.dragTop - this.props.dragdrop.dropTop);
      const leftDiff = (this.props.dragdrop.dragLeft - this.props.dragdrop.dropLeft);

      const newTop = this.state.top + topDiff;
      const newLeft = this.state.left + leftDiff;
    
      this.setState({drophover: false, top: newTop, left: newLeft, newOrder: this.props.dragdrop.dragOrder})
    }
    else if(!this.state.dragging && this.props.dragActive && (prevProps.cursor.x != this.props.cursor.x || prevProps.cursor.y != this.props.cursor.y)) {
      this.onDroppable();
    }
  }

  dragStart(e) {
    e.preventDefault();

    const pos = {
      top: this.vid.offsetTop,
      left: this.vid.offsetLeft
    } 

    this.setState({dragging: true, xPos: e.pageX, yPos: e.pageY}, () => {
      this.props.toggleDragging(true, pos, this.state.newOrder);
      this.props.setDroppable(pos, this.state.newOrder);
      this.props.setCursorPos({x: e.pageX, y: e.pageY});
    })
  }

  dragStop(e) {
    const top = (this.props.dragdrop.dropTop - this.props.dragdrop.dragTop);
    const left =  (this.props.dragdrop.dropLeft - this.props.dragdrop.dragLeft);

    this.setState({dragging: false, newOrder: this.props.dragdrop.dropOrder, top: this.state.top + top, left:this.state.left + left, yOffset: 0, xOffset: 0}, () => {
      this.props.toggleDragging(false)
    })
  }

  onDrag(e) {
    //e.persist();
    if(!this.state.dragging && this.props.dragActive) {
      this.onDroppable();
    }

    else if(this.state.dragging) {
      const xOffset = e.pageX - this.state.xPos;
      const yOffset = e.pageY - this.state.yPos;

      this.setState({yOffset: yOffset, xOffset: xOffset}, () => {
        this.props.setCursorPos({x: e.pageX, y: e.pageY});
      });
    }
  }

  onDroppable() {
    if(this.props.dragActive && !this.state.dragging) {
      const cursorX = this.props.cursor.x;
      const cursorY = this.props.cursor.y;
      const viewportPos = this.vid.getBoundingClientRect();

      const xHover = (cursorX > viewportPos.left) && (cursorX < viewportPos.left + this.props.width);
      const yHover = (cursorY > viewportPos.top) && (cursorY < viewportPos.top + this.props.height);

      if(xHover && yHover) { // hovering droppable element
        const pos = {
          top: this.vid.offsetTop,
          left: this.vid.offsetLeft
        }

        this.setState({drophover: true}, () => {
          this.props.setDroppable(pos, this.state.newOrder);         
        });
      }
      else {
        this.setState({drophover: false}, () => {
          if(this.vid.offsetTop == this.props.dragdrop.dropTop && this.vid.offsetLeft == this.props.dragdrop.dropLeft) {
            this.props.setDroppable({top: this.props.dragdrop.dragTop, left: this.props.dragdrop.dragLeft}, this.state.newOrder);
          }
        });
      }
    }
  }

  render() {

    const style = {
      width: this.props.width + "px",
      height: this.props.height + "px",
      order: this.state.order,
      top: (this.state.top + this.state.yOffset) + "px",
      left: (this.state.left + this.state.xOffset) + "px"      
    }

    const dragORdrop =  this.state.dragging ? "dragging" :
                          this.state.drophover ? "droppable-hover" : 
                            this.props.dragActive ? "droppable" : "";

    return (
      <div 
        style={style} 
        ref={vid => this.vid = vid} 
        id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel} 
        className={"vid " + dragORdrop} 
        data-stream={this.props.stream.streamChannel}
      >
        <div className={this.state.dragging ? "drag-overlay" : ""}></div>
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
    allStreams: state.streams.streams,
    width: ownProps.width,
    height: ownProps.height,
    order: ownProps.order,
    stream: ownProps.stream,
    navChannel: state.streams.activeChannel,
    dragActive: state.dragdrop.dragActive,
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
    toggleDragging: (dragActive, dragPos, order) => {
      if(dragPos) {
        dispatch( {type: "SET_DRAG_POS", pos: dragPos, order: order});
      }
      dispatch ( {type: "TOGGLE_DRAGGING", dragActive: dragActive} )
    },
    setCursorPos: (pos) => {
      dispatch( {type: "SET_CURSOR_POS", pos: pos} )
    },
    setDroppable: (pos, order) => {
      dispatch ( {type: "SET_DROP_POS", pos: pos, order: order} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)