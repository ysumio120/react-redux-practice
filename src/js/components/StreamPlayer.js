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
    this.setState({
      channel: this.props.stream.streamChannel, 
      player: new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    })
    // this.props.loadStream(
    //   this.props.stream.channel, 
    //   new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    // )
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if(this.props.stream.streamChannel != this.state.channel) {
  //     this.state.player.setChannel(this.props.stream.streamChannel);
  //     this.setState({channel: this.props.stream.streamChannel});
  //   }
  // }

  render() {
    const style = {
      width: this.props.width + "px",
      height: this.props.height + "px"
    }

    return (
      <div className="stream-container" data-stream={this.props.stream.streamChannel}>
        <div style={style} className="vid" id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel}>
          <div className="overlay">
            <i onClick={() => this.props.removeStream(this.props.navChannel, this.props.stream.streamChannel)} className="fa fa-times" aria-hidden="true"></i>
            <div className="player-controls">
              <div>
                <i onClick={() => this.props.addChat(this.props.stream.streamChannel)} className="fa fa-commenting" aria-hidden="true"></i>
                <span className="fa-commenting-text">Open Chat</span>
              </div>
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