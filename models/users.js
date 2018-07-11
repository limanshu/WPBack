var db = require('./mongodb');

function User(user) {

    this.name = user.name;

    this.password = user.password;

    this.email = user.email;

};

module.exports = User;

//存储用户信息


User.prototype.save = function(callback) {

//要存入数据库的用户文档

    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };

//添加操作
    var userModel = new db.Users(user);
    userModel.save(function(err,user){
        if(err){
            console.err(err);
            return callback(err);//错误，返回 err 信息
        }
        console.log("sucess:"+user[0]);
        callback(null, user[0]);//成功！err 为 null，并返回存储后的用户文档
    });
};
//读取用户信息
User.get = function(name, callback) {
    if (name){
        db.Users.findOne({"name":name},
            function(err,user){
                if(err) {
                    console.err(err);
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, user);//成功！返回查询的用户信息
            });
    }else{
        db.Users.find(null,
            function(err,users){
                if(err) {
                    console.err(err);
                    return callback(err);//失败！返回 err 信息
                }
                callback(null, users);//成功！返回查询的用户信息
            });
    }
};
