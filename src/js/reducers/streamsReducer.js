const initialState = {
  streams: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "ADD_STREAM": {
      return Object.assign({}, state, {streams: [...state.streams, action.stream]});
    }
    case "REMOVE_STREAM": {
      return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    } 
  }

  return state;
}
