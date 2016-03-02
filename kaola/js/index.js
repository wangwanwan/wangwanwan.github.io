$(function(){
    //展开子菜单
    $(".menu").click(function(){
        if($(".topnavidx").css("height")=="50px"){
            $(".topnavidx").addClass("navopen");
        }else{
            $(".topnavidx").removeClass("navopen");
        }
    });
    //关闭下载APP提醒
    //$(".closewrap").click(function(){
    //    $(".headimg").css("display","none");
    //    $(".app-banner").css("display","none");
    //});
    $(document).delegate(".closewrap","click",function(event){

        if($(this).hasClass("spectial")){
            $(".headimg").css("display","none");
        }else{
            $(".headimg").css("display","none");
            $(".app-banner").css("display","none");

            $(".gotop-wrap").removeClass("iconup");
            $(".fixedtoweb").removeClass("iconup");

        }

    });

    $(window).scroll(function() {
        var clientheight = $(window).height();//可视窗口的高度
        var top = $(document).scrollTop();

        //当前滚动轮大于可视窗口高度时，出现回到顶部图标
        if (top > clientheight) {
            //出现回到顶部图标
            $(".gotop-wrap").addClass("show");
            //出现下载APP图片
            $(".app-banner").removeClass("hide");
            //回到顶部和去电脑版的图标相应上移,首先要判断提示下载的图片是不是已经被close掉
            if($(".app-banner").css("display")=="none"){
                $(".gotop-wrap").removeClass("iconup");
                $(".fixedtoweb").removeClass("iconup");
            }else{
                $(".gotop-wrap").addClass("iconup");
                $(".fixedtoweb").addClass("iconup");
            }

        } else {
            $(".gotop-wrap").removeClass("show");
            $(".app-banner").addClass("hide");
            $(".gotop-wrap").removeClass("iconup");
            $(".fixedtoweb").removeClass("iconup");
        }
    });

    var timer = null;
    $(".gotop").click(function(){

        timer = setInterval(function(){
            var backtop = $(document).scrollTop();
            var speedtop = backtop/5;//向上取整，比如结果15.2，值就是16，这样最终backtop最终才可能为零 此做法是为了回到顶部的速度会越来越慢，除的数越大，速度越慢
            $(document).scrollTop(backtop - speedtop);
            if(backtop == 0){
                clearInterval(timer);
            }
        },30);
    });


//    startSlide Integer (默认:0) - Swipe开始的索引
//
//    speed Integer (默认:300) - 前进和后台的速度，单位毫秒.
//    auto Integer - 自动滑动 (time in milliseconds between slides)
//
//    continuous Boolean (默认:true) -是否可以循环播放（注：我设置为false好像也是循环的）
//
//     disableScroll Boolean (默认:false) - 停止触摸滑动
//
//    stopPropagation Boolean (默认:false) -停止事件传播
//
//    callback Function - 回调函数，可以获取到滑动中图片的索引.
//
//     transitionEnd Function - 在最后滑动转化是执行.
    window.mySwipe = new Swipe(document.getElementById('slider'), {
        startSlide: 0,
        speed: 400,
        auto: 2000,
        continuous: true,
        disableScroll: false,
        stopPropagation: false,
        callback: function(index, elem) {
            //eq(index|-index)获取第N个元素
            //$("div").siblings()找到每个div的所有同辈元素。
            //siblings([expr])取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选。
            //$("div").siblings(".selected")找到每个div的所有同辈元素中带有类名为selected的元素。

            $("#slider").find(".imgpagebox").find("li").eq(index).addClass("active").siblings().removeClass("active");

        }
        //transitionEnd: function(index, elem) {}
    });




});
