import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamItem from './StreamItem'

import { fetchStreamsByGame } from '../actions/gamesActions'

class StreamsList extends React.Component {
  
  constructor(props) {
    super(props);

    this.props.fetchStreams(this.props.game);
  }

  streamsList() {
    const streamsList = this.props.streams.map((stream) => {
      return <StreamItem stream={stream}/>
    })

    return <ul>{streamsList}</ul>
  }

  render() {
    return (
      <div className="streams-list list-results">
        {this.streamsList()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: ownProps.params.game,
    streams: state.games.streamsByGame
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (game) => {
      dispatch( fetchStreamsByGame(game) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamsList)