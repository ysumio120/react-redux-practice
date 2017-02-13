
var mongoose = require("mongoose");

// Local Connection
// mongoose.connect("mongodb://localhost:27017/nytreact", function(err) {
//  if(err) throw err;
//  console.log('database connected');
// });

// mLab Connection (Heroku)
mongoose.connect("mongodb://heroku_m1872jvs:4crahnevchht1jvggahajbgh6g@ds041546.mlab.com:41546/heroku_m1872jvs", function(err) {
  if(err) throw err;
  console.log('database connected');
})