const initialState = {
  navOpen: true,
  chatOpen: false,
  searchOpen: false
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "TOGGLE_NAV": {
      return Object.assign({}, state, {navOpen: action.toggle});
    }
    case "TOGGLE_CHAT": {
      return Object.assign({}, state, {chatOpen: action.toggle});
    }
    case "TOGGLE_SEARCH": {
      return Object.assign({}, state, {searchOpen: action.toggle});
    }
  }

  return state;
}
