const initialState = {
  /*
  {
    isLoaded: boolean,
    channel: String,
    player: Object (Twtich Player)
  }
  */
  streams: []
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "ADD_STREAM": {
      const newStream = {
        isLoaded: false,
        channel: action.stream,
        player: null
      }
      return Object.assign({}, state, {streams: [...state.streams, newStream]});
    }
    case "LOAD_STREAM": {
      const newStreams = state.streams.map((stream) => {
        if(stream.channel == action.channel)
          return {channel: action.channel, player: action.player, isLoaded: true}
        else 
          return stream
      })
      return Object.assign({}, state, {streams: newStreams});
    }
    case "SET_MUTED": {
      return Object.assign({}, state, {muted: action.muted})
    }
    // case "REMOVE_STREAM": {
    //   return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    // } 
  }

  return state;
}
