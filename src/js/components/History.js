import React from 'react'
import { connect } from 'react-redux'

import ScrollWrapper from 'react-customized-scrollbar'

import HistoryItem from './HistoryItem'

import { getHistory } from '../actions/historyActions'

class History extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      history: null,
    }
  }

  componentDidMount() {
    this.props.toggleList(false);

    if(this.props.userLocal)
      this.props.fetchHistory(this.props.userLocal.name)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.userLocal && this.props.historyFetched == false)
      this.props.fetchHistory(nextProps.userLocal.name)
  }

  historyList() {
    const historyList = this.props.history.map((channel) => {
      return <HistoryItem key={channel.channel} channel={channel}/>
    })

    return <ul>{historyList}</ul>
  }

  displayHistory() {
    if(this.props.userTwitch && this.props.userLocal) {
      if(this.props.history.length == 0){
        return <ul><div className="display-message"><i>Your history is empty</i></div></ul>
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

          {this.displayHistory()}

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