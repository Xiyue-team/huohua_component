//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

var height=window.innerHeight;
var width=window.innerWidth;
$('#main').height(height-120);
window.onresize=function () {
    height=window.innerHeight;
    width=window.innerWidth;
    $('#main').height(height-120);
}
function choose() {
    var name=$(this).attr('data-n');
    window.location.href='./'+name+'/index.html';
}
var isMob = /iPad|Android/g.test(navigator.userAgent);
if(isMob){
    $('#title p span').on('touchstart',choose);
}else{
    $('#title p span').on('click',choose);
}

