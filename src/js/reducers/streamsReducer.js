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
  streams: [{name: "Home", streams: [{isLoaded:false}]}]
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
        return Object.assign({}, {name: elem.name, streams: streamClone});
      })
      // console.log(test)
      // console.log(state.streams)
      // console.log(test === state.streams)
      // console.log(test[0])
      // test[0].streams[0].isLoaded = true;
      // console.log(state.streams[0])
      // console.log(test[0] === state.streams[0])
      // let streamsCopy = [...state.streams];
      const streamsCopy = state.streams.map((elem) => {
        if(elem.name == state.activeChannel) {
          const newStreams = [...elem.streams, newStream];
          return {name: elem.name, streams: newStreams};
        }
        return elem;
      })
      return Object.assign({}, state, {streams: streamsCopy})
      // return Object.assign({}, state, {streams: [...state.streams, newStream]});
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
    case "SET_CHANNEL": {
      return Object.assign({}, state, {activeChannel: action.tabName})
    }
    // case "REMOVE_STREAM": {
    //   return Object.assign({}, state, {user: action.user, isLoggedIn: action.isLoggedIn})
    // } 
  }

  return state;
}
