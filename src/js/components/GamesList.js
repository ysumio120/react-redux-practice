import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import Game from './Game'

import { setGame, fetchTopGames } from '../actions/gamesActions'

class GamesList extends React.Component {
  
  constructor(props) {
    super(props);

    this.props.fecthGames();
  }

  gamesList() {
    const gamesList = this.props.games.map((game) => {
      return <Game game={game}/>
    })

    return <ul>{gamesList}</ul>
  }

  render() {
    return (
      <div id="games-list" className="list-results">
        {this.gamesList()}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GamesList)