var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res) {
  console.log('here');
  res.sendFile(__dirname + '/index.html');
});

//app.use('/', twitch_controller);

//require('./client/src/config/connection');

app.listen(PORT, function() {
    console.log('Example app listening on port ' + PORT)
})