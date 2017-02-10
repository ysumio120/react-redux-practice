import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamCanvas from './StreamCanvas'

class Main extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    let extend = this.props.navCollapse ? "left-extend " : "";
    extend +=  this.props.chatCollapse ? "right-extend" : "";
    
    return (
      <div id="main-col" className={extend}>
        <StreamCanvas />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    navCollapse: state.app.navCollapse,
    chatCollapse: state.app.chatCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)