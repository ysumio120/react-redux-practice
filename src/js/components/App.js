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
    console.log(this.props.children)
  }

  render() {
    return (
      <div id="app">
        <NavColumn />
        {this.props.children}
        <Main />
        <ChatColumn />
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
    fetchStreams: (query) => {
      dispatch( fetchStreams(query) )
    },
    addStream: (stream) => {
      dispatch( addStream(stream) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)