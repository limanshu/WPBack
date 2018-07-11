var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
var User_BackStage = client.Factory("user");

//

function User(user) {
    this.userType = user.userType;//类中变量
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;//类中变量
    this.id = user.id;
    this.username = user.username;//类中变量
    this.password = user.password;
    this.mobile = user.mobile;
    this.email = user.email;//类中变量
    this.emailVerified = user.emailVerified;
    this.verificationToken = user.verificationToken;//类中变量
    this.credentials = user.credentials;
    this.challenges = user.challenges;//类中变量
    this.status = user.status;
};
User.login = function (loginUserModel, cb) {

    console.log(loginUserModel.username)
    User_BackStage.login({
        "username": loginUserModel.username,
        "password": loginUserModel.password
    }, function (ret, err) {
        if (ret.userId) {
            // client.setHeaders("authorization", ret.id)
            // User_BackStage.get({"_id": ret.userId}, function (ret, err) {
            //     if (ret.error) {
            //         return cb("获取用户失败！", null);//失败！返回 err 信息
            //     }
            //     cb(null, ret);//成功！返回查询的用户信息
            // })
            cb(null, ret);//成功！返回查询的用户信息
        } else {
            return cb("登陆失败！", null);//失败！返回 err 信息
        }
    })
};
//读取用户信息by Name
User.get = function (name, callback) {

    if (name) {
            User_BackStage.findOne({"username": name},
            function (err, user) {
                if (err) {
                    console.log(err)
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, user);//成功！返回查询的用户信息
            });
    }
};
User.save = function (User,callback) {
    User_BackStage.save(User, function (ret) {
        if ((ret).error) {
            return callback(null,(ret).error);//失败！返回 err 信息
        }
        callback(ret, null)//成功
    })
}
module.exports = User;




