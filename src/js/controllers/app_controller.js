import express from 'express'

const router = express.Router();

const buildQuery = (headers) => {
  let params = [];
  for(let key in headers) {
    if(headers[key] !== null && headers[key] !== undefined)
      params.push(key + '=' + headers[key]);
  }

  return encodeURI(params.join('&'));
}

router.get('/login', (req,res) => {
  const headers = {
    response_type: "code",
    client_id: "kw4mh30kbtoewy0b9dh0mmyrt38r56",
    redirect_uri: "http://localhost:8080",
    scope: "user_read channel_read user_follows_edit",
    force_verify: "true"
  };
  
  const params = buildQuery(headers);
  res.redirect("https://api.twitch.tv/kraken/oauth2/authorize?" + params);
})

export default router;