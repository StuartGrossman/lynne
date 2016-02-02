var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;




//-----------------------Adds error handling to mongoose.connect--------------------------------------





app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');




app.set('view options', {
  layout: false
});
var newSessionID = uuid();

app.use(session({
  genid: function(req) {
      return newSessionID; // use UUIDs for session IDs
    },
    secret: 'regionknow_secret'
  }))
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());


//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//DEFINE/REQUIRE ROUTES BEFORE SETTING UP PATHS---------------------------------------------------
var userRoutes = require('./routes/UserRoutes');
var conversationRoutes = require('./routes/ConversationRoutes');
var questionRoutes = require('./routes/QuestionsRoutes');
var answerRoutes = require('./routes/AnswerRoutes');
var resetPassRoutes = require('./routes/ResetPasswordRoutes');
var rankRoutes = require('./routes/RankRoutes');


//on homepage load, render the index page
app.get('/', function(req, res) {
  res.render('index');
});
//-------to allow remote access--------------------------------------------------------
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




app.use('/', function(req, res) {
  console.log(req.body, "in serverjs 185")
  res.render('404');
})

//----------------APP IS LISTENING-----------------------------------------------------------
var server = app.listen(port, function() {
}
 
