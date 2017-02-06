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
      <div id="nav-menu">
        <ul>
          <li><Link to="/featured"><i className="fa fa-star" aria-hidden="true"></i>Featured</Link></li>
          <li><Link to="/games"><i className="fa fa-gamepad" aria-hidden="true"></i>Games</Link></li>
          <li><Link to="/following"><i className="fa fa-heart" aria-hidden="true"></i>Following</Link></li>
          <li><Link to="/history"><i className="fa fa-history" aria-hidden="true"></i>History</Link></li>
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