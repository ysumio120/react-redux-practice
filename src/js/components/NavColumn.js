import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import Search from './Search'
import NavMenu from './NavMenu'
import User from './User'
import NavChannelsList from './NavChannelsList'

class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }


  render() {
    const header = this.props.navCollapse ? "TA" : "TwitchAvid";

    return (
      <div id="nav-col" className={this.props.navCollapse ? "nav-close" : "nav-open"}>
        <h1>{header}</h1>
        <User />
        <Search />
        <NavMenu />
        <NavChannelsList />
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