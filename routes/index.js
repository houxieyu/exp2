var express = require('express');
var router = express.Router();
var moment = require('moment');
moment.locale('en', {
    relativeTime : {
        future: "%s 后",
        past:   "%s 前",
        s:  "%d 秒",
        m:  "一分钟",
        mm: "%d 分钟",
        h:  "一小时",
        hh: "%d 小时",
        d:  "小时",
        dd: "%d 天",
        M:  "一个月",
        MM: "%d 个月",
        y:  "一年",
        yy: "%d 年"
    }
});
/* GET home page. */
router.get('/', function(req, res, next) {

    //数据库连接
    var MongoClient = require('mongodb').MongoClient;
    var DB_CONN_STR = 'mongodb://localhost:27017/pm25'; //# 数据库为 runoob
    MongoClient.connect(DB_CONN_STR, function(err, db) {
        //连接到表
        var collection = db.collection('datarecs');
        //collection.find().sort({time:-1}).aggregate([{
        collection.aggregate([
            {
                $sort : { time : -1 }
            },
            {
                $group : {
                    _id:"$id",
                    reccount:{$sum:1},
                    wendu:{$first:"$wendu"},
                    shidu:{$first:"$shidu"},
                    pm25:{$first:"$pm25"},
                    pm10:{$first:"$pm10"},
                    fengsu:{$first:"$fengsu"},
                    fengxiang:{$first:"$fengxiang"},
                    zaosheng:{$first:"$zaosheng"},
                    time:{$first:"$time"}
                }
            },
            {
                $lookup:
                {
                    from: "devices",
                    localField: "_id",
                    foreignField: "devid",
                    as: "devinfo"
                }
            }
        ]).toArray(function(err, result) {
            result.forEach(function(value,index){
                value.fromnow = moment(value.time).fromNow();
                value.owner =(value.devinfo[0]? value.devinfo[0].ownername:'' );
            });
            res.render('index', { title: '数据统计',datas:result });
            db.close();
        });
    });

});

module.exports = router;
