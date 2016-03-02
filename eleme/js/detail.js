$(function(){
    //var offset = $("#shopping").offset();

    //动态获取滚动条的高度，然后判断
    $(window).scroll(function(){
        var top = $(document).scrollTop();

        if(top>270){
            $(".shopmenu-nav").addClass("sticky");
            $(".shopbulletin").addClass("sticky");
        }else{
            $(".shopmenu-nav").removeClass("sticky");
            $(".shopbulletin").removeClass("sticky");
        }


    });

    //详情页进行网格和列表切换
    $("#list").click(function(){
        var col_2 = $(".shopmenu-food-main");
        var col_3 = $(".shopmenu-food-price");

        for(var i = 0;i < col_2.length;i++){
            col_2.eq(i).addClass("col-2");
        }
        for(var i = 0;i < col_3.length;i++){
            col_3.eq(i).addClass("col-3");
        }

        $(".shopmenu-main").removeClass("grid");
        $(".shopmenu-main").addClass("list");


        $("#grid").removeClass("active");
        $("#list").addClass("active");

    });
    $("#grid").click(function(){
        $(".shopmenu-main").addClass("grid");
        $(".shopmenu-main").removeClass("list");

        $("#grid").addClass("active");
        $("#list").removeClass("active");

    });

    //导航餐品分类的时候切换效果,最初版
    //$(".menu").click(function(){
    //
    //    var menus = $(".menu");
    //    for(var i = 0;i < menus.length;i++){
    //        if(menus.eq(i).hasClass("active")){
    //            menus.eq(i).removeClass("active");
    //        }
    //    }
    //    $(this).addClass("active");
    //});

    //餐品分类，利用委托的好处是不用每个分类都写一个点击事件
    $(document).delegate(".menu","click",function(){
        var menus = $(".menu");
        for(var i = 0;i < menus.length;i++){
            if(menus.eq(i).hasClass("active")){
                menus.eq(i).removeClass("active");
            }
        }
        $(this).addClass("active");
        var body = $("body");//试的好像用document不行
        if($(this).hasClass("first")){
            //$(document).scrollTop(200);
            body.animate({scrollTop:200}, '300');
        }else if($(this).hasClass("zhongcan")){
            body.animate({scrollTop:362}, '300');
        }else if($(this).hasClass("zhushi")){
            body.animate({scrollTop:1105}, '300');

        }else if($(this).hasClass("xiaochi")){
            body.animate({scrollTop:1732}, '300');

        }else if($(this).hasClass("taocan")){
            body.animate({scrollTop:2137}, '300');

        }else if($(this).hasClass("yinpin")){
            body.animate({scrollTop:2423}, '300');

        }else if($(this).hasClass("jiushui")){
            body.animate({scrollTop:2819}, '300');

        }

    });




    //价格初始值判断
    //price();
    standard();//判断是否达到起送标准

    //点击购物车收缩开关,分为购物车有商品和没有商品的时候
    $(".shop-cartfooter").click(function(){
        //$(".shop-cartbasket")[0].style.top = "-208px";//如果在行内样式设置，不知道怎么设置速度
        var top = $(".shop-cartbasket").css("top");

       // 只有在购物车为空的情况下，才能这样做
        if($(".shop-cartfooter-price").text() == 0){
            //$(".shop-cartbasket-empty").removeClass("hidden");

            if(top != "0px"){
                $(".shop-cartbasket").animate({top:"0px"},300);
            }
            else{
                $(".shop-cartbasket").animate({top:"-206px"},300);
            }
        }else {
            //购物车不为空的情况下
            $(".shop-cartbasket-empty").addClass("hidden");
            $(".all-tablerow").removeClass("hidden");


            //去循环有多少个shop-cartbasket-tablerow
            var totaltop = totalrowtop();

            if(top != "0px" && top != "-44px"){
                $(".shop-cartbasket").animate({top:"0px"},300);
            }
            else{
                $(".shop-cartbasket").animate({top:totaltop},300);
            }
            //$(".shop-cartbasket").fadeToggle(500);

        }


    });

    //清空购物车函数
    $(".clear").click(function(){

        $(".shop-cartbasket-tablerow").remove();//删除购物车所有列表
        $(".shop-cartbasket-empty").removeClass("hidden");
        //$(".all-tablerow").addClass("hidden");
        $(".shop-cartbasket").css("top","-206px");//还原为最初高度
        $(".shop-cartpieces").addClass("hidden");//数量隐藏
        $(".shop-cartfooter-text").addClass("hidden");//价格隐藏
        $(".shop-cartfooter-checkout").addClass("disabled");
        $(".shop-cartfooter-checkout").text("购物车是空的");
        $(".shop-carthelper-opener").removeClass("show");//把凑一凑的图片藏起来
        $(".shop-cartfooter-price").text("0");//一定记得把总价格改为0，不然点击收缩将会变得不正常



        //此种做法是为了把已售完的商品排除出去，不然就是再次加上“加入购物车”的样式
        var html = $("#button").html();
        var col_4 = $(".col-4");
        for(var i = 0;i < col_4.length;i++){
            if(col_4.eq(i).children().attr("class") == "shop-cartctrl"){
                col_4.eq(i).children().remove();
                $(html).appendTo(col_4.eq(i));
            }
        }
        //反例（错误的），就是把已售完的商品又加上了样式
        //var html = $("#button").html();
        //$(".shop-cartbutton").remove();//先把所有的button样式 给删了，再添上没有改变之前的button样式，不然会有重影
        //$(".shop-cartctrl").remove();//
        //$(html).appendTo($(".col-4"));

    });



    //点击商品上的加入购物车的时候
    //用事件委托是为了把已售完的商品排除在外,已售完的商品不能点
    $(document).delegate(".shop-cartbutton","click",function(event){

        if($(this).hasClass("disabled")){
            //alert("已售完");
        }else{

            //fly(event);

            //使用模板往all-tablerow里面加tablerow,同时top向上移动44px
            //去循环有多少个shop-cartbasket-tablerow

            //var $col = $(this).parent();和$(this).remove();顺序不能颠倒，如果先删除就找不到父了
            var $col = $(this).parent();
            //拿到餐品的名字
            var title_name = $(this).parent().prevAll(".shopmenu-food-main").children(".shopmenu-food-name").text();
            //拿到餐品的价格
            var title_price = $(this).parent().prev().text();
            //拿到餐品的data-id,把值给到模板传到购物车列表里面
            var data_id = $(this).parent().parent().attr("data-id");

            $(this).remove();
            //替换购物车模板
            var html = $("#buttontemplate").html();

            $(html).appendTo($col);

            var $tablerow = $(".all-tablerow");
            var html = $("#template").html();
            html = html.replace("{{title-name}}", title_name).replace("{{title-price}}",title_price).replace("{{data-id}}",data_id);

            $(html).appendTo($tablerow);

            $(".shop-cartbasket-empty").addClass("hidden");
            $(".all-tablerow").removeClass("hidden");

            var totaltop = totalrowtop();//通过循环拿到总top值
            //$(".shop-cartfooter-price").text("16");
            $(".shop-cartfooter-text").removeClass("hidden");
            $(".shop-cartfooter-checkout").removeClass("hidden");
            $(".shop-cartpieces").removeClass("hidden");

            //循环取到总份数和总价格
            var money = totalprice();
            var number = totalnum();

            $(".shop-cartpieces").text(number);
            $(".shop-cartfooter-price").text(money);

            standard();//判断是否达到起送标准
            $(".shop-cartbasket").animate({top:totaltop},300);





            //$(".shop-cartbasket").css("top",(parseInt($(".shop-cartbasket").css("top"))-44)+"px");

        }


    });

    //右侧购物车数量点击时，同时改变左侧列表数量值 获得单价数量，从而求出总数量和总价格
    $(document).delegate(".cell.itemquantity","click",function(){
        var value = $(this).children("input").val();
        var data_id = $(this).parent().attr("data-id");
        //alert(data_id);
        var shopmenu = $(".shopmenu-food");
        for(var i = 0;i < shopmenu.length;i++){
            //alert(shopmenu.eq(i).attr("data-id"));
            if(shopmenu.eq(i).attr("data-id") == data_id){
                shopmenu.eq(i).children(".col-4").children(".shop-cartctrl").children("input").val(value);
                var unitprice = parseInt(shopmenu.eq(i).children(".shopmenu-food-price").text().substr(1));//单价
                $(this).next().text("￥"+ unitprice*value);

                if(value == 0){
                    $(this).parent().remove();

                    var newtop = totalrowtop();
                    $(".shop-cartbasket").animate({top:newtop},300);

                    var html = $("#button").html();
                    shopmenu.eq(i).children(".col-4").children(".shop-cartctrl").remove();
                    $(html).appendTo(shopmenu.eq(i).children(".col-4"));
                    standard();

                }
                //动态改变数量和总价格
                $(".shop-cartpieces").text(totalnum());
                $(".shop-cartfooter-price").text(totalprice());
                standard();
            }
        }


    });

    //左侧购物车数量改变时，同时改变右侧列表数量值，获得单价数量，从而求出总数量和总价格
    $(document).delegate(".shop-cartctrl","click",function(){
        var value = $(this).children("input").val();//获取数量
        var data_id = $(this).parent().parent().attr("data-id");
        var table_row = $(".shop-cartbasket-tablerow");
        for(var i = 0;i < table_row.length;i++){
            if(table_row.eq(i).attr("data-id") == data_id){
                table_row.eq(i).children(".itemquantity").children("input").val(value);
                var unitprice = parseInt($(this).parent().prev().text().substr(1));
                table_row.eq(i).children(".cell.itemtotal").text("￥"+ unitprice*value);


                if(value == 0){
                    table_row.eq(i).remove();

                    //$(this).parent().parent().remove();
                    var newtop = totalrowtop();
                    $(".shop-cartbasket").animate({top:newtop},300);

                    var html = $("#button").html();
                    $(html).appendTo($(this).parent());
                    $(this).remove();//先删后加，顺序不能反
                    standard();

                }
                //动态改变数量和总价格
                $(".shop-cartpieces").text(totalnum());
                $(".shop-cartfooter-price").text(totalprice());
                standard();

            }
        }

    });



    // 点击+购物车商品的时候,事件冒泡，外层事件捕获
    $(document).delegate(".plus","click",function(){
        var num = parseInt($(this).prev().val());//获取到数值
        var newnum = num + 1;//点击之后的新数值
        $(this).prev().val(newnum);//新数值赋值
       // fly(event);

    });


    //点击-购物车时
    $(document).delegate(".minus","click",function(){
        var num = parseInt($(this).next().val());//获取到数值
        var newnum = num - 1;//点击之后的新数值
        $(this).next().val(newnum);//新数值赋值

    });



    //加入购物车的动态效果
    function fly(event){
        var flyer = $('<div class="flyer">');
        flyer.fly({
            start: {
                left: event.clientX,
                top: event.clientY
            },
            end: {
                left: offset.left+200,
                top: offset.top+200,
                width: 80,
                height: 80
            },
            onEnd: function(){
                $(this).css("cursor","default").removeClass('orange').unbind('click');
                this.destory();
            }
        });
    }

    //回到顶部
    var timer = null;
    $("#backtop").click(function(){

        timer = setInterval(function(){
            var backtop = $(document).scrollTop();
            var speedtop = backtop/5;//此做法是为了回+到顶部的速度会越来越慢，除的数越大，速度越慢
            $(document).scrollTop(backtop - speedtop);
            if(backtop == 0){
                clearInterval(timer);
            }
        },30);
    });





    //判断购物车商品的价格是否达到起送价
    function standard(){
        if($(".shop-cartfooter-text").text() == 0){
            $(".shop-cartfooter-checkout").text("购物车是空的");
            $(".shop-cartfooter-checkout").addClass("disabled");
            $(".shop-cartpieces").addClass("hidden");//数量隐藏
            $(".shop-cartfooter-text").addClass("hidden");//价格隐藏
            $(".shop-carthelper-opener").removeClass("show");//把凑一凑的图片藏起来

            $(".shop-cartbasket-empty").removeClass("hidden");
            //$(".shop-cartbasket").animate({top:"-206px"},300);

        }else if($(".shop-cartfooter-price").text() < 20){
            $(".shop-cartfooter-checkout").addClass("disabled");
            $(".shop-cartpieces").removeClass("hidden");
            $(".shop-cartfooter-text").removeClass("hidden");
            $(".all-tablerow").removeClass("hidden");
            $(".shop-cartfooter-checkout").text("还差"+(20-$(".shop-cartfooter-text").text())+"元起送");
            $(".shop-carthelper-opener").addClass("show");
        }else{
            $(".shop-carthelper-opener").removeClass("show");
            $(".shop-cartfooter-checkout").text("去结算");
            $(".shop-cartfooter-checkout").removeClass("disabled");
        }
    }



    //循环拿到总份数
    function totalnum(){
        var totalrow = $(".shop-cartbasket-tablerow");
        var totalnum = 0;
        for(var i = 0;i<totalrow.length;i++){

            num = totalrow.eq(i).children(".itemquantity").children("input").val();
            totalnum = totalnum+parseInt(num);
        }
        return totalnum;

    }

    //总钱数
    function totalprice(){
        var totalrow = $(".shop-cartbasket-tablerow");
        var totalprice = 0;
        for(var i = 0;i<totalrow.length;i++){
            money = totalrow.eq(i).children(".itemtotal").text();//此时的money是个字符串￥..
            totalprice = totalprice + parseInt(money.substr(1));

        }
        return totalprice;
    }

    //循环有有多少条商品数据，返回总top值
    function totalrowtop(){
        var totalrow = $(".shop-cartbasket-tablerow");

        var totaltop = -(totalrow.length * 44 + 44) + "px";
        return totaltop;

    }

    ////判断价格等于零时的操作
    //function price(){
    //    if($(".shop-cartfooter-price").text() != 0){
    //        $(".shop-cartpieces").removeClass("hidden");
    //        $(".shop-cartfooter-text").removeClass("hidden");
    //        $(".all-tablerow").removeClass("hidden");
    //    }
    //}


});
