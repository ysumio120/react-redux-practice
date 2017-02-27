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
      dragging: false
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
    e.preventDefault();

    this.props.toggleDragging(false)
    this.setState({dragging: false, top: 0, left: 0})
  }

  onDrag(e) {
    if(this.state.dragging) {
      console.log(this.vid.offsetLeft);
      console.log(this.vid.offsetTop);
      const xOffset = e.pageX - this.state.xPos;
      const yOffset = e.pageY - this.state.yPos;

      console.log(xOffset)
      console.log(yOffset)


      this.setState({top: yOffset, left: xOffset});
    }
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

    return (
      <div 
        style={mainStyle} 
        ref={vid => this.vid = vid} 
        id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel} 
        className={"vid " + (this.state.dragging ? "dragging" : "")} 
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
    width: ownProps.width,
    height: ownProps.height,
    order: ownProps.order,
    stream: ownProps.stream,
    navChannel: state.streams.activeChannel,
    dragging: state.app.dragging
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)