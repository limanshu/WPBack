var Resource = require("APICloud").Resource;
var settings = require('../settings');
var client = new Resource(settings.appId, settings.appKey);
// var WaterpurifierStorage_BackStage = client.Factory("WaterpurifierStorage");
var async = require("async");
var t = client.Factory("workers");
var m = client.Factory("test");
var Status = client.Factory("WaterpurifierStatus")
var path = require("path")
var fs = require('fs');
var Order = client.Factory("WaterpurifierOrder")
var file = client.Factory("file")
file.save({
    "file": {
        isFile: true,
        isFileClass: true,
        values: {filename: "avatar.png"},
        path: 'D:\\YG\\2.png'
    }
},function(ret,err){
    if (ret.id){

    }else{
      //  picResult=err;
    }
})

// var arry1 =[0,1,2,3]
//  console.log(arry1.indexOf(1))
// Status.save({"_id": "5adef6b18466ca6d07b2c991", "_relation": "Repair"}, {
//     "repairContent": "漏电","worker":"5ad9beb0a472b3572af34db6"
// }, function (ret, err) {
//     console.log("Model insert:" + JSON.stringify(ret))
//     console.log("Model insert:" + JSON.stringify(err))
// })

// Status.save({"_id": "5adef6b18466ca6d07b2c991", "_relation": "AnnualFee"}, {
//     "machineId": "5adef6b18466ca6d07b2c991"
// }, function (ret, err) {
//     console.log("Model insert:" + JSON.stringify(ret))
//     console.log("Model insert:" + JSON.stringify(err))
// })
// t.get({"id":result.id,"relation":"test"}, function (ret,err) {
//             console.log("Model count:"+JSON.stringify(ret))
//             console.log("Model count:"+JSON.stringify(err))
//         });
// Status.get( {"_id": "5adef6b18466ca6d07b2c991", "_relation": "Repair"}, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })
// Status.query({
//     filter: {
//         include: ["Repair", "AnnualFee","StatusPointer","OrderPointer"],
//         includefilter:{"AnnualFee":{"order": "endUseTime DESC", "limit":1,"fields":["id"]}}
//     }
// }, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })
// Status.query({
//     filter: {
//         include: ["WPBrandPointer", "StatusPointer", "Repair", "UserPointer", "AnnualFee","OrderPointer"],
//         // "fields":{"id":false,"createdAt": false,"updateAt":false},
//         includefilter: {
//             "MachineStatus": { "where":{"inq": [1,2]},"fields": {"createdAt":false,"updateAt":false}},
//             "Repair": {"order": "createdAt DESC", "fields": ["repairContent"]},
//             "WaterpurifierBrand": {"fields": {"brandName": false}},
//             "AnnualFee": {"order": "createdAt DESC", "limit": 1, "fields": ["startUseTime", "endUseTime"]}
//         }
//         //   includefilter:{"AnnualFee":{"order": "endUseTime DESC", "limit":1,"fields":["id"]}}
//     }
// }, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })
// Order.query({
//     "filter": {
//         "where": {
//             "_id": "5acc8a3c67d236605dfe5eb8"
//         },
//         "skip": 0,
//         "limit": 20,
//         "include": [
//             "userPointer",
//             "waterpurifierBrandPointer",
//             "CleanMachinePointer",
//             "refereePointer",
//             "orderStatusPointer",
//             "workerPointer"
//         ],
//         "includefilter": {
//             "user": {
//                 "fields": {
//                     "createdAt": false,
//                     "updatedAt": false
//                 }
//             }
//         }
//     }
// }, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })
// Status.query({
//     filter: {
//         include: ["StatusPointer"],
//          "fields":["id","Status"],
//         includefilter: {
//             "MachineStatus": { "where":"Status:""fields": {"createdAt":false,"updateAt":false}},
//         }
//         //   includefilter:{"AnnualFee":{"order": "endUseTime DESC", "limit":1,"fields":["id"]}}
//     }
// }, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })
// Status.query({
//     filter: {
//         include: ["StatusPointer"],
//         "fields": ["id", "Status"],
//         includefilter: {
//             "MachineStatus": {
//                 // "where": {"StatusCode": "1"},
//                 "fields": {"createdAt": false, "updateAt": false, "id": false}
//             },
//             // "Repair": {"order": "createdAt DESC", "fields": ["repairContent"]},
//             // "WaterpurifierBrand": {"fields": {"brandName": false}},
//             // "AnnualFee": {"order": "createdAt DESC", "limit": 1, "fields": ["startUseTime", "endUseTime"]}
//             //  "fields":{"id":false}
//         }
//         //   includefilter:{"AnnualFee":{"order": "endUseTime DESC", "limit":1,"fields":["id"]}}
//     }
// }, function (ret, err) {
//     console.log("Model count:" + JSON.stringify(ret))
//     console.log("Model count:" + JSON.stringify(err))
// })


// m.save( {"str": '123',
//     "file2": {
//         isFile: true,
//         path: 'D:\\YG\\thumbnail.jpg'
//         // path: ''
//     }
// }, function (ret, err) {
//     console.log(ret);
// })
// var file = path.join(__dirname, "/11.jpg")
// var str = "data:image/jpeg;base64,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"
// base64_decode(str,file)
//
// function base64_decode(base64str, file) {
//     // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
//     console.log(base64str)
//     var bitmap = new Buffer(base64str, 'base64');
//     // write buffer to file
//     fs.writeFileSync(file, bitmap);
//     console.log('******** File created from base64 encoded string ********');
// }
// m.save({"id": '5ae29a2c384883477af4ed44', "_relation": "File1"},
//       {isFile: true, path: 'D:\\YG\\thumbnail.jpg'},
//        function (ret, err) {
//         console.log("ok", ret, err)
//         // next(ret.id);
//     })

// file.save({
//     "file":{
//         isFile:true,
//         isFileClass:true,
//         values:{filename:"ava.png"},
//         path:('D:\\YG\\thumbnail.jpg'),
//
//     }
// },function(ret,err){
//     console.log("one",ret,err)
// })
// m.save({"_id": '5ae29a2c384883477af4ed44'},{"$push":{ file:{ "url": 'http://a8869510ffda36d8475b.test.upcdn.net/apicloud/62a489d668cff46f4cf3b75e82009760.jpg'}} },
//  function (ret, err) {
//         if(err){
//             //处理错误 err
//         }else{
//             //处理数据 ret
//         }
//     })
// t.save({
//     "file1":{
//         isFile:true,
//         path:path.join(__dirname,"/APICloud-rest.js")
//     },
//     "file2":{
//         isFile:true,
//         path:path.join(__dirname,"/APICloud-rest.js")
//     }
// },function(ret,err){
//     console.log("two",ret,err)
//     next(ret.id);
// })
// m.save({"_id": "5ae29a2c384883477af4ed44", '_relation': "File1"},
//     {
//         "_file": {isFileClass: true, isFile: true, path: ('D:\\YG\\thumbnail.jpg')}
//     }, function (ret, err) {
//         console.log("one", ret, err)
//     })

// api.getPicture({},function(ret,err){
//     File.save({file:{isFile:true,path:ret.data,values:{filename:"头像.png"}}},function(data,err){
//         alert("file:\t"+JSON.stringify(data));
//         alert("file:\t"+JSON.stringify(err));
//     })
// })
//
// t.query({
//     "filter": {
//         "where": {
//             "workerName": "worker"
//         },
//         "skip": 0,
//         "limit": 20
//     }
// }, function (ret,err) {
//     console.log(JSON.stringify(ret))
//
// });
// async.auto({
//     create:function(cb){
//         t.get({"workerName":"APICloud-rest"},function(ret,err){
//             if(ret.id){
//                 cb(null,ret.id)
//                 console.log(ret.id)
//             }else{
//                 cb(ret||err,null)
//             }
//         })
//     },
//     createRelation:["create",function(cb,result){
//         t.get({"id":result.id,"relation":"test"}, function (ret,err) {
//             console.log("Model count:"+JSON.stringify(ret))
//             console.log("Model count:"+JSON.stringify(err))
//         });
//     }]
//
//


// getRelation:["createRelation",function(cb,result){
//     t.get({"_id":result.create,"relation":"test"},function(ret,err){
//         console.log(ret)
//         cb(null,ret);
//     })
// }],
// countRelation:["getRelation",function(cb,result){
//     t.count({"_id":result.create,"_relation":"test"},function(ret,err){
//         console.log(ret)
//         cb(null,ret);
//     })
// }],
// deleteRelation:["countRelation",function(cb,result){
//     t.delete({"_id":result.create,"_relation":"r"},function(ret,err){
//         cb(null,ret);
//     })
// }],
// delete:["deleteRelation",function(cb,result){
//     t.delete({"_id":result.create},function(ret,err){
//         cb(null,ret)
//     })
// }]
// },function(err,result){
//     console.log(err,result)
// })