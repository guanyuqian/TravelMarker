var genericPool = require('../db/db');

exports.getAllTravel = function(req, res){
    var resMsg = {
        message: '', detail: '', dataObj: ''
    };
    var db = null;
    try {
        genericPool.dbpool.acquire(function (err, client) {
            db = client;
            resMsg.dataObj=client.collection('Travels').find().toArray(function(err, result) {
                if (err) throw err;
                resMsg.dataObj=result;
                resMsg.message = '查找成功';
                res.json(resMsg);
            });
        });
    } catch (e) {
        resMsg.message = '查找失败';
        res.json(resMsg);
    }
    finally {
        genericPool.dbpool.release(db);

    }
};