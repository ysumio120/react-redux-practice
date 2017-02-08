import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { fetchStreamsByQuery } from '../actions/searchActions'

class Search extends React.Component {
  
  constructor(props) {
    super(props);
  }

  onChangeHandler(e) {
    e.persist();
    if(this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.props.fetchStreams(e.target.value);
    }, 300)
  }

  onClickHandler(e) {
    e.stopPropagation();
    this.props.toggleSearch(true);
  }

  onFocusHandler() {
    document.querySelector(".fa.fa-search").classList.add("search-focus");
  }

  onBlurHandler() {
    document.querySelector(".fa.fa-search").classList.remove("search-focus");
  }

  render() {

    return (
      <div id="search">
        <i className="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search" 
            onClick={this.onClickHandler.bind(this)} 
            onFocus={this.onFocusHandler.bind(this)}
            onBlur={this.onBlurHandler.bind(this)} 
            onChange={this.onChangeHandler.bind(this)}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.search.query
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (query) => {
      dispatch( fetchStreamsByQuery(query) )
    },
    toggleSearch: (toggle) => {
      dispatch( {type: "TOGGLE_SEARCH", toggle} )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)