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

//地图缩放事件
    map.addEventListener("zoomend", function () {
        var zoom = this.getZoom();
        if (zoom > 6)
            hideOrShowDetailScenic('show');
        else
            hideOrShowDetailScenic('hide');
    });
    //除了第一个以外的景点
    var detailScenicMark = [];
    //隐藏或者显示除了第一个的景点
    function hideOrShowDetailScenic(cmd) {
        angular.forEach(detailScenicMark, function (t) {
            if (cmd == 'hide')
                t.hide();
            else
                t.show();
        });
    }

//加载mark
    function markLocation(travels) {
        travelMarks = [];
        angular.forEach(travels.scenicList, function (t, index) {
            //将travels按照年月分组存储
            var point = new BMap.Point(t.pointX, t.pointY);
            var marker = new BMap.Marker(point);
            travelMarks.push(point);
            map.addOverlay(marker);
            if (index > 0) {
                detailScenicMark.push(marker);
            }
        });
        //旅途点之间的连线
        if (travels.scenicList.length > 1) {
            var polyline = new BMap.Polyline(travelMarks
                , {strokeColor: "SteelBlue", strokeStyle: 'dashed', strokeWeight: 3, strokeOpacity: 0.9});
            detailScenicMark.push(polyline);
            map.addOverlay(polyline);          //增加折线
            var Arrow = addArrow(polyline, 0.5, Math.PI / 7);
            detailScenicMark.push(Arrow);
            map.addOverlay(Arrow);          //增加折线
        }
    }

    //----------------
    //这里只实现了两个点
    function addArrow(polyline, length, angleValue) { //绘制箭头的函数
        var linePoint = polyline.getPath(); //线的坐标串
        var arrowCount = linePoint.length;
        var point1 = linePoint[0];
        var point2 = linePoint[1];
        console.log(getAngle(point1.lng, point1.lat, point2.lng, point2.lat));
        var angle = getAngle( point2.lat, point2.lng,point1.lat,point1.lng);
        var vectorBOArrow = new BMap.Marker(new BMap.Point((point1.lng+point2.lng)/2,(point1.lat+point2.lat)/2), {
            // 初始化方向向下的开放式箭头
            icon: new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
                scale: 1,
                strokeWeight: 1,
                rotation: angle,
                fillColor: 'red',
                fillOpacity: 0.8
            })
        });
        return vectorBOArrow;
    }
    /*==== 由A、B两点的经纬度计算AB夹角、距离 Start====*/
   /* function getAngle(mLong,mLat,dLong,dLat ) {
        //var dLong         = 114.104223;//已知点A经度香港
        //var dLat        = 22.439718;//已知点A纬度   -144
        var kRadius = 6378137;//地球半径
        var dx = (dLong*Math.PI/180  - mLong * Math.PI/180)*(kRadius*Math.cos(mLat*Math.PI/180));
        var dy = (dLat*Math.PI/180 - mLat * Math.PI/180)*kRadius
        jiajiao=0;
        jiajiao = Math.atan2(dx, dy)*180.0/Math.PI;
        var juli = Math.sqrt(dx*dx + dy*dy)
        return [jiajiao,juli];
    }*/
    /*==== 由A、B两点的经纬度计算AB夹角、距离 End====*/
    function getAngle(px1, py1, px2, py2) {
        //两点的x、y值
        x = px2 - px1;
        y = py2 - py1;
        hypotenuse = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        //斜边长度
        cos = x / hypotenuse;
        radian = Math.acos(cos);
        //求出弧度
        angle = 180 / (Math.PI / radian);
        //用弧度算出角度
        if (y < 0) {
            angle = -angle;
        } else if ((y == 0) && (x < 0)) {
            angle = 180;
        }
        return angle;
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
            local.search($("#searchInput").val());
        });
        $.ajax({
            url: '/Travel/getAll',// 跳转到 action
            type: 'get',
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                angular.forEach(data.dataObj, function (travel) {
                    //将travels按照年月分组存储
                    markLocation(travel);
                    var nowDate = new Date(travel.beginDate);
                    var monthDate = MonthEn[nowDate.getMonth()];
                    var yearDate = (nowDate.getYear() + 1900);
                    var lastTravel = this[this.length - 1];
                    travel.positionLeft = Math.random() < 0.5 ? true : false;//图像随机左右
                    travel.imageSmallSize = Math.random() < 0.5 ? 'ss-small' : 'ss-medium';//图像随机大小
                    if (travel.imageList.length == 0) travel.imageList.push("/img/travelDefault.jpg");
                    if (this.length != 0 && lastTravel.beginDate == nowDate) {
                        lastTravel.travelList.push(travel);
                    }
                    else {
                        this.push({
                            beginDate: monthDate + yearDate,
                            travelList: [travel],
                            monthDate: monthDate,
                            yearDate: yearDate
                        });
                    }

                }, angularTravelList);

                $scope.$apply(function () {
                    $scope.travelList = angularTravelList;
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

app.directive('repeatFinish', function () {
    return {
        link: function (scope, element, attr) {
            if (scope.$last == true) {
                iniScroll();
            }
        }
    }
});

function iniScroll() {
    var $sidescroll = (function () {

        // the row elements
        var $rows = $('#ss-container >div.travelCell> div.ss-row');
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