const buildQuery = (headers) => {
  let params = [];
  for(let key in headers) {
    if(headers[key] !== null && headers[key] !== undefined)
      params.push(key + '=' + headers[key]);
  }

  return encodeURI(params.join('&'));
}

export function setToken(token) {
  return {
    type: "SET_TOKEN",
    token
  }
}

export function getToken(code) {
  return (dispatch) => {
    const headers = {
      client_id: "kw4mh30kbtoewy0b9dh0mmyrt38r56",
      client_secret: "dy6e1q7n3bh5mrtox7f8hejbyj9scq",
      redirect_uri: "http://localhost:8080",
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
      console.log("caught error")
    })
  }
}

export function setUser(user, isLoggedIn) { // user object from Twitch API
  return {
    type: "SET_USER",
    user,
    isLoggedIn,
  }
}

export function getUser(token) {
  return (dispatch) => {
    fetch("https://api.twitch.tv/kraken/user", {
      method: "GET",
      headers: {
        "Accept": "application/vnd.twitchtv.v5+json",
        "Client-ID": "kw4mh30kbtoewy0b9dh0mmyrt38r56",
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
      dispatch(setUser(json, true))
    })
    .catch(err => {
      console.log("caught error")
    })
  }
}