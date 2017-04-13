/**
 * Created by hxy on 2017/4/7.
 */
var dgram = require('dgram');
var moment = require('moment');
var serverSocket = dgram.createSocket('udp4');

//    err - Error object, https://nodejs.org/api/errors.html
serverSocket.on('error', function(err){
    console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

serverSocket.on('listening', function(){
    console.log("echo server is listening on port "+global.listenport+".");
})

serverSocket.bind(global.listenport);

//数据库连接
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(global.dburl, function(err, db) {
    console.log("成功连接数据库");
    //创建udp监听服务
    serverSocket.on('message', function(msg, rinfo){
    var recmsg = msg.toString();
    if(recmsg.substr(0,7)=='<PM2.5>')
    {
        console.log('this is a pm2.5 package');
        var pmdata = {
            id:recmsg.substr(7,8),
            wendu:parseFloat(recmsg.substr(16,5)),
            shidu:parseFloat(recmsg.substr(22,5)),
            pm25:parseFloat(recmsg.substr(28,5)),
            pm10:parseFloat(recmsg.substr(34,5)),
            fengsu:parseFloat(recmsg.substr(40,5)),
            fengxiang:parseFloat(recmsg.substr(46,5)),
            zaosheng:parseFloat(recmsg.substr(52,5)),
            time:moment().format('YYYY-MM-DD,HH:mm:ss')
        };
        console.log(pmdata);

        //连接到表
        var collection = db.collection('datarecs');
        collection.insert(pmdata, function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log('写入成功');
        });
     }});
//    console.log('recv %s(%d bytes) from client %s:%d\n', msg, msg.length, rinfo.address, rinfo.port);
    //echo to client
//    serverSocket.send(msg, 0, msg.length, rinfo.port, rinfo.address);
});

