/**
 * Created by hxy on 2017/4/13.
 */
var net = require('net');
var moment = require('moment');

//数据库连接
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect(global.dburl, function(err, db) {
    console.log("成功连接数据库");
// 创建一个TCP服务器实例，调用listen函数开始监听指定端口
// 传入net.createServer()的回调函数将作为”connection“事件的处理函数
// 在每一个“connection”事件中，该回调函数接收到的socket对象是唯一的
    net.createServer(function (sock) {
        //自动接受连接
        console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
        //数据接收处理
        sock.on('data', function (data) {
            try {
                console.log('DATA ' + sock.remoteAddress + ': ' + data);
                // 回发该数据，客户端将收到来自服务端的数据
                //sock.write('You said "' + data + '"');
                var recmsg = data.toString();
                if (recmsg.substr(0, 7) == '<PM2.5>') {
                    console.log('this is a pm2.5 package');
                    var pmdata = {
                        id: recmsg.substr(7, 8),
                        wendu: parseFloat(recmsg.substr(16, 5)),
                        shidu: parseFloat(recmsg.substr(22, 5)),
                        pm25: parseFloat(recmsg.substr(28, 5)),
                        pm10: parseFloat(recmsg.substr(34, 5)),
                        fengsu: parseFloat(recmsg.substr(40, 5)),
                        fengxiang: parseFloat(recmsg.substr(46, 5)),
                        zaosheng: parseFloat(recmsg.substr(52, 5)),
                        time: moment().format('YYYY-MM-DD,HH:mm:ss')
                    };
                    console.log(pmdata);

                    //连接到表
                    var collection = db.collection('datarecs');
                    collection.insert(pmdata, function (err, result) {
                        if (err) {
                            console.log('Error:' + err);
                            return;
                        }
                        console.log('写入成功');
                    });
                }
            }
            catch (e)
            {console.log("exception in catch:", e);}
        });
        // 为这个socket实例添加一个"close"事件处理函数
        sock.on('close', function (data) {
            console.log('CLOSED: ' +
                sock.remoteAddress + ' ' + sock.remotePort);
        });
        sock.on("error",function (err){
            console.log("Caught flash policy server socket error: ")
            console.log(err.stack)
        })
    }).listen(global.listenport, global.hostip);
    console.log('Server listening on ' + global.hostip + ':' + global.listenport);
})

