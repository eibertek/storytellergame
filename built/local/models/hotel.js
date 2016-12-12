"use strict";
var mongodb = require("mongodb");
var config = require("../config/common");
var server = new mongodb.Server(config.db.server, config.db.port, { auto_reconnect: true });
var db = new mongodb.Db(config.db.dbName, server, { w: 1 });
db.open(function (err, stat) { });
function addHotel(data, callback) {
    db.collection('hotels').insertOne(data, function (error, result) {
        if (error)
            return callback(error);
        return callback(result);
    });
}
exports.addHotel = addHotel;
function removeHotel(name, callback) {
    db.collection('hotels').deleteOne({ "name": name }, function (error, result) {
        console.log('DELETE::::::: ', error, result ? result.result : null);
        if (error)
            return callback(error);
        return callback(result);
    });
}
exports.removeHotel = removeHotel;
function listHotels(callback) {
    db.collection('hotels', function (error, hotels) {
        hotels.find({}).toArray(function (error, result) {
            if (error)
                console.log(error);
            callback(error, result);
        });
    });
}
exports.listHotels = listHotels;
function getHotelByName(name, callback) { }
exports.getHotelByName = getHotelByName;
function getHotelByPrice(price, callback) { }
exports.getHotelByPrice = getHotelByPrice;
function getHotelByStars(stars, callback) { }
exports.getHotelByStars = getHotelByStars;
function modifyHotel(id, newData, callback) { }
exports.modifyHotel = modifyHotel;
