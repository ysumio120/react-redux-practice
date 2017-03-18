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
    console.log(this.input)

    e.stopPropagation();
    if(this.props.navCollapse) {
      this.input.focus();
      this.input.setSelectionRange(0, this.input.value.length);
      this.props.toggleNav(false);
    }

    this.props.toggleSearch(true);
  }

  render() {

    return (
      <div id="search" ref={search => {this.search = search}} onClick={this.onClickHandler.bind(this)}>
        <input type="text" placeholder="Search" 
            ref={input => {this.input = input}}
            // onClick={this.onClickHandler.bind(this)} 
            onChange={this.onChangeHandler.bind(this)}/>
        <i className={"fa fa-search"} aria-hidden="true"></i>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    query: state.search.query,
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (query) => {
      dispatch( fetchStreamsByQuery(query) )
    },
    toggleSearch: (toggle) => {
      dispatch( {type: "TOGGLE_SEARCH", toggle} )
    },
    toggleNav: (toggle) => {
      dispatch( {type:"TOGGLE_NAV", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)