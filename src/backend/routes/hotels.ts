import {Router as router} from 'express';
import * as express from 'express';
import * as db from "../models/hotel";
import * as config from '../config/common';

const index: any = router();

/* GET home page. */
index.get('/', function(req: express.Request, res: express.Response, next) {
  let mock = req.app.get('args')[0] === 'mock' ? true: false; 
  if(mock){
      console.log('the db is mocked up!!');
      return res.send(config.db.dbmock ? config.db.dbmock : []);
  }  
  db.listHotels((error, hotels) => {
    if(error) return res.send(config.db.dbmock ? config.db.dbmock : []);
    let output = [];
    hotels.forEach(element => {
      output.push({name:element.name, stars: element.stars, price: element.price});
    });
    res.send(output);
  });
});

export default index;