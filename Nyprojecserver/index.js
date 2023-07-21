const mongoose = require('mongoose');
const util = require('util');
const express = require('express');
// config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');
const APIError = require('./server/helpers/APIError');
const httpStatus = require('http-status');
const debug = require('debug')('express-mongoose-es6-rest-api:index');
const bodyParser = require("body-parser");
// // const swaggerJSDoc = require('swagger-jsdoc');
const port = process.env.PORT;
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');



// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;


// connect to mongo db
const mongoUri = config.mongo.host;
const mongoConfig = {
  useCreateIndex: true,
  useNewUrlParser: true,
  poolSize: 2,
  promiseLibrary: global.Promise,
  useUnifiedTopology: true
};

app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(mongoUri, mongoConfig);

mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});


// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}



// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('Client/build'));
  }
  app.listen(process.env.PORT || config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}
app.use(errorHandler);

function errorHandler (err, req, res, next) {
  res.status(httpStatus.INTERNAL_SERVER_ERROR)
  res.render('error', new APIError(err, httpStatus.INTERNAL_SERVER_ERROR));
}

module.exports = app;
