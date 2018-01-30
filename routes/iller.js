var express = require('express'); // require Express
var router = express.Router(); // setup usage of the Express router engine
const { Client } = require('pg');

// Setup connection
var conString = "postgres://saricicek:saricicek@localhost/ab2018"; // Your Database Connection

// Set up your database query to display GeoJSON
var il_geojson_query = "SELECT row_to_json(fc) FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(lg.geom)::json As geometry, row_to_json((gid, iladi)) As properties FROM tr_iller As lg limit 5) As f) As fc";
var il_query = "select gid, iladi, st_asgeojson(geom) from tr_iller limit 5";

/* GET home page. */
router.get('/geojson', function (req, res, next) {
    var client = new Client(conString);
    client.connect()
    
    client.query(il_geojson_query, (err, result) => {
        client.end();
      if(!err){
        res.json(result.rows[0].row_to_json);
      }else{
        next(new res.BadRequest());
      }      
    });
});
router.get('/json', function (req, res, next) {
    var client = new Client(conString);
    client.connect()
    
    client.query(il_query, (err, result) => {
        client.end();
      if(!err){
        res.json(result.rows);
      }else{
        next(new res.BadRequest());
      }      
    });
});

module.exports = router;