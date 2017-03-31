const initialState = {
  bookmarks: [],  
  // {
  //   bookmark: String,
  //   streams: [ String ]
  // }
  modalOpen: false,
  modalType: "", // add, update, or remove
  bookmarkChannel: "",
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_BOOKMARKS": {
      return Object.assign({}, state, {bookmarks: action.bookmarks})
    }    
    case "TOGGLE_MODAL": {
      return Object.assign({}, state, {modalOpen: action.toggle, modalType: action.modalType});
    }
    case "SET_BOOKMARK_CHANNEL": {
      return Object.assign({}, state, {bookmarkChannel: action.channel});
    }
  }

  return state;
}