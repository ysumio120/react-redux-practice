const initialState = {
  /*
  elements of "streams" array
  { 
    navChannel: String, (refers to stream canvas)
    streamChannel: String,  (channel of stream)
  }

  */
  activeChannel: "Home",
  navChannels: ["Home"],
  streams: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "ADD_STREAM": {
      const newStream = {
        navChannel: action.navChannel,
        streamChannel: action.streamChannel
      }

      const streamsClone = state.streams.map((stream) => {
        return {...stream};
      })
      
      return Object.assign({}, state, {streams: [...streamsClone, newStream]});
    }
    case "SET_MUTED": {
      return Object.assign({}, state, {muted: action.muted})
    }
    case "ADD_CHANNEL": {
      return Object.assign({}, state, {navChannels: [...state.navChannels, action.channel]})
    }
    case "SET_CHANNEL": {
      return Object.assign({}, state, {activeChannel: action.navChannel})
    }
    // case "REMOVE_STREAM": {
    //   return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    // } 
  }

  return state;
}
