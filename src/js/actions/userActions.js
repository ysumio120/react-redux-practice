const buildQuery = (headers) => {
  let params = [];
  for(let key in headers) {
    if(headers[key] !== null && headers[key] !== undefined)
      params.push(key + '=' + headers[key]);
  }

  return encodeURI(params.join('&'));
}

export function setToken(token) {
  console.log(token)
  return {
    type: "SET_TOKEN",
    token
  }
}


const client_id = location.hostname == "localhost" ? "kw4mh30kbtoewy0b9dh0mmyrt38r56" : "tgasid8neghal59b29g0hpjg8xt3gu"
const client_secret = location.hostname == "localhost" ? "dy6e1q7n3bh5mrtox7f8hejbyj9scq" : "0s6hu10zl4kfg5r85z4j3uhhgca2pb"
const redirect_uri = location.hostname == "localhost" ? "http://localhost:8080" : "https://twitch-avid.herokuapp.com"

export function getToken(code) {
  return (dispatch) => {
    const headers = {
      client_id: client_id,
      client_secret: client_secret,
      redirect_uri: redirect_uri,
      grant_type: "authorization_code",
      code: code
    };

    const params = buildQuery(headers);

    fetch("https://api.twitch.tv/kraken/oauth2/token?" + params, {
      method: "POST"
    })
    .then(response => {
      if(!response.ok) 
        throw new Error();

      return response.json();
    })
    .then(json => {
      console.log(json)
      dispatch(setToken(json.access_token));
    })
    .catch(err => {
      console.log(err)
      dispatch(setUser(null, false));
      console.log("caught error")
    })
  }
}

export function setTwitchUser(user) { // user object from Twitch API
  return {
    type: "SET_USER_TWITCH",
    user
  }
}

export function setLocalUser(user, isLoggedIn) { // user object from Twitch API
  return {
    type: "SET_USER_LOCAL",
    user,
    isLoggedIn
  }
}

export function getTwitchUser(token) {
  return (dispatch) => {
    fetch("https://api.twitch.tv/kraken/user", {
      method: "GET",
      headers: {
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": client_id,
        "Authorization": "OAuth " + token
      }
    })
    .then(response => {
      if(!response.ok) 
        throw new Error()

      return response.json()
    })
    .then(json => {
      console.log(json)
      dispatch(setTwitchUser(json))
    })
    .catch(err => {
      console.log(err)
      console.log("caught error")
      dispatch(setTwitchUser(null))
    })
  }
}

export function getLocalUser(user) {
  const params = buildQuery(user);

  return (dispatch) => {
    fetch('/user', {
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: params
    })
    .then((response) => {
      if(!response.ok) 
        throw new Error()

      return response.json()
    })
    .then(json => {
      console.log(json)
      dispatch(setLocalUser(json, true))
    })
    .catch(err => {
      console.log(err)
      console.log("caught error")
      dispatch(setLocalUser(null, false))
    })
  }

}