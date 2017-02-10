import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 


class Channels extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div id="nav-channels">
        <ul>
          <li><i className="fa fa-star" aria-hidden="true"></i>Home</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels)