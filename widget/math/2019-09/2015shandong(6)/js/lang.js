
(function() {
    'use strict';
    var lang = '';
    var language = navigator.language || navigator.userLanguage;
    switch (true) { // 非变量 TRUE 替代
        case location.search.indexOf('lang=zh') > -1:
            lang = 'zh';
            break;

        case location.search.indexOf('lang=en') > -1:
        case  language.indexOf('en') > -1:
            lang = 'en';
            break;
        default:
            lang = 'zh';
            break;
    }

    var url = "./lang/"+ lang + ".json";/*json文件url*/
    var request = new XMLHttpRequest();
    request.open("get", url);/*设置请求方法与路径*/
    request.send(null);/*不发送数据到服务器*/
    request.onload = function () {/*XHR对象获取到返回信息后执行*/
        if (request.status == 200 || request.status == 0) {/*返回状态为200，即为数据获取成功*/
            var langObject = JSON.parse(request.responseText);
            window.lang = langObject;
            loadURL('js/control.js');
        }
    }
    function loadURL (preloadURL){
        var script = document.createElement( 'script' );
        script.type = 'text/javascript';
        script.src = preloadURL;
        script.async = false;
        document.body.appendChild( script );
    }
})();