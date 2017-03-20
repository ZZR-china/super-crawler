import express from 'express';
import logger from 'morgan';
import compression from 'compression';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import favicon from 'serve-favicon';
import methodOverride from 'method-override';
import helmet from 'helmet';
import httpStatus from 'http-status';
import expressJwt from 'express-jwt';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import winstonInstance from './winston';
import routes from '../src/resources';
import config from './env';
import APIError from '../src/helpers/apierror.helper';


const app = express();
if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride());
app.use(favicon(config.rootPath + '/love.ico'));
// secure apps by setting various HTTP headers
app.use(helmet());
// enable CORS - Cross Origin Resource Sharing
let corsOptions={};
if (config.env === 'production') {
  corsOptions = {
    origin: function (origin, callback) {
      const whitelist = config.whitelist;
      const originIsWhitelisted = whitelist.indexOf(origin) !== -1
      callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted)
    },
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
}
app.use(cors(corsOptions));
app.disable('x-powered-by');

//express jwt config

// app.use(expressJwt({
//   secret: config.jwtSecret,
//   getToken (req) {
//     if (req.headers.authorization) {
//         return req.headers.authorization;
//     } else if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   }
// }).unless({path: [
//   '/captcha/image',
//   {url: '/', methods: ['GET']},
//   {url: /^(\/qr)+(\/url)+(\i)*/, methods: ['GET']},
//   {url: /^(\/qr)+(\/url)*(\?)+(\w)*(\=)*(\w)*/, methods: ['GET']},
//   {url: '/auth/random', methods: ['GET']},
//   {url: '/auth', methods: ['GET', 'POST']},
//   {url: /\/v1\/sms/i, methods: ['GET']}
// ]}));

app.use('/', routes);

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


// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({
    message: err.isPublic ? err.message : httpStatus[err.status],
    request: req.url,
    // stack: config.env === 'development' ? err.stack : {}
  })
);

export default app;
