/**
 * Created by hxy on 2017/4/11.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('device',{title:'设备管理'});
});

module.exports = router;