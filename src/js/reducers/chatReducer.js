const initialState = {
/*
  selected: boolean, default false
  channel: String
*/
  selected: "",
  chats: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "ADD_CHAT": {
      return Object.assign({}, state, {chats: [...state.chats, action.channel], selected: action.channel});
    }
    case "SET_SELECTED": {
      console.log("selected")
      return Object.assign({}, state, {selected: action.channel});
    }
    // case "REMOVE_CHAT": {
    //   return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    // } 
  }

  return state;
}
