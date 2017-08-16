/**
 * Created by the_s on 2017/8/5.
 */
var mongoose = require("mongoose");
// 连接字符串格式为mongodb://主机/数据库名
//var db=mongoose.createConnection('mongodb://localhost/TravelMark');
var Schema = mongoose.Schema;
var travelSchema = new Schema({
    publishDate: Date,
    title: String,
    content: String,
    ScenicList: [{
        name: String,
        startDate: Date,
        pointX: Number,
        pointY: Number
    }]
});
exports.Travel = mongoose.model('User', travelSchema);


