var postDataList = [];
var editNum = -1;
$('#addAttractions').click(function () {
    if (editNum == -1) {//create
        var EditData = {
            name: $("#addAttractionsName").val(),
            date: $("#addAttractionsDate").val(),
            pointX: $("#addAttractionsLocationX").val(),
            pointY: $("#addAttractionsLocationY").val()
        };
        postDataList.push(EditData);
    } else {//edit
        var EditData = postDataList[editNum];
        EditData.name = $("#addAttractionsName").val();
        EditData.date = $("#addAttractionsDate").val();
        EditData.pointX = $("#addAttractionsLocationX").val();
        EditData.pointY = $("#addAttractionsLocationY").val();
    }
    updadtaAttractionsPanel();
    $("#attractionDialog").modal('hide');
    editNum = -1;

});

$("#ctUpload").mouseup(function () {
    $("#attractionDialog").show();
    $("#addAttractionsName").val("");
    $("#addAttractionsDate").val("");
    $("#addAttractionsLocationX").val("");
    $("#addAttractionsLocationY").val("");
    $("#searchInput").val("");
    iniCenter();
});
//插入标题景点
function insertAttraction(clickBtn) {
    EditData = postDataList[clickBtn.name];
    var value = "<h1><span style='font-weight: normal;'>" + EditData.name + "</span> </h1><hr/><p><br/></p>"
    ue.execCommand('insertHtml', value)
}

//删除单个景点
function removeAttraction(clickBtn) {
    var index = clickBtn.name;
    postDataList.splice(index, 1);
    updadtaAttractionsPanel();
}

//编辑景点
function editAttraction(clickBtn) {
    EditData = postDataList[clickBtn.name];
    editNum = clickBtn.name;
    var EditData = postDataList[editNum];
    $("#addAttractionsName").val(EditData.name);
    $("#addAttractionsDate").val(EditData.date);
    $("#addAttractionsLocationX").val(EditData.pointX);
    $("#addAttractionsLocationY").val(EditData.pointY);
    $("#searchInput").val("");
    CoordinatesAddMarkAndSetCenter(EditData.pointX, EditData.pointY);
    map.panBy(400, 150);//中心点偏移多少像素（width,height）为div 宽高的1/2;
    $("#attractionDialog").modal();
}

//更新景点panel
function updadtaAttractionsPanel() {
    var AttractionsPanel = $("#AttractionsPanel");
    AttractionsPanel.empty();
    for (var i = 0; i < postDataList.length; i++) {
        var itemHtml = "<li class='list-group-item'>" + postDataList[i].name +
            "<button class='btn btn-xs btn-danger badge' onclick='removeAttraction(this)' name='" + i +
            "'><span class='glyphicon glyphicon-remove' /></button>" +
            "<button class='btn btn-xs btn-primary badge'onclick='editAttraction(this)'  name='" + i +
            "'><span class='glyphicon glyphicon-pencil' '/></button>" +
            "<button class='btn btn-xs btn-success badge' onclick='insertAttraction(this)' name='" + i +
            "'><span class='glyphicon glyphicon-plus' /></button>" +
            "</li>";
        AttractionsPanel.append(itemHtml);
    }
}

//时间选择器初始化
$(function () {
    $('.form_datetime').datetimepicker({
        minView: "month", //  选择时间时，最小可以选择到那层；默认是‘hour’也可用0表示
        language: 'zh-CN', // 语言
        format: 'yyyy-mm-dd', // 文本框时间格式，设置为0,最后时间格式为2017-03-23
        todayBtn: true, // 如果此值为true 或 "linked"，则在日期时间选择器组件的底部显示一个 "Today" 按钮用以选择当前日期。
        todayHighlight: true,
        autoclose: true //  true:选择时间后窗口自动关闭
    });
    $('.form_datetime').val(getCurrentDate());
    updadtaAttractionsPanel();
});
function getCurrentDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');

function isFocus(e) {
    alert(UE.getEditor('editor').isFocus());
    UE.dom.domUtils.preventDefault(e)
}
function setblur(e) {
    UE.getEditor('editor').blur();
    UE.dom.domUtils.preventDefault(e)
}
function insertHtml() {
    var value = prompt('插入html代码', '');
    UE.getEditor('editor').execCommand('insertHtml', value)
}
function createEditor() {
    enableBtn();
    UE.getEditor('editor');
}
function getAllHtml() {
    alert(UE.getEditor('editor').getAllHtml())
}
function getContent() {
    var arr = [];
    arr.push("使用editor.getContent()方法可以获得编辑器的内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getContent());
    alert(arr.join("\n"));
}
function getPlainTxt() {
    var arr = [];
    arr.push("使用editor.getPlainTxt()方法可以获得编辑器的带格式的纯文本内容");
    arr.push("内容为：");
    arr.push(UE.getEditor('editor').getPlainTxt());
    alert(arr.join('\n'))
}
function setContent(isAppendTo) {
    var arr = [];
    arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
    UE.getEditor('editor').setContent('欢迎使用ueditor', isAppendTo);
    alert(arr.join("\n"));
}
function setDisabled() {
    UE.getEditor('editor').setDisabled('fullscreen');
    disableBtn("enable");
}

function setEnabled() {
    UE.getEditor('editor').setEnabled();
    enableBtn();
}

function getText() {
    //当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
    var range = UE.getEditor('editor').selection.getRange();
    range.select();
    var txt = UE.getEditor('editor').selection.getText();
    alert(txt);
}

function getContentTxt() {
    var arr = [];
    arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    arr.push("编辑器的纯文本内容为：");
    arr.push(UE.getEditor('editor').getContentTxt());
    alert(arr.join("\n"));
}
function hasContent() {
    var arr = [];
    arr.push("使用editor.hasContents()方法判断编辑器里是否有内容");
    arr.push("判断结果为：");
    arr.push(UE.getEditor('editor').hasContents());
    alert(arr.join("\n"));
}
function setFocus() {
    UE.getEditor('editor').focus();
}
function deleteEditor() {
    disableBtn();
    UE.getEditor('editor').destroy();
}
function disableBtn(str) {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        if (btn.id == str) {
            UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
        } else {
            btn.setAttribute("disabled", "true");
        }
    }
}
function enableBtn() {
    var div = document.getElementById('btns');
    var btns = UE.dom.domUtils.getElementsByTagName(div, "button");
    for (var i = 0, btn; btn = btns[i++];) {
        UE.dom.domUtils.removeAttributes(btn, ["disabled"]);
    }
}

function getLocalData() {
    alert(UE.getEditor('editor').execCommand("getlocaldata"));
}

function clearLocalData() {
    UE.getEditor('editor').execCommand("clearlocaldata");
    alert("已清空草稿箱");
}