//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
(function() {
    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var stepNum = 0,S1,S11,S22;

    function resizeM() {
        $('#app #main_left').width(window.innerWidth-250);
        $('#app #main_right').height(window.innerHeight-48);
        var W=$('#app #main_left div').width();
        var H=$('#app #main_left div').height();
        if(W/H>1000/900){
            $('#app #main_left div img').css({
                width:'auto',
                height:'100%'
            });
        }else{
            $('#app #main_left div img').css({
                width:'100%',
                height:'auto'
            });
        }
    }
    resizeM();

    window.addEventListener('resize',function () {
        resizeM();
    });

    function step() {
        if (stepNum == 2) {
            return;
        }
        stepNum++;
        $('.start').css({ 'pointer-events': 'none', 'background': '#4990E2', 'color': '#fff' });
        var m = Math.random();
        var img = new Image();
        img.src = 'image/' + stepNum + '.gif?' + m;
        img.onload = function() {
            $('#main_left div img').attr('src', img.src);
            var Fen=$('.fen');
            var Miao=$('.miao');
            var Shi=$('.shi');
            if (stepNum == 1) {
                var m1 = Math.floor(Math.random() * 60),
                    m2 = Math.floor(Math.random() * 60);
                var i = m1 < 10 ? '0' + m1 : m1;
                var j = m2 < 10 ? '0' + m2 : m2;
                var k = 0;
                k++;
                k = k < 10 ? ('0' + k) : k;
                Fen.html(i);
                Miao.html(j);
                Shi.html(k);
                S11 = setInterval(function() {
                    if (k == 23) {
                        clearInterval(S11);
                        Fen.html('56');
                        Miao.html('04');
                        Shi.html('23');
                        return;
                    }
                    k++;
                    k = k < 10 ? ('0' + k) : k;
                    m1 = Math.floor(Math.random() * 60), m2 = Math.floor(Math.random() * 60);
                    i = m1 < 10 ? '0' + m1 : m1;
                    j = m2 < 10 ? '0' + m2 : m2;
                    Fen.html(i);
                    Miao.html(j);
                    Shi.html(k);
                }, 100);
                S1 = setTimeout(function() {
                    $('.start').css({ 'pointer-events': 'auto', 'background': '#fff', 'color': '#000' }).text('太阳日');
                    clearTimeout(S1);
                }, 3900);
            } else {
                S22 = setTimeout(function() {
                    Fen.html('00');
                    Miao.html('00');
                    Shi.html('24');
                    clearTimeout(S22);
                }, 500);
            }
        }
    }
    function reset() {
        stepNum = 0;
        $('#main_left div img').attr('src', './image/1.png');
        $('.start').css({ 'pointer-events': 'auto', 'background': '#fff', 'color': '#000' }).text('恒星日');
        clearTimeout(S1);
        clearTimeout(S22);
        clearInterval(S11);
        $('.fen').html('00');
        $('.miao').html('00');
        $('.shi').html('00');
    }

    if (isMob) {
        $('.start').on('touchstart', step);
        $('.reset').on('touchstart', reset);
    } else {
        $('.start').on('click', step);
        $('.reset').on('click', reset);
    }
}());