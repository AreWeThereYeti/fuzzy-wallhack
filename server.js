var express = require('express'),
  drink = require('./routes/drinks');

var app = express();

app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
});

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findById);
app.post('/drinks', drink.adddrink);
app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');