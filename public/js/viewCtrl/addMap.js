/**
 * Created by the_s on 2017/8/5.
 */

var app = angular.module('mapShow', []);
var angularTravelList = [];//安月份分组
var TravelList = [];//不分组
var lushuList = [];
var FOOT_SVG = new BMap.Symbol('M433.63777 169.978323c63.466474-9.241478 60.636009-106.242719-13.429871-105.309464-12.04943 3.282766-20.713764 5.54018-28.808116 12.263301C354.279351 107.759259 376.605845 178.283476 433.63777 169.978323zM314.898435 158.299329c50.749848-7.429203 48.278563-86.87665-11.484565-86.037539-8.854669 2.402723-15.686261 3.964288-21.802562 8.759501C249.695411 106.045221 266.647501 165.362188 314.898435 158.299329zM225.160621 175.235047c40.46869-5.211698 39.162952-66.204841-5.450129-67.156516-6.147 1.480724-11.441587 1.837858-15.962553 4.671393C176.613952 129.754203 186.517509 180.210361 225.160621 175.235047zM153.138284 209.494315c35.71134-4.154623 33.609469-54.240345-3.504824-53.532217C113.796254 164.634618 121.565195 213.165937 153.138284 209.494315zM285.699416 187.887204c-20.572548 5.339612-38.868239 6.217608-56.257282 12.847609-58.645678 22.361287-103.347786 72.075549-117.961622 138.40114-6.232958 28.287253-7.673773 67.657936-3.892657 98.886171l0 19.466354c1.620917 16.219403 3.243881 32.444946 4.865821 48.66435 13.716396 93.323479 40.879036 191.875029 98.496292 240.792135 23.273053 19.756973 60.260455 46.27493 107.8401 40.48711 71.513754-8.699126 123.611296-49.213865 123.606179-129.057331 0-24.709775-2.822278-42.727127-10.120498-59.565631-7.850805-18.113543-19.293415-32.261775-30.367635-47.105854-5.353938-7.18054-12.423961-13.932314-16.154935-22.581298-1.777483-4.118807-2.282996-10.335393-0.779759-15.182794 6.255471-20.159132 34.716686-41.384549 50.028417-54.115502 19.163455-15.931854 37.919634-37.70474 48.468898-61.899792 9.850345-22.598694 17.279548-56.222489 12.847609-90.322122C483.267097 207.191876 400.100956 186.91711 285.699416 187.887204zM116.152928 256.990049c23.577998-3.031033 23.000853-40.343847-3.698229-39.71042C84.741521 224.848001 92.057137 260.087597 116.152928 256.990049zM608.246553 341.082282c61.32674-11.151991 57.078996-106.207927-16.35141-105.308441-12.727882 4.260024-20.514219 6.181793-29.196972 13.625322C525.806959 281.021372 551.728328 351.36037 608.246553 341.082282zM723.677539 329.597717c50.704822-7.423063 47.309492-86.871533-11.486612-86.038562-9.166777 2.490727-16.629749 4.112668-22.967084 9.149381C657.352971 278.035364 675.645592 336.628854 723.677539 329.597717zM807.187511 346.532411c40.46869-5.211698 39.162952-66.204841-5.452175-67.155493-6.148024 1.480724-11.441587 1.837858-15.962553 4.671393C758.638795 301.05259 768.540306 351.508749 807.187511 346.532411zM873.369839 380.791679c35.363416-4.113691 33.787524-54.246485-3.502777-53.531194C833.807798 335.987241 841.566506 384.491954 873.369839 380.791679zM760.07961 362.105085c-19.533892-3.604084-44.167942-3.142573-67.546396-2.919493-9.732665 0.973164-19.466354 1.946328-29.197996 2.919493-12.326746 2.4017-24.658609 4.802376-36.986379 7.203052-72.78777 20.549012-112.952538 74.53353-95.382371 169.353083 3.282766 17.706267 10.193153 33.516348 18.494213 46.52257 9.625218 15.081487 21.466917 30.055526 34.841529 41.461297 16.653285 14.202467 50.625004 37.706787 55.672974 61.318554 3.602038 16.848737-25.984814 44.967144-33.482579 55.866379-6.822382 9.91993-12.726859 21.021779-17.322527 33.093722-7.626701 20.019962-10.628058 49.368384-6.03546 74.356498 10.206456 55.537897 42.816155 87.711667 93.825922 102.195543 12.659321 3.594875 29.401634 7.361665 46.715975 5.257747 106.234533-12.932544 154.585751-115.737978 176.165232-213.541491 4.65195-21.084201 6.951319-42.571584 11.095709-65.209164 5.679349-31.029714 6.42534-64.355727 6.423293-101.027951-0.00307-27.773554-0.026606-53.468772-6.03546-74.748425C890.867352 431.736978 838.168106 376.519376 760.07961 362.105085zM908.603295 388.578016c-27.711132 7.568373-20.399609 42.807968 3.696182 39.71042C935.878498 425.257403 935.301354 387.94459 908.603295 388.578016z', {
    scale: 0.02,
    strokeWeight: 0.1,
    anchor: new BMap.Size(500, 250),
    rotation: 90,
    fillColor: '#1296db',
    fillOpacity: 0.8
});
// 百度地图API功能
var map = new BMap.Map("allmap");
BAIDU_ICON_RED = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
    offset: new BMap.Size(10, 25), // 指定定位位置
    imageOffset: new BMap.Size(0, 0 - 11 * 25) // 设置图片偏移
});
BAIDU_ICON_BLUE = new BMap.Icon("http://api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
    offset: new BMap.Size(10, 25), // 指定定位位置
    imageOffset: new BMap.Size(0, 0 - 10 * 25) // 设置图片偏移
});
ARROW_SVG =
    app.controller('mapShowCtrl', function ($scope) {


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

            angular.forEach(lushuList, function (t) {
                if(t._marker!=null) {
                    if (cmd == 'hide')
                        t._marker.hide();
                    else
                        t._marker.show();
                }
            });
            angular.forEach(detailScenicMark, function (t) {
                if(t!=null) {
                    if (cmd == 'hide')
                        t.hide();
                    else
                        t.show();
                }
            });
        }

//加载mark
        function markLocation(travels) {
            var travelMarks = [];
            angular.forEach(travels.scenicList, function (t, index) {
                //将travels按照年月分组存储\

                var point = new BMap.Point(t.pointX, t.pointY);
                var marker = new BMap.Marker(point);


                t.marker = marker;
                travelMarks.push(point);
                map.addOverlay(marker);
                if (index > 0) {
                    var point1= travelMarks[index - 1];
                    var point2=travelMarks[index];
                    var pointEnd= new BMap.Point((point1.lng+point2.lng)/2,(point1.lat+point2.lat)/2);
                    var lushu = new BMapLib.LuShu(map,[ point1,pointEnd], {
                        defaultContent: "",
                        autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                        icon: FOOT_SVG,
                        enableRotation: true, //是否设置marker随着道路的走向进行旋转
                        speed: 5000,
                        landmarkPois: []
                    });
                    t.lushu = lushu;
                    detailScenicMark.push(marker);
                    lushuList.push(lushu);
                } else {
                    var label = new BMap.Label(travels.scenicList.length, {offset: new BMap.Size(4, 0)});

                    label.setStyle({
                        background: 'none', border: 'none', color: 'white'
                    });
                    marker.setLabel(label);
                    travels.scenicList.countLabel = label;
                }

            });
            //旅途点之间的连线
            if (travels.scenicList.length > 1) {

                var polyline = new BMap.Polyline(travelMarks
                    , {strokeColor: "SteelBlue", strokeStyle: 'dashed', strokeWeight: 3, strokeOpacity: 0.9});
                travels.polyline = polyline;
                detailScenicMark.push(polyline);
                map.addOverlay(polyline);          //增加折线
                // addArrow(polyline);


                //lushuList.push(lushu);
            }
        }

        //----------------
        //这里只实现了两个点
        function addArrow(polyline) { //绘制箭头的函数
            var linePoint = polyline.getPath(); //线的坐标串
            var arrowCount = linePoint.length;
            for (var i = 0; i < arrowCount - 1; i++) {
                var point1 = linePoint[i];
                var point2 = linePoint[i + 1];
                var vectorBOArrow = getarrow(point1, point2);
                //detailScenicMark.push(vectorBOArrow);
                lushuList.push(vectorBOArrow);
                map.addOverlay(vectorBOArrow);          //增加折线
            }

        }

        function getarrow(point1, point2) {
            console.log(getAngle(point1.lng, point1.lat, point2.lng, point2.lat));
            var angle = getAngle(point2.lat, point2.lng, point1.lat, point1.lng);
            //var lushu = new BMapLib.LuShu(map, [point1, point2], {});
            var lushu = new BMapLib.LuShu(map, [point1, point2], {
                defaultContent: "",
                autoView: true, //是否开启自动视野调整，如果开启那么路书在运动过程中会根据视野自动调整
                icon: FOOT_SVG,
                enableRotation: true, //是否设置marker随着道路的走向进行旋转
                speed: 1,
                landmarkPois: []
            });
            return lushu;

            // rotation: angle,

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
            x = px1 - px2;
            y = py1 - py2;
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
                    console.log(data.dataObj);
                    TravelList = data.dataObj;
                    angular.forEach(data.dataObj, function (travel) {
                        //将travels按照年月分组存储
                        markLocation(travel);
                        var nowDate = new Date(travel.beginDate);
                        var monthDate = MonthEn[nowDate.getMonth()];
                        var datDate = nowDate.getDate();
                        var yearDate = nowDate.getFullYear();
                        var lastTravel = this[this.length - 1];
                        travel.positionLeft = Math.random() < 0.5 ? true : false;//图像随机左右
                        travel.imageSmallSize = Math.random() < 0.5 ? 'ss-small' : 'ss-medium';//图像随机大小
                        if (travel.imageList.length == 0) travel.imageList.push("/img/travelDefault.jpg");
                        if (this.length != 0 && lastTravel.monthDate + lastTravel.yearDate == monthDate + yearDate) {
                            lastTravel.travelList.push(travel);
                        }
                        else {
                            this.push({
                                beginDate: MonthEn[nowDate.getMonth()] + ' ' + datDate + ',' + yearDate,
                                travelList: [travel],
                                monthDate: monthDate,
                                yearDate: yearDate
                            });
                        }

                    }, angularTravelList);

                    $scope.$apply(function () {
                        $scope.travelList = angularTravelList;
                        console.log(angularTravelList);
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

//点击聚焦map对应mark操作
function focusTravel(travelId) {
    angular.forEach(TravelList, function (t) {
        if (t.$$hashKey == travelId) {

            if (map.getZoom() < 8)
                map.setZoom(8);
            map.panTo(t.scenicList[0].marker.point);
            angular.forEach(t.scenicList, function (mk, index) {
                mk.marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                mk.marker.setIcon(BAIDU_ICON_BLUE);
                if (index > 0)
                    mk.lushu.start();
            });
            t.polyline.setStrokeColor('darkOrange');
            t.scenicList.countLabel.hide();

            return;
        }
        else {
            t.polyline.setStrokeColor('SteelBlue');
            angular.forEach(t.scenicList, function (mk) {
                t.scenicList.countLabel.show();

                mk.marker.setAnimation(null); //跳动的动画
                mk.marker.setIcon(BAIDU_ICON_RED);
            });
        }
    });

}