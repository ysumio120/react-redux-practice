import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import Streams from './Streams'

import { addStream } from '../actions/streamsActions'


class Main extends React.Component {
  
  constructor(props) {
    super(props);
  }

  streamList() {
    const streams = this.props.searchStreams.map(stream => {
      return <li onClick={() => this.props.addStream(stream.channel.name)}>{stream.channel.display_name}</li>
    })

    if(streams.length > 0)
      return <ul>{streams}</ul>
  }

  render() {
    
    return (
      <div id="main-col">
        {this.props.query ? this.streamList() : []}
        <Streams />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.search.query,
    searchStreams: state.search.streams,
    activeStreams: state.streams.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addStream: (stream) => {
      dispatch( addStream(stream) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)