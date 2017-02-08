import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import store from '../store' 

import { setGame, fetchTopGames } from '../actions/gamesActions'

class Game extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <li title={this.props.title}>
        <Link to={"/game/" + this.props.title} className="game-display">
          <img className="game-image" src={this.props.boxArt}/>
          <p className="game-title">{this.props.title}</p>
        </Link>
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)