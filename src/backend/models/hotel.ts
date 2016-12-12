import mongodb = require('mongodb');
import * as config from '../config/common';

var server = new mongodb.Server(config.db.server, config.db.port, {auto_reconnect: true});
var db = new mongodb.Db(config.db.dbName, server, { w: 1 });
db.open((err, stat) => { });
        
export interface Hotel  {
    _id: string;
    name: string;
    price: number;
    stars: number;
}

export function addHotel(data: Object, callback: (hotel: any) => void ){
    db.collection('hotels').insertOne(data, (error, result) => {
       if(error) return callback(error);
        return callback(result);
    });
}

export function removeHotel( name: string, callback: (string) => void ){
    db.collection('hotels').deleteOne({"name": name}, (error, result) =>{
       console.log('DELETE::::::: ', error,  result ? result.result : null);
       if(error) return callback(error);
        return callback(result);
    });    
}

export function listHotels(callback: (error: any, hotels: any) => void ){
    db.collection('hotels', (error, hotels) => {
       hotels.find({}).toArray((error, result)=>{
        if(error) console.log(error);   
        callback(error, result);
       }) 
    });
}

export function getHotelByName(name: string, callback: (string) => void ){}

export function getHotelByPrice(price: number, callback: (string) => void ){}

export function getHotelByStars(stars: number, callback: (string) => void ){}

export function modifyHotel(id: string, newData: JSON, callback: (string) => void ){}