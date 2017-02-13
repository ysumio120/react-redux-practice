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
  .then((response) => response.json())
  .then((user) => {
    callback(user);
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
    .then(response => response.json())
    .then((data) => {
      callback(data)
    })
    .catch((error) => {
      console.log(error)
    })
  }