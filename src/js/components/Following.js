import React from 'react'
import { connect } from 'react-redux'

import ScrollWrapper from 'react-customized-scrollbar'

import StreamItem from './StreamItem'

import { getLiveFollowing } from '../actions/followingActions'

class Following extends React.Component {
  
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    this.props.toggleList(false);
    if(this.props.userLocal) {
      this.props.fetchStreams(this.props.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevProps.userLocal && this.props.userLocal) {
      this.props.fetchStreams(this.props.token);
    }
  }

  followingList() {
    const followingList = this.props.streams.map((stream) => {
      return <StreamItem key={stream._id} stream={stream}/>
    })

    return <ul>{followingList}</ul>
  }

  display() {
    if(this.props.userTwitch && this.props.userLocal) {
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
      <div className="streams-list list-results">
        <ScrollWrapper     
          wrapperStyle={{width: "100%", height: "100%", overflow: "hidden"}}
          verticalScrollStyle={{borderRadius: "5px", backgroundColor: "black"}}
          horizontalScrollStyle={{borderRadius: "5px", backgroundColor: "black"}}
          verticalTrackStyle={{borderRadius: "5px", backgroundColor: "lightgrey"}}
          horizontalTrackStyle={{borderRadius: "5px", backgroundColor: "lightgrey"}}
          wrapperClassNames={"wrapper"}
          verticalScrollClassNames={"scrollbar-vertical"}
          horizontalScrollClassNames={"scrollbar-horizontal"}
          verticalTrackClassNames={"track-vertical"}
          horizontalTrackClassNames={"track-horizontal"}
          minVerticalLength={50}
          minHorizontalLength={50}
          verticalThickness={"10px"}
          horizontalThickness={"10px"}
          //stayVisible={false}
          //fadeInDuration={700}
          //fadeOutDuration={600}
          //autoFadeOut={300}
          //offsetScroll={true}
          autoUpdate={true}
        >

          {this.display()}

       </ScrollWrapper> 
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    userTwitch: state.user.userTwitch,
    userLocal: state.user.userLocal,
    loggingIn: state.user.loggingIn,
    token: state.user.token,
    streams: state.following.streams
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