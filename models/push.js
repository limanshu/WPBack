var Resource = require("APICloud").Resource;
var JPush = require("jpush-async").JPushAsync;
var settings = require('../settings');
var client = JPush.buildClient('a7ec8418c648367f8525dc4c', '39836ca8f1144db2d1d93065')
function push() {

}
push.send=function (q, callback) {
    
    if (q.sendType=='isAll') {
        client.push().setPlatform(JPush.ALL)
            .setAudience(JPush.ALL)
            .setNotification('Hi, JPush', JPush.android('群发消息', 'happy', 5))
            .send()
            .then(function(ret) {
                callback(null, ret);
            }).catch(function(err) {
            callback(err, null);
        })
    }else if (q.sendType=='isOne'){
        client.push().setPlatform('ios', 'android')
            .setAudience(JPush.alias(q.userId))
            .setNotification('Hi, JPush', JPush.ios('耗材使用报警'), JPush.android('耗材使用报警', null, 1))
            .setMessage('msg content')
            .setOptions(null, 60)
             .send()
            .then(function(ret) {
                callback(null, ret);
            }).catch(function(err) {
            callback(err, null);
        });
    }

}



module.exports = push;