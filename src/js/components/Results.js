import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 


class Results extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="search-results">
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Results)