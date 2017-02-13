const initialState = {
  fetched: false,
  history: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_HISTORY": {
      return Object.assign({}, state, {history: action.history, fetched: true})
    }
  }

  return state;
}
