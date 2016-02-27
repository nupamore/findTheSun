
var express = require('express'),
    app = express();
app.listen(3001);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var rank = [];
rank.push({
  player:'우즈키',
  level: '4',
  death: 100,
  time: 3600000
});

app.get('/insert',function  (req,res) {
  rank.push( JSON.parse(req.query.rank) );
  res.type('application/json');
  res.jsonp( rank );
  console.log(rank);
});
app.get('/view',function  (req,res) {
  res.type('application/json');
  res.jsonp( rank );
  console.log(rank);
});

console.log( 'server start' );
