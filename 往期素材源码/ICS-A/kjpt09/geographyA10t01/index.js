//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
(function(){
    var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight,marginTop,marginLeft,point;
    function init_(){
        bodyWidth = $(window).width();
        bodyHeight = $(window).height();
        scale=bodyWidth/1920;
        if(1200*scale>bodyHeight){
            scale=bodyHeight/1200;
            $('#app').width(1920).css("zoom",scale);
        }else{
            $('#app').height(1200).css("zoom",scale);
        }
        marginTop=parseInt($('#app').css('margin-top'));
        marginLeft=parseInt($('#app').css('margin-left'));
        point={
            '哈尔滨':{x:1050+marginLeft,y:392+marginTop,thr:false},
            '长春':{x:1034+marginLeft,y:444+marginTop,thr:false},
            '沈阳':{x:1007+marginLeft,y:503+marginTop,thr:false},
            '天津':{x:895+marginLeft,y:585+marginTop,thr:false},
            '北京':{x:877+marginLeft,y:566+marginTop,thr:false},
            '济南':{x:895+marginLeft,y:649+marginTop,thr:false},
            '徐州':{x:903+marginLeft,y:712+marginTop,thr:false},
            '连云港':{x:944+marginLeft,y:700+marginTop,thr:false},
            '南京':{x:942+marginLeft,y:768+marginTop,thr:false},
            '上海':{x:1003+marginLeft,y:785+marginTop,thr:false},
            '杭州':{x:975+marginLeft,y:812+marginTop,thr:false},
            '商丘':{x:869+marginLeft,y:711+marginTop,thr:false},
            '南昌':{x:885+marginLeft,y:862+marginTop,thr:false},
            '香港':{x:854+marginLeft,y:1031+marginTop,thr:false},
            '石家庄':{x:843+marginLeft,y:617+marginTop,thr:false},
            '焦作':{x:818+marginLeft,y:694+marginTop,thr:false},
            '郑州':{x:828+marginLeft,y:703+marginTop,thr:false},
            '洛阳':{x:805+marginLeft,y:707+marginTop,thr:false},
            '武汉':{x:847+marginLeft,y:814+marginTop,thr:false},
            '长沙':{x:819+marginLeft,y:878+marginTop,thr:false},
            '株洲':{x:826+marginLeft,y:889+marginTop,thr:false},
            '广州':{x:829+marginLeft,y:1008+marginTop,thr:false},
            '怀化':{x:752+marginLeft,y:891+marginTop,thr:false},
            '柳州':{x:738+marginLeft,y:980+marginTop,thr:false},
            '大同':{x:818+marginLeft,y:563+marginTop,thr:false},
            '太原':{x:805+marginLeft,y:624+marginTop,thr:false},
            '呼和浩特':{x:783+marginLeft,y:546+marginTop,thr:false},
            '包头':{x:748+marginLeft,y:551+marginTop,thr:false},
            '西安':{x:730+marginLeft,y:718+marginTop,thr:false},
            '贵阳':{x:676+marginLeft,y:920+marginTop,thr:false},
            '银川':{x:678+marginLeft,y:606+marginTop,thr:false},
            '宝鸡':{x:691+marginLeft,y:714+marginTop,thr:false},
            '成都':{x:622+marginLeft,y:811+marginTop,thr:false},
            '昆明':{x:581+marginLeft,y:954+marginTop,thr:false},
            '兰州':{x:626+marginLeft,y:668+marginTop,thr:false},
            '西宁':{x:583+marginLeft,y:651+marginTop,thr:false},
            '乌鲁木齐':{x:341+marginLeft,y:423+marginTop,thr:false},
            '拉萨':{x:335+marginLeft,y:800+marginTop,thr:false},
            '重庆':{x:675+marginLeft,y:841+marginTop,thr:false},
            '合肥':{x:910+marginLeft,y:775+marginTop,thr:false},
            '澳门':{x:840+marginLeft,y:1034+marginTop,thr:false},
            '海南':{x:762+marginLeft,y:1091+marginTop,thr:false},
            '福州':{x:970+marginLeft,y:922+marginTop,thr:false},
            '南宁':{x:712+marginLeft,y:1017+marginTop,thr:false},
            '台北':{x:1022+marginLeft,y:942+marginTop,thr:false}
        }
    }
    init_();
    window.onresize=function(){
        init_();
        $('#app .point').remove();
        for(i in point){
            var DIV=document.createElement('div');
            DIV.setAttribute('class','point');
            DIV.setAttribute('data-name',i);
            DIV.style.left=point[i].x-7+'px';
            DIV.style.top=point[i].y-7+'px';
            if(point[i].thr){
                DIV.style.background='#ECA701';
            }
            $('#app').append(DIV);
        }
    }
    
    var lines={
        line1:["北京","呼和浩特","包头","银川","兰州"],
        line2:["连云港","徐州","商丘","郑州","洛阳","西安","宝鸡","兰州","乌鲁木齐"],
        line3:["上海","杭州","南昌","株洲","怀化","贵阳","昆明"],
        line4:["哈尔滨","长春","沈阳","天津","北京","济南","徐州","南京","上海"],
        line5:["北京","商丘","南昌","香港"],
        line6:["北京","石家庄","郑州","武汉","长沙","株洲","广州"],
        line7:["北京","大同","太原","焦作","洛阳","怀化","柳州"],
        line8:["宝鸡","成都","昆明"],
        line9:["兰州","西宁","拉萨"]
    } 
    for(i in point){
        var DIV=document.createElement('div');
        DIV.setAttribute('class','point');
        DIV.setAttribute('data-name',i);
        DIV.style.left=point[i].x-7+'px';
        DIV.style.top=point[i].y-7+'px';
        $('#app').append(DIV);
    }
    var result=[],click,flage=false;
    if(isMob){
        click='touchstart';
    }else{
        click='click';
    }
    
    $(window).on(click,function(e){
        if(choose1Num!=2||choose2Num==0||flage){
            return;
        }
        $('#app .line').hide();
        $('#app .resultM').css('background-image','none');
        var X=parseInt(isMob?e.originalEvent.touches[0].clientX/scale:e.originalEvent.clientX/scale),Y=parseInt(isMob?e.originalEvent.touches[0].clientY/scale:e.originalEvent.clientY/scale);
        for(i in point){
           if(Math.sqrt(Math.pow(point[i].x-X,2)+Math.pow(point[i].y-Y,2))<18*scale&&!point[i].thr){
                point[i].thr=true;
                $('#app .point[data-name="'+i+'"]').css('background','#ECA701');
                result.push(i);
           }else if(Math.sqrt(Math.pow(point[i].x-X,2)+Math.pow(point[i].y-Y,2))<18*scale&&point[i].thr){
           		point[i].thr=false;
                $('#app .point[data-name="'+i+'"]').css('background','none');
                removeByValue(result,i);
           }
        }
        if(result.length>0){
        	$('.yes').show();
        }else{
        	$('.yes').hide();
        }
    });
    $('.yes').on(click,function(event){
    	event.stopPropagation();
        var sl= document.createElement("audio");
		sl.preload="auto";
        if(result.sort().join()==lines['line'+choose2Num].sort().join()){
            $('#app .line').eq(choose2Num-1).show();
            $('.yes').hide();
            result=[];
            flage=true;
            $('#app .point').css('background','none');
            $('#ctrl2>div').eq(choose2Num-1).css('background-image','url(image/yes.svg)');
			sl.src = "audio/yes.wav";
        }else{
            $('#ctrl2>div').eq(choose2Num-1).css('background-image','url(image/error.svg)');
			sl.src = "audio/no.wav";
        }
        sl.play();
    })
    function in_array(search,array){
        for(var i in array){
            if(array[i]==search){
                return true;
            }
        }
        return false;
    };
    function removeByValue(arr, val) {
        for(var i=0; i<arr.length; i++) {
            if(arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    };
    var choose1Num,choose2Num=0;
    function choose1(event){
    	event.stopPropagation();
        var index=$(this).index();
        choose1Num=index;
        choose2Num=0
        result=[];
        flage=false;
        $('#app .reset').show();
        $('#ctrl1>div').removeClass('active1');
        $(this).addClass('active1');
        $('#app .line').hide();
        $('#app .bg2').show();
        $('#ctrl2,#app .bg1').hide();
        $('.yes').hide();
        $('#ctrl2>div').css('background-image','none');
        if(index==1||index==2){
            $('#ctrl2').show();
            $('#ctrl2>div>span').removeClass('active2');
        }
    }
    function choose2(event){
    	event.stopPropagation();
        var index=$(this).parent().index();
        choose2Num=index+1;
        if(choose1Num==1){
            if($(this).hasClass('active2')){
                $(this).removeClass('active2');
                $('#app .line').eq(index).hide();
            }else{
                $(this).addClass('active2');
                $('#app .line').eq(index).show();
            }
        }else if(choose1Num==2){
            $('#ctrl2>div>span').removeClass('active2');
            $(this).addClass('active2');
            $('#app .point').css('background','none');
            $('#ctrl2>div').css('background-image','none');
            $('#app .line').hide();
            $('.yes').hide();
            result=[];
            flage=false;
        }
    }
    function reset(){
        $('#app .point').css('background','none');
        $('#ctrl2>div').css('background-image','none');
        $('#app .reset,#ctrl2,#app .bg2,#app .line').hide();
        $('#app .bg1').show();
        $('.yes').hide();
        result=[];
        flage=false;
        choose2Num=0
        $('#ctrl1>div').removeClass('active1');
        $('#ctrl2>div>span').removeClass('active2');
    }
    
    if(isMob){
        $('.reset').on('touchstart',reset);
        $('#ctrl1>div').on('touchstart',choose1);
        $('#ctrl2>div>span').on('touchstart',choose2);
    }else{
        $('.reset').on('click',reset);
        $('#ctrl1>div').on('click',choose1);
        $('#ctrl2>div>span').on('click',choose2);
    }
}());

