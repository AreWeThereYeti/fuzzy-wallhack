var express = require('express'),
    drink = require('./routes/drinks'),
		jwt = require('express-jwt'),
		app = express();


app.configure(function () {
  app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
  app.use(express.bodyParser());
});


//https://www.npmjs.org/package/express-jwt

app.get('/protected',
		jwt({secret: 'shhhhhhared-secret'}),
		function(req, res) {
			if (!req.user.admin){
				return res.send(401, {err: 'No Authorization header was found! Og din mor'})
			}
			else{
				res.send(200);
			}
		});

app.get('/drinks', drink.findAll);
app.get('/drinks/:id', drink.findByTeam);

app.post('/drinks', drink.adddrink);

app.put('/drinks/:id', drink.updatedrink);
app.delete('/drinks/:id', drink.deletedrink);

app.listen(process.env.PORT || 3000);
console.log('Listening on port 3000...');