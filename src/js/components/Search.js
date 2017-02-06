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
    }, 500)
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
        <input type="text" placeholder="Search" onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler} onChange={this.onChangeHandler.bind(this)}/>
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)