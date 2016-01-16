var express = require('express')
var Deal = require('../models/owner');

var router = express.Router();
module.exports = router;

//GET ALL PREVIOUS DEALS
//this will grab all of the deals from the database which haven't yet expired
//and send them along with a 200 response
router.get('/', function (req, res) {
	Owner.prevDeals()
		.then(function(result){
			res.send(result);
			res.sendStatus(200);
		})
})

//POST OWNER LOG IN
//this will take the inputed username and password and compare the username to the database
//if found, it will compare the passwords and if they match it will send a 200 response
router.post('/', function (req, res) {
	Owner.signin(req.body).then(function () {
		res.sendStatus(201)
	})
})