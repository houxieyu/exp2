/**
 * Created by hxy on 2017/4/13.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    req.session.user = req.query.username;
    res.redirect('/index');
});

module.exports = router;
