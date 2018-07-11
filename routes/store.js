var settings = require('../settings');
var express = require('express');
var router = express.Router();
var Resource = require("APICloud").Resource;
var client = new Resource(settings.appId, settings.appKey);
var store = client.Factory("WaterpurifierBrand");

router.get('/', function (req, res) {
    store.query(
        {
        filter: {
            include: [
                // "WPStorage",
                "Picture",
            ]
        }
    },

        function (ret) {
        res.send(ret);
    })
})

module.exports = router;
