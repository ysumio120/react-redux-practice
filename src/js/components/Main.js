import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamCanvas from './StreamCanvas'

class Main extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div id="main-col">
        <StreamCanvas />
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)