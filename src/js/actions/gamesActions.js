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

export function fetchTopGames() {
    
  return (dispatch) => {

    fetch("https://api.twitch.tv/kraken/games/top/?limit=100", 
      {
        method: "GET",
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json", 
          "Client-ID": "kw4mh30kbtoewy0b9dh0mmyrt38r56"
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
      console.log(json)
      dispatch(setGamesList(json.top))
    })
    .catch(err => {
      console.log(err)
      console.log("caught error")
      dispatch(setGamesList([]))
    })
  }
}