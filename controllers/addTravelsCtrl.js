/*
 * GET users listing.
 */
var genericPool = require('../db/db');
var TravelSchema = require('../schema/travelSchema');

exports.renderToView = function (req, res) {
    res.render('addTravels', {title: 'AddTravels'});
};

exports.addTravels = function (req, res) {
    var travel = new TravelSchema.Travel(req.body);
    var resMsg = {
        message: '', detail: '', dataObj: ''
    };
    var db = null;
    try {
        genericPool.dbpool.acquire(function (err, client) {
            db = client;
            client.collection('Travels').save(travel);
            resMsg.message = '添加成功';
            res.json(resMsg);
        });
    } catch (e) {
        resMsg.message = '添加失败';
        res.json(resMsg);
    }
    finally {
        genericPool.dbpool.release(db);
    }
};



