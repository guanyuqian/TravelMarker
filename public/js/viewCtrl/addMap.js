/**
 * Created by the_s on 2017/8/5.
 */
var app = angular.module('mapShow', []);
var angularTravelList = [];
app.controller('mapShowCtrl', function ($scope) {

    // 百度地图API功能
var map = new BMap.Map("allmap");
map.centerAndZoom("西安", 5);
map.setMapStyle({
    styleJson: [
        {
            "featureType": "land",
            "elementType": "all",
            "stylers": {
                "lightness": 100,
                "saturation": -100
            }
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": {
                "color": "#d9d2e9",
                "lightness": 58
            }
        },
        {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "lightness": 28
            }
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "lightness": 82
            }
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": {
                "lightness": -76
            }
        },
        {
            "featureType": "green",
            "elementType": "all",
            "stylers": {
                "lightness": 37,
                "saturation": -100
            }
        },
        {
            "featureType": "boundary",
            "elementType": "geometry.fill",
            "stylers": {
                "lightness": 64,
                "saturation": -17
            }
        },
        {
            "featureType": "boundary",
            "elementType": "geometry.stroke",
            "stylers": {
                "lightness": -75,
                "saturation": -100
            }
        }
    ]
});
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
    renderOptions: {map: map}
});

local.search("景点");
map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
map.addControl(geolocationControl);


//加载mark
function markLocation(article) {
    var point = new BMap.Point(article.location.x, article.location.y);
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

//将点置中，标记，缩放
function addMarkAndSetCenterZoom(point) {
    map.panTo(point);
    //map.centerAndZoom(point, 5);
    addMark(point);
}

$(document).ready(function () {

    $('#timeLine').height(document.body.clientHeight);
    /*var geolocation = new BMap.Geolocation();
     geolocation.getCurrentPosition(function (r) {
     if (this.getStatus() == BMAP_STATUS_SUCCESS) {
     addMarkAndSetCenterZoom(r.point);
     }
     else {
     }
     }, {enableHighAccuracy: true});*/

    $("#searchBtn").click(function () {
        console.log('searchLocation()');
        local.search($("#searchInput").val());
    });
    $.ajax({
        url: '/Travel/getAll',// 跳转到 action
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data) {
            angular.forEach(data.dataObj, function (travel) {
                //将travels按照年月分组存储
                var nowDate = new Date(travel.beginDate);
                var monthDate = MonthEn[nowDate.getMonth()];
                var yearDate = (nowDate.getYear() + 1900);
                var lastTravel = this[this.length - 1];
                travel.positionLeft= Math.random()<0.5?true:false;
                travel.imageSmallSize= Math.random()<0.5?'ss-small':'ss-medium';
                if(travel.imageList.length==0)travel.imageList.push("/img/travelDefault.jpg");
                if (this.length != 0&&lastTravel.beginDate == nowDate) {
                    lastTravel.travelList.push(travel);
                }
                else{
                    this.push({
                        beginDate: monthDate + yearDate,
                        travelList: [travel],
                        monthDate: monthDate,
                        yearDate: yearDate
                    });
                }

            }, angularTravelList);

            $scope.$apply(function() {

                $scope.travelList = angularTravelList;
                console.log('scope');
                //iniScroll();
            });
        },
        error: function () {
            // view("异常！");
            alert("异常！");
        }
    });
    //将时间转换为大标题显示的时间 如 2014-11-7 ==》NOVEMBER 2014
    const MonthEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//自定义指令repeatFinish
    });
});

app.directive('repeatFinish',function(){
    return {
        link: function(scope,element,attr){
            if(scope.$last == true){
                iniScroll();
            }
        }
    }
});

function iniScroll() {
    var $sidescroll = (function () {

        // the row elements
        var $rows = $('#ss-container >div.travelCell> div.ss-row');
        console.log($rows);
        // we will cache the inviewport rows and the outside viewport rows
        var $rowsViewport, $rowsOutViewport,
            // navigation menu links
            $links = $('#ss-links > a'),
            // the window element
            $win = $(window),
            // we will store the window sizes here
            winSize = {},
            // used in the scroll setTimeout function
            anim = false,
            // page scroll speed
            scollPageSpeed = 2000,
            // page scroll easing
            scollPageEasing = 'easeInOutExpo',
            // perspective?
            hasPerspective = false,

            perspective = hasPerspective && Modernizr.csstransforms3d,
            // initialize function
            init = function () {

                // get window sizes
                getWinSize();
                // initialize events
                initEvents();
                // define the inviewport selector
                defineViewport();
                // gets the elements that match the previous selector
                setViewportRows();
                // if perspective add css
                if (perspective) {
                    $rows.css({
                        '-webkit-perspective': 600,
                        '-webkit-perspective-origin': '50% 0%'
                    });
                }
                // show the pointers for the inviewport rows
                $rowsViewport.find('a.ss-circle').addClass('ss-circle-deco');
                // set positions for each row
                placeRows();

            },
            // defines a selector that gathers the row elems that are initially visible.
            // the element is visible if its top is less than the window's height.
            // these elements will not be affected when scrolling the page.
            defineViewport = function () {

                $.extend($.expr[':'], {

                    inviewport: function (el) {
                        if ($(el).offset().top < winSize.height) {
                            return true;
                        }
                        return false;
                    }

                });

            },
            // checks which rows are initially visible
            setViewportRows = function () {

                $rowsViewport = $rows.filter(':inviewport');
                $rowsOutViewport = $rows.not($rowsViewport)

            },
            // get window sizes
            getWinSize = function () {

                winSize.width = $win.width();
                winSize.height = $win.height();

            },
            // initialize some events
            initEvents = function () {

                // navigation menu links.
                // scroll to the respective section.
                $links.on('click.Scrolling', function (event) {

                    // scroll to the element that has id = menu's href
                    $('html, body').stop().animate({
                        scrollTop: $($(this).attr('href')).offset().top
                    }, scollPageSpeed, scollPageEasing);

                    return false;

                });

                $(window).on({
                    // on window resize we need to redefine which rows are initially visible (this ones we will not animate).
                    'resize.Scrolling': function (event) {
                        // get the window sizes again
                        getWinSize();
                        // redefine which rows are initially visible (:inviewport)
                        setViewportRows();
                        // remove pointers for every row
                        $rows.find('a.ss-circle').removeClass('ss-circle-deco');
                        // show inviewport rows and respective pointers
                        $rowsViewport.each(function () {

                            $(this).find('div.ss-left')
                                .css({left: '0%'})
                                .end()
                                .find('div.ss-right')
                                .css({right: '0%'})
                                .end()
                                .find('a.ss-circle')
                                .addClass('ss-circle-deco');

                        });

                    },
                    // when scrolling the page change the position of each row
                    'scroll.Scrolling': function (event) {
                        // set a timeout to avoid that the
                        // placeRows function gets called on every scroll trigger
                        if (anim) return false;
                        anim = true;
                        setTimeout(function () {
                            placeRows();
                            anim = false;

                        }, 10);

                    }
                });

            },
            // sets the position of the rows (left and right row elements).
            // Both of these elements will start with -50% for the left/right (not visible)
            // and this value should be 0% (final position) when the element is on the
            // center of the window.
            placeRows = function () {

                // how much we scrolled so far
                var winscroll = $win.scrollTop(),
                    // the y value for the center of the screen
                    winCenter = winSize.height / 2 + winscroll;

                // for every row that is not inviewport
                $rowsOutViewport.each(function (i) {

                    var $row = $(this),
                        // the left side element
                        $rowL = $row.find('div.ss-left'),
                        // the right side element
                        $rowR = $row.find('div.ss-right'),
                        // top value
                        rowT = $row.offset().top;

                    // hide the row if it is under the viewport
                    if (rowT > winSize.height + winscroll) {

                        if (perspective) {

                            $rowL.css({
                                '-webkit-transform': 'translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)',
                                'opacity': 0
                            });
                            $rowR.css({
                                '-webkit-transform': 'translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)',
                                'opacity': 0
                            });

                        }
                        else {

                            $rowL.css({left: '-50%'});
                            $rowR.css({right: '-50%'});

                        }

                    }
                    // if not, the row should become visible (0% of left/right) as it gets closer to the center of the screen.
                    else {

                        // row's height
                        var rowH = $row.height(),
                            // the value on each scrolling step will be proporcional to the distance from the center of the screen to its height
                            factor = ( ( ( rowT + rowH / 2 ) - winCenter ) / ( winSize.height / 2 + rowH / 2 ) ),
                            // value for the left / right of each side of the row.
                            // 0% is the limit
                            val = Math.max(factor * 50, 0);

                        if (val <= 0) {

                            // when 0% is reached show the pointer for that row
                            if (!$row.data('pointer')) {

                                $row.data('pointer', true);
                                $row.find('.ss-circle').addClass('ss-circle-deco');

                            }

                        }
                        else {

                            // the pointer should not be shown
                            if ($row.data('pointer')) {

                                $row.data('pointer', false);
                                $row.find('.ss-circle').removeClass('ss-circle-deco');

                            }

                        }

                        // set calculated values
                        if (perspective) {

                            var t = Math.max(factor * 75, 0),
                                r = Math.max(factor * 90, 0),
                                o = Math.min(Math.abs(factor - 1), 1);

                            $rowL.css({
                                '-webkit-transform': 'translate3d(-' + t + '%, 0, 0) rotateY(-' + r + 'deg) translate3d(-' + t + '%, 0, 0)',
                                'opacity': o
                            });
                            $rowR.css({
                                '-webkit-transform': 'translate3d(' + t + '%, 0, 0) rotateY(' + r + 'deg) translate3d(' + t + '%, 0, 0)',
                                'opacity': o
                            });

                        }
                        else {

                            $rowL.css({left: -val + '%'});
                            $rowR.css({right: -val + '%'});

                        }

                    }

                });

            };

        return {init: init};

    })();

    $sidescroll.init();
}