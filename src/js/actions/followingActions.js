export function setStreamsFollowing(streams) {
  return {
    type: "SET_STREAMS_FOLLOWING",
    streams
  }
}

export function getLiveFollowing(token) { // Live Streams
  
  return (dispatch) => {

    fetch("https://api.twitch.tv/kraken/streams/followed/?limit=100", 
      {
        method: "GET",
        headers: {
          "Accept": "application/vnd.twitchtv.v5+json", 
          "Client-ID": "kw4mh30kbtoewy0b9dh0mmyrt38r56",
          "Authorization": "OAuth " + token

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
      dispatch(setStreamsFollowing(json.streams))
    })
    .catch(err => {
      console.log(err)
      console.log("caught error")
      dispatch(setStreamsFollowing([]))
    })
  }
}

function getAllFollowing(userID) { // All Followed Channels

}