import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import User from './User'
import Streams from './Streams'

import { fetchStreams } from '../actions/searchActions'
import { addStream } from '../actions/streamsActions'


class Main extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onChangeHandler(e) {
    e.persist();
    if(this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.fetchStreams(e.target.value);
    }, 500)
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
        <div>TwitchAvidReactRedux</div>
        <div>{this.props.query}</div>
        <input type="text" placeholder="Search" onChange={this.onChangeHandler.bind(this)}/>
        <User />
        {this.props.query ? this.streamList() : []}
        <Streams />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    query: store.search.query,
    searchStreams: store.search.streams,
    activeStreams: store.streams.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (query) => {
      dispatch( fetchStreams(query) )
    },
    addStream: (stream) => {
      dispatch( addStream(stream) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)