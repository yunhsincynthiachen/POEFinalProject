var express = require('express');
var Resource = require('../models/resourceModel');
var Metadata = require('../models/metadataModel');
var router = express.Router();

router.get('/', function(req, res){
	Metadata.find({}, null, {sort: {name: -1}}).exec(function (err, metadata){
		if (err){
			console.log("Error: ", err);
		} else {
			res.json(metadata);
		}
	});
});

module.exports = router;
