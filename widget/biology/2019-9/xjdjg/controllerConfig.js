
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
            { title:window.lang.teethText[0], active: false, changeModelCall:function(){
                mode.modelChangeEvent(4);
                }
            },
            { title:window.lang.teethText[1], active: false, changeModelCall:function(){
                mode.modelChangeEvent(3);
                }
            },
            { title:window.lang.teethText[2], active: false, changeModelCall:function(){
                mode.modelChangeEvent(2);
                }
            },
            { title:window.lang.teethText[3], active: false, changeModelCall:function(){
                mode.modelChangeEvent(7);
                }
            },
            { title:window.lang.teethText[4], active: false, changeModelCall:function(){
                mode.modelChangeEvent(0);
                }
            },
            { title:window.lang.teethText[5], active: false, changeModelCall:function(){
                mode.modelChangeEvent(8);
                }
            }
        ]
    }
    mode = new ModelControl(modelOption);
    window.scenceId = 781212;
})();