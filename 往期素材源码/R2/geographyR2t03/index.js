//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<580){
    zoom=0.8
    $('#main_right').css('zoom',zoom);
}
var mainLeft=$('#main_left');
var mainLeft1=$('#main_left1');
var mainLeft2=$('#main_left2');
var mainLeft1Div=$('#main_left1_div');

mainLeft.width(wWidth-280*zoom);
var LW=mainLeft.width();
var LH=mainLeft.height();

if(LW>LH){
    mainLeft2.height(LH*0.7).width(LH*0.7);
}else{
    mainLeft2.height(LW*0.7).width(LW*0.7);
}
LH=LH-60;
mainLeft1.height(LH);
var scale=1;
if(LW/LH>744/482){
	scale=LH/482;
    mainLeft1Div.css('zoom',scale);
}else{
	scale=LW/744;
    mainLeft1Div.css('zoom',scale);
}
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        mainLeft.css('zoom',zoom);
    }else{
        zoom=1;
        mainLeft.css('zoom',zoom);
    }
    mainLeft.width(wWidth-280*zoom);
    LW=mainLeft.width();
	LH=mainLeft.height();
	if(LW>LH){
        mainLeft2.height(LH*0.7).width(LH*0.7);
	}else{
        mainLeft2.height(LW*0.7).width(LW*0.7);
	}
	LH=LH-60;
    mainLeft1.height(LH);
	if(LW/LH>744/482){
		scale=LH/482;
        mainLeft1Div.css('zoom',scale);
	}else{
		scale=LW/744;
        mainLeft1Div.css('zoom',scale);
	}
}

var SQ;
var l1=$('#main_left .main_left2 .l1');
function anQ(){
	var ang=0;
	cancelAnimationFrame(SQ);
	var step=0;
	var an=()=>{
        SQ=requestAnimationFrame(an);
		step++;
        if(step<5)return;
        step=0;
		ang-=0.2;
		l1.css('transform','rotate('+ang+'deg)');
	}
	an();
}

function choose(){
	$('#step>div').css({'background':'#fff','color':'#000'})
	$(this).css({'background':'#5CAEFD','color':'#fff'});
	var index=$(this).index();
	if(index==0){
		$('#timeCtl').show();
        mainLeft1.show();
        mainLeft2.hide();
		clearInterval(SQ);
	}else{
		$('#timeCtl').hide();
        mainLeft1.hide();
        l1.css('transform','rotate(0deg)');
        mainLeft2.show();
		anQ();
	}
}
var op={
	op1:false,
	op2:false,
	op3:false,
	op4:false,
	op5:false,
	op6:false,
	op7:false,
	op8:false,
	op9:false,
	op10:false,
	op11:false,
	op12:false,
	op13:false,
	op14:false,
	op15:false,
	op16:false,
	op17:false,
	op18:false,
	op19:false
}
var rang={
	rang1:-7,
	rang2:-8,
	rang3:-9,
	rang4:-5,
	rang5:-7,
	rang6:-5,
	rang7:-2,
	rang8:-6,
	rang9:-3,
	rang10:-1,
	rang11:4,
	rang12:1,
	rang13:2,
	rang14:-16,
	rang15:-15,
	rang16:-13,
	rang17:-13,
	rang18:-11,
	rang19:-12,
	rang20:4,
	rang21:-20
}
var mMap=[31,28,31,30,31,30,31,31,30,31,30,31];
function changeTime(index){
	var M=$('.m span').text()*1;
	var D=$('.t span').text()*1;
	var H=$('.h span').text()*1;
	var HB=parseInt(rang['rang'+index]);
	var DNT=mMap[M-2==-1?11:M-2] //上月天数
	var DNC=mMap[M-1] //本月天数
	var DNB=mMap[M==12?0:M] //下月天数
	var H=H+HB;
	if(H<0){
		H=24+H;
		D=D-1;
		if(D==0){
			M=M-1;
			M=M==0?12:M
			D=DNT;
		}
	}else if(H>24||H==24){
		D=D+1;
		H=H-24;
		if(D>DNC){
			M=M+1;
			M=M>12?1:M
			D=1;
		}
	}
	M=M<10?'0'+M:M;
	D=D<10?'0'+D:D;
	H=H<10?'0'+H:H;
	$('.main_left1>div>div>div').eq(index-1).text(M+'月'+D+'日'+H+'时');
}
for(var i=1;i<=21;i++){
	changeTime(i);
}
function reset(){
	$('#step>div').css({'background':'#fff','color':'#000'})
	$('#step>div.step1').css({'background':'#5CAEFD','color':'#fff'});
	clearInterval(SQ);
    $('#timeCtl,.main_left1').show();
	$('.main_left2').hide();
	$('.m span').text('12');
	$('.t span').text('21');
	$('.h span').text('00');
	$('#main_left .main_left1>div>div').css({'color': '#000','background': '#fff'}).children().hide();
	$('#main_left .main_left1>div>div.all>div').show();
	op={
		op1:false,
		op2:false,
		op3:false,
		op4:false,
		op5:false,
		op6:false,
		op7:false,
		op8:false,
		op9:false,
		op10:false,
		op11:false,
		op12:false,
		op13:false,
		op14:false,
		op15:false,
		op16:false,
		op17:false,
		op18:false,
		op19:false
	}
	for(var i=20;i<=21;i++){
		changeTime(i);
	}
}

function selectShow(){
	$('.timeM>div.T').children('div').hide();
	$(this).children('div').show();
	var index=$(this).children('span').text()*1;
	if($(this).index()==4){
		index+=1;
	}
	index=index-1;
	$(this).children('div').children('div').children().css({'background':'#fff','color':'#000'})
	$(this).children('div').children('div').children().eq(index).css({'background':'#5CAEFD','color':'#fff'});
}
function chooseS(){
	var index=$(this).index()+1;
	if($(this).parents('.T').index()==0){
		$('.timeM>div.t>div>div>div').show();
		$('.timeM>div.t>div>div>div:gt('+(mMap[index-1]-1)+')').hide();
		var DNC=mMap[$(this).text()*1-1];
		var DNCO=$('.t').children('span').text()*1;
		if(DNCO>DNC){
			$('.t').children('span').text(DNC);
		}
	}else if($(this).parents('.T').index()==4){
		index-=1;
	}
	if(index<10){
		index='0'+index;
	}
	$(this).parents('.T').children('span').text(index);
	for(var i=1;i<=21;i++){
		changeTime(i);
	}
}
function closeS(e){
    var target=$(e.target);
    if(target.closest(".timeM>div.T").length==0){
        $('.timeM>div.T').children('div').hide();
    }
    e.stopPropagation();
}

function openT(){
	var index=$(this).index()+1;
	if(op['op'+index]==false){
		$(this).css({'color': '#FFFFFF','background': '#2E2E2E'}).children().show();
		op['op'+index]=true;
	}else{
		$(this).css({'color': '#000','background': '#fff'}).children().hide();
		op['op'+index]=false;
	}
}
if(isMob){
    $('#reset img').on('touchstart',reset);
    $('.timeM>div.T').on('touchstart',selectShow);
    $('.timeM>div.T>div>div>div').on('touchstart',chooseS);
    $(document).on('touchstart',closeS);
    $('#step>div').on('touchstart',choose);
    $('#main_left .main_left1>div>div').on('touchstart',openT);
}else{
    $('#reset img').on('click',reset);
    $('.timeM>div.T').on('click',selectShow);
    $('.timeM>div.T>div>div>div').on('click',chooseS);
    $(document).on('click',closeS);
    $('#step>div').on('click',choose);
    $('#main_left .main_left1>div>div').on('click',openT);

}

