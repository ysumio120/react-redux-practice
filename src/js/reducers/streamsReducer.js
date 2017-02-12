const initialState = {
  /*
  { 
    name: String,
    streams: [{
      isLoaded: boolean,
      channel: String,
      player: Object (Twtich Player)
    }}
  }

  */
  activeChannel: "Home",
  streams: [{name: "Home", streams: []}]
}

export default function reducer(state=initialState, action) {

  switch(action.type) {
    case "ADD_STREAM": {
      const newStream = {
        isLoaded: false,
        channel: action.stream,
        player: null
      }

      const deepCopy = state.streams.map((elem) => {
        const streamClone = elem.streams.map((stream) => {
          return {...stream};
        })
        if(state.activeChannel === elem.name) {
          return Object.assign({}, {name: elem.name, streams: [...streamClone, newStream]});
        }
        return Object.assign({}, {name: elem.name, streams: streamClone});
      })

      return Object.assign({}, state, {streams: deepCopy});
    }
    case "LOAD_STREAM": {
      const deepCopy = state.streams.map((elem) => {
        const streamClone = elem.streams.map((stream) => {
          if(action.channel === stream.channel) {
            return {channel: action.channel, player: action.player, isLoaded: true}
          }
          return {...stream};
        })
        if(state.activeChannel === elem.name) {
          return Object.assign({}, {name: elem.name, streams: [...streamClone, newStream]});
        }
        return Object.assign({}, {name: elem.name, streams: streamClone});
      })

      return Object.assign({}, state, {streams: deepCopy});
    }

    case "SET_MUTED": {
      return Object.assign({}, state, {muted: action.muted})
    }
    case "ADD_CHANNEL": {
      const deepCopy = state.streams.map((elem) => {
        const streamClone = elem.streams.map((stream) => {
          return {...stream};
        })
        return Object.assign({}, {name: elem.name, streams: streamClone});
      })
      
      return Object.assign({}, state, {streams: [...deepCopy, {name: action.channel, streams: []}]})
    }
    case "SET_CHANNEL": {
      return Object.assign({}, state, {activeChannel: action.tabName})
    }
    // case "REMOVE_STREAM": {
    //   return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    // } 
  }

  return state;
}
