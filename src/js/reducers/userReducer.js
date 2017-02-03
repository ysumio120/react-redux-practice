const initialState = {
  isLoggedIn: false, 
  user: null, 
  token: ""
}

export default function reducer(state=initialState, action) {
  
  switch(action.type) {
    case "SET_TOKEN": {
      return Object.assign({}, state, {token: action.token})
    }
    case "SET_USER": {
      return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    } 
  }

  return state;
}
