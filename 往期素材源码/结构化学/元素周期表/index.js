//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
var zoom;
(function () {
    var height=window.innerHeight;
    var width=window.innerWidth;
    $('#tableY').height(height-$('#title').height()-parseInt($('#title').css('padding-top'))-parseInt($('#title').css('padding-bottom'))-parseInt($('#tableY').css('margin-bottom')));
    var tyH=$('#tableY').height();
    var tyW=$('#tableY').width();
    if(tyW/tyH>1902/960){
        $('#tableM').height(tyH).width(tyH/960*1902);
    }else{
        $('#tableM').height(tyW/1902*960).width(tyW);
    }
    var w=$('#tableM').width()*1800/1902/18;
    var w2=$('#tableM').width()*102/1902/17;
    $('#tableM>div.N').width(w).height(w).css({'top':w+w2-2+'px','right':3*(w+w2)+'px'});
    $('#tableM>div.Al').width(w).height(w).css({'top':2*(w+w2)-2+'px','right':5*(w+w2)+'px'});
    $('#tableM>div.O').width(w).height(w).css({'top':w+w2-2+'px','right':2*(w+w2)+'px'});
    $('#tableM>div.Li').width(w).height(w).css({'top':w+w2-2+'px','left':0+'px'});
    window.onresize=function(){
        height=window.innerHeight;
        width=window.innerWidth;
	    if(width<580) return;
        $('#tableY').height(height-$('#title').height()-parseInt($('#title').css('padding-top'))-parseInt($('#title').css('padding-bottom'))-parseInt($('#tableY').css('margin-bottom')));
        tyH=$('#tableY').height();
        tyW=$('#tableY').width()
        if(tyW/tyH>1902/960){
            $('#tableM').height(tyH).width(tyH/960*1902);
        }else{
            $('#tableM').height(tyW/1902*960).width(tyW);
        }
        var w=$('#tableM').width()*1800/1902/18;
        var w2=$('#tableM').width()*102/1902/17;
        $('#tableM>div.N').width(w).height(w).css({'top':w+w2-2+'px','right':3*(w+w2)+'px'});
        $('#tableM>div.Al').width(w).height(w).css({'top':2*(w+w2)-2+'px','right':5*(w+w2)+'px'});
        $('#tableM>div.O').width(w).height(w).css({'top':w+w2-2+'px','right':2*(w+w2)+'px'});
        $('#tableM>div.Li').width(w).height(w).css({'top':w+w2-2+'px','right':17*(w+w2)+'px'});
    }

    var isMob = /iPad|Android/g.test(navigator.userAgent);
    function choose() {
        var name=$(this).attr('data-n');
        window.location.href='./'+name+'/index.html';
    }
    if(isMob){
        $('#tableM>div').on('touchstart',choose);
    }else{
        $('#tableM>div').on('click',choose);
    }
})();