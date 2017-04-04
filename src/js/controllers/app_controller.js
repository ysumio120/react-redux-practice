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

router.get('/:username/favorites/:bookmark?', function(req, res) {
  Users.findOne({name: req.params.username}, 'favorites', function(err, user) {
    let bookmarkFound = false;

    if(err)
      return err;
    else {
      if(req.params.bookmark) {
        user.favorites.forEach(favorite => {
          if(favorite.bookmark === req.params.bookmark) {
            bookmarkFound = true;
            return res.send(favorite);
          }
        })
        if(!bookmarkFound)
          return res.send({bookmark: req.params.bookmark, streams: []});
      }
      else {
        return res.send(user.favorites)
      }
    }
  })
});

// Save favorite
router.post('/:username/favorites', function(req, res) {
  const favorite = req.body

  Users.findOne({name: req.params.username}, function(err, user) {
    if(err) return err;
    else if(!user) res.send(user)
    else {
      const favoritesArr = user.favorites;
      let foundBookmark = false;
      for(var i = 0; i < favoritesArr.length; i++) {
        if(favoritesArr[i].bookmark === favorite.bookmark) {
          favoritesArr[i].bookmark = favorite.newName;
          favoritesArr[i].streams = favorite.streams;
          foundBookmark = true;
          break;
        }
      }
      if(!foundBookmark) {
        favorite.bookmark = favorite.newName;
        delete favorite.newName;
        user.favorites.push(favorite);
      }

      user.save(function(err, doc) {
        if(err) return console.log(err);
        res.send(doc);
      })
    }
  })
});

router.delete('/:username/favorites', function(req, res) {

  const bookmark = req.body.bookmark;

  Users.findOne({name: req.params.username}, function(err, user) {
    if(err) return err;
    else if(!user) res.send(user)
    else {
      const favoritesArr = user.favorites;
      let foundBookmark = false;
      for(var i = 0; i < favoritesArr.length; i++) {
        if(favoritesArr[i].bookmark === bookmark) {
          favoritesArr.splice(i, 1);
          break;
        }
      }

      user.save(function(err, doc) {
        if(err) return console.log(err);
        res.send(doc);
      })
    }
  })
})

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
  let recentHistory = {
    channel_id: req.body.channel_id,
    channel: req.body.channel,
    game: req.body.game, 
    dateViewed: Number(req.body.dateViewed)
  };

  Users.findOne({name: req.params.username}, function(err, user) {
    if(err) return err;
    else if(!user) res.send(user)
    else {
      let historyArr = user.viewHistory;
      let foundChannel = false;
      for(var i = 0; i < historyArr.length; i++) {
        if(historyArr[i].channel === recentHistory.channel) {
          historyArr[i].dateViewed = recentHistory.dateViewed;
          foundChannel = true;
          break;
        }
      }
      if(!foundChannel) {
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