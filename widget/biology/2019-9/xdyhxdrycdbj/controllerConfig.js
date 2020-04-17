
(function() {
    'use strict';
    var mode;
    var modelOption = {
        //点击白色背景色按钮
        changeToWhiteCall:function(){
            cameraController.changeClearColor('white',1);
        },
        //点击黑色背景色按钮
        changeToBlackCall:function(){
                cameraController.changeClearColor('black',1);
        },
        modelBtnArry:[
            { title:window.lang.teethText[0], active: false, changeModelCall:function(){}
            },
            { title:window.lang.teethText[1], active: false, changeModelCall:function(){}
            },
            { title:window.lang.teethText[2], active: false, changeModelCall:function(){}
            },
            { title:window.lang.teethText[3], active: false, changeModelCall:function(){}
            },
        ]
    }
    mode = new ModelControl(modelOption);
    window.scenceId = 781212;
})();