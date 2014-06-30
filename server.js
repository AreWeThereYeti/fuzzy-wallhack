var express = require('express'),

    expressJwt = require('express-jwt'),
    drink = require('./routes/drinks'),
    auth = require('./routes/auth');

var secret = 'only-for-rocketeers';

var app = express();

app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */

  // protects the "/drinks" route
  app.use('/drinks', expressJwt({secret: secret}));

  app.use(express.bodyParser());
});

app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);

  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Origin', '*'); // or req.headers.origin
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');
  res.set('Access-Control-Max-Age', '3600');
  next();
});

app.post('/auth', auth.validateDevice);

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findByTeam);

app.post('/drinks', drink.adddrink);

app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');