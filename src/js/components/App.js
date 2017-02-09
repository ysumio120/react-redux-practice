import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import SearchResults from './SearchResults'
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

  appOnClick(e) {
    this.props.toggleSearch(false);
  }

  render() {
    return (
      <div id="app" onClick={this.appOnClick.bind(this)}>
        <i className="fa fa-caret-left nav-toggle" aria-hidden="true"></i>
        <i className="fa fa-caret-right chat-toggle" aria-hidden="true"></i>
        <SearchResults />
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
    },
    toggleSearch: (toggle) => {
      dispatch( {type: "TOGGLE_SEARCH", toggle} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)