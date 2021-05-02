// Require Libraries
require('dotenv').config()
const express = require('express');
const expressValidator = require('express-validator');
const exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// App Setup
const app = express();

// Use Template Engine
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use(cookieParser());

// Middleware (Set Handlebars as the View Engine)
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/posts/new', (req, res) => {
    res.render('posts-new')
}); 

// Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

// Set db
require('./data/reddit-db');

// Start Server
app.listen(3000, () => {
  console.log('Reddit Clone on port localhost:3000!');
});
module.exports = app;