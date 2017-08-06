global.__DEV__ = true;

const express = require('express');
const morgan = require('morgan');
const { api } = require('./index.js');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');

    next();
}

const app = express();

app.use(allowCrossDomain);
app.use(morgan('dev', { immediate: true }));
app.options('*', (req, res) => {
    res.status(200).send();
    return;
});
app.use('/api', api);

app.listen(9090);