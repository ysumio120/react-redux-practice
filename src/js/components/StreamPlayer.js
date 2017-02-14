import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream } from '../actions/streamsActions'
import { addChat } from '../actions/chatActions'

class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadStream(
      this.props.stream.channel, 
      new Twitch.Player(this.props.stream.navChannel + "-" + this.props.stream.streamChannel, {channel: this.props.stream.streamChannel})
    )
  }

  render() {
    const style = {
      width: this.props.width + "px",
      height: this.props.height + "px"
    }

    return (
      <div className="stream-container">
        <div style={style} className="vid" id={this.props.stream.navChannel + "-" + this.props.stream.streamChannel}>
          <div className="player-controls">
            <div>
              <i onClick={() => this.props.addChat(this.props.stream.streamChannel)} className="fa fa-commenting" aria-hidden="true"></i>
              <span className="fa-commenting-text">Open Chat</span>
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
    stream: ownProps.stream
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
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)