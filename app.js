const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const sensorRouter = require('./api/routes/sensorData');
const requestedSensorDataRouter = require('./api/routes/requestedSensorData');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// This is to allow these spcified methods to be used in the server
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.set('view-engine', 'ejs');

// This get is to make the index page visible to the public folder
app.get('/', (req, res) =>{
    res.render("../public/index.ejs");
});

// These two lines establish the url to its specific route
app.use('/sensors', sensorRouter);
app.use('/requested', requestedSensorDataRouter);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

module.exports = app;