import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import User from './User'

import { fetchStreams } from '../actions/searchActions'
import { addStream } from '../actions/streamsActions'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.timer;
    console.log(Twitch);
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
      <div>
        <h1>TwitchAvidReactRedux</h1>
        <h1>{this.props.query}</h1>
        <input type="text" placeholder="Search" onChange={this.onChangeHandler.bind(this)}/>
        <User />
        {this.props.query ? this.streamList() : []}
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

export default connect(mapStateToProps, mapDispatchToProps)(App)