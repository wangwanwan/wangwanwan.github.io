$(function(){
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

            $("#slider").find(".position").find("li").eq(index).addClass("on").siblings().removeClass("on");

        }
        //transitionEnd: function(index, elem) {}
    });


        gettime();

       function gettime(){
           var newtime = new Date(2016,2,4,13,24,00);//月份是从0开始的，1就是代表2月份
           var nowtime = new Date();
           var updatetime = newtime.getTime()-nowtime.getTime();//毫秒数
           var totalseconds = Math.round(updatetime/1000);//转化成秒，round()把数四舍五入为最接近的整数;
           //不至于出现负数
           if(totalseconds>0){
               totalseconds = totalseconds;
           }else{
               totalseconds = 0;
               clearInterval(time);
           }

           var hours = parseInt(totalseconds/3600);//得到小时数
           var hoursone = parseInt(hours%10);//hout的十位数
           var hoursten = parseInt(hours/10);//hour的个位数

           var minutes = parseInt((totalseconds-hours*3600)/60);
           var minutesone = parseInt(minutes%10);
           var minutesten = parseInt(minutes/10);

           var seconds = parseInt(totalseconds%60);
           var secondsone = parseInt(seconds%10);
           var secondsten = parseInt(seconds/10);


           $(".hour-ones-top").text(hoursone);
           $(".hour-tens-top").text(hoursten);
           $(".minute-ones-top").text(minutesone);
           $(".minute-tens-top").text(minutesten);
           $(".second-ones-top").text(secondsone);
           $(".second-tens-top").text(secondsten);

       }
    setInterval(gettime,1000);




});
