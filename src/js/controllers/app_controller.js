import express from 'express'

const router = express.Router();

import Users from '../db/Users'

// const buildQuery = (headers) => {
//   let params = [];
//   for(let key in headers) {
//     if(headers[key] !== null && headers[key] !== undefined)
//       params.push(key + '=' + headers[key]);
//   }

//   return encodeURI(params.join('&'));
// }

// router.get('/login', (req,res) => {
//   const headers = {
//     response_type: "code",
//     client_id: "kw4mh30kbtoewy0b9dh0mmyrt38r56",
//     redirect_uri: "http://localhost:8080",
//     scope: "user_read channel_read user_follows_edit",
//     force_verify: "true"
//   };
  
//   const params = buildQuery(headers);
//   res.redirect("https://api.twitch.tv/kraken/oauth2/authorize?" + params);
// })

router.post('/user', function(req, res) {
  Users.findOne({name: req.body.name}, function(err, foundUser) {
    if(err) return err;
    if(!foundUser) {
      Users.create(req.body, function(err, createdUser) {
        if(err) {
          return err;
        }
        else {
          return res.send(createdUser);
        }
      })
    }
    else return res.send(foundUser);
  })
});

router.get('/:username/history', function(req, res) {
  Users.findOne({name: req.params.username}, 'viewHistory', function(err, user) {
    if(err)
      return err;
    else
      return res.send(user);
  })
});

// Add recently viewed content
router.post('/:username/history', function(req, res) {
  let recentHistory = {game: req.body.game, channel: req.body.channel, dateViewed: Number(req.body.dateViewed)};

  Users.findOne({name: req.params.username}, function(err, user) {
    if(err) return err;
    else if(!user) res.send(user)
    else {
      let historyArr = user.viewHistory;
      let dupeChannel = false;
      for(var i = 0; i < historyArr.length; i++) {
        if(historyArr[i].channel === recentHistory.channel) {
          historyArr[i].dateViewed = recentHistory.dateViewed;
          dupeChannel = true;
          break;
        }
      }
      if(!dupeChannel) {
        user.viewHistory.push(recentHistory);
      }

      user.save(function(err, doc) {
        if(err) return console.log(err);
        res.send(doc);
      })
    }
  })
});


export default router;