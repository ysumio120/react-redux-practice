export function setQuery(query) {
  return {
    type: "SET_QUERY",
    query
  }
}

export function setStreams(streams) {
  return {
    type: "SET_STREAMS",
    streams
  }
}

export function fetchStreams(query) {
    
  return (dispatch) => {
    dispatch(setQuery(query))

    if(query) {
      fetch("https://api.twitch.tv/kraken/search/streams?limit=100&query=" + query, 
        {
          method: "GET",
          headers: { "Client-ID": "kw4mh30kbtoewy0b9dh0mmyrt38r56" }
        }
      )
      .then(response => {
        console.log(response)
        if(!response.ok) 
          throw new Error()
        
        return response.json()
      })
      .then(json => {
        console.log(query)
        console.log(json)
        dispatch(setStreams(json.streams))
      })
      .catch(err => {
        console.log("caught error")
        dispatch(setStreams([]))
      })
    }
    else
      dispatch(setStreams([]))
  }
}