export function setGame(game) {
  return {
    type: "SET_GAME",
    game
  }
}

export function setGamesList(games) {
  return {
    type: "SET_GAMES_LIST",
    games
  }
}

export function setStreamsGame(streams) {
  return {
    type: "SET_STREAMS_GAME",
    streams
  }
}

export function setFeatured(streams) {
  return {
    type: "SET_FEATURED",
    streams
  }
}

const client_id = location.hostname == "localhost" ? "kw4mh30kbtoewy0b9dh0mmyrt38r56" : "tgasid8neghal59b29g0hpjg8xt3gu"

export function fetchTopGames() {
    
  return (dispatch) => {
    
    fetch("https://api.twitch.tv/kraken/games/top/?limit=100", 
      {
        method: "GET",
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json", 
          "Client-ID": client_id
        }
      }
    )
    .then(response => {
      //console.log(response)
      if(!response.ok) 
        throw new Error()
      
      return response.json()
    })
    .then(json => {
      console.log(json)
      dispatch(setGamesList(json.top))
    })
    .catch(err => {
      console.log("caught error")
      dispatch(setGamesList([]))
    })
  }
}

export function fetchStreamsByGame(game) {
    
  return (dispatch) => {

    if(game) {
      fetch("https://api.twitch.tv/kraken/streams/?limit=100&game=" + game, 
        {
          method: "GET",
          headers: {
            "Accept": "application/vnd.twitchtv.v5+json", 
            "Client-ID": client_id
          }
        }
      )
      .then(response => {
        //console.log(response)
        if(!response.ok) 
          throw new Error()
        
        return response.json()
      })
      .then(json => {
        console.log(json)
        dispatch(setStreamsGame(json.streams))
      })
      .catch(err => {
        console.log("caught error")
        dispatch(setStreamsGame([]))
      })
    }
  }
}

export function fetchFeatured() {
    
  return (dispatch) => {

    fetch("https://api.twitch.tv/kraken/streams/featured/?limit=100", 
      {
        method: "GET",
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json", 
          "Client-ID": client_id
        }
      }
    )
    .then(response => {
      //console.log(response)
      if(!response.ok) 
        throw new Error()
      
      return response.json()
    })
    .then(json => {
      console.log(json)
      dispatch(setFeatured(json.featured))
    })
    .catch(err => {
      console.log(err)
      console.log("caught error")
      dispatch(setFeatured([]))
    })
  }
}