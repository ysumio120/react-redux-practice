const initialState = {
  query: "",
  streams: []
}

export default function reducer(state=initialState, action) {
  
  switch(action.type) {
    case "SET_QUERY": {
      return Object.assign({}, state, {query: action.query})
    }
    case "SET_STREAMS_QUERY": {
      return Object.assign({}, state, {streams: action.streams})
    }
  }

  return state;
}