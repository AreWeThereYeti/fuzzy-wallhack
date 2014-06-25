var jwt = require('jsonwebtoken');

var secret = 'only-for-rocketeers';



exports.validateDevice = function(req, res) {

    var device = req.body;
    console.log('Validating device authorization for post req: ' + JSON.stringify(device));

    if (device.authorization) {

      if (device.authorization == 'rocketFuelConsole') {
        console.log('Device authorized');

        // generate token here
        var token = jwt.sign(device, secret, {expiresInMinutes: 900000000});
        console.log('generating token: ' + JSON.stringify(token));

        res.json({ token: token });

      } else {
        res.send({'error': 'Device Not Valid. Wrong Authorization Value.'});
      }

    } else {

      res.send({'error': 'authorization not included in request.'});
    }


};
