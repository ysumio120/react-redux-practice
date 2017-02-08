import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream } from '../actions/streamsActions'


class StreamPlayer extends React.Component {
  
  constructor(props) {
    super(props);
console.log(this.props.stream.channel)
  }

  componentDidMount() {
    this.props.loadStream(
      this.props.stream.channel, 
      new Twitch.Player(this.props.stream.channel, {channel: this.props.stream.channel})
    )
  }

  render() {
    return (
      <div className="stream-container">
        <div className="vid" id={this.props.stream.channel}>
          <div className="player-controls">
            <div>
              <i className="fa fa-commenting" aria-hidden="true"></i>
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
    stream: ownProps.stream
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStream: (channel, player) => {
      dispatch( loadStream(channel, player) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamPlayer)