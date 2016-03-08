

    $(function(){

        //通过点击购物车收回
        $("#shop").click(function(){
            //通过开关的形式给sidebar添加一个类，属性sidebarright的right：0；
//            $(".sidebar").toggleClass("sidebarright");

                if($(".sidebar").css("right")=="-295px"){
                    $(".sidebar").animate({right:'0'},"500");
                }else{
                    $(".sidebar").animate({right:'-295'},"500");
                }

        });
       // 点击>>收起
        $(".double-right").click(function(){
            $(".sidebar").animate({right:'-295'},"500");
        });
        //点击除了购物车的其他部分，收起购物车
        $(document).click(function(event){
			if($(".sidebar").css("right")=="0px"){
				$(".sidebar").animate({right:'-295'},"500");
			}	
			
		});
		//如果点击的是购物车部分，则阻止事件冒泡
		$(".sidebar").click(function(event){
			if($(".sidebar").css("right")=="0px"){
				event.stopPropagation();
			}	
			
		});


        //动态获取滚动条的高度，然后判断
        //var clientheight = $(document).height();//文档的高度

        $(window).scroll(function(){
            var clientheight = $(window).height();//可视窗口的高度
            var top = $(document).scrollTop();
            if(top>317){
                $(".excavator-bgbar").addClass("excavator-sticky");
            }else{
                $(".excavator-bgbar").removeClass("excavator-sticky");
            }
            //当前滚动轮大于可视窗口高度时，出现回到顶部图标
            if(top > clientheight){
                $("#btn").css("display","block");
            }else{
                $("#btn").css("display","none");
            }


            //if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
            //    alert("哦哦,到底了.");
            //}
        });

        var timer = null;
        $("#btn").click(function(){

            timer = setInterval(function(){
                var backtop = $(document).scrollTop();
                var speedtop = backtop/5;//向上取整，比如结果15.2，值就是16，这样最终backtop最终才可能为零 此做法是为了回到顶部的速度会越来越慢，除的数越大，速度越慢
                $(document).scrollTop(backtop - speedtop);
                if(backtop == 0){
                    clearInterval(timer);
                }
            },30);
        });



    });





