import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

import app_controller from './src/js/controllers/app_controller'

const app = express();

const PORT = process.env.PORT || 8080;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/')));

app.get('/*', function(req, res) {

  res.sendFile(__dirname + '/index.html');
});

app.use('/', app_controller);

//require('./client/src/config/connection');

app.listen(PORT, function() {
    console.log('Example app listening on port ' + PORT)
})