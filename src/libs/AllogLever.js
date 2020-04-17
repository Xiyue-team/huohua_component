/*!
 *  AlloyLever v1.0.2 By dntzhang
 *  Github: https://github.com/AlloyTeam/AlloyLever
 *  MIT Licensed.
 */
const VConsole = require('vconsole');
;(function (root, factory) {
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory()
    else if(typeof define === 'function' && define.amd)
        define([], factory)
    else if(typeof exports === 'object')
        exports["AlloyLever"] = factory()
    else
        root["AlloyLever"] = factory()
})(this, function() {
    var AlloyLever = {}
    AlloyLever.settings = {
        reportUrl: null,
        reportPrefix: '',
        reportKey: 'msg',
        otherReport: null,
        entry: null
    }

    AlloyLever.store = []

    var methodList = ['log', 'info', 'warn', 'debug', 'error'];
    methodList.forEach(function(item) {
        var method = console[item];

        console[item] = function() {
            AlloyLever.store.push({
                logType: item,
                logs: arguments
            });

            method.apply(console, arguments);
        }
    });

    AlloyLever.logs = []
    AlloyLever.config = function(config){
        for(var i in config){
            if(config.hasOwnProperty(i)){
                AlloyLever.settings[i] = config[i]
            }
        }

        if(config.entry){
            window.addEventListener('load', function() {
                AlloyLever.entry(config.entry)
            })
        }

        var parameter = getParameter('vconsole')

        if(parameter) {
            if (parameter === 'show') {
                AlloyLever.vConsole(true)
            } else {
                AlloyLever.vConsole(false)
            }
        }
    }

    AlloyLever.vConsole = function(show){

            //support vconsole3.0
            if (typeof vConsole === 'undefined') {
                AlloyLever.vConsole = new VConsole({
                    defaultPlugins: ['system', 'network', 'element', 'storage'],
                    maxLogNumber: 5000
                })
            }

            var i = 0,
                len = AlloyLever.store.length

            for (; i < len; i++) {
                var item = AlloyLever.store[i]
                //console[item.type].apply(console, item.logs)
                //prevent twice log
                item.noOrigin = true
                AlloyLever.vConsole.pluginList.default.printLog(item)
            }

            if(show) {
                try {
                    AlloyLever.vConsole.show()
                } catch (e) {

                }

                window.addEventListener('load', function () {
                    AlloyLever.vConsole.show()
                })
            }
    }

    AlloyLever.entry = function(selector) {
        var count = 0,
            entry = document.querySelector(selector)
        if(entry) {
            entry.addEventListener('click', function () {
                count++
                if (count > 5) {
                    count = -10000
                    AlloyLever.vConsole(true)
                }
            })
        }
    }

    window.onerror = function(msg, url, line, col, error) {
        console.log('触发onerror');
        var newMsg = msg

        if (error && error.stack) {
            newMsg = processStackMsg(error)
        }

        if (isOBJByType(newMsg, "Event")) {
            newMsg += newMsg.type ?
                ("--" + newMsg.type + "--" + (newMsg.target ?
                    (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : ""
        }

        newMsg = (newMsg + "" || "").substr(0,500)

        AlloyLever.logs.push({
            msg: newMsg,
            target: url,
            rowNum: line,
            colNum: col
        })

        if (msg.toLowerCase().indexOf('script error') > -1) {
            console.error('Script Error: See Browser Console for Detail')
        } else {
            console.error(newMsg)
        }

        var ss = AlloyLever.settings
        if(ss.reportUrl) {
            var src = ss.reportUrl + (ss.reportUrl.indexOf('?')>-1?'&':'?') + ss.reportKey + '='+( ss.reportPrefix?('[' + ss.reportPrefix +']'):'')+ newMsg+'&t='+new Date().getTime()
            if(ss.otherReport) {
                for (var i in ss.otherReport) {
                    if (ss.otherReport.hasOwnProperty(i)) {
                        src += '&' + i + '=' + ss.otherReport[i]
                    }
                }
            }
            new Image().src = src
        }
    }


    function getParameter(n) {
        var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
            result = !m ? '' : decodeURIComponent(m[1])
        return result ||getParameterByName(n)
    }

    function getParameterByName(name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

    function  isOBJByType(o, type) {
        return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]"
    }

    function processStackMsg (error) {
        var stack = error.stack
            .replace(/\n/gi, "")
            .split(/\bat\b/)
            .slice(0, 9)
            .join("@")
            .replace(/\?[^:]+/gi, "")
        var msg = error.toString()
        if (stack.indexOf(msg) < 0) {
            stack = msg + "@" + stack
        }
        return stack
    }

    function getCookie(name){
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)")

        if(arr=document.cookie.match(reg))
            return unescape(arr[2])
        else
            return null
    }

    AlloyLever.getCookie = getCookie
    AlloyLever.getParameter= getParameter

    return AlloyLever
});
