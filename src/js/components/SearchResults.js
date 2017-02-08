import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamItem from './StreamItem'

import { fetchStreamsByQuery } from '../actions/searchActions'

class SearchResults extends React.Component {
  
  constructor(props) {
    super(props);
  }

  streamsList() {
    const streamsList = this.props.streams.map((stream) => {
      return <StreamItem stream={stream}/>
    })

    return <ul>{streamsList}</ul>
  }

  onClickHandler(e) {
    e.stopPropagation();
    this.props.toggleSearch(true);
  }

  render() {
    const classes = "streams-list list-results search-results " + (this.props.query && this.props.searchOpen ? "" : "search-results-close");

    return (
      <div id="search-results" className={classes} onClick={this.onClickHandler.bind(this)}>
         {this.streamsList()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navOpen: state.app.navOpen,
    chatOpen: state.app.chatOpen,
    searchOpen: state.app.searchOpen,
    query: state.search.query,
    streams: state.search.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSearch: (toggle) => {
      dispatch( {type: "TOGGLE_SEARCH", toggle} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)