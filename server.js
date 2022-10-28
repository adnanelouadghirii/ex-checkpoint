const http = require('http');
const express = require('express');
const path = require('path');
const moment = require('moment');
const app = express();
app.use(express.json());
app.use(express.static("express"));

function time_checker(req, res, next){
  var day = moment().format('dddd')
  var format = 'hh:mm:ss'
  var time = moment(),
  start = moment('09:00:00', format),
  end = moment('17:00:00', format);

  if (day!= 'Saturday' && day!= 'Sunday' && time.isBetween(start, end)){
    next();
  }
  else{
    res.send('Request is outside working hours');
  }
}

app.use(time_checker)

app.get('/', function(req,res){
    res.redirect('/home');
  });

app.use('/home', function(req,res){
    res.sendFile(path.join(__dirname+'/express/html/home.html'));
  });

app.use('/services', function(req,res){
    res.sendFile(path.join(__dirname+'/express/html/services.html'));
  });

app.use('/contact_us', function(req,res){
    res.sendFile(path.join(__dirname+'/express/html/contact.html'));
  });
const server = http.createServer(app);
const port = 4000;
server.listen(port);
console.debug('Server listening on port ' + port);