import mongoose from 'mongoose';


var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  favorites: [ 
    {
      bookmark: {type: String, required: true},
      streams: [ 
        {
          channel_id: {type: Number, required: true},
          channel: {type: String, required: true}
        } 
      ]
    }
  ],
  viewHistory: [
    {
      channel_id: {type: Number, required: true},
      channel: {type: String, required: true},
      game: {type: String, required: true},
      dateViewed: {type: Number, required: true}    
    }
  ]
});

var Users = mongoose.model("Users", userSchema);

module.exports = Users;