import React from 'react'
import { connect } from 'react-redux'

import HistoryItem from './HistoryItem'

import { getHistory } from '../actions/historyActions'

class History extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      history: null,
    }

    this.props.toggleList(false);

    if(this.props.user)
      this.props.fetchHistory(this.props.user.name)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user && this.props.historyFetched == false)
      this.props.fetchHistory(nextProps.user.name)
  }

  historyList() {
    const historyList = this.props.history.map((channel) => {
      return <HistoryItem channel={channel}/>
    })

    return <ul>{historyList}</ul>
  }

  display() {
    if(this.props.user) {
      if(this.props.history.length == 0){
        <ul><div className="display-message"><i>Start watching streams to grow your history!</i></div></ul>
      }
      return this.historyList()
    }
    else if(!this.props.loggingIn){
      return (
        <ul><div className="display-message"><i>Please connect with Twitch to view your recent history</i></div></ul>
      )
    }
  }

  render() {
    return (
      <div id="history-list" className="streams-list list-results">
        {
          this.display()
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    loggingIn: state.user.loggingIn,
    history: state.history.history,
    historyFetched: state.history.fetched
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHistory: (username) => {
      dispatch( getHistory(username) )
    },
    toggleList: (toggle) => {
      dispatch( {type:"TOGGLE_LIST", toggle: toggle})
    }     
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(History)