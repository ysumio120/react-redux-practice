import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream, removeStream } from '../actions/streamsActions'
import { addChat } from '../actions/chatActions'

class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      channel: "",
      player: null,
      dragging: false,
      drophover: false,
      top: 0,
      left: 0
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
    if(!this.state.dragging && this.state.left != this.props.dragdrop.dropLeft && this.state.top != this.props.dragdrop.dropTop) {
      this.setState({top: 0, left: 0})
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

    this.props.toggleDragging(true)
    this.setState({dragging: true, xPos: e.pageX, yPos: e.pageY})
  }

  dragStop(e) {
    this.props.toggleDragging(false)
    this.setState({dragging: false, top: 0, left: 0})
  }

  onDrag(e) {
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


      this.setState({top: yOffset, left: xOffset});
    }
  }

  onDroppable(e) {
    if(this.props.dragging && !this.state.dragging) {
      console.log("can drop")

      const viewportPos = this.vid.getBoundingClientRect();

      const xHover = (e.pageX > viewportPos.left) && (e.pageX < viewportPos + this.props.width);
      const yHover = (e.pageY > viewportPos.top) && (e.pageY < viewportPos + this.props.height);

      console.log(xHover);

      if(xHover && yHover) { // hovering droppable element
        this.setState({drophover: true});
  
        const pos = {
          top: this.vid.offsetTop,
          left: this.vid.offsetLeft
        } 
        this.setDroppable(pos)
      }
    }
  }

  onDrop(e) {

  }

  render() {
    const generalStyle = {
      width: this.props.width + "px",
      height: this.props.height + "px",
      order: this.props.order
    }

    const dragStyle = {
      top: this.state.top + "px",
      left: this.state.left + "px",
    }

    const mainStyle = this.state.dragging ? {...generalStyle, ...dragStyle} : {...generalStyle};


    const dragORdrop = this.state.dragging ? "dragging" : this.props.dragging ? "droppable" : "";

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
    dragdrop: state.dragdrop
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
    toggleDragging: (dragging) => {
      dispatch ( {type: "TOGGLE_DRAGGING", dragging: dragging} )
    },
    setDroppable: (pos) => {
      dispatch ( {type: "SET_DROP_POS", pos: pos} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)