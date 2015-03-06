var express = require('express');
var app = express();
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var routes = require('./routes/');
app.use('/', routes);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  //res.send('Hello Mr. Anderson!')
  var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
  res.render( 'index', {title: 'Hall of Fame', people: people} );
})

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

swig.setDefaults({ cache: false });

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('app listening at http://%s:%s', host, port)

})
