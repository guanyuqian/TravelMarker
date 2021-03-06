var express = require('express');
var http = require('http');
var path = require('path');
var mongodb = require("mongodb");
var router = require('./web_router');
var config = require('./config/env');
var app = express();

var session = require('express-session');

// all environments
app.set('port', config.server.port || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


//uedit
var ueditor = require("./");
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router.setRouter(app);
// view engine setup
app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    //客户端上传文件设置
    var imgDir = '/img/ueditor/'
    var ActionType = req.query.action;
    if (ActionType === 'uploadimage' || ActionType === 'uploadfile' || ActionType === 'uploadvideo') {
        var file_url = imgDir;//默认图片上传地址
        /*其他上传格式的地址*/
        if (ActionType === 'uploadfile') {
            file_url = '/file/ueditor/'; //附件
        }
        if (ActionType === 'uploadvideo') {
            file_url = '/video/ueditor/'; //视频
        }
        res.ue_up(file_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = imgDir;
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

setTimeout(function () {
    http.get('http://localhost', function (res) {

    });
    http.get('http://localhost', function (res) {

    });
}, 2000);

module.exports = app;
