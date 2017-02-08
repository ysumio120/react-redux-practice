import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamPlayer from './StreamPlayer'

import { loadStream } from '../actions/streamsActions'

class StreamCanvas extends React.Component {
  
  constructor(props) {
    super(props);
  }

  muteToggle(muted) {
    this.props.activeStreams.forEach((stream) => {
      stream.player.setMuted(muted);
    })

    this.props.setMuted(muted);
  }

  streamContainer() {
    const streamContainers = this.props.activeStreams.map((stream) => {
      return <StreamPlayer stream={stream}/>
    })

    return streamContainers;
  }

  render() {

    return (
      <div className="stream-canvas">
        <div className="stream-canvas-controls">
          <button onClick={() => this.muteToggle(true)}>Mute All</button>
          <button onClick={() => this.muteToggle(false)}>Unmute All</button>
        </div>
        {this.streamContainer()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    activeStreams: state.streams.streams,
    muted: state.streams.muted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setMuted: (muted) => {
      dispatch( {type: "SET_MUTED", muted} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamCanvas)