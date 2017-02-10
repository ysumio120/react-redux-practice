import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import Search from './Search'
import NavMenu from './NavMenu'
import User from './User'

class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="nav-col" className={this.props.navCollapse ? "nav-close" : "nav-open"}>
        <h1>TwitchAvid</h1>
        <User />
        <Search />
        <NavMenu />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navCollapse: state.app.navCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavColumn)