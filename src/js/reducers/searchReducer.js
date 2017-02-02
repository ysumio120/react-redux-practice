export default function reducer(state={toggle:"NOT CLICKED", streams: []}, action) {
  switch(action.type) {
    case "SET_QUERY": {
      return Object.assign({}, state, {query: action.query})
    }
    case "SET_STREAMS": {
      return Object.assign({}, state, {streams: action.streams})
    }
  }

  return state;
}