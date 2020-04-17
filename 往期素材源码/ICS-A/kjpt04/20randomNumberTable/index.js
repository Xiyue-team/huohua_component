//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var $threeCon = $('#threeContainer');
var scale = 1;
var bodyWidth = $(window).width();
var bodyHeight = $(window).height();
if(!(bodyWidth == 370 && bodyHeight == 246)){
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var $body = $("body");
    // if(isMob){
        var bodyScale = scale = bodyWidth/1920;
        $('.body').css("zoom",bodyScale).height(1200);
        var marginTop = ($body.width()/bodyWidth*bodyHeight-1200)/2;
        $('.body').css("margin-top",'-600px');
        $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        $('.threeControl').css({'zoom':bodyScale/0.7,'right':30*scale,'bottom':30*scale});
    // }else{
    //     scale = 0.6667;
    //     $(".body").css({"zoom":0.6667,"margin-top":'0',"top":'0'});
    //     $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});

    // }
    $('.zoom').css("zoom",scale);
    $('body').css('background','#000');
}
$('.pageDiv').css({'top':120*scale,'bottom':140*scale});

// 控件区垂直居中居中
var controlHeight = $("#controlContainer").height();
var conHeight = $(".con").height();
var h2Height = $("#controlContainer h2").height();
var h2MarginTop = parseInt($("#controlContainer h2").css("margin-top"));
var marginTop = (controlHeight - h2Height - h2MarginTop - conHeight - 100)/2;
$(".con").css("margin-top",marginTop);



/****** 位置相关 ******/
var $obj = $('#threeContainer'),
    threeHeight = $obj.height(),
    threeWidth = $obj.width();

var $controlArrow = $('.cArrow'),$picContentdiv = $('.picContentdiv');
var val1 = 1,val2=500,direction=1; //抽取数和编号数/抽取方向



var str = '03474373863696473661469863716233261680456011141095977424676242811457204253323732270736075124517689731676622766565026710732907978531355385859889754141012568599269696682731050372931557121014218826498176555956356438548246223162430990061844325323830130301622779439495443548217379323788735209643842634916484421753315724550688770474476721763350258392120676630163785916955567199810507175128673580744395238793321123429786456078252420744381551001342996602795457608632440947279654491746096290528477270802734328181807924544171658097983861962067650031055236405052662389775841607449983114632242014858845109372887123424064748297777781074532140832989407729385761075523628199550922611970056763138802202535386604204533785943512833950083042340796885442068798358529483970291712134033203826138951037417763713040774211930566218373596835087759712559347703324035457774644809949572277884295457216643616000443186679947724219016081504723327143409455934684912720734459927729514311693324350278987192015370045525856660443868881806834301370557430774044227884260433460952680797065774572565765929976860719138675413581824761554559552274237865348559065729657693610964692424597604904910039682961663732203077845703291045650426104967672429949894246849691082537591933034252057274048735192';
var arr = [], arrChoose=[],arrNum=[],arrResult=[],count=0,timg;


arr = str.split('');
insertHtml();
rangeChangeEve();


$('#slider1').change(function(){
    var result = $(this).val();
    var value1 = result.split('|')[0];
    val1 = value1;
    //rangeChangeEve();
    if(timg){
        clearInterval(timg);
    }
    $('.pic2 .picContentdiv').html('<div></div>');
    //changeSpanColor();
});
$('#slider2').change(function(){
    var result = $(this).val();
    var value1 = result.split('|')[0];
    value1 = Math.ceil(value1)*10;
    if(value1 == 1000){
        value1 = 999;
    }
    val2 = value1;
    //rangeChangeEve();

    if(timg){
        clearInterval(timg);
    }
    $('.pic2 .picContentdiv').html('<div></div>');
    //changeSpanColor();
});


function rangeChangeEve(){
    var value1=parseInt(val1),value2 = val2,dire = direction,digit = 0,i,start,str,j,n,numArr=[];//digit是位数
    var numArr1=numArr;

    // if(value2 == 100){
    //     digit = 2;
    // }else{
        digit = 3;
    // }

    arrChoose =[];
    arrNum = [];
    start = parseInt(value2*Math.random());

    if(dire == 1){
        for(i=0;i<value1;i++){
            str='';
            numArr1=[];

            for(j=0;j<digit;j++){
                str += arr[start];
                numArr1.push(start+1);
                start++;
                if(start > 999){
                    start = 0;
                }
            }
            if(changeRepeat(arrChoose,str)){
                arrChoose.push(str);
                for(j=0;j<numArr1.length;j++){
                    arrNum.push(numArr1[j]);

                }
            }else{
                i--;
                start = start-2;
            }
        }

    }else if(dire == 2){
        for(i=0;i<value1;i++){
            str='';
            numArr1=[];

            for(j=0;j<digit;j++){
                str += arr[start];
                numArr1.push(start+1);
                start--;
                if(start < 0){
                    start = 999;
                }
            }
            if(changeRepeat(arrChoose,str)){
                arrChoose.push(str);
                for(j=0;j<numArr1.length;j++){
                    arrNum.push(numArr1[j]);
                }
            }else{
                i--;
                start = start+2;
            }
        }
    }else if(dire == 3){
        for(i=0;i<value1;i++){
            str='';
            numArr1=[];
            for(j=0;j<digit;j++){
                str += arr[start];
                numArr1.push(start+1);
                start -= 40;
                if(start == -40){
                    start = 999;
                }else if(start < 0){
                    start += 999;
                }
                // console.log(str);
            }
            if(changeRepeat(arrChoose,str)){
                arrChoose.push(str);
                for(j=0;j<numArr1.length;j++){
                    arrNum.push(numArr1[j]);
                }
            }else{
                i--;
                start += 40;
                if(start == 1039){
                    start = 0;
                }else if( start > 999){
                    start -= 999;
                }
                start += 40;
                if(start == 1039){
                    start = 0;
                }else if( start > 999){
                    start -= 999;
                }
                //if(start )
            }
        }

    }else if(dire == 4){
        for(i=0;i<value1;i++){
            str='';
            numArr1=[];
            for(j=0;j<digit;j++){
                str += arr[start];
                numArr1.push(start+1);
                start += 40;
                if(start == 1039){
                    start = 0;
                }else if(start >999){
                    start -= 999;
                }
            }
            if(changeRepeat(arrChoose,str)){
                arrChoose.push(str);
                for(j=0;j<numArr1.length;j++){
                    arrNum.push(numArr1[j]);
                }
            }else{
                i--;
                start -= 40;
                if(start == -40){
                    start = 999;
                }else if( start < 0){
                    start += 999;
                }
                start -= 40;
                if(start == -40){
                    start = 999;
                }else if( start < 0){
                    start += 999;
                }
            }
        }
    }


    // changeSpanColor();

}

function changeSpanColor(){
    $('.class50 span').removeClass('red');
}
function changeRepeat(arr1,str){
    if(parseInt(str) > val2){
        return false;
    }
    for(var i=0;i<arr1.length;i++){
        if(arr1[i] == parseInt(str)){
            return false;
        }
    }
    return true;
}
function insertHtml(){
    var result ='<div class="resultCon">';
    var x,y,x1,y1;

    for(var i=0;i<1000;i++){
        if(i == 0){
            result += '<div class="class50"><span data-id='+(i+1)+'>'+arr[i]+'</span>';
        }else if(i%40 == 0){
            if((i+40)%200 == 0){
                result += '</div><div class="class50" style="margin-bottom:15px"><span data-id='+(i+1)+'>'+arr[i]+'</span>';
            }else{
                result += '</div><div class="class50"><span data-id='+(i+1)+'>'+arr[i]+'</span>';
            }

        }else if( i == arr.length-1){
            result += '<span data-id='+(i+1)+'>'+arr[i]+'</span>';
        }else{
            if((i+1)%2 == 0){
                if((i+1)%10 == 0){
                    result += '<span style="margin-right: 5px;" data-id='+(i+1)+'>'+arr[i]+'</span>';
                }else{
                    result += '<span style="margin-right: 2px;" data-id='+(i+1)+'>'+arr[i]+'</span>';
                }
            }else{
                result += '<span data-id='+(i+1)+'>'+arr[i]+'</span>';
            }
        }

    }

    $('.pic1 .picContent').html(result);

    x1 = $('.pic1 .resultCon').height();
    y1 = $('.pic1').height()*0.89;

    x = $('.pic1 .picContent .class50').width();
    y = $('.pic1 .picContent').width();

    if((y1/x1)>(y/x)){
        $('.class50').css('zoom',y/x);
    }else{
        $('.class50').css('zoom',y1/x1);
    }


}
function insertResult(){
    var result = '',arr1=arrResult,length,arr2=[],arr3=[],num=0,countArr=0;
    changeSpanColor();
    length =arr1.length;
    count=0;
    for(var i=0;i<length;i++){
        arr3.push(arr1[i]);
    }
    // countArr
    countArr = arrResult[0].length;
    if(timg){ clearInterval(timg);}
    timg = setInterval(function(){
        if(count > length){
            clearInterval(timg);
            return;
        }
        arr2 = arr3.splice(0,1);
        result += '<div>'+  arr2.join('') + '</div>';

        $picContentdiv.html(result);

        for(var i=0;i<countArr;i++){
            $('span[data-id = '+arrNum[num]+']').addClass('red');
            num++;
        }

        count++;
    },50)
}
function resetArr(){
    for(var i=0;i<1000;i++){
        arr[i] = Math.floor(Math.random()*10);
    }
}
function rangeReback(){
    $('.slider1').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider1').find('.xdsoft_slider_label').text('1');
    $('#slider1').attr('value',''+(1)+'|0');

    $('.slider2').find('.xdsoft_range2dslider_runner').css({'left':'0px'});
    $('.slider2').find('.xdsoft_slider_label').text('100');
    $('#slider2').attr('value',''+10+'|0');
}


/*全屏事件*/
var fullScreen=0;
function scalef(){
    if(fullScreen){
        fullScreen = 0;
        $('#scale img').attr('src','images/icon/all.png');
        if(isMob){
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale + (bodyHeight-1200*scale)/2 ),bottom:(69*scale + (bodyHeight-1200*scale)/2 )});
        }else{
            $threeCon.css({'right':686*scale,left:33*scale,top:(69*scale ),bottom:(69*scale)});
        }
        $('canvas').css({'position':'absolute','left':0,'top':0});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','visible');
        $('#threeContainer').css({'border-radius':10*scale,'box-shadow': 6*scale + 'px '+6*scale +'px '+ 20*scale +'px rgba(0,0,0,0.30)' });
    }else{
        fullScreen = 1;
        $('#scale img').attr('src','images/icon/back.png');
        $obj.css({'left':0,'top':0,'right':0,'bottom':0,'border-radius':'0'});
        $('canvas').css({'position':'absolute','left':(bodyWidth-threeWidth)/2,'top':(bodyHeight-threeHeight)/2});
        $('.controlContainer,.slider,.chooseFunction,#renew,#close').css('visibility','hidden');
    }
}
function extract1(){
    rangeChangeEve();
    var arr1=arrChoose;
    arrResult=[];
    for(var i=0;i<arr1.length;i++){
        arrResult.push(arr1[i]);
    }
    insertResult();

}
function extract2(){
    resetArr();
    insertHtml();
    rangeChangeEve();
    if(timg){
        clearInterval(timg);
    }
    arrResult=[];
    $('.pic2 .picContentdiv').html('<div></div>');

}
function cl(){
    if($(this).hasClass('left')){
        direction = 2;
        $controlArrow.css('transform','rotate(180deg)');
    }else if($(this).hasClass('right')){
        direction = 1;
        $controlArrow.css('transform','rotate(0deg)');
    }else if($(this).hasClass('top')){
        direction = 3;
        $controlArrow.css('transform','rotate(270deg)');
    }else if($(this).hasClass('bottom')){
        direction = 4;
        $controlArrow.css('transform','rotate(90deg)');
    }
    // if(timg){ clearInterval(timg);}
    rangeChangeEve();
}
function renew(){
    val1=1;
    val2=500;
    direction = 1;
    $controlArrow.css('transform','rotate(0deg)');
    arr = str.split('');
    insertHtml();
    rangeChangeEve();
    if(timg){
        clearInterval(timg);
    }
    arrResult=[];
    // insertResult();
    rangeReback();
    $('.pic2 .picContentdiv').html('<div></div>');

}

if(isMob){
	$('#extract1').on('touchstart',extract1);
	$('#extract2').on('touchstart',extract2);
	$('.cl').on('touchstart',cl);
	$('#renew').on('touchstart',renew);
	$('#scale').on('touchstart',scalef);
}else{
	$('#extract1').on('click',extract1);
	$('#extract2').on('click',extract2);
	$('.cl').on('click',cl);
	$('#renew').on('click',renew);
	$('#scale').on('click',scalef);
}
	



