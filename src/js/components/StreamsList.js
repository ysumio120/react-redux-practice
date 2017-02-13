import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import StreamItem from './StreamItem'

import { fetchStreamsByGame, fetchFeatured } from '../actions/gamesActions'

class StreamsList extends React.Component {
  
  constructor(props) {
    super(props);

    const route = this.props.route.path;

    this.props.toggleList(false);
    
    if(route == "/featured")
      this.props.fetchFeatured();
    else if(route == "/game/:game")
      this.props.fetchStreams(this.props.game);
  }

  componentWillReceiveProps(newProps) {
    const route = this.props.route.path;

    if(route !== newProps.route.path){
      console.log(newProps)
      if(newProps.route.path == "/featured")
        this.props.fetchFeatured();
      else if(newProps.route.path == "/game/:game")
        this.props.fetchStreams(this.props.game);
    }
  }

  streamsList() {
    let streamsList;

    if(this.props.route.path == "/featured") {
      streamsList = this.props.featured.map((stream) => {
        return <StreamItem stream={stream.stream}/>
      })
    }
    else if(this.props.route.path == "/game/:game") {
      streamsList = this.props.streams.map((stream) => {
        return <StreamItem stream={stream}/>
      })
    }

    return <ul>{streamsList}</ul>
  }

  render() {

    return (
      <div className={"streams-list list-results " + (this.props.listCollapse ? "list-hide" : "list-show")}>
        {this.streamsList()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: ownProps.params.game,
    streams: state.games.streamsByGame,
    featured: state.games.featured,
    listCollapse: state.app.listCollapse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStreams: (game) => {
      dispatch( fetchStreamsByGame(game) )
    },
    fetchFeatured: () => {
      dispatch( fetchFeatured() )
    },
    toggleList: (toggle) => {
      dispatch( {type:"TOGGLE_LIST", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamsList)