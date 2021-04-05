const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

// Package documentation - http://www.npm.com/package/connect-mongo

const MongoStore = require('connect-mongo')(session);

//create the express application
const app = express();



//<user>:<password>@
const dbString = `mongodb+srv://manu:5jltYkJttJkaxXBg@cluster0-c0hbd.mongodb.net/web_analytics?retryWrites=true&w=majority`;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
 const connection = mongoose.createConnection(dbString, dbOptions);
// Middlewares
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: 'sessions'
});


app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false, // don't create session until something stored
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // Equals 1 Day 
  }
}));

//Routes

app.get('/', (req, res) => {
  res.send(req.session)
})

app.get('/image', (req, res) => {
  console.log(req.get('Referer'), req.url);
  res.sendFile('image.jpg', { root: './public' });
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}!`);
});

