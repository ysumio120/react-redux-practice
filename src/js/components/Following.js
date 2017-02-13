import React from 'react'
import { connect } from 'react-redux'

import StreamItem from './StreamItem'

import { getLiveFollowing } from '../actions/followingActions'

class Following extends React.Component {
  
  constructor(props) {
    super(props);

    this.props.toggleList(false);

    this.props.fetchStreams(this.props.token);
  }

  followingList() {
    const followingList = this.props.streams.map((stream) => {
      return <StreamItem stream={stream}/>
    })

    return <ul>{followingList}</ul>
  }

  display() {
    if(this.props.user) {
      if(this.props.streams.length == 0) {
        return <ul><div className="display-message"><i>All followed channels are currently offline</i></div></ul>
      } 
      return this.followingList()
    }
    else if(!this.props.loggingIn){
      return (
        <ul><div className="display-message"><i>Please connect with Twitch to view live streams you are following</i></div></ul>
      )
    }
  }  

  render() {

    return (
      <div className={"streams-list list-results " + (this.props.listCollapse ? "list-hide" : "list-show")}>
        {this.display()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.user,
    loggingIn: state.user.loggingIn,
    token: state.user.token,
    streams: state.following.streams,
    listCollapse: state.app.listCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (token) => {
      dispatch( getLiveFollowing(token) )
    },
    toggleList: (toggle) => {
      dispatch( {type:"TOGGLE_LIST", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following)