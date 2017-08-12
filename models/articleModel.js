/**
 * Created by the_s on 2017/8/5.
 */
var mongoose = require("mongoose");

// 连接字符串格式为mongodb://主机/数据库名
var db=mongoose.createConnection('mongodb://localhost/TravelMark');

var Schema = mongoose.Schema;
//骨架模版
var articleSchema = new Schema({
    title: String,          //标题
    author:{type:String, defalt:'THE_SAM'},        //作者
    body: String,           //正文
    location:{
        x:Number ,
        y:Number
    },
    imgs: [{
        name:{type:String ,defalt:"image"},
        url:{type:String}
        }],
    comments: [{            //评论
        author: String,
        date: Date,
        body: String
    }],
    Dates:{
        publishDate: {type: Date, default: Date.now},  //发布时间
        beginDate: {type: Date, default: Date.now},  //发布时间
        endDate: {type: Date, default: Date.now},  //发布时间
    },
    isDelete: {type: Boolean, default: false},                        //是否删除
    tags: [{type:String}]                  //标签
});
//模型
var Article = db.model('Article', articleSchema);
//存储数据
var article = new Article({
    title: '上海游',
    body:'(node:8672) DeprecationWarning: `DEBUG_FD` is deprecated. Override `debug.log` if you want to use a different log function (https://git.io/vMUyr)s default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html',
    tags:['国内','旅游'],
    location:{x:121.48,y:31.22	},
    imgs:[{name:'image1',url:'img/adv3.jpg'},{name:'image2', url:'img/adv1.jpg'}]
});
//保存数据库
console.log('开始保存');

article.save(function(err) {
    if (err) {
        console.log('保存失败')
        return;
    }
    console.log('保存成功');
});

