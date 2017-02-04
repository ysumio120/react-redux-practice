import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 


class ChatColumn extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div id="chat-col">
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatColumn)