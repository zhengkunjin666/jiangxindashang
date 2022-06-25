let userNames=[{name:'小狗狗'},{name:'小鹿鹿'},{name:'小羊羊'},{name:'小猫猫'}];
let backgroundColors=['#FFF0F0','#FEFFF0','#F1FFF0','#F0F5FF'];
let borders=['1px solid #EAD5D5','1px solid #F3F4DF','1px solid #DBEAD5','1px solid #D5D6EA'];
const PAGE={
    data: {
        backgroundColors: backgroundColors,
        borders: borders,
        defaultDatas: userNames,
        itemWidth: 320,
        itemMinHeight: 158,
        paddingOffset: 30,
        zIndex: 0,
        item: null,
        itemOffsetTop: null,
        itemOffsetLeft: null,
        pageX: null,
        pageY: null,
        isLock: true,
    },
    init: function(){
        this.bind();
        this.getMessages();
    },
    bind: function(){
        $(window).load(this.slideDown);
        $(window).load(this.animation1);
        $(window).load(this.animation2);
        $(".message-btn").click(this.addMessage);
        $(".close-tag").live('click',function(){$(this).parent().remove();});
        // $(".close-tag").live('click',function(){PAGE.data.zIndex-=2;});
        $(".message-borad").delegate(".message-item","mousedown",this.handleMouseDown);
        window.addEventListener("mousemove",this.handleMouseMove);
        window.addEventListener("mouseup",this.handleMouseUp);
        $(window).unload(this.saveMessages);
    },
    slideDown: function(){
        $(".page-footer").animate({"margin-top":"50px"},10,function(){
            $(".main-container").slideDown(4000);
        }).delay(3000)
        .animate({"margin-top":"49px"},100,function(){
            $(".main-container").css("overflow","visible");
        })
    },
    animation1: function(){
        setInterval(function(){
            $('.lesson-img:eq(0)').animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(3)').css("transform","translateX(-300px)");
                $('.lesson-img:eq(4)').css("opacity","0");
                $('.lesson-img:eq(0)').css("transform","translateX(150px)");
                $('.lesson-img:eq(1)').css("transform","translateX(0px)");
                $('.lesson-img:eq(1)').css("transition","all 0.5s");
            }).delay(4000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(3)').css("opacity","1");
                $('.lesson-img:eq(4)').css("transform","translateX(-300px)");
                $('.lesson-img:eq(0)').css("transform","translateX(-300px)");
                $('.lesson-img:eq(1)').css("transform","translateX(200px)");
                $('.lesson-img:eq(2)').css("transform","translateX(0px)");
                $('.lesson-img:eq(2)').css("transition","all 0.5s");
            }).delay(4000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(4)').css("opacity","1");
                $('.lesson-img:eq(1)').css("transform","translateX(-300px)");
                $('.lesson-img:eq(2)').css("transform","translateX(200px)");
                $('.lesson-img:eq(3)').css("transform","translateX(0px)");
                $('.lesson-img:eq(3)').css("transition","all 0.5s");
            }).delay(4000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(2)').css("transform","translateX(-300px)");
                $('.lesson-img:eq(3)').css("transform","translateX(200px)");
                $('.lesson-img:eq(4)').css("transform","translateX(0px)");
                $('.lesson-img:eq(4)').css("transition","all 0.5s");
            }).delay(4000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(3)').css("opacity","0");
                $('.lesson-img:eq(4)').css("transform","translateX(300px)");
                $('.lesson-img:eq(0)').css("transform","translateX(0px)");
                $('.lesson-img:eq(0)').css("transition","all 0.4s");
            }).delay(4000)
        })
    },
    animation2: function(){
        setInterval(function(){
            $('.lesson-img:eq(5)').animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(5)').css("transform","translateX(150px)");
                $('.lesson-img:eq(6)').css("transform","translateX(0px)");
                $('.lesson-img:eq(6)').css("transition","all 0.5s");
            }).delay(2000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(6)').css("transform","translateX(300px)");
                $('.lesson-img:eq(7)').css("transform","translateX(0px)");
                $('.lesson-img:eq(7)').css("transition","all 0.5s");
            }).delay(2000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(7)').css("transform","translateX(300px)");
                $('.lesson-img:eq(8)').css("transform","translateX(0px)");
                $('.lesson-img:eq(8)').css("transition","all 0.5s");
            }).delay(2000)
            .animate({"left":"0px"},1000,function(){
                $('.lesson-img:eq(8)').css("transform","translateX(300px)");
                $('.lesson-img:eq(5)').css("transform","translateX(0px)");
                $('.lesson-img:eq(5)').css("transition","all 0.4s");
            }).delay(2000)
        })
    },
    addMessage: function(){
        let value=$(".message-textarea").val().trim();
        if(value!=''){
            let zIndex=++PAGE.data.zIndex;
            let userName=userNames[zIndex%userNames.length].name;
            let messageElement=`
                <img class="close-tag" src="./image/close.png">
                <div class="message-text">
                    <div class="user-name">${userName}说:</div>
                    <div class="user-message">${value}</div>
                </div>
            `;
            let messageItem=document.createElement('div');
            messageItem.setAttribute('class','message-item');
            messageItem.innerHTML=messageElement;
            $(".message-borad").append(messageItem);
            let containerWidth=$(".message-borad").innerWidth();
            let containeHeight=$(".message-borad").innerHeight();
            let itemWidth=PAGE.data.itemWidth;
            let itemMinHeight=PAGE.data.itemMinHeight;
            let paddingOffset=PAGE.data.paddingOffset;
            let maxWidth=containerWidth-itemWidth-paddingOffset;
            let maxHeight=containeHeight-itemMinHeight-paddingOffset;
            let itemHeight=messageItem.offsetHeight;
            let maxSelfHeight=containeHeight-itemHeight-paddingOffset;
            maxHeight=itemHeight==itemMinHeight ? maxHeight : maxSelfHeight;
            let randomTop=PAGE.randomBetween(maxHeight,paddingOffset);
            let randomLeft=PAGE.randomBetween(maxWidth,paddingOffset);
            let backgroundColors=PAGE.data.backgroundColors;
            let backgroundColor=backgroundColors[zIndex%backgroundColors.length];
            let border=borders[zIndex%borders.length];
            let styleStr=`
                z-index: ${zIndex};
                background: ${backgroundColor};
                border: ${border};
                top: ${randomTop}px;
                left: ${randomLeft}px;
            `;
            messageItem.setAttribute('style',styleStr);
            let hrStyleStr=`
                width: 320px;
                position: absolute;
                top: 22px;
                left: -1px;
                border: none;
                border-top: ${border};
                opacity: 0.5;
            `
            let hrCount=Math.floor(itemHeight/22);
            for(i=1;i<=hrCount;i++){
                hr=document.createElement('hr');
                hr.setAttribute('style',hrStyleStr);
                messageItem.appendChild(hr);
                hr.style.top=22*i+"px";
            }
            return $(".message-textarea").val('');
        }
    },
    randomBetween: function(max,min){
        return Math.floor(Math.random()*(max-min)+min);
    },
    handleMouseDown: function(event){
        let item=event.currentTarget;
        item.style.zIndex=++PAGE.data.zIndex;
        PAGE.data.itemOffsetTop=item.offsetTop;
        PAGE.data.itemOffsetLeft=item.offsetLeft;
        PAGE.data.pageX=event.pageX;
        PAGE.data.pageY=event.pageY;
        PAGE.data.item=item;
        PAGE.data.isLock=false;
    },
    handleMouseMove: function(event){
        if(!PAGE.data.isLock){
            let containerWidth=$(".message-borad").innerWidth();
            let containeHeight=$(".message-borad").innerHeight();
            let itemWidth=PAGE.data.itemWidth;
            let itemMinHeight=PAGE.data.itemMinHeight;
            let paddingOffset=PAGE.data.paddingOffset;
            let maxWidth=containerWidth-itemWidth-paddingOffset;
            let maxHeight=containeHeight-itemMinHeight-paddingOffset;
            let itemHeight=PAGE.data.item.offsetHeight;
            let maxSelfHeight=containeHeight-itemHeight-paddingOffset;
            maxHeight=itemHeight==itemMinHeight ? maxHeight : maxSelfHeight;
            let translateX=event.pageX-PAGE.data.pageX+PAGE.data.itemOffsetLeft;
            let translateY=event.pageY-PAGE.data.pageY+PAGE.data.itemOffsetTop;
            translateX=translateX>maxWidth ? maxWidth : translateX;
            translateY=translateY>maxHeight ? maxHeight : translateY;
            translateX=translateX<paddingOffset ? paddingOffset : translateX;
            translateY=translateY<paddingOffset ? paddingOffset :translateY;
            PAGE.data.item.style.left=translateX+"px";
            PAGE.data.item.style.top=translateY+"px";
        }
    },
    handleMouseUp: function(){
        PAGE.data.isLock=true;
    },
    saveMessages: function(){
        let messageBorad=$(".message-borad").html();
        localStorage.setItem('messageBorad',JSON.stringify(messageBorad));
    },
    getMessages: function(){
        let messageBorad=JSON.parse(localStorage.getItem('messageBorad')) || [];
        $(".message-borad").html(messageBorad);
    },
}
PAGE.init();
