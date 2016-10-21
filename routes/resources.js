var express = require('express');
var Resource = require('../models/resourceModel');
var Metadata = require('../models/metadataModel');
var _ = require('underscore');
var router = express.Router();

router.get('/allResources', function(req, res){
	Resource.find({}, null, {sort: {name: -1}}).exec(function (err, resources){
		if (err){
			console.log("Error: ", err);
		} else {
			Metadata.find({}, null, {sort: {name: -1}}).exec(function (err, metadata){
				if (err){
					console.log("Error: ", err);
				} else {
					var metadataFinal = {}
					for (var i=0; i<metadata.length; i++) {
						metadataFinal[metadata[i]['metadataType']] = metadata[i]['metadataList'];
					}
					console.log(metadataFinal);			
					res.json({
						metadata: metadataFinal,
						resources: resources
					});
				}
			});
		}
	});
});

router.post('/postResource', function(req, res){
	var newResource = new Resource({name: req.body.name,
		link: req.body.link,
		level: req.body.level,
		type: req.body['type'],
		subject: req.body.subject,
		tags: req.body['tags'],
		description: req.body.description
	});

	newResource.save(function(err, resource){
		if (err) {
			console.log("Error: ", err);
		} else {
			console.log("Resource created");
			Metadata.find({}).exec(function (err, metadata){
				if (err){
					console.log("Error: ", err);
				} else {
					if (!metadata.length) {
						var newMetadataType = new Metadata({
							metadataType: "type",
							metadataList: req.body['type']
						});

						var newMetadataLevel = new Metadata({
							metadataType: "level",
							metadataList: [req.body.level]
						});

						var newMetadataSubject = new Metadata({
							metadataType: "subject",
							metadataList: [req.body.subject]
						});

						Metadata.create([newMetadataType, newMetadataLevel, newMetadataSubject], function (err, type, level, subject) {
						    if (err) {
									console.log("Error: ", err);
								} else {
									res.send({
										message: "Resource created"
									});
								}
						});
			    } else {
						var listTypes = req.body['type'];
						Metadata.update({ "metadataType": "level" },{ "$addToSet": { "metadataList": req.body.level}},function(err, level) {
							if (err) {
								console.log("Error: " + err);
							} else {
								Metadata.update({ "metadataType": "subject" },{ "$addToSet": { "metadataList": req.body.subject}},function(err, subject) {
									if (err) {
										console.log("Error: " + err);
									} else {
										listTypes.forEach(function(elem, i) {
											Metadata.update({ "metadataType": "type" },{ "$addToSet": { "metadataList": elem}},function(err, list) {
												if (err) console.log("Error: " + err);
												if (i == listTypes.length-1) {
													Metadata.find({}, null, {sort: {name: -1}}).exec(function (err, metadata){
														if (err){
															console.log("Error: ", err);
														} else {
															var metadataFinal = {}
															for (var i=0; i<metadata.length; i++) {
																metadataFinal[metadata[i]['metadataType']] = metadata[i]['metadataList'];
															}
															console.log(metadataFinal);
															res.json({
																metadata: metadataFinal,
																resources: resources
															});
														}
													});
												}
											});
										});
									}
								});
							}
						});
					};
				}
			});
		}
	})

});

module.exports = router;
