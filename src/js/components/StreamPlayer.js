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
      player: null
    }
  }

  componentDidMount() {
    this.vid.addEventListener("transitionend", this.setPosition.bind(this));

    this.setState({
      top: this.vid.offsetTop,
      left: this.vid.offsetLeft,
      channel: this.props.stream.streamChannel, 
      player: new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    })
  }

  setPosition() {
    this.setState({top: this.vid.offsetTop, left: this.vid.offsetLeft});
  }

  dragStart(e) {
    console.log(e.target)
    e.preventDefault();

    console.log("holding")
  }

  dragStop(e) {
    e.preventDefault();

    console.log("stop holding")
  }

  render() {
    const style = {
      width: this.props.width + "px",
      height: this.props.height + "px",
      order: this.props.order
    }

    return (
      <div draggable="true" onMouseDown={this.dragStart.bind(this)} ref={vid => this.vid = vid} style={style} className="vid" id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel} data-stream={this.props.stream.streamChannel}>
        <div className="overlay">
          <i onClick={() => this.props.removeStream(this.props.navChannel, this.props.stream.streamChannel)} className="fa fa-times" aria-hidden="true"></i>
          <div className="player-controls">
            <div>
              <i onMouseUp={this.dragStop.bind(this)} className="fa fa-arrows" aria-hidden="true"></i>
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
    navChannel: state.streams.activeChannel
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)