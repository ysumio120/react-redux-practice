import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 


class NavColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="nav-menu" className="nav-list">
        <ul>
          <li><Link to="/featured"><i className="fa fa-star" aria-hidden="true"></i><span>Featured</span></Link></li>
          <li><Link to="/games"><i className="fa fa-gamepad" aria-hidden="true"></i><span>Games</span></Link></li>
          <li><Link to="/following"><i className="fa fa-heart" aria-hidden="true"></i><span>Following</span></Link></li>
          <li><Link to="/history"><i className="fa fa-history" aria-hidden="true"></i><span>History</span></Link></li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavColumn)