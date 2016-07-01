var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/grid', function(req, res, next){
	res.render('grid', {title: 'Flex Grid'});
});

module.exports = router;
