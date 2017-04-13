/**
 * Created by hxy on 2017/4/11.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //数据库连接
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(global.dburl, function(err, db) {
        //连接到表
        var collection = db.collection('devices');
        collection.find().toArray(function(err, result) {
            res.json(result);
        });
        db.close();
    });
});
module.exports = router;