/**
 * Created by the_s on 2017/8/5.
 */
exports.getAllArticle=function(req, res){
    var monk = require('monk');
//连接并打开数据库
    var db = monk('localhost:27017/TravelMark');
//从数据库中获得books集合，类似表，并非所有数据， key
    var arti = db.get('articles');
    arti.find({}).then((docs) => {
        //返回json给客户端
        res.json(docs);
}).then(() => db.close());
};