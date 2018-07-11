//LMS
// 每个路由前面加上：/get/ 或 /post/ 的目的，
//主要是为了做跨域处理时写路由正则更方便处理，
//同时也是为了更加高效及安全性上考虑，可以不要此前缀，这个不是必须的。

var crypto = require('crypto'), Post = require('../models/posts.js');
settings = require('../settings');
var User = require('../models/User_BackStage');
var WaterpurifierStorage = require('../models/WaterpurifierStorage');
var WaterpurifierBrand = require('../models/WaterpurifierBrand');
var Orders = require('../models/Orders');
var workers = require('../models/workers');
var WaterPurifierStatus = require('../models/WaterPurifierStatus');
// var debug = require('debug')('node-blog:Server_Console');
var push = require('../models/push');
module.exports = function (app) {
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', settings.client);
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
        res.setHeader("Access-Control-Max-Age", "3600");
        res.setHeader("Access-Control-Allow-Credentials", "true"); //是否支持cookie跨域
        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');
        next();

    });
//跨域预检查所有的get请求
    app.all('/get/*', function (req, res, next) {

        res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,OPTIONS');

        if (req.method == 'OPTIONS') {

            res.sendStatus(200);

        } else {

            console.log(req.method);

            next();

        }

    });

    //跨域预检查所有的post请求

    app.all('/post/*', function (req, res, next) {

        res.header('Access-Control-Allow-Methods', 'POST,OPTIONS');

        if (req.method == 'OPTIONS') {

            res.sendStatus(200);

        } else {

            console.log(req.method);

            next();

        }

    });


    /*

     说明：本接口用于获取博客列表的信息的。http://localhost:3000/get/post?name=zzz

     1.get/:说明是get请求

     2.如果传递了name参数，则说明是：请求某一个人的博文。如：http://localhost:3000/get/post?name=zzz

     3.如果没传递name参数，则说明是请求所有人的博文列表，显示在首页

     */
    app.get('/get/post', function (req, res) {
        //    res.send('本接口用于获取水机列表的信息的!');
        var username = null;
        if (req.query.name != null) {
            username = req.query.name;
        } else if (req.session.user != null) {
            username = req.session.user;
        }
        //即如果传递过来的参数有isAll,则代表查询所有，如：http://localhost:8800/get/post?isAll=1
        if (req.query.isAll) {
            username = null;
        }
        Post.get(username, function (err, posts) {
            if (err) {
                posts = [];
            }
            res.send(posts);
        });
    });
    /*

     说明：本接口用于获取用户信息的。http://localhost:3000/get/user?name=zzz

     1.get:说明是get请求

     2.如果传递了name参数，则说明是：请求某个用户的信息。如：http://localhost:3000/get/user?name=admin

     3.如果没传递name参数，则说明是请求所有用户的信息

     */
    app.get('/get/user', function (req, res) {
        // res.send('本接口用于获取用户信息的!');
        var username = null;
        if (req.query.name != null) {
            username = req.query.name;
        }
        User.get(username, function (err, users) {
            if (err) {
                users = [];
            }
            res.send(users);
        });
    });
    app.get('/get/WaterpurifierStorage', function (req, res) {
        //    res.send('本接口用于获取水机库存列表的信息的!');
        WaterpurifierStorage.getAll(function (err, ret) {
            if (err) {
                ret = [];
            }
            res.send(ret);
        });
    });
    app.get('/get/WaterpurifierBrand', function (req, res) {
        //    res.send('本接口用于获取水机品牌列表的信息的!');
        WaterpurifierBrand.getAll(function (err, brand) {
            if (err) {
                brand = [];
            }
            res.send(brand);
        });
    });
    app.get('/get/othersByBrandRelaion', function (req, res) {
        console.log(req.query)
        var brandID = req.query.brandID;
        var relaion = req.query.relaion;

        WaterpurifierBrand.getOtherByBandRelation(brandID, relaion, function (err, othersByRelaion) {
                if (err) {
                    othersByRelaion = null;
                }
                res.send(othersByRelaion);
            }
        );
    });
    app.get('/get/Orders', function (req, res) {

        if (req.query.isAll == 'true') {

            Orders.getAll(req.query.orderStatusNameList, function (err, ret) {
                if (err) {
                    res.send(err);
                }
                res.send(ret);
            })
        }
        else {

            Orders.getOne(req.query.id, function (err, ret) {
                if (err) {
                    res.send(err);
                }
                res.send(ret);
            })
        }

    });
    app.post('/post/Orders', function (req, res) {
        console.log('提交订单')
        if (req.body.id !== 0) {
            console.log("进入更新")
            Orders.update(req.body, function (err, ret) {
                    if (err) {
                        res.send(err);
                    }
                    res.send(ret);
                }
            )
        } else {
            console.log("进入新建")
            Orders.add(req.body, function (err, ret) {
                if (err) {
                    res.send(err);
                }
                res.send(ret);
            })
        }

    })
    // app.get('/get/workers', function (req, res) {
    //     workers.getAll(req.query, function (err, ret) {
    //         if (err) {
    //             res.send(err);
    //         }
    //         res.send(ret);
    //     })
    // })
    app.get('/get/WaterPurifierStatus', function (req, res) {
        WaterPurifierStatus.getAll(req.query, function (err, ret) {
            if (err) {
                res.send(err);
            }
            res.send(ret);
        })
    })
    app.post('/post/workers', function (req, res) {
        console.log(req.body.id)
        if (req.body.id !== 0) {
            console.log("进入更新")
            workers.update(req.body, function (err, ret) {
                if (err) {
                    res.send(err);
                }
                res.send(ret);
            })
        } else {
            console.log("进入新建")
            workers.add(req.body, function (err, ret) {
                if (err) {
                    res.send(err);
                }
                res.send(ret);
            })
        }

    })
    app.post('/post/android', function (req, res) {
        console.log(req.body)
        push.send(req.body, function (err, ret) {
            if (err) {
                res.send(err);
            }
            res.send(ret);
        });
        // if (req.body.id!==0) {
        //     console.log("进入更新")
        //     workers.update(req.body,function (err,ret) {
        //         if (err) {
        //             res.send(err);
        //         }
        //         res.send(ret);            })
        // }else
        // {
        //     console.log("进入新建")
        //     workers.add(req.body, function (err, ret) {
        //         if (err) {
        //             res.send(err);
        //         }
        //         res.send(ret);
        //     })
        // }
    })
    /*
 说明：本接口用于提交注册用户信息的。http://localhost:8800/post/reg

 1.post/:说明是post请求

 2.注册未成功，返回Json格式如下：{status:'failed',message:"xxxxxx!"}

 3.注册成功，返回Json格式如下：{status:'success',message:"注册成功!",user:user}

 */

    app.post('/post/reg', function (req, res) {
        var newUser = new User({
            username: req.body.userName,
            password: req.body.password,
            email: req.body.email
        });
        User.save(newUser, function (ret, err) {
            if (err) {
                res.send({status: 'error', message: err.message});
                return;
            }
            res.send({status: 'success', message: "注册成功!", user: ret});
        });
    });
    // app.post('/post/login', function (req, res) {
    //     var userLoginModel = {
    //         username: req.body.userName,
    //         password: req.body.password,
    //     };
    //     User.login(userLoginModel, function (err, user) {
    //         if (err) {
    //             res.send({status: 'error', message: err});
    //             return;
    //         }
    //         req.session.user = user;
    //         res.send({status: 'success', message: "登陆成功!", user: user});
    //     })
    //
    // });
    /*

       说明：本接口用于接收提交用户的编写的博文的。http://localhost:3000/post/post

       1.post/:说明是post请求

       2.提交未成功，返回Json格式如下：{status:'failed',message:"出错了，原因如下："+err}

       3.提交成功，返回Json格式如下：{status:'successed',message:"保存成功！"}

       */

    app.post('/post/post', function (req, res) {

        var currentUser = req.session.user,
            post = new Post(currentUser.username, req.body.title, req.body.post);

        post.save(function (err) {
            if (err) {
                res.send({status: 'failed', message: "出错了，原因如下：" + err});
            } else {
                res.send({status: 'successed', message: "保存成功！"});
            }
        });
    });

    /*
     说明：本接口用于用户注销。http://localhost:3000/get/logout
     1.get/:说明是get请求
     2.注销用户，即清除服务端的Session
     */
    //
    // app.get('/get/logout', function (req, res) {
    //     //       res.send('本接口用于用户注销的!');
    //     try {
    //
    //         req.session.user = null;
    //
    //         req.session.destroy();  //销毁服务端Session
    //
    //         res.send({status: 'successed', message: "登出成功！"});
    //
    //     } catch (err) {
    //
    //         res.send({status: 'failed', message: "出错了，原因如下：" + err});
    //
    //     }
    //
    // });
    /*

    说明：本接口用于提供给前台，用于判断用户是否已经登录成功了。http://localhost:8800/get/checklogin

    1.get/:说明是get请求

    2.原理是检查服务端的session.user是否存在（登录成功时保存的）

    3.返回true:代表用户已登录

    4.返回false,代表用户未登录
    */
    app.get('/get/checklogin', function (req, res) {
        //   console.log(req.session);
        if (req.session.user) {
            res.send({status: 'successed', message: "已经登录！", userName: req.session.user.username});
        } else {
            res.send({status: 'failed', message: "没有登录！", userName: null});
        }
    });

//    app.use('/workers',require('./workers'))
    // app.use('/users')
    app.use('/login', require('./login'));
    app.use('/logout', require('./logout'));
    app.use('/register', require('./register'));
    app.use('/personInfo', require('./personInfo'));
    app.use('/workers', require('./workers'));
    app.use('/orders', require('./orders'))
    app.use('/status', require('./status'))
    app.use('/OrderStatus', require('./orderStatus'))
    app.use('/WorkerOrder', require('./workerOrder'))
    app.use('/appPerson', require('./appPerson'))
    app.use('/pcUser', require('./pcUser'))
    app.use('/upload', require('./upload'))
    app.use('/store', require('./store'))
};

