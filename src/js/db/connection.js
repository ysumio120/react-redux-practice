
var mongoose = require("mongoose");

// Local Connection
// mongoose.connect("mongodb://localhost:27017/nytreact", function(err) {
//  if(err) throw err;
//  console.log('database connected');
// });

// mLab Connection (Heroku)
// mongoose.connect("mongodb://heroku_m1872jvs:4crahnevchht1jvggahajbgh6g@ds041546.mlab.com:41546/heroku_m1872jvs", function(err) {
//   if(err) throw err;
//   console.log('database connected');
// })

var isConnectedBefore = false;
var connect = function() {
    mongoose.connect('mongodb://heroku_m1872jvs:4crahnevchht1jvggahajbgh6g@ds041546.mlab.com:41546/heroku_m1872jvs', 
      {server: { auto_reconnect: true }});
};

connect();

mongoose.connection.on('error', function() {
    console.log('Could not connect to MongoDB');
});

mongoose.connection.on('disconnected', function(){
    console.log('Lost MongoDB connection...');
    if (!isConnectedBefore)
        connect();
});
mongoose.connection.on('connected', function() {
    isConnectedBefore = true;
    console.log('Connection established to MongoDB');
});

mongoose.connection.on('reconnected', function() {
    console.log('Reconnected to MongoDB');
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Force to close the MongoDB conection');
        process.exit(0);
    });
});