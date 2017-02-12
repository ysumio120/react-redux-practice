import React from 'react'
import { connect } from 'react-redux'

import StreamPlayer from './StreamPlayer'

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
    const filteredStreams = this.props.activeStreams.filter((stream) => {
      return this.props.navChannel === stream.navChannel;
    })

    const streamContainers = filteredStreams.map((stream) => {
      return <StreamPlayer stream={stream}/>
    })

    return streamContainers;
  }

  render() {
    const classNames = "stream-canvas" + (this.props.navChannel === this.props.activeChannel ? " show" : " hide");

    return (
      <div data-tab={this.props.navChannel} className={classNames}>
        <div className="stream-canvas-header">
        <div className="header-text">{this.props.navChannel}</div>
        <div className="stream-canvas-controls">
          <button onClick={() => this.muteToggle(true)}>Mute All</button>
          <button onClick={() => this.muteToggle(false)}>Unmute All</button>
        </div>
        </div>
        {this.streamContainer()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navChannel: ownProps.navChannel,
    activeChannel: state.streams.activeChannel,
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