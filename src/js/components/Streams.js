import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { loadStream } from '../actions/streamsActions'

console.log(Twitch)
class Streams extends React.Component {
  
  constructor(props) {
    super(props);
  }

  streamContainer() {
    const streamContainers = this.props.activeStreams.map((stream) => {
      return <div className="stream-container"><div className="vid" id={stream.channel}></div></div>
    })

    return streamContainers;
  }

  componentDidUpdate() {
    this.props.activeStreams.forEach((stream) => {
      if(stream.isLoaded == false){
        console.log("trying to load")
        this.props.loadStream(stream.channel, new Twitch.Player(stream.channel, {channel: stream.channel}))
        
      }
    })
  }

  render() {

    console.log("test")
    return (
      <div className="stream-canvas">
        {this.streamContainer()}
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    activeStreams: store.streams.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadStream: (channel, player) => {
      dispatch( loadStream(channel, player) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Streams)