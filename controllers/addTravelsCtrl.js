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
    try {
        genericPool.dbpool.acquire(function (err, client) {
            client.collection('Travels').save(travel);
            resMsg.message = '添加成功';
        });
    } catch (e) {
        resMsg.message = '添加失败';
    }
    finally {
        genericPool.dbpool.release(client);
    }
    res.json(resMsg);
};



