export function setQuery(query) {
  return {
    type: "SET_QUERY",
    query
  }
}

export function setStreamsQuery(streams) {
  return {
    type: "SET_STREAMS_QUERY",
    streams
  }
}

export function fetchStreamsByQuery(query) {
  const client_id = location.hostname == "localhost" ? "kw4mh30kbtoewy0b9dh0mmyrt38r56" : "tgasid8neghal59b29g0hpjg8xt3gu"    
  
  return (dispatch) => {
    dispatch(setQuery(query))

    if(query) {
      fetch("https://api.twitch.tv/kraken/search/streams/?limit=100&query=" + query, 
        {
          method: "GET",
          headers: {
            "Accept": "application/vnd.twitchtv.v5+json", 
            "Client-ID": client_id
          }
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
        dispatch(setStreamsQuery(json.streams))
      })
      .catch(err => {
        console.log(err)
        console.log("caught error")
        dispatch(setStreamsQuery([]))
      })
    }
    else
      dispatch(setStreamsQuery([]))
  }
}