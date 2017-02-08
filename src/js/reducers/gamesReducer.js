const initialState = {
  game: "",
  gamesList: [],
  streamsByGame: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_GAME": {
      return Object.assign({}, state, {game: action.game});
    }
    case "SET_GAMES_LIST": {
      return Object.assign({}, state, {gamesList: action.games});
    }
    case "SET_STREAMS_GAME": {
      return Object.assign({}, state, {streamsByGame: action.streams});
    }
  }

  return state;
}
