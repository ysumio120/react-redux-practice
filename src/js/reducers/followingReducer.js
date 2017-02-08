const initialState = {
  streams: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_STREAMS_FOLLOWING": {
      return Object.assign({}, state, {streams: action.streams})
    }
  }

  return state;
}
