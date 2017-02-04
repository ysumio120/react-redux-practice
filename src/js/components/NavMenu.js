import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 


class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="nav-menu">
        <ul>
          <li><i className="fa fa-star" aria-hidden="true"></i>Featured</li>
          <li><i className="fa fa-gamepad" aria-hidden="true"></i>Games</li>
          <li><i className="fa fa-heart" aria-hidden="true"></i>Following</li>
          <li><i className="fa fa-history" aria-hidden="true"></i>History</li>
          <li></li>
        </ul>
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