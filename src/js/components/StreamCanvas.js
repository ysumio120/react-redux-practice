import React from 'react'
import { connect } from 'react-redux'

import StreamPlayer from './StreamPlayer'

class StreamCanvas extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      opWidth: 0,
      opHeight: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.activeStreams.length != prevProps.activeStreams.length || this.props.containerHeight != prevProps.containerHeight || this.props.containerWidth != prevProps.containerWidth)
      this.optimizeStreamSize();
  }

  // muteToggle(muted) {
  //   this.props.activeStreams.forEach((stream) => {
  //     stream.player.setMuted(muted);
  //   })

  //   this.props.setMuted(muted);
  // }

  streamPlayers() {
    const filteredStreams = this.props.activeStreams.filter((stream) => {
      return this.props.navChannel === stream.navChannel;
    })

    const streamPlayers = filteredStreams.map((stream, index) => {
      return <StreamPlayer key={stream.navChannel + "-" + stream.streamChannel} order={index} stream={stream} width={this.state.opWidth} height={this.state.opHeight}/>
    })

    return streamPlayers;
  }

  optimizeStreamSize() {
    const numStreams = this.streamPlayers().length;
    const height = this.props.containerHeight;
    const width = this.props.containerWidth;
    // console.log(height)
    // console.log(width)

    let bestHeight = 0;
    let bestWidth = 0;

    for(let perRow = 1; perRow <= numStreams; perRow++) {
      const numRows = Math.ceil(numStreams / perRow);
      let maxHeight = Math.floor((height - 45) / numRows);
      let maxWidth = Math.floor(width / perRow);
      if (maxWidth * 9/16 < maxHeight) {
        maxHeight = maxWidth * 9/16;
      }
      else {
        maxWidth = (maxHeight) * 16/9;
      }
      if (maxWidth > bestWidth) {
        bestWidth = maxWidth;
        bestHeight = maxHeight;
      }
    }

    this.setState({opWidth: bestWidth, opHeight: bestHeight})
  }

  render() {
    const classNames = "stream-canvas" + (this.props.navChannel === this.props.activeChannel ? " show" : " hide");

        //<div className="stream-canvas-controls">
        //  <button onClick={() => this.muteToggle(true)}>Mute All</button>
        //  <button onClick={() => this.muteToggle(false)}>Unmute All</button>
        //</div>
    return (
      <div data-tab={this.props.navChannel} className={classNames}>
        <div className="stream-canvas-header">
        <div className="header-text">{this.props.navChannel}</div>
        </div>
        <div className="stream-container">
          {this.streamPlayers()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    containerWidth: ownProps.width,
    containerHeight: ownProps.height,
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