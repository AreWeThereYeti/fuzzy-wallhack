var mongo = require('mongodb');

var Server = mongo.Server,
  Db = mongo.Db,
  BSON = mongo.BSONPure;

var mongoUri = process.env.MONGOLAB_URI ||process.env.MONGOHQ_URL || 'mongodb://localhost/mydb';

mongo.MongoClient.connect(mongoUri, function(err, db){
  if(!err) {
    console.log("Connected to 'drinkdb' database");
    db.collection('drinks', {strict:true}, function(err, collection) {
      if (err) {
        console.log("The 'drinks' collection doesn't exist. Creating it with sample data...");
        populateDB();
      }
    });
  }

	else{
	  console.log("error connecting to mongo : " + err)
  }
});

exports.findByTeam = function(req, res) {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err){
			var team = req.params.team;
			console.log('Retrieving team: ' + team);
			db.collection('drinks', function (err, collection) {
				collection.findOne({'_id': new BSON.ObjectID(id)}, function (err, item) {
					res.send(item);
				});
			});
		}
		else{
			console.log("error in FindByTeam : " + err)
		}
	});
};

exports.findAll = function(req, res) {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err) {
			db.collection('drinks', function (err, collection) {
				collection.find().toArray(function (err, items) {
					res.send(items);
				});
			});
		}
		else{
			console.log("error in findAll : " + err);
		}
	});
};

exports.adddrink = function(req, res) {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err) {
			var drink = req.body;
			console.log('Adding drink: ' + drink);
			db.collection('drinks', function (err, collection) {
				collection.insert(drink, {safe: true}, function (err, result) {
					console.log('my result at  adddrink : ' + result);
					if (err) {
						res.send({'error': 'An error has occurred'});
					} else {
						console.log('Success at adddrink: ' + JSON.stringify(result[0]));
						res.send(result[0]);
					}
				});
			});
		}
		else{
			console.log("error in adddrink : " + err);
		}
	});
}

exports.updatedrink = function(req, res) {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err) {
			var id = req.params.id;
			var drink = req.body;
			console.log('Updating drink: ' + id);
			console.log(JSON.stringify(drink));
			db.collection('drinks', function (err, collection) {
				collection.update({'_id': new BSON.ObjectID(id)}, drink, {safe: true}, function (err, result) {
					if (err) {
						console.log('Error updating drink: ' + err);
						res.send({'error': 'An error has occurred'});
					} else {
						console.log('' + result + ' document(s) updated');
						res.send(drink);
					}
				});
			});
		}
		else{
			console.log("error in updatedrink : " + err);
		}
	});
}

exports.deletedrink = function(req, res) {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err) {
			var id = req.params.id;
			console.log('Deleting drink: ' + id);
			db.collection('drinks', function (err, collection) {
				collection.remove({'_id': new BSON.ObjectID(id)}, {safe: true}, function (err, result) {
					if (err) {
						res.send({'error': 'An error has occurred - ' + err});
					} else {
						console.log('' + result + ' document(s) deleted');
						res.send(req.body);
					}
				});
			});
		}
		else{
			console.log("error in deletedrink : " + err);
		}
	});
};

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {
	mongo.MongoClient.connect(mongoUri, function(err, db) {
		if(!err) {
			var drinks = [
				{
					name: "Coke",
					team: "Linkfire",
					quantity: "3"
				},
				{
					name: "Egekilde",
					team: "Rocket digital",
					quantity: "3"
				}
			];

			db.collection('drinks', function (err, collection) {
				collection.insert(drinks, {safe: true}, function (err, result) {
				});
			});
		}
		else{
			console.log("error in populateDB : " + err);
		}
	});
};