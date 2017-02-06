import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 


class Following extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Following)