/**
 * Created by hxy on 2017/4/11.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
/* GET home page. */
router.post('/', function(req, res, next) {
    //数据库连接
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(global.dburl, function(err, db) {
        //连接到表
        var collection = db.collection('users');
        //更新数据
        var whereStr = {"username":req.body.username};
        collection.remove(whereStr, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log('删除用户');
            db.close();
            res.json({success:true});
        });
    });
});
module.exports = router;