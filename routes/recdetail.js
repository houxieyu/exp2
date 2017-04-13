var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    //数据库连接
    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect(global.dburl, function(err, db) {
        //连接到表
        var collection = db.collection('datarecs');
        var total = collection.find({id:req.query['id']}).count();
        collection.find({id:req.query['id']}).sort({time:-1}).toArray(function(err, result) {
            res.render('recdetail', { title: '数据表格',total:total,rows:result,id:req.query['id'] });
            db.close();
        });
    });

});

module.exports = router;
