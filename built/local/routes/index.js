"use strict";
var express_1 = require("express");
var index = express_1.Router();
/* GET home page. */
index.get('/', function (req, res, next) {
    console.log('AAAAAA', req.query);
    res.cookie('env', req.query.env);
    res.cookie('query', req.query);
    res.sendFile(req.app.get('__root') + '/index.html');
});
/* GET home page. */
index.get('/A/', function (req, res, next) {
    console.log('PARAMETROS  ', req.query);
    res.cookie('env', 'test');
    res.sendFile(req.app.get('__root') + '/index.html');
});
exports.__esModule = true;
exports["default"] = index;
