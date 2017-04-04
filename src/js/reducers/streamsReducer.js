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
        streamChannelID: action.streamChannelID,
        streamChannel: action.streamChannel
      }

      const streamsClone = state.streams.map((stream) => {
        return {...stream};
      })
      
      for(let i = 0; i < state.streams.length; i++) {
        if(state.streams[i].streamChannel == action.streamChannel && state.streams[i].navChannel == action.navChannel)
          return Object.assign({}, state, {streams: [...streamsClone]});
      }
      return Object.assign({}, state, {streams: [...streamsClone, newStream]});
    }
    case "REMOVE_STREAM": {
      const filtered = state.streams.filter((stream) => {
        if(stream.navChannel == action.navChannel && stream.streamChannel == action.streamChannel)
          return false;

        return true;
      })

      return Object.assign({}, state, {streams: filtered})
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
  }

  return state;
}
