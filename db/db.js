/**
 * Created by the_s on 2017/8/16.
 */
var mongodb = require("mongodb");
var    poolModule = require('generic-pool');
exports.dbpool  =  poolModule.Pool({
    name: 'mongodb',
    create: function (callback) {
        var server_options = {'auto_reconnect': false, poolSize: 10};
        var db_options = {w: -1};
        var mongoserver = new mongodb.Server('localhost', 27017, server_options);
        var db = new mongodb.Db('TravelMarker', mongoserver, db_options);
        db.open(function (err, db) {
            if (err)return callback(err);
            callback(null, db);
        });
    },
    destroy: function (db) {
        console.log('close db conn');
        db.close();
    },
    max: 10,
    idleTimeoutMillis: 30000,
    log: false
});
//module.export=pool;
