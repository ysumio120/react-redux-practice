import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import NavColumn from './NavColumn'
import Main from './Main'
import ChatColumn from './ChatColumn'

import { fetchStreams } from '../actions/searchActions'
import { addStream } from '../actions/streamsActions'

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.timer;
  }

  render() {
    return (
      <div>
        <NavColumn />
        <Main />
        <ChatColumn />
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