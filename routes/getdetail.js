/**
 * Created by hxy on 2017/4/12.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //数据库连接
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/pm25'; //# 数据库为 runoob
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        //连接到表
        var collection = db.collection('datarecs');
        var total = collection.find({id:req.query.id}).count();
        collection.find({id:req.query.id}).sort({time:-1}).limit(NUMBER).limit(NUMBER).toArray(function(err, result) {
            res.json({total:total,rows:result,id:req.query.id });
            db.close();
        });
    });

});

module.exports = router;
