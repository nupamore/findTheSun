
var express = require('express'),
    app = express();
app.listen(3001);

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use('/', express.static('./'));


var rank = [
  { player: '실버제로', level:5, time: 215120 },
  { player: 'silverzero', level:4, time: 132580 },
  { player: 'pinch', level:4, time: 140720 },
  { player: '제작자', level:4, time: 198350 },
  { player: '제작자', level:3, time: 96870 },
  { player: 'pinch', level:3, time: 77350 },
  { player: 'silverzero', level:3, time: 74020 },
  { player: '윳키!', level:3, time: 136190 },
  { player: '아이도루야메루!', level:3, time: 80610 },
  { player: '카에데P', level:3, time: 95440 },
  { player: '시마뭉뭉', level:3, time: 128910 },
];

var sortRank = function(){
  rank.sort(function (a, b) {
    if (a.level < b.level) {
      return 1;
    }
    if (a.level == b.level) {
      if (a.time > b.time) {
        return 1;
      }
      if (a.time < b.time) {
        return -1;
      }
    }
    if (a.level > b.level) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
};
sortRank();

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
