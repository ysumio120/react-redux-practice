import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 


class StreamCanvasChannel extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <li><i className="fa fa-bookmark-o" aria-hidden="true"></i>Home</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(StreamCanvasChannel)