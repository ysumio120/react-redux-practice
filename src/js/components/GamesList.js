import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import ScrollWrapper from 'react-customized-scrollbar'

import GameItem from './GameItem'

import { setGame, fetchTopGames } from '../actions/gamesActions'

class GamesList extends React.Component {
  
  constructor(props) {
    super(props);
  } 

  componentDidMount() { 
    this.props.toggleList(false);
    this.props.fecthGames();
  }

  gamesList() {
    const gamesList = this.props.games.map((game) => {
      return <GameItem key={game.game._id} game={game}/>
    })

    return <ul>{gamesList}</ul>
  }

  render() {

    return (
      <div id="games-list" className="list-results">
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

          {this.gamesList()}
        
        </ScrollWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    games: state.games.gamesList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fecthGames: () => {
      dispatch( fetchTopGames() )
    },
    toggleList: (toggle) => {
      dispatch( {type:"TOGGLE_LIST", toggle: toggle})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)