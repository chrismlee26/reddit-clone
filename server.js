// Dependencies
const express = require('express')
// const { ppid } = require('node:process')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');

// Create App
const app = express()
const port = 3000

// Set Handlebars as View Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

// Controllers (Middlewares)
require('./controllers/posts.js')(app);

// Routes
app.get('/', (req, res) => {
  res.send('Hello World! 123123123')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app