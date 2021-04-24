// Dependencies
const express = require('express')
const handlebars = require('handlebars')

const expressValidator = require('express-validator'); // prevents malicious data / server connection

// Set DB
require('./data/reddit-db');

// Create App
const app = express()
const port = 3000

// Middleware
// Set Handlebars as View Engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs());

// Set Template Engine
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(expressValidator());

// Controllers
require('./controllers/posts.js')(app); //app is passed in as arg. 

// Routes
// app.get('/', (req, res) => {
//   res.render('head')
// })

app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

// const port = process.env.MONGODB | 3000 is also fine here.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app