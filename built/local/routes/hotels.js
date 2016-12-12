"use strict";
var express_1 = require("express");
var db = require("../models/hotel");
var config = require("../config/common");
var index = express_1.Router();
/* GET home page. */
index.get('/', function (req, res, next) {
    var mock = req.app.get('args')[0] === 'mock' ? true : false;
    if (mock) {
        console.log('the db is mocked up!!');
        return res.send(config.db.dbmock ? config.db.dbmock : []);
    }
    db.listHotels(function (error, hotels) {
        if (error)
            return res.send(config.db.dbmock ? config.db.dbmock : []);
        var output = [];
        hotels.forEach(function (element) {
            output.push({ name: element.name, stars: element.stars, price: element.price });
        });
        res.send(output);
    });
});
exports.__esModule = true;
exports["default"] = index;
