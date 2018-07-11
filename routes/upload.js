var settings = require('../settings');
var fs = require('fs');
var express = require('express');
var multer = require('multer');
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var router = express.Router();
var upload = multer({dest: 'upload_tmp/'});
var file = client.Factory("file");
router.post('/', upload.any(), function (req, res, next) {
    var des_file = "./upload/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log('存储失败'+err);
            } else {
                file.save({
                    "file": {
                        isFile: true,
                        isFileClass: true,
                        values:{filename: req.files[0].originalname},
                        path: des_file
                    }
                }, function (ret, err) {
                    if (ret) {
                        response = {
                            message: '头像上传成功',
                            id: ret.id,
                            url:ret.url,
                            name:ret.name,
                        };
                    } else {
                        response = {
                            message: '头像上传失败',
                            err: err.code
                        };
                    }
                    res.send(JSON.stringify(response));
                })
            }
        });
    });
});

module.exports = router;