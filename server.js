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


app.post('/auth', auth.validateDevice);

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findByTeam);

app.post('/drinks', drink.adddrink);

app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');