import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamItem from './StreamItem'

import { getLiveFollowing } from '../actions/followingActions'

class Following extends React.Component {
  
  constructor(props) {
    super(props);

    this.props.fetchStreams(this.props.token);
  }

  followingList() {
    const followingList = this.props.streams.map((stream) => {
      return <StreamItem stream={stream}/>
    })

    return <ul>{followingList}</ul>
  }

  render() {
    return (
      <div className="streams-list list-results">
        {this.followingList()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.user.token,
    streams: state.following.streams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (token) => {
      dispatch( getLiveFollowing(token) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Following)