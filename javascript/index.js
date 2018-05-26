$(function () {
    // header-link-store下拉
    $(".header-top-link>ul>li:eq(5)").on("mouseenter", function () {
        $(this).children('a').removeClass().addClass('icon-sort-up');
        $(this).children('ul').slideDown();
    });
    $(".header-top-link>ul>li:eq(5)").on("mouseleave", function () {
        $(this).children('a').removeClass().addClass('icon-sort-down');
        $(this).children('ul').slideUp();
    });
    // header-nav鼠标滑过变色
    $(".header-nav-content li:eq(0)").siblings().children().on("mouseenter mouseleave", function () {
        $(this).toggleClass("current");
    });
    // header-nav下拉菜单
    $(".header-nav-content>ul>li:eq(3)").nextAll().on("mouseenter", function () {
        $(this).children('div').show();
        $(this).addClass('arrow');
    });
    $(".header-nav-content>ul>li:eq(3)").nextAll().on("mouseleave", function () {
        $(this).children('div').hide();
        $(this).removeClass('arrow');
    });
    // header-icon 下拉
    $(".header-nav-icon>a:eq(1)").on("mouseenter", function () {
        $(this).next().show();
        $(this).addClass('arrow');
    });
    $(".header-nav-icon>a:eq(1)").on("mouseleave", function () {
        $(this).next().hide();
        $(this).removeClass('arrow');
    });
    // fixed-header 固定
    $(window).scroll(function () {
        var $scrollTop = $(document).scrollTop();
        if ($scrollTop > 80) {
            $(".fixed-header").show();
        } else {
            $(".fixed-header").hide();
        }
    });
    // fixed-header变色
    $(".fixed-header ul>li:eq(0)").nextAll().on("mouseenter mouseleave", function () {
        $(this).children('a').toggleClass('current');
    });
    // fixed-header-nav下拉菜单
    $(".fixed-header ul>li:eq(3)").nextAll().on("mouseenter", function () {
        $(this).children('div').show();
        $(this).addClass('arrow');
    });
    $(".fixed-header ul>li:eq(3)").nextAll().on("mouseleave", function () {
        $(this).children('div').hide();
        $(this).removeClass('arrow');
    });
    // fixed-header-icon 下拉
    $(".fixed-header").children(0).children("div.header-nav-icon").children("a:eq(0)").on("mouseenter", function () {
        $(this).next().show();
        $(this).addClass('arrow');
    });
    $(".fixed-header").children(0).children("div.header-nav-icon").children("a:eq(0)").on("mouseleave", function () {
        $(this).next().hide();
        $(this).removeClass('arrow');
    });
    $(".header-nav-icon-login").on("mouseenter", function () {
        $(this).show().prev().addClass('arrow');
    });
    $(".header-nav-icon-login").on("mouseleave", function () {
        $(this).hide().prev().removeClass('arrow');
    });
    // board-side 日期赛程
    var dateLength = $(".schedule-date-content>ul>li").length;
    var dateNum = 0;

    function boardUpdate() {
        // 更新日期
        $(".schedule-date-content>ul>li").eq(dateNum).show().siblings().hide();
        // 更新board区域
        $(".schedule-board-content>ul").eq(dateNum).show().siblings().hide();
        // 更新比赛场数
        $(".schedule-matches>span").html($(".schedule-board-content>ul").eq(dateNum).children('li').length);
    }

    boardUpdate();
    dateBtn();
    boardSlide();
    $(".schedule-date>a:eq(0)").on("click", function () {
        if (dateNum > 0) {
            dateNum--;
            boardUpdate();
            boardSlide();
        }
        dateBtn();
    });

    $(".schedule-date>a:eq(1)").on("click", function () {
        if (dateNum < dateLength - 1) {
            dateNum++;
            boardUpdate();
            boardSlide();
        }
        dateBtn();
    });

    function dateBtn() {
        if (dateNum == 0) {
            $(".schedule-date>a:eq(0)").css("color", "#777f7f");
            $(".schedule-date>a:eq(1)").css("color", "#fff");
        } else if (dateNum == dateLength - 1) {
            $(".schedule-date>a:eq(0)").css("color", "#fff");
            $(".schedule-date>a:eq(1)").css("color", "#777f7f");
        }
    }

    // schedule-board 左右滑动
    function boardSlide() {
        $(".schedule-board-content>ul").eq(dateNum).css("width", $(".schedule-board-content>ul").eq(dateNum).children('li').length * 235 + "px");
        var boardWidth = $(".schedule-board-content>ul").eq(dateNum)[0].offsetWidth;

        function boardBtn() {
            if (boardWidth > 1009 && $(".schedule-board-content>ul").eq(dateNum).position().left > (1009 - boardWidth)) {
                $(".schedule-board>a:eq(1)").css("backgroundColor", "#2464b5");
            } else {
                $(".schedule-board>a:eq(1)").css("backgroundColor", "#e5e5e5");
            }
            if ($(".schedule-board-content>ul").eq(dateNum).position().left < 0) {
                $(".schedule-board>a:eq(0)").css("backgroundColor", "#2464b5");
            } else {
                $(".schedule-board>a:eq(0)").css("backgroundColor", "#e5e5e5");
            }
        }

        boardBtn();
        $(".schedule-board>a:eq(1)").on("click", function () {
            if (boardWidth > 1009 && $(".schedule-board-content>ul").eq(dateNum).position().left > (1009 - boardWidth)) {
                $(".schedule-board-content>ul").eq(dateNum).animate({"left": $(".schedule-board-content>ul").eq(dateNum).position().left - 940}, 500, function () {
                    boardBtn();
                });
            }
        });
        $(".schedule-board>a:eq(0)").on("click", function () {
            if ($(".schedule-board-content>ul").eq(dateNum).position().left < 0) {
                $(".schedule-board-content>ul").eq(dateNum).animate({"left": $(".schedule-board-content>ul").eq(dateNum).position().left + 940}, 500, function () {
                    boardBtn();
                });
            }
        });
    }

    // board-score 胜者红色
    for (var i = 0; i < $(".schedule-board-content-score").length; i++) {
        if ($(".schedule-board-content-score").eq(i).children().eq(0).html() > $(".schedule-board-content-score").eq(i).children().eq(1).html()) {
            $(".schedule-board-content-score").eq(i).children().eq(0).addClass("win");
        } else {
            $(".schedule-board-content-score").eq(i).children().eq(1).addClass("win");
        }
    }
    // slider
    var picNum = $(".sectionSlider-slider-view>ul>li").length;
    var picIndex = 0;
    var pointIndex = 0;
    $(".sectionSlider-slider-view>ul").append($(".sectionSlider-slider-view>ul>li:eq(0)").clone());
    $(".sectionSlider-slider-view").on("mouseenter", function () {
        $(this).children("a").show();
    });
    $(".sectionSlider-slider-view").on("mouseleave", function () {
        $(this).children("a").hide();
    });
    $(".sectionSlider-slider-view>ul").css("width", (picNum + 1) * 510);
    for (var i = 0; i < picNum; i++) {
        $(".sectionSlider-slider-view>ol").append("<li></li>");
    }
    $(".sectionSlider-slider-view>ol>li").on("click", function () {
        clearInterval(timerSlider);
        pointIndex = $(this).index();
        picIndex = $(this).index() + 1;
        $(".sectionSlider-slider-view>ol>li").eq(pointIndex).css("backgroundColor", "#fff").siblings().css("backgroundColor", "#979797");
        $(".sectionSlider-slider-view>ul").animate({"left": -picIndex * 510}, 500);
        timerSlider = setInterval(sliderShow, 2000);
    });
    $(".sectionSlider-slider-view>a:eq(0)").on("click", function () {
        clearInterval(timerSlider);
        pointIndex--;
        picIndex--;
        pointIndex = pointIndex % picNum;
        if (picIndex == -1) {
            picIndex = picNum - 1;
        }
        if ($(".sectionSlider-slider-view>ul").css("left") == "0px") {
            $(".sectionSlider-slider-view>ul").css("left", -picNum * 510 + "px");
        }
        $(".sectionSlider-slider-view>ol>li").eq(pointIndex).css("backgroundColor", "#fff").siblings().css("backgroundColor", "#979797");
        $(".sectionSlider-slider-view>ul").animate({"left": -picIndex * 510}, 200);

        timerSlider = setInterval(sliderShow, 2000);
    });
    $(".sectionSlider-slider-view>a:eq(1)").on("click", function () {
        clearInterval(timerSlider);
        sliderShow();
        timerSlider = setInterval(sliderShow, 2000);
    });
    var timerSlider = null;
    timerSlider = setInterval(sliderShow, 2000);

    function sliderShow() {
        pointIndex++;
        picIndex++;
        pointIndex = pointIndex % picNum;
        if (picIndex == (picNum + 1)) {
            picIndex = 1;
        }
        if ($(".sectionSlider-slider-view>ul").css("left") == -picNum * 510 + "px") {
            $(".sectionSlider-slider-view>ul").css("left", 0);
        }
        $(".sectionSlider-slider-view>ol>li").eq(pointIndex).css("backgroundColor", "#fff").siblings().css("backgroundColor", "#979797");
        $(".sectionSlider-slider-view>ul").animate({"left": -picIndex * 510}, 200);
    }

    // importantNews 点击切换
    var iptnewsIndex = 0;

    $(".sectionSlider-importantNews-title>a").on("click", function () {
        iptnewsIndex++;
        iptnewsIndex %= 4;
        $(".sectionSlider-importantNews-content>ul").eq(iptnewsIndex).show().siblings().hide();
    });
    // news-content 点击切换
    var newsPage = 0;
    $(".news-news-content>div").eq(newsPage).show().siblings().hide();
    $(".news-news-switch>a").on("click", function () {
        newsPage++;
        newsPage %= $(".news-news-content>div").length;
        $(".news-news-content>div").eq(newsPage).show().siblings().hide();
        console.log($(".news-news-content>div").length + "----------" + newsPage)
    });
    // ranking部分
    function ranking() {
        if ($(".ranking-type>a:eq(0)").hasClass("active")) {
            $(".league").show().siblings().hide();
            if ($(".ranking-group>a:eq(0)").hasClass("active")) {
                for (var i = 0; i < 15; i++) {
                    $(".league tbody tr").eq(i).children("td").eq(1).css({
                        "background": rankingLeague[i].logo,
                        "background-size": "30px 30px"
                    });
                    $(".league tbody tr").eq(i).children("td").eq(2).html("<a href='javascript:;'>" + rankingLeague[i].state + " - " + rankingLeague[i].name + "</a>").css("text-align", "left");
                    $(".league tbody tr").eq(i).children("td").eq(3).html(rankingLeague[i].win);
                    $(".league tbody tr").eq(i).children("td").eq(4).html(rankingLeague[i].lose);
                    $(".league tbody tr").eq(i).children("td").eq(5).html((rankingLeague[0].win - rankingLeague[i].win + rankingLeague[i].lose - rankingLeague[0].lose) / 2);
                }
            } else {
                for (var i = 0; i < 15; i++) {
                    $(".league tbody tr").eq(i).children("td").eq(1).css({
                        "background": rankingLeague[i + 15].logo,
                        "background-size": "30px 30px"
                    });
                    $(".league tbody tr").eq(i).children("td").eq(2).html("<a href='javascript:;'>" + rankingLeague[i + 15].state + " - " + rankingLeague[i + 15].name + "</a>").css("text-align", "left");
                    $(".league tbody tr").eq(i).children("td").eq(3).html(rankingLeague[i + 15].win);
                    $(".league tbody tr").eq(i).children("td").eq(4).html(rankingLeague[i + 15].lose);
                    $(".league tbody tr").eq(i).children("td").eq(5).html((rankingLeague[15].win - rankingLeague[i + 15].win + rankingLeague[i + 15].lose - rankingLeague[15].lose) / 2);
                }
            }
        } else {
            $(".zone").show().siblings().hide();
            if ($(".ranking-group>a:eq(0)").hasClass("active")) {
                for (var i = 0; i < 3; i++) {
                    $(".zone").children("div").eq(i).html(rankingZone[5 * i + 1].zone + "分区");
                }
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 3; j++) {
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(1).css({
                            "background": rankingZone[5 * j + i].logo,
                            "background-size": "30px 30px"
                        });
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(2).html("<a href='javascript:;'>" + rankingZone[5 * j + i].state + " - " + rankingZone[5 * j + i].name + "</a>").css("text-align", "left");
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(3).html(rankingZone[5 * j + i].win);
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(4).html(rankingZone[5 * j + i].lose);
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(5).html((rankingZone[5 * j].win - rankingZone[5 * j + i].win + rankingZone[5 * j + i].lose - rankingZone[5 * j].lose) / 2);
                    }
                }
            } else {
                for (var i = 0; i < 3; i++) {
                    $(".zone").children("div").eq(i).html(rankingZone[5 * i + 16].zone + "分区");
                }
                for (var i = 0; i < 5; i++) {
                    for (var j = 0; j < 3; j++) {
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(1).css({
                            "background": rankingZone[5 * j + i + 15].logo,
                            "background-size": "30px 30px"
                        });
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(2).html("<a href='javascript:;'>" + rankingZone[5 * j + i + 15].state + " - " + rankingZone[5 * j + i + 15].name + "</a>").css("text-align", "left");
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(3).html(rankingZone[5 * j + i + 15].win);
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(4).html(rankingZone[5 * j + i + 15].lose);
                        $(".zone tbody").eq(j).children("tr").eq(i).children("td").eq(5).html((rankingZone[5 * j + 15].win - rankingZone[5 * j + i + 15].win + rankingZone[5 * j + i + 15].lose - rankingZone[5 * j + 15].lose) / 2);
                    }
                }
            }
        }
    };
    ranking();
    $(".ranking-type>a").on("click",function () {
        if( !$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
        }
        ranking();
    });
    $(".ranking-group>a").on("click",function () {
        if( !$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
        }
        ranking();
    });
    // video左右滑动
    var videoPage = 0;
    var videoShow = ".video-game";
    for (var i=0 ; i<3; i++) {
        $(".video-content>div").eq(i).css("width", $(".video-content>div").eq(i).children().length * 1220 + "px");
    }
    $(".video-tab>span").on("click",function () {
        $(this).addClass("active").siblings().removeClass("active");
        videoShow = this.dataset["show"];
        videoPage = 0;
        $(videoShow).show().css("left",0).siblings("div").hide();
        videoBtn();
    });
    $(".video-game").show();
    videoBtn();

    $(".video-content>span:eq(1)").on("click", function () {
        if ($(videoShow).position().left-1220>-$(videoShow).outerWidth()) {
            videoPage++;
            $(videoShow).animate({"left": -videoPage * 1220}, 500,videoBtn);
        }
    });
    $(".video-content>span:eq(0)").on("click", function () {
        if($(videoShow).position().left<0) {
            videoPage--;
            $(videoShow).animate({"left": -videoPage * 1220}, 500,videoBtn);
        }

    });
    function videoBtn(){
        if ($(videoShow).position().left-1220>-$(videoShow).outerWidth()){
            $(".video-content>span:eq(1)").show();
        }else {
            $(".video-content>span:eq(1)").hide();
        }
        if ($(videoShow).position().left<0){
            $(".video-content>span:eq(0)").show();
        }else{
            $(".video-content>span:eq(0)").hide();
        }
    }
    // leader tab切换及滑动
    var leaderShow = ".leader-daily";
    leaderBtn();
    $(".leader-tab>span").on("click",function () {
        leaderShow = this.dataset["show"];
        $(this).addClass("active").siblings().removeClass("active");
        $(leaderShow).show().siblings("ul").hide();
        leaderBtn();
    });
    $(".leader-content>span:eq(0)").on("click",function () {
       $(leaderShow).animate({"left":0},500,leaderBtn);
    });
    $(".leader-content>span:eq(1)").on("click",function () {
        $(leaderShow).animate({"left":1170-$(leaderShow).outerWidth()},500,leaderBtn);
    });
    function leaderBtn(){
        if($(leaderShow).position().left<0){
            $(".leader-content>span:eq(0)").show();
        }else {
            $(".leader-content>span:eq(0)").hide();
        }
        if($(leaderShow).position().left - 1170 > -$(leaderShow).outerWidth()){
            $(".leader-content>span:eq(1)").show();
        }else {
            $(".leader-content>span:eq(1)").hide();
        }
    };
    // socialMedia二维码
    $(".socialMedia li").on("mouseenter",function () {
       $(this).children(".qr").animate({"bottom":80,"height":136},200);
    });
    $(".socialMedia li").on("mouseleave",function () {
        $(this).children(".qr").animate({"bottom":0,"height":80},200);
    });

});
