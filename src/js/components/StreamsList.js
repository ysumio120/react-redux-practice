import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import ScrollWrapper from 'react-customized-scrollbar'

import StreamItem from './StreamItem'

import { fetchStreamsByGame, fetchFeatured } from '../actions/gamesActions'

class StreamsList extends React.Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
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
        return <StreamItem key={stream.stream._id} stream={stream.stream}/>
      })
    }
    else if(this.props.route.path == "/game/:game") {
      streamsList = this.props.streams.map((stream) => {
        return <StreamItem key={stream._id} stream={stream}/>
      })
    }

    return <ul>{streamsList}</ul>
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

          {this.streamsList()}

        </ScrollWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    game: ownProps.params.game,
    streams: state.games.streamsByGame,
    featured: state.games.featured
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