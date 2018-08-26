const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const mongoose = require('./db.js');
const users = require('./routes/users');

var app = express();

//setting up body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//view engine for tamplates
app.set('view engine', 'ejs');

//For Console Log Routes Request
app.use(morgan('dev'));

//Express-session middleware
app.use(session({
    secret: 'keyboard cat',
     resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  }));
 
  //Express Session middleware For Counting Number Of Visits
app.use(function (req, res, next) {
  if(req.session.visitCount){
    req.session.visitCount++;
  }else{
    req.session.visitCount = 1;
  }
  next();
});

//localhost/users users route
app.use('/users', users);

// Error Handler Middleware, Making Own Error
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message:error.message
        }});
});

// port number
const port = 4000;
 

//starting Server to listen on port
app.listen(port, () => console.log(`listening on port ${port}`));