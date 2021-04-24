// Require Libraries
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// App Setup
const app = express();

// Use Template Engine
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(expressValidator());

// Middleware
const exphbs  = require('express-handlebars');
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Routes
// app.get('/', (req, res) => {
//     res.render('home')
// });
app.get('/posts/new', (req, res) => {
    res.render('posts-new')
}); 

// Controllers
require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

// Start Server
app.listen(3000, () => {
  console.log('Reddit Clone on port localhost:3000!');
});
module.exports = app;