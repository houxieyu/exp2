/**
 * Created by hxy on 2017/4/11.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('users',{title:'用户管理'});
});

module.exports = router;