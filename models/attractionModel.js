/**
 * Created by the_s on 2017/8/5.
 */
var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
var db=mongoose.createConnection('mongodb://localhost/TravelMark');

var Schema = mongoose.Schema;
//骨架模版
var attractionSchema = new Schema({
    name: String,          //标题
    location:{
        x:Number ,
        y:Number
    },
    Dates:{
        publishDate: {type: Date, default: Date.now},  //发布时间
        travelDate: {type: Date, default: Date.now},  //发布时间
    },
    isDelete: {type: Boolean, default: false},                        //是否删除
    tags: [{type:String}]                  //标签
});
//模型
var attraction = db.model('Attractions', attractionSchema);



