const initialState = {
  bookmarks: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "SET_BOOKMARKS": {
      return Object.assign({}, state, {bookmarks: action.bookmarks})
    }
  }

  return state;
}