const initialState = {
  loggingIn: true,
  isLoggedIn: false, 
  userTwitch: null,
  userLocal: null,
  token: ""
}

export default function reducer(state=initialState, action) {
  
  switch(action.type) {
    case "SET_TOKEN": {
      return Object.assign({}, state, {token: action.token})
    }
    case "SET_USER_TWITCH": {
      return Object.assign({}, state, {userTwitch: action.user})
    }
    case "SET_USER_LOCAL": {
      return Object.assign({}, state, {userLocal: action.user, isLoggedIn: action.isLoggedIn, loggingIn: false})
    }
  }

  return state;
}
