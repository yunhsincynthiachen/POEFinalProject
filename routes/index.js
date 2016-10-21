var express = require('express');
var router = express.Router();

//returns the home page handlebars template, index.hbs
router.get('/', function(req, res, next) {
	// console.log(req.params.id);
	res.render('index', {});
});

router.get('/:id', function(req, res, next) {
	console.log(req.params.id);
	res.render('index', {});
});

module.exports = router;
