/// <reference path="../../typings/index.d.ts" />
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import index from './routes/index';
import cookieParser = require('cookie-parser'); // this module doesn't use the ES6 default export yet
import * as config from './config/common';

const app: express.Express = express();
const args = process.argv.slice(2);
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('__root', join(__dirname, '../../client'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(join(__dirname, '../../client/assets')));
app.use('/lib',express.static(join(__dirname, '../../client/lib')));
app.use('/scripts', express.static(join(__dirname,'../../node_modules')));
app.use('/', index);
app.set('args', args);

// catch 404 and forward to error handler
app.use((req: express.Request, res:express.Response, next: express.NextFunction) => {
  var err: any = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use((error: any, req: express.Request, res:express.Response, next: express.NextFunction) => {
    res.status(error['status'] || 500);
    res.send({
      message: error.message,
      error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req: express.Request, res:express.Response, next: express.NextFunction) => {
  res.status(error['status'] || 500);
  res.send({
    message: error.message,
    error: {}
  });
  return null;
});


export default app;