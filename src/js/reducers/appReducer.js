const initialState = {
  navCollapse: false,
  chatCollapse: false,
  searchCollapse: true,
  listCollapse: true,
  modalOpen: false,
  bookmarkChannel: "",
  modalType: "" // add, update, or remove
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "TOGGLE_NAV": {
      return Object.assign({}, state, {navCollapse: action.toggle});
    }
    case "TOGGLE_CHAT": {
      return Object.assign({}, state, {chatCollapse: action.toggle});
    }
    case "TOGGLE_SEARCH": {
      return Object.assign({}, state, {searchCollapse: action.toggle});
    }
    case "TOGGLE_LIST": {
      return Object.assign({}, state, {listCollapse: action.toggle});
    }
  }

  return state;
}
