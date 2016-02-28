
var express = require('express'),
    app = express();
app.listen(3001);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var rank = [];

var sortRank = function(){
  rank.sort(function (a, b) {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  rank.sort(function (a, b) {
    if (a.level > b.level) {
      return -1;
    }
    if (a.level < b.level) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });
};

app.get('/insert',function  (req,res) {
  rank.push( JSON.parse(req.query.rank) );
  sortRank();

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
