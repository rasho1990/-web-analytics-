const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const trackingRouter = require('./routes/trackingRouter');
// Package documentation - http://www.npm.com/package/connect-mongo
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

//create the express application
const app = express();


//enables cors
app.use(cors());
//<user>:<password>@
const dbString = `mongodb+srv://manu:5jltYkJttJkaxXBg@cluster0-c0hbd.mongodb.net/web_analytics?retryWrites=true&w=majority`;
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
const connection = mongoose.createConnection(dbString, dbOptions);
mongoose.connect(`mongodb+srv://manu:5jltYkJttJkaxXBg@cluster0-c0hbd.mongodb.net/web_analytics?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
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

// SNIPPET ROUTES ⬇
// The snippet code requests this url, and sends some parameters/variables along so that
// we can track the visitor from page to page
// Consumer: everybody who visits a website where the tracker snippet is included

app.use('/api', userRouter);//api router

// API ROUTES ⬇
// To get data from the API/database to render charts
// Nuxt application is going to request the API to get data to render charts
// Consumer: Nuxt analytics front-end

app.use('/image', trackingRouter)// tracking router 


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}!`);
});

