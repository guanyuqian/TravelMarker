/**
 * Created by the_s on 2017/8/5.
 */
    // 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom("北京", 5);

// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
    // 靠左上角位置
    anchor: BMAP_ANCHOR_TOP_LEFT,
    // LARGE类型
    type: BMAP_NAVIGATION_CONTROL_LARGE,
    // 启用显示定位
    enableGeolocation: true
});
map.addControl(navigationControl);
// 添加定位控件
var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess", function (e) {
    // 定位成功事件
    var address = '';
    address += e.addressComponent.province;
    address += e.addressComponent.city;
    address += e.addressComponent.district;
    address += e.addressComponent.street;
    address += e.addressComponent.streetNumber;
    alert("当前定位地址为：" + address);
});
geolocationControl.addEventListener("locationError", function (e) {
    // 定位失败事件
    alert(e.message);
});
var local = new BMap.LocalSearch(map, {
    renderOptions:{map: map}
});
//地图点击标记选取
function clickHandler(e){
    console.log(e.point.lng + ", " + e.point.lat);
    addMark(e.point);
}
local.search("景点");
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.disableDoubleClickZoom();
map.addControl(geolocationControl);


map.addEventListener('click', clickHandler);


var geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function(r){
    if(this.getStatus() == BMAP_STATUS_SUCCESS){
       addMark(r.point);
       // map.addOverlay(mk);
      //  map.panTo(r.point);
       // alert('您的位置：'+r.point.lng+','+r.point.lat);
    }
    else {
        //alert('failed'+this.getStatus());
    }
},{enableHighAccuracy: true})

//加载mark
function addMark(point){
    var myIcon = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
        offset: new BMap.Size(10, 25), // 指定定位位置
        imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
    });
    console.log(point);
    var marker=new BMap.Marker(point,{icon:myIcon});
    map.clearOverlays();
    map.addOverlay(marker);
   $('#addAttractionsLocationX').val(point.lng);
   $('#addAttractionsLocationY').val(point.lat);
}
$(document).ready(function() {

    $("#searchBtn").click(function () {
        console.log('searchLocation()');
        local.search($("#searchInput").val());
    });

});
