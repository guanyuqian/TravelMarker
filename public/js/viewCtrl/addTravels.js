var Scenics = [];
var editNum = -1;
$('#addScenics').click(function () {
    if (editNum == -1) {//create
        var EditData = {
            name: $("#addScenicsName").val(),
            startDate: $("#addScenicsDate").val(),
            pointX: $("#addScenicsLocationX").val(),
            pointY: $("#addScenicsLocationY").val()
        };
        Scenics.push(EditData);
    } else {//edit
        var EditData = Scenics[editNum];
        EditData.name = $("#addScenicsName").val();
        EditData.startDate = $("#addScenicsDate").val();
        EditData.pointX = $("#addScenicsLocationX").val();
        EditData.pointY = $("#addScenicsLocationY").val();
    }
    updadtaScenicsPanel();
    $("#ScenicDialog").modal('hide');
    editNum = -1;

});

$("#ctUpload").mouseup(function () {
    $("#ScenicDialog").show();
    $("#addScenicsName").val("");
    $("#addScenicsDate").val("");
    $("#addScenicsLocationX").val("");
    $("#addScenicsLocationY").val("");
    $("#searchInput").val("");
    iniCenter();
});
//插入标题景点
function insertScenic(clickBtn) {
    EditData = Scenics[clickBtn.name];
    var value = "<h1><span style='font-weight: normal;'>" + EditData.name + "</span> </h1><hr/><p><br/></p>"
    ue.execCommand('insertHtml', value)
}

//删除单个景点
function removeScenic(clickBtn) {
    var index = clickBtn.name;
    Scenics.splice(index, 1);
    updadtaScenicsPanel();
}

//编辑景点
function editScenic(clickBtn) {
    EditData = Scenics[clickBtn.name];
    editNum = clickBtn.name;
    var EditData = Scenics[editNum];
    $("#addScenicsName").val(EditData.name);
    $("#addScenicsDate").val(EditData.startDate);
    $("#addScenicsLocationX").val(EditData.pointX);
    $("#addScenicsLocationY").val(EditData.pointY);
    $("#searchInput").val("");
    CoordinatesAddMarkAndSetCenter(EditData.pointX, EditData.pointY);
    map.panBy(400, 150);//中心点偏移多少像素（width,height）为div 宽高的1/2;
    $("#ScenicDialog").modal();
}

//更新景点panel
function updadtaScenicsPanel() {
    var ScenicsPanel = $("#ScenicsPanel");
    ScenicsPanel.empty();

    for (var i = 0; i < Scenics.length; i++) {
        var itemHtml = "<li class='list-group-item'>" + Scenics[i].name +
            "<button class='btn btn-xs btn-danger badge' onclick='removeScenic(this)' name='" + i +
            "'><span class='glyphicon glyphicon-remove' /></button>" +
            "<button class='btn btn-xs btn-primary badge'onclick='editScenic(this)'  name='" + i +
            "'><span class='glyphicon glyphicon-pencil' '/></button>" +
            "<button class='btn btn-xs btn-success badge' onclick='insertScenic(this)' name='" + i +
            "'><span class='glyphicon glyphicon-plus' /></button>" +
            "</li>";
        ScenicsPanel.append(itemHtml);
    }
    if (Scenics.length == 0) {
        $("#ctd_img_no_none").hide();
        $("#ctd_img_none").show();
    }
    else {
        $("#ctd_img_none").hide();
        $("#ctd_img_no_none").show();
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
    updadtaScenicsPanel();
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


$('#btn_submit1').click(addTravels);
$('#btn_submit2').click(addTravels);
function addTravels() {
    console.log(UE.imageList);
    var postData = {
        publishDate: getCurrentDate(),
        title: $('#TravelTitle').val(),
        content: ue.getContent(),
        ScenicList: Scenics,
        imageList:UE.imageList
    };
    $.ajax({
        url: '/addTravel',// 跳转到 action
        dataType: 'json',
        cache: false,
        type: 'post',
        data: postData,
        success: function (data) {
            alert(data.message);
        },
        error: function () {
            alert(data.message);
        }
    });
}