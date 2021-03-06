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
        var collection = db.collection('devices');
        var dev = {
            devid: req.body.devid,
            devmodel:req.body.devmodel,
            devaddress: req.body.devaddress,
            ownername:req.body.ownername,
            projectname: req.body.projectname,
            createtime:moment().format('YYYY-MM-DD,HH:mm:ss')
        }
        collection.insert(dev, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log('新增设备');
            db.close();
            res.json({success:true});
        });
    });
});
module.exports = router;