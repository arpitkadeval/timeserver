const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const httpStatus = require('http-status');
const expressWinston = require('express-winston');
const expressValidation = require('express-validation');
const helmet = require('helmet');
const winstonInstance = require('./winston');
const routes = require('../index.route');
const config = require('./config');
const APIError = require('../server/helpers/APIError');
const Path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cron = require('node-cron');
const CurrencyConversionHelper = require('../server/helpers/currency/currencyHelper');

const imagesRoot = Path.join(__dirname, '..', 'uploads');
const project_catalogueRoot = Path.join(__dirname, '..', 'project-catalogue-upload');
const productsimagesRoot = Path.join(__dirname, '..', 'products-images');
const app = express();

// app.use(processImage({
//   root: imagesRoot
// }));
app.use('/uploads', express.static(imagesRoot));
app.use('/project-catalogue-upload', express.static(project_catalogueRoot));
// app.use(processImage({
//   root: productsimagesRoot
// }));
app.use('/products-images', express.static(productsimagesRoot));

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json({
  limit: '1500mb'
}));
app.use(bodyParser.urlencoded({
  limit: '1500mb',
  extended: true
}));

app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// enable detailed API logging in dev env
if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

const option = {
  definition:{
    openapi :  '3.0.0',
    "info": {
      "version": "1.0.0", //version of the OpenAPI Specification
      "title": "Inventory Project",
      "description": "Inventory Project Application API",
      "license": {
        "name": "MIT",
        "url": "https://opensource.org/licenses/MIT"
      }
    },
    "components":{
      "securitySchemes":{
        "Bearer": {
          "type": "apiKey",
          "name": "Authorization",
          "in": "header"
      },

      }
    }
    ,
    "host": "localhost:4040",
    "basePath": "/",
    "tags": [
      {
        "name": "Inventory",
        "description": "API for users in the system"
      }
    ],
    "schemes": ["http"],
    "consumes": ["application/json","multipart/form-data"],
    "produces": ["application/json","multipart/form-data"],
    
  },
  apis: ['server/apis/**/*.js']
};
const swaggerSpec =  swaggerJSDoc(option);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec));
// mount all routes on /api path
 app.use('/api', routes);


// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
  
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const error = new APIError(unifiedErrorMessage, err.status, true);
    return next(error);
  } else if (!(err instanceof APIError)) {
    const apiError = new APIError(err.message, err.status, err.isPublic);
    return next(apiError);
  }
  return next(err);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API not found', httpStatus.NOT_FOUND);
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {}
  })
);

CurrencyConversionHelper.getCurrencyConversationRate();
cron.schedule('* * * * *', () => {
  CurrencyConversionHelper.getCurrencyConversationRate();
});

// app.use(j);
module.exports = app;
