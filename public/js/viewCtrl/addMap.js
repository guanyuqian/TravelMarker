/**
 * Created by the_s on 2017/8/5.
 */
    // 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom("上海", 4);
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

local.search("景点");
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.addControl(geolocationControl);




//加载mark
function markLocation(article){
    image=article.imgs[0]!=null?article.imgs[0]:{url:"img/default.jpg",name:"默认图片"};
    var sContent =
        "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>"+article.title+"</h4>" +
        "<img style='float:right;margin:4px' id='imgDemo' src="+image.url+" width='139' height='104' title='"+image.name+"'/>" +
        "<p style='margin:0;line-height:1.5;font-size:13px;text-indent:2em'>"+article.body+"</p>" +
        "</div>";
    var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
    var point = new BMap.Point(article.location.x,article.location.y);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function () {
            infoWindow.redraw();   //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    });
}
$(document).ready(function() {
    $("#searchBtn").click(function () {
        console.log('searchLocation()');
        local.search($("#searchInput").val());
    });
    $.ajax({
        url: '/map/getArticle',// 跳转到 action
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            $.each(data, function(){
                markLocation(this);
            });
        },
        error: function () {
            // view("异常！");
            alert("异常！");
        }
    });

});
