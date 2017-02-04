import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import NavMenu from './NavMenu'

class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="nav-col">
        <NavMenu />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavColumn)