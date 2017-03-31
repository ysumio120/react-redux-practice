function buildQuery(headers) {
  let params = [];
  for(let key in headers) {
    if(headers[key] !== null && headers[key] !== undefined)
      params.push(key + '=' + headers[key]);
  }

  return encodeURI(params.join('&'));
}


export function getLocalUser(user, callback) {
  var params = buildQuery(user);
  console.log(params)
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
  .then((user) => {
    callback(user);
  })
  .catch((error) => {
    console.log(error)
  })
}

export function getFavoriteByBookmark(username, bookmark, callback) {
  //var params = buildQuery(content);
  fetch('/' + username + '/favorites/' + bookmark, {
    method: "GET"
  })
  .then(response => {
    console.log(response)
    if(!response.ok) 
      throw new Error()
    
    return response.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export function getAllFavorite(username, callback) {
  //var params = buildQuery(content);
  fetch('/' + username + '/favorites', {
    method: "GET"
  })
  .then(response => {
    console.log(response)
    if(!response.ok) 
      throw new Error()
    
    return response.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export function postFavorite(username, content, callback) {
  //var params = buildQuery(content);
  fetch('/' + username + '/favorites', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: content
  })
  .then(response => {
    console.log(response)
    if(!response.ok) 
      throw new Error()
    
    return response.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export function deleteBookmark(username, content, callback) {
  fetch('/' + username + '/favorites', {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    },
    body: content
  })
  .then(response => {
    console.log(response)
    if(!response.ok) 
      throw new Error()
    
    return response.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export function postHistory(username, content, callback) {
  var params = buildQuery(content);
  fetch('/' + username + '/history', {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    },
    body: params
  })
  .then(response => {
    console.log(response)
    if(!response.ok) 
      throw new Error()
    
    return response.json()
  })
  .then((data) => {
    callback(data)
  })
  .catch((error) => {
    console.log(error)
  })
}

export function getChannel(channelName, callback) {
  const client_id = process.env.NODE_ENV ? "tgasid8neghal59b29g0hpjg8xt3gu" : "kw4mh30kbtoewy0b9dh0mmyrt38r56"

  fetch("https://api.twitch.tv/kraken/channels/" + channelName, {
    method: "GET",
    headers: {
      //"Accept": "application/vnd.twitchtv.v5+json", // using v3 api
      "Client-ID":"kw4mh30kbtoewy0b9dh0mmyrt38r56"
    }
  })
  .then(response => response.json())
  .then((channel) => {
    callback(channel);
  })
}