const initialState = {
  game: "",
  gamesList: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_GAME": {
      return Object.assign({}, state, {game: action.game});
    }
    case "SET_GAMES_LIST": {
      return Object.assign({}, state, {gamesList: action.games});
    }
  }

  return state;
}
