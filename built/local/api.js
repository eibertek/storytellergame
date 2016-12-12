"use strict";
/// <reference path="../../typings/index.d.ts" />
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var path_1 = require("path");
var index_1 = require("./routes/index");
var cookieParser = require("cookie-parser"); // this module doesn't use the ES6 default export yet
var app = express();
var args = process.argv.slice(2);
// view engine setup
app.set('views', path_1.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('__root', path_1.join(__dirname, '../../client'));
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path_1.join(__dirname, '../../client/assets')));
app.use('/lib', express.static(path_1.join(__dirname, '../../client/lib')));
app.use('/scripts', express.static(path_1.join(__dirname, '../../node_modules')));
app.use('/', index_1["default"]);
app.set('args', args);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (error, req, res, next) {
        res.status(error['status'] || 500);
        res.send({
            message: error.message,
            error: error
        });
    });
}
// production error handler
// no stacktraces leaked to user
app.use(function (error, req, res, next) {
    res.status(error['status'] || 500);
    res.send({
        message: error.message,
        error: {}
    });
    return null;
});
exports.__esModule = true;
exports["default"] = app;
