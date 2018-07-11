var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var person = client.Factory("personInfo");
var file = client.Factory("file");
var fs = require('fs');
var path = require("path")
var picResult;
var pictureName = path.join(__dirname, "/person.jpg")

router.patch('/', function (req, res) {
    console.log(req.body.id)
    console.log(req.body.name)
    // var id = req.query.id;
    // var username = req.body.name;
    // var phone = req.body.phone;
    // var address = req.body.address;
    // var sex = req.body.sex;
    // //var user = req.body.userId;
    // var Head= req.body.headId
    // person.save({"_id": id}, {
    //         Name: username,
    //         Tel: phone,
    //         Address: address,
    //         Sex: sex,
    //    //     User: user,
    //         Head: Head,
    //     },
    //     function (ret) {
    //         console.log(ret)
    //         return res.send(ret)
    //     }
    // )
});
router.post('/', function (req, res) {
    var username = req.body.name;
    var phone = req.body.phone;
    var address = req.body.address;
    var sex = req.body.sex;
    var user = req.body.userId;
    person.save({
        Name: username,
        Tel: phone,
        Address: address,
        Sex: sex,
        User: user,
    }, function (ret) {
        var personID = ret.id;
        if (req.body.picture !== '') {
            base64_decode( req.body.picture,file);
            file.save({
                "file": {
                    isFile: true,
                    isFileClass: true,
                    values: {filename: "avatar.png", "personInfo(uz*R*id)": personID},
                    path: file,
                }
            },function(ret,err){
                if (ret.id){
                    picResult="头像存储成功";
                }else{
                    picResult=err;
                }
            })
        }
        return res.send(ret);
    })
})



function base64_decode(base64str, file) {
    var bitmap = new Buffer(base64str.split(',')[1], 'base64');
    fs.writeFileSync(file, bitmap);
}
module.exports = router;
