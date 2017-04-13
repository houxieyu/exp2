/**
 * Created by hxy on 2017/4/7.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.user = null;
    res.redirect('/login');
});

module.exports = router;
