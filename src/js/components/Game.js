import React from 'react'
import { connect } from 'react-redux'
import store from '../store' 

import { setGame, fetchTopGames } from '../actions/gamesActions'

class Game extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li>
        <div className="game-display">
          <img className="game-image" src={this.props.boxArt}/>
          <p className="game-title">{this.props.title}</p>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    boxArt: ownProps.game.game.box.large,
    title: ownProps.game.game.name
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fecthGames: () => {
      dispatch( fetchTopGames() )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)