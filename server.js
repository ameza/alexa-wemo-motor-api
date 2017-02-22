
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var WeMo = require('wemo');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


router.get('/toggle', function(req, res) {

    var wemoSwitch = new WeMo('10.10.10.113', '49153');
    wemoSwitch.setBinaryState(0, function(err, result) {
        if (err) console.error(err);
        console.log(result); // 1

        wemoSwitch.setBinaryState(1, function(err, result) { // switch on
            if (err) console.error(err);
            console.log(result); // 1
            setTimeout(function() {
                wemoSwitch.setBinaryState(0, function(err, result) { // switch on
                    if (err) console.error(err);

                    wemoSwitch.getBinaryState(function(err, result) {
                        if (err) console.error(err);
                        console.log(result); // 1

                    });
                });

            }, 6000);

        });

    });

    res.json({ message: 'hooray! welcome to our api!' });
});

app.use('/courtains', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

