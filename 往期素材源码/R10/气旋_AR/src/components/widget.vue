<template>
 <div class="container">
    <div class="renderCanvas-container">
        <canvas id="renderCanvas" touch-action="none"  tabindex="1" style="opacity: 1;"></canvas>
        <video v-show="cameraF&&srcObjectF" :class="{videoH:WH,videoW:!WH}" autoplay="autoplay"  id="video" muted="muted" playsinline="playsinline"></video>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
    <div class="wxtip" id="JweixinTip" :style="'background-image: url(./static/UI/weixin-tip.png);'"></div>
    <div v-show="loadModelF" id="changeSence" :style="'height:'+HeightC+'px;'">
        <div id="camera" v-show="cameraF"><img src="static/UI/tran.png" ></div>
        <div id="white"><img src="static/UI/white.png" ></div>
        <div id="black"><img src="static/UI/black.png" ></div>
    </div>
    <div v-show="loadModelF" id="switchBtn" :style="'height:'+HeightS+'px;'">
      <div style="background: #6a6a6a;">北半球</div>
      <div>南半球</div>
    </div>
 </div>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            checked: false,
            sceneChecked: false,
            title:'气旋',
            cameraF:false,
            HeightC:136,
            HeightS:98,
            hasQG:false,
            loadModelF:true,
            front:1,
            WH:true,
            srcObjectF:false,
            strData1:window.strData1,
            strData2:window.strData2,

        };
    },
    methods: {
    init() {
        var thiz=this;
        var h = location.hash;
        // 获取摄像头参数
        var loadByHash=()=> {

            if (h && h.indexOf('camera=true')>-1) {
                this.cameraF=true;
                this.HeightC=210;
            }else{
                this.cameraF=false;
                this.HeightC=136;
            }
        }
        loadByHash();
        document.title = this.title;
        this.WH=window.innerWidth<window.innerHeight;
            //开启摄像头初始化
        var ua = navigator.userAgent;
        var isMob=/iPhone|iPad|Android/i.test(ua);
        if (/iPhone|iPad/i.test(ua) && /MicroMessenger|QQ/i.test(ua) && this.cameraF) {
            document.getElementById('JweixinTip').style.display = 'block';
        }

        var exfect = [];
        if (navigator && navigator.mediaDevices) {
            navigator.mediaDevices.enumerateDevices()
                .then(function gotDevices(deviceInfos) {
                    for (var i = 0; i !== deviceInfos.length; ++i) {
                        var deviceInfo = deviceInfos[i];
                        if (deviceInfo.kind === 'videoinput') {
                            exfect.push(deviceInfo.deviceId);
                        }
                    }
                }).catch(function errorCallback(error) {
                console.log('navigator.getUserMedia error: ', error);
            });
        }

        var openCamera = (id) => {
            var constraints = {
                audio: false,
                video: {
                    deviceId: id
                }
            }
            if (navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                });
            } else {
                navigator.getUserMedia = navigator.getUserMedia ||
                    navigator.webkitGetUserMedia ||
                    navigator.mozGetUserMedia;
                navigator.getUserMedia(constraints, function (stream) {
                    if ("srcObject" in video) {
                        video.srcObject = stream;
                    } else {
                        video.src = window.URL.createObjectURL(stream);
                    }
                }, function (err) {

                });
            }
        };

        // Launch render loop
        this.canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(this.canvas, true, { preserveDrawingBuffer: true, stencil: true });
        var thiz = this;
        window.addEventListener("resize", () => {
            engine.resize();
            this.WH=window.innerWidth<window.innerHeight;
        });

        if (!BABYLON.Engine.isSupported()) {
                //TODO显示webgl不支持信息
        } else {
            var scene = this.loadCustomScene(this.createScene, engine);
            if (h &&h.indexOf('camera=true')>-1) {
                 scene.clearColor = new BABYLON.Color4(0,0,0,0);
            }else{
                 scene.clearColor = new BABYLON.Color4(0.95,0.95,0.95,1);
            }
          var renderTimes=0;
            var renderFunction = ()=>{

                if (scene) {
                    if (scene.activeCamera) {
                      renderTimes++;
                      if(renderTimes%4!=0)return;
                        scene.render();
                        if (this.cameraF && exfect[this.front] && !this.srcObjectF && isMob || this.cameraF && exfect[0] && !this.srcObjectF){
                            console.log("openCamera");
                            if(isMob){
                                openCamera(exfect[this.front],this.front);
                            }else{
                                openCamera(exfect[0],0);
                            }
                            this.srcObjectF=true;
                        }
                    }
                    if (scene.useDelayedTextureLoading) {
                        var waiting = scene.getWaitingItemsCount();
                        if (waiting <= 0) {
                            document.getElementById("notSupported").className = "hidden";
                        }
                    } else if (!thiz.sceneChecked) {
                        var remaining = scene.getWaitingItemsCount();
                        if (remaining === 0) {
                            thiz.sceneChecked = true;
                            document.getElementById("notSupported").className = "hidden";
                        }
                    }
                }
            };
            engine.runRenderLoop(renderFunction);
            engine.setHardwareScalingLevel(0.5);
        }
            engine.resize();
        },

        // Render loop
        loadCustomScene(demoConstructor, engine) {
            document.getElementById("notSupported").className = "";
            var scene = demoConstructor(engine);
            if (scene.activeCamera) {
                scene.activeCamera.attachControl(this.canvas, false);
            }
            scene.executeWhenReady(() => {
                this.canvas.style.opacity = 1;
            });
            return scene;
        },
        createScene(engine) {
            var jsonstr= [13.36,14.3168,29.1645,13.293,18.6628,32.639,6.4938,15.2713,32.7181,19.8988,15.6276,32.4623,13.6767,16.5577,36.3066,9.8983,9.3314,38.7881,13.3994,5.8304,42.187,8.673,5.8304,39.4487,16.9004,9.3314,38.7881,13.3994,10.5568,39.4487,16.9004,2.3293,38.7881,13.3994,1.104,39.4487,9.8983,2.3293,38.7881,13.3994,-0.4715,36.0501,7.4347,-1.3685,32.5985,7.5814,1.5734,36.2518,18.5866,-1.5459,32.5951
              ,13.3994,-5.2342,32.5951,13.3994,1.104,29.9895,7.4413,1.104,29.9895,7.4413,5.8304,29.1209,18.5866,5.8304,29.0358,13.3994,5.8304,29.1209,13.3994,11.8393,29.1209,7.09,12.2717,29.9992,23.6749,5.5699,28.4543,28.803,5.6099,32.029,23.715,12.1927,32.1268,23.68,-0.1575,31.6439,23.7277,3.787,35.8884,3.4743,6.6898,29.0829,-2.9657,6.6105,32.6447,3.5226,0.2492,32.3409,2.5684,13.0162,32.8573
              ,2.5415,6.2483,36.3867,18.5866,0.9882,29.9256,18.5866,-1.5459,32.5951,18.9879,0.4627,36.0978,20.162,5.8304,37.0037,19.2058,12.0535,36.0891,20.162,13.5691,32.5951,18.9879,12.0188,29.636,13.3994,13.4147,36.9186,7.164,11.5382,36.3195,20.162,5.8304,37.0037,18.1258,5.8304,39.4487,20.162,5.8304,37.0037,5.8658,5.8304,36.9186,5.2557,13.7093,32.8954,7.09,12.2717,29.9992,7.09,12.2717,29.9992
              ,5.8658,5.8304,36.9186,7.5814,1.5734,36.2518,7.4347,-1.3685,32.5985,7.4413,1.104,29.9895,-7.2782,5.866,30.114,-7.3623,11.3157,34.4709,-15.8882,7.0629,34.5701,0.9211,7.5098,34.2494,-6.8811,8.676,39.0699,-11.619,-0.3855,42.1816,-7.2288,-4.7756,46.4437,-13.1556,-4.7756,43.01,-2.8387,-0.3855,42.1816,-7.2288,1.1511,43.01,-2.8387,-9.1658,42.1816,-7.2288,-10.7023,43.01,-11.619,-9.1658,42.1816
              ,-7.2288,-12.6779,38.7483,-14.7084,-13.8028,34.4201,-14.5244,-10.1137,39.0012,-0.7243,-14.0252,34.4158,-7.2288,-18.6502,34.4158,-7.2288,-10.7023,31.1485,-14.7001,-10.7023,31.1485,-14.7001,-4.7756,30.0594,-0.7243,-4.7756,29.9526,-7.2288,-4.7756,30.0594,-7.2288,2.7593,30.0594,-15.1405,3.3016,31.1607,5.6563,-5.1022,29.2234,12.0867,-5.0521,33.7059,5.7065,3.2025,33.8286,5.6626,-12.2842,33.2231,5.7225,-7.3379,38.5455
              ,-19.6745,-3.698,30.0117,-27.7501,-3.7973,34.478,-19.6139,-11.7743,34.097,-20.8105,4.2352,34.7446,-20.8443,-4.2515,39.1703,-0.7243,-10.8475,31.0684,-0.7243,-14.0252,34.4158,-0.2211,-11.5065,38.8081,1.2513,-4.7756,39.9441,0.0522,3.0279,38.7972,1.2513,4.9284,34.4158,-0.2211,2.9845,30.7052,-7.2288,4.7349,39.8374,-15.0477,2.3817,39.0861,1.2513,-4.7756,39.9441,-1.3021,-4.7756,43.01,1.2513,-4.7756,39.9441
              ,-16.6757,-4.7756,39.8374,-17.4407,5.1043,34.7925,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-16.6757,-4.7756,39.8374,-14.5244,-10.1137,39.0012,-14.7084,-13.8028,34.4201,-14.7001,-10.7023,31.1485,24.3584,18.9976,29.2859,25.2306,20.211,30.4804,22.6587,20.6682,30.5076,26.432,18.0193,30.4197,24.9051,19.5512,31.7414,22.3812,18.3308,32.5945,22.6301,16.6469,33.763,21.3254,17.6155,32.8216,24.314,16.8958,32.5945
              ,23.5987,17.9516,32.8216,22.879,14.9629,32.5945,21.6615,15.3422,32.8216,20.9462,16.398,32.5945,21.3386,14.9073,31.6532,19.5082,15.8821,30.4665,20.1517,16.6641,31.7225,22.5503,13.5476,30.4653,20.3625,13.5926,30.4653,21.6615,15.3422,29.5695,20.0168,16.5633,29.5695,22.6301,16.6469,29.2709,20.9854,17.8679,29.2709,24.062,15.5838,29.2416,23.8616,18.3056,29.2709,22.2086,19.718,29.5729,25.4132,14.4691,29.0417
              ,26.837,13.4292,30.2707,26.7815,16.2891,30.3043,24.2408,12.8871,30.1383,25.0624,13.9661,31.5976,20.0665,18.9182,29.2578,18.2725,20.2161,30.4824,18.7599,17.1304,30.3779,21.113,20.8502,30.5555,19.7185,18.9875,31.7689,23.0696,14.2472,29.5476,22.5503,13.5476,30.4653,23.0727,14.0199,31.6696,24.4969,15.2609,31.981,25.5083,17.1747,31.6666,26.0829,17.3971,30.4653,25.441,17.2098,29.448,24.1844,18.7405,31.9518
              ,22.0786,19.5003,31.7458,24.4969,15.2609,31.981,23.9348,15.6782,32.8216,24.4969,15.2609,31.981,20.5505,18.1908,31.9518,21.9968,20.4908,30.5686,22.2086,19.718,29.5729,22.2086,19.718,29.5729,20.5505,18.1908,31.9518,20.1517,16.6641,31.7225,19.5082,15.8821,30.4665,20.0168,16.5633,29.5695,-1.875,18.1232,30.2496,-1.312,19.5912,31.5065,-4.0516,19.3686,31.5351,0.4968,17.6823,31.4425,-1.4668,18.8328,32.8332
              ,-3.7088,16.9158,33.7308,-3.0051,15.2688,34.9604,-4.5919,15.9055,33.9698,-1.3581,15.9725,33.7308,-2.3684,16.8555,33.9698,-2.3014,13.6217,33.7308,-3.6419,13.682,33.9698,-4.6522,14.5651,33.7308,-3.8541,13.1531,32.7404,-5.9775,13.6555,31.4918,-5.5319,14.6234,32.8134,-2.2574,12.0936,31.4906,-4.4958,11.5542,31.4906,-3.6419,13.682,30.548,-5.6422,14.4847,30.548,-5.0054,16.0715,30.2338,-1.2637,14.5699,30.203
              ,-3.0051,15.2688,30.2338,-2.1956,17.2861,30.2338,-4.2555,18.2813,30.5515,0.4095,13.797,29.9926,2.1365,13.1195,31.2858,1.3152,16.015,31.3211,-0.3604,11.8735,31.1465,0.187,13.1913,32.6819,-6.2214,16.8944,30.22,-8.3942,17.7355,31.5085,-7.0729,14.7257,31.3986,-5.6732,19.1404,31.5854,-6.5941,16.8719,32.8622,-1.916,12.9443,30.5249,-2.2574,12.0936,31.4906,-1.8521,12.7138,32.7577,-0.7348,14.3577,33.0854
              ,-0.2174,16.5758,32.7545,0.3078,16.9558,31.4906,-0.2952,16.5935,30.4201,-1.9833,17.815,33.0546,-4.3295,18.0251,32.8378,-0.7348,14.3577,33.0854,-1.4184,14.632,33.9698,-0.7348,14.3577,33.0854,-5.5343,16.2837,33.0546,-4.6777,19.0111,31.5992,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-5.5343,16.2837,33.0546,-5.5319,14.6234,32.8134,-5.9775,13.6555,31.4918,-5.6422,14.4847,30.548,-17.7112,19.5746,30.7287
              ,-16.6421,22.3625,33.1156,-21.8446,21.9398,33.1699,-13.2071,18.7374,32.9942,-16.936,20.9222,35.6351,-21.1937,17.2818,37.3398,-19.8573,14.154,39.6747,-22.8706,15.3632,37.7936,-16.7295,15.4904,37.3398,-18.6481,17.1673,37.7936,-18.521,11.0262,37.3398,-21.0665,11.1407,37.7936,-22.9851,12.8176,37.3398,-21.4696,10.1363,35.4589,-25.5019,11.0904,33.0877,-24.6557,12.9285,35.5974,-18.4374,8.1241,33.0854,-22.6881,7.0998,33.0854
              ,-21.0665,11.1407,31.2954,-24.8651,12.665,31.2954,-19.8573,14.154,30.6988,-23.6559,15.6783,30.6988,-16.5502,12.8269,30.6403,-18.32,17.985,30.6988,-22.2319,19.8749,31.3021,-13.3728,11.359,30.2408,-10.0932,10.0725,32.6965,-11.6529,15.5711,32.7637,-14.8349,7.7062,32.432,-13.7953,10.2088,35.3478,-25.9652,17.2412,30.6726,-30.0913,18.8383,33.1195,-27.5822,13.1226,32.9107,-24.9241,21.5064,33.2655,-26.6728,17.1984,35.6901
              ,-17.7891,9.7398,31.2516,-18.4374,8.1241,33.0854,-17.6677,9.3021,35.4917,-15.5458,12.4238,36.114,-14.5633,16.636,35.4857,-13.5659,17.3576,33.0854,-14.7111,16.6697,31.0526,-17.9169,18.9894,36.0555,-22.3724,19.3883,35.6439,-15.5458,12.4238,36.114,-16.844,12.9448,37.7936,-15.5458,12.4238,36.114,-24.6603,16.0814,36.0555,-23.0335,21.2607,33.2917,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021,-24.6603,16.0814,36.0555
              ,-24.6557,12.9285,35.5974,-25.5019,11.0904,33.0877,-24.8651,12.665,31.2954,18.9879,0.4627,36.0978,18.5866,0.9882,29.9256,18.5866,0.9882,29.9256,18.9879,12.0188,29.636,18.5866,5.8304,29.0358,18.5866,-1.5459,32.5951,18.5866,5.8304,29.0358,20.162,5.8304,37.0037,20.162,5.8304,37.0037,18.9879,0.4627,36.0978,18.9879,0.4627,36.0978,13.3994,11.8393,29.1209,13.3994,11.8393,29.1209,7.09,12.2717,29.9992
              ,7.09,12.2717,29.9992,7.09,12.2717,29.9992,7.4413,5.8304,29.1209,7.09,12.2717,29.9992,5.8658,5.8304,36.9186,5.8658,5.8304,36.9186,7.5814,1.5734,36.2518,7.4413,5.8304,29.1209,7.4413,1.104,29.9895,7.4347,-1.3685,32.5985,7.4413,1.104,29.9895,-0.2211,-11.5065,38.8081,-0.7243,-10.8475,31.0684,-0.7243,-10.8475,31.0684,-0.2211,2.9845,30.7052,-0.7243,-4.7756,29.9526,-0.7243,-14.0252,34.4158
              ,-0.7243,-4.7756,29.9526,1.2513,-4.7756,39.9441,1.2513,-4.7756,39.9441,-0.2211,-11.5065,38.8081,-0.2211,-11.5065,38.8081,-7.2288,2.7593,30.0594,-7.2288,2.7593,30.0594,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-14.7001,-4.7756,30.0594,-15.1405,3.3016,31.1607,-16.6757,-4.7756,39.8374,-16.6757,-4.7756,39.8374,-14.5244,-10.1137,39.0012,-14.7001,-4.7756,30.0594,-14.7001,-10.7023,31.1485
              ,-14.7084,-13.8028,34.4201,-14.7001,-10.7023,31.1485,23.0727,14.0199,31.6696,23.0696,14.2472,29.5476,23.0696,14.2472,29.5476,25.441,17.2098,29.448,24.062,15.5838,29.2416,22.5503,13.5476,30.4653,24.062,15.5838,29.2416,24.4969,15.2609,31.981,24.4969,15.2609,31.981,23.0727,14.0199,31.6696,23.0727,14.0199,31.6696,23.8616,18.3056,29.2709,23.8616,18.3056,29.2709,22.2086,19.718,29.5729,22.2086,19.718,29.5729
              ,22.2086,19.718,29.5729,20.9854,17.8679,29.2709,22.2086,19.718,29.5729,20.5505,18.1908,31.9518,20.5505,18.1908,31.9518,20.1517,16.6641,31.7225,20.9854,17.8679,29.2709,20.0168,16.5633,29.5695,19.5082,15.8821,30.4665,20.0168,16.5633,29.5695,-1.8521,12.7138,32.7577,-1.916,12.9443,30.5249,-1.916,12.9443,30.5249,-0.2952,16.5935,30.4201,-1.2637,14.5699,30.203,-2.2574,12.0936,31.4906,-1.2637,14.5699,30.203
              ,-0.7348,14.3577,33.0854,-0.7348,14.3577,33.0854,-1.8521,12.7138,32.7577,-1.8521,12.7138,32.7577,-2.1956,17.2861,30.2338,-2.1956,17.2861,30.2338,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-5.0054,16.0715,30.2338,-4.2555,18.2813,30.5515,-5.5343,16.2837,33.0546,-5.5343,16.2837,33.0546,-5.5319,14.6234,32.8134,-5.0054,16.0715,30.2338,-5.6422,14.4847,30.548,-5.9775,13.6555,31.4918
              ,-5.6422,14.4847,30.548,-17.6677,9.3021,35.4917,-17.7891,9.7398,31.2516,-17.7891,9.7398,31.2516,-14.7111,16.6697,31.0526,-16.5502,12.8269,30.6403,-18.4374,8.1241,33.0854,-16.5502,12.8269,30.6403,-15.5458,12.4238,36.114,-15.5458,12.4238,36.114,-17.6677,9.3021,35.4917,-17.6677,9.3021,35.4917,-18.32,17.985,30.6988,-18.32,17.985,30.6988,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021
              ,-23.6559,15.6783,30.6988,-22.2319,19.8749,31.3021,-24.6603,16.0814,36.0555,-24.6603,16.0814,36.0555,-24.6557,12.9285,35.5974,-23.6559,15.6783,30.6988,-24.8651,12.665,31.2954,-25.5019,11.0904,33.0877,-24.8651,12.665,31.2954];

          var jsonstr2= [13.36,14.3168,29.1645,13.293,18.6628,32.639,6.4938,15.2713,32.7181,19.8988,15.6276,32.4623,13.6767,16.5577,36.3066,9.8983,9.3314,38.7881,13.3994,5.8304,42.187,8.673,5.8304,39.4487,16.9004,9.3314,38.7881,13.3994,10.5568,39.4487,16.9004,2.3293,38.7881,13.3994,1.104,39.4487,9.8983,2.3293,38.7881,13.3994,-0.4715,36.0501,7.4347,-1.3685,32.5985,7.5814,1.5734,36.2518,18.5866,-1.5459,32.5951
            ,13.3994,-5.2342,32.5951,13.3994,1.104,29.9895,7.4413,1.104,29.9895,7.4413,5.8304,29.1209,18.5866,5.8304,29.0358,13.3994,5.8304,29.1209,13.3994,11.8393,29.1209,7.09,12.2717,29.9992,23.6749,5.5699,28.4543,28.803,5.6099,32.029,23.715,12.1927,32.1268,23.68,-0.1575,31.6439,23.7277,3.787,35.8884,3.4743,6.6898,29.0829,-2.9657,6.6105,32.6447,3.5226,0.2492,32.3409,2.5684,13.0162,32.8573
            ,2.5415,6.2483,36.3867,18.5866,0.9882,29.9256,18.5866,-1.5459,32.5951,18.9879,0.4627,36.0978,20.162,5.8304,37.0037,19.2058,12.0535,36.0891,20.162,13.5691,32.5951,18.9879,12.0188,29.636,13.3994,13.4147,36.9186,7.164,11.5382,36.3195,20.162,5.8304,37.0037,18.1258,5.8304,39.4487,20.162,5.8304,37.0037,5.8658,5.8304,36.9186,5.2557,13.7093,32.8954,7.09,12.2717,29.9992,7.09,12.2717,29.9992
            ,5.8658,5.8304,36.9186,7.5814,1.5734,36.2518,7.4347,-1.3685,32.5985,7.4413,1.104,29.9895,-7.2782,5.866,30.114,-7.3623,11.3157,34.4709,-15.8882,7.0629,34.5701,0.9211,7.5098,34.2494,-6.8811,8.676,39.0699,-11.619,-0.3855,42.1816,-7.2288,-4.7756,46.4437,-13.1556,-4.7756,43.01,-2.8387,-0.3855,42.1816,-7.2288,1.1511,43.01,-2.8387,-9.1658,42.1816,-7.2288,-10.7023,43.01,-11.619,-9.1658,42.1816
            ,-7.2288,-12.6779,38.7483,-14.7084,-13.8028,34.4201,-14.5244,-10.1137,39.0012,-0.7243,-14.0252,34.4158,-7.2288,-18.6502,34.4158,-7.2288,-10.7023,31.1485,-14.7001,-10.7023,31.1485,-14.7001,-4.7756,30.0594,-0.7243,-4.7756,29.9526,-7.2288,-4.7756,30.0594,-7.2288,2.7593,30.0594,-15.1405,3.3016,31.1607,5.6563,-5.1022,29.2234,12.0867,-5.0521,33.7059,5.7065,3.2025,33.8286,5.6626,-12.2842,33.2231,5.7225,-7.3379,38.5455
            ,-19.6745,-3.698,30.0117,-27.7501,-3.7973,34.478,-19.6139,-11.7743,34.097,-20.8105,4.2352,34.7446,-20.8443,-4.2515,39.1703,-0.7243,-10.8475,31.0684,-0.7243,-14.0252,34.4158,-0.2211,-11.5065,38.8081,1.2513,-4.7756,39.9441,0.0522,3.0279,38.7972,1.2513,4.9284,34.4158,-0.2211,2.9845,30.7052,-7.2288,4.7349,39.8374,-15.0477,2.3817,39.0861,1.2513,-4.7756,39.9441,-1.3021,-4.7756,43.01,1.2513,-4.7756,39.9441
            ,-16.6757,-4.7756,39.8374,-17.4407,5.1043,34.7925,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-16.6757,-4.7756,39.8374,-14.5244,-10.1137,39.0012,-14.7084,-13.8028,34.4201,-14.7001,-10.7023,31.1485,24.3584,18.9976,29.2859,25.2306,20.211,30.4804,22.6587,20.6682,30.5076,26.432,18.0193,30.4197,24.9051,19.5512,31.7414,22.3812,18.3308,32.5945,22.6301,16.6469,33.763,21.3254,17.6155,32.8216,24.314,16.8958,32.5945
            ,23.5987,17.9516,32.8216,22.879,14.9629,32.5945,21.6615,15.3422,32.8216,20.9462,16.398,32.5945,21.3386,14.9073,31.6532,19.5082,15.8821,30.4665,20.1517,16.6641,31.7225,22.5503,13.5476,30.4653,20.3625,13.5926,30.4653,21.6615,15.3422,29.5695,20.0168,16.5633,29.5695,22.6301,16.6469,29.2709,20.9854,17.8679,29.2709,24.062,15.5838,29.2416,23.8616,18.3056,29.2709,22.2086,19.718,29.5729,25.4132,14.4691,29.0417
            ,26.837,13.4292,30.2707,26.7815,16.2891,30.3043,24.2408,12.8871,30.1383,25.0624,13.9661,31.5976,20.0665,18.9182,29.2578,18.2725,20.2161,30.4824,18.7599,17.1304,30.3779,21.113,20.8502,30.5555,19.7185,18.9875,31.7689,23.0696,14.2472,29.5476,22.5503,13.5476,30.4653,23.0727,14.0199,31.6696,24.4969,15.2609,31.981,25.5083,17.1747,31.6666,26.0829,17.3971,30.4653,25.441,17.2098,29.448,24.1844,18.7405,31.9518
            ,22.0786,19.5003,31.7458,24.4969,15.2609,31.981,23.9348,15.6782,32.8216,24.4969,15.2609,31.981,20.5505,18.1908,31.9518,21.9968,20.4908,30.5686,22.2086,19.718,29.5729,22.2086,19.718,29.5729,20.5505,18.1908,31.9518,20.1517,16.6641,31.7225,19.5082,15.8821,30.4665,20.0168,16.5633,29.5695,-1.875,18.1232,30.2496,-1.312,19.5912,31.5065,-4.0516,19.3686,31.5351,0.4968,17.6823,31.4425,-1.4668,18.8328,32.8332
            ,-3.7088,16.9158,33.7308,-3.0051,15.2688,34.9604,-4.5919,15.9055,33.9698,-1.3581,15.9725,33.7308,-2.3684,16.8555,33.9698,-2.3014,13.6217,33.7308,-3.6419,13.682,33.9698,-4.6522,14.5651,33.7308,-3.8541,13.1531,32.7404,-5.9775,13.6555,31.4918,-5.5319,14.6234,32.8134,-2.2574,12.0936,31.4906,-4.4958,11.5542,31.4906,-3.6419,13.682,30.548,-5.6422,14.4847,30.548,-5.0054,16.0715,30.2338,-1.2637,14.5699,30.203
            ,-3.0051,15.2688,30.2338,-2.1956,17.2861,30.2338,-4.2555,18.2813,30.5515,0.4095,13.797,29.9926,2.1365,13.1195,31.2858,1.3152,16.015,31.3211,-0.3604,11.8735,31.1465,0.187,13.1913,32.6819,-6.2214,16.8944,30.22,-8.3942,17.7355,31.5085,-7.0729,14.7257,31.3986,-5.6732,19.1404,31.5854,-6.5941,16.8719,32.8622,-1.916,12.9443,30.5249,-2.2574,12.0936,31.4906,-1.8521,12.7138,32.7577,-0.7348,14.3577,33.0854
            ,-0.2174,16.5758,32.7545,0.3078,16.9558,31.4906,-0.2952,16.5935,30.4201,-1.9833,17.815,33.0546,-4.3295,18.0251,32.8378,-0.7348,14.3577,33.0854,-1.4184,14.632,33.9698,-0.7348,14.3577,33.0854,-5.5343,16.2837,33.0546,-4.6777,19.0111,31.5992,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-5.5343,16.2837,33.0546,-5.5319,14.6234,32.8134,-5.9775,13.6555,31.4918,-5.6422,14.4847,30.548,-17.7112,19.5746,30.7287
            ,-16.6421,22.3625,33.1156,-21.8446,21.9398,33.1699,-13.2071,18.7374,32.9942,-16.936,20.9222,35.6351,-21.1937,17.2818,37.3398,-19.8573,14.154,39.6747,-22.8706,15.3632,37.7936,-16.7295,15.4904,37.3398,-18.6481,17.1673,37.7936,-18.521,11.0262,37.3398,-21.0665,11.1407,37.7936,-22.9851,12.8176,37.3398,-21.4696,10.1363,35.4589,-25.5019,11.0904,33.0877,-24.6557,12.9285,35.5974,-18.4374,8.1241,33.0854,-22.6881,7.0998,33.0854
            ,-21.0665,11.1407,31.2954,-24.8651,12.665,31.2954,-19.8573,14.154,30.6988,-23.6559,15.6783,30.6988,-16.5502,12.8269,30.6403,-18.32,17.985,30.6988,-22.2319,19.8749,31.3021,-13.3728,11.359,30.2408,-10.0932,10.0725,32.6965,-11.6529,15.5711,32.7637,-14.8349,7.7062,32.432,-13.7953,10.2088,35.3478,-25.9652,17.2412,30.6726,-30.0913,18.8383,33.1195,-27.5822,13.1226,32.9107,-24.9241,21.5064,33.2655,-26.6728,17.1984,35.6901
            ,-17.7891,9.7398,31.2516,-18.4374,8.1241,33.0854,-17.6677,9.3021,35.4917,-15.5458,12.4238,36.114,-14.5633,16.636,35.4857,-13.5659,17.3576,33.0854,-14.7111,16.6697,31.0526,-17.9169,18.9894,36.0555,-22.3724,19.3883,35.6439,-15.5458,12.4238,36.114,-16.844,12.9448,37.7936,-15.5458,12.4238,36.114,-24.6603,16.0814,36.0555,-23.0335,21.2607,33.2917,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021,-24.6603,16.0814,36.0555
            ,-24.6557,12.9285,35.5974,-25.5019,11.0904,33.0877,-24.8651,12.665,31.2954,18.9879,0.4627,36.0978,18.5866,0.9882,29.9256,18.5866,0.9882,29.9256,18.9879,12.0188,29.636,18.5866,5.8304,29.0358,18.5866,-1.5459,32.5951,18.5866,5.8304,29.0358,20.162,5.8304,37.0037,20.162,5.8304,37.0037,18.9879,0.4627,36.0978,18.9879,0.4627,36.0978,13.3994,11.8393,29.1209,13.3994,11.8393,29.1209,7.09,12.2717,29.9992
            ,7.09,12.2717,29.9992,7.09,12.2717,29.9992,7.4413,5.8304,29.1209,7.09,12.2717,29.9992,5.8658,5.8304,36.9186,5.8658,5.8304,36.9186,7.5814,1.5734,36.2518,7.4413,5.8304,29.1209,7.4413,1.104,29.9895,7.4347,-1.3685,32.5985,7.4413,1.104,29.9895,-0.2211,-11.5065,38.8081,-0.7243,-10.8475,31.0684,-0.7243,-10.8475,31.0684,-0.2211,2.9845,30.7052,-0.7243,-4.7756,29.9526,-0.7243,-14.0252,34.4158
            ,-0.7243,-4.7756,29.9526,1.2513,-4.7756,39.9441,1.2513,-4.7756,39.9441,-0.2211,-11.5065,38.8081,-0.2211,-11.5065,38.8081,-7.2288,2.7593,30.0594,-7.2288,2.7593,30.0594,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-15.1405,3.3016,31.1607,-14.7001,-4.7756,30.0594,-15.1405,3.3016,31.1607,-16.6757,-4.7756,39.8374,-16.6757,-4.7756,39.8374,-14.5244,-10.1137,39.0012,-14.7001,-4.7756,30.0594,-14.7001,-10.7023,31.1485
            ,-14.7084,-13.8028,34.4201,-14.7001,-10.7023,31.1485,23.0727,14.0199,31.6696,23.0696,14.2472,29.5476,23.0696,14.2472,29.5476,25.441,17.2098,29.448,24.062,15.5838,29.2416,22.5503,13.5476,30.4653,24.062,15.5838,29.2416,24.4969,15.2609,31.981,24.4969,15.2609,31.981,23.0727,14.0199,31.6696,23.0727,14.0199,31.6696,23.8616,18.3056,29.2709,23.8616,18.3056,29.2709,22.2086,19.718,29.5729,22.2086,19.718,29.5729
            ,22.2086,19.718,29.5729,20.9854,17.8679,29.2709,22.2086,19.718,29.5729,20.5505,18.1908,31.9518,20.5505,18.1908,31.9518,20.1517,16.6641,31.7225,20.9854,17.8679,29.2709,20.0168,16.5633,29.5695,19.5082,15.8821,30.4665,20.0168,16.5633,29.5695,-1.8521,12.7138,32.7577,-1.916,12.9443,30.5249,-1.916,12.9443,30.5249,-0.2952,16.5935,30.4201,-1.2637,14.5699,30.203,-2.2574,12.0936,31.4906,-1.2637,14.5699,30.203
            ,-0.7348,14.3577,33.0854,-0.7348,14.3577,33.0854,-1.8521,12.7138,32.7577,-1.8521,12.7138,32.7577,-2.1956,17.2861,30.2338,-2.1956,17.2861,30.2338,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-4.2555,18.2813,30.5515,-5.0054,16.0715,30.2338,-4.2555,18.2813,30.5515,-5.5343,16.2837,33.0546,-5.5343,16.2837,33.0546,-5.5319,14.6234,32.8134,-5.0054,16.0715,30.2338,-5.6422,14.4847,30.548,-5.9775,13.6555,31.4918
            ,-5.6422,14.4847,30.548,-17.6677,9.3021,35.4917,-17.7891,9.7398,31.2516,-17.7891,9.7398,31.2516,-14.7111,16.6697,31.0526,-16.5502,12.8269,30.6403,-18.4374,8.1241,33.0854,-16.5502,12.8269,30.6403,-15.5458,12.4238,36.114,-15.5458,12.4238,36.114,-17.6677,9.3021,35.4917,-17.6677,9.3021,35.4917,-18.32,17.985,30.6988,-18.32,17.985,30.6988,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021,-22.2319,19.8749,31.3021
            ,-23.6559,15.6783,30.6988,-22.2319,19.8749,31.3021,-24.6603,16.0814,36.0555,-24.6603,16.0814,36.0555,-24.6557,12.9285,35.5974,-23.6559,15.6783,30.6988,-24.8651,12.665,31.2954,-25.5019,11.0904,33.0877,-24.8651,12.665,31.2954];


            BABYLON.Effect.ShadersStore["customVertexShader"]=
                "precision highp float;\r\n"+
                "attribute vec3 position;\r\n"+
                "attribute vec3 normal;\r\n"+
                "attribute vec2 uv;\r\n"+
                "uniform mat4 worldViewProjection;\r\n"+
                "varying vec3 vPosition;\r\n"+
                "varying vec3 vNormal;\r\n"+
                "varying vec2 vUV;\r\n"+

                "void main(void) {\r\n"+
                "    vec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n"+
                "    gl_Position = outPosition;\r\n"+
                "    vUV = uv;\r\n"+
                "    vPosition = position;\r\n"+
                "    vNormal = normal;\r\n"+
                "}\r\n";

            BABYLON.Effect.ShadersStore["customFragmentShader"]=
                "precision highp float;\r\n"+
                "varying vec3 vPosition;\r\n"+
                "varying vec3 vNormal;\r\n"+
                "varying vec2 vUV;\r\n"+
                "uniform mat4 world;\r\n"+
                "uniform vec3 cameraPosition;\r\n"+

                "uniform sampler2D map;\r\n"+
                "uniform vec3 fogColor;\r\n"+
                "uniform float fogNear;\r\n"+
                "uniform float fogFar;\r\n"+
                "void main() {\r\n"+
                "    float depth = gl_FragCoord.z / gl_FragCoord.w;\r\n"+
                "    float fogFactor = smoothstep( fogNear, fogFar, depth );\r\n"+
                "    gl_FragColor = texture2D( map, vUV );\r\n"+
                "    gl_FragColor.w *= pow( gl_FragCoord.z, 20.0 );\r\n"+
                "    gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\r\n"+
                "}\r\n";

            var positions=[];
            for ( var i = 0; i < jsonstr.length; i+=3) {
                positions.push(new BABYLON.Vector3(jsonstr[i],jsonstr[i+2],jsonstr[i+1]));
            }
            var positions2=[];
            for ( var i = 0; i < jsonstr.length; i+=3) {
                positions2.push(new BABYLON.Vector3(jsonstr2[i],jsonstr2[i+2],jsonstr2[i+1]));
            }
            var thiz=this;
            var canvas = engine.getRenderingCanvas();
            engine.enableOfflineSupport = false;
            var scene = new BABYLON.Scene(engine);

            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
                light.intensity = 1;
            var light1 = new BABYLON.HemisphericLight("Omni2", new BABYLON.Vector3(0, -1, 0), scene);
                light1.intensity = .5;
            var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2, 200, BABYLON.Vector3.Zero(), scene);
                camera.attachControl(canvas, false);
                camera.lowerRadiusLimit = 100;
                camera.upperRadiusLimit = 300;
                camera.minZ = 1.0;
                camera.layerMask = 0x20000000;

			      var particleSystem1,particleSystem2;

            function RainFX(particleSystem, texturepath, minSize, maxSize, updateSpeed, num, maxEmitPower, mesh) {
                particleSystem = new BABYLON.ParticleSystem("particles", num, scene);
                particleSystem.particleTexture = new BABYLON.Texture(texturepath, scene);
                var top = BABYLON.Mesh.CreatePlane("snowpanel", 50, scene);
                // top.rotation = new BABYLON.Vector3(20 * Math.PI/180 + Math.PI / 2,Math.PI/2,Math.PI/2)
                top.rotation.x = Math.PI/2;
                top.visibility = 0;
                top.position = mesh.position;
                particleSystem.emitter = top;
                particleSystem.minEmitBox = new BABYLON.Vector3(-35, -10, 0);
                particleSystem.maxEmitBox = new BABYLON.Vector3(5, 10, 0);
                particleSystem.color1 = new BABYLON.Color4(1, 1, 1.0, 1.0);
                particleSystem.color2 = new BABYLON.Color4(1, 1, 1.0, 1.0);
                particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.1, 0.0);
                particleSystem.minSize = minSize;
                particleSystem.maxSize = maxSize;
                particleSystem.minLifeTime = 0.5;
                particleSystem.maxLifeTime = 3.0;
                particleSystem.direction1 = new BABYLON.Vector3(0, 1, 0);
                particleSystem.direction2 = new BABYLON.Vector3(0, 1, 0);
                particleSystem.emitRate = 2500;
                particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
                particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
                particleSystem.minAngularSpeed = 0;
                particleSystem.maxAngularSpeed = Math.PI / 2;
                particleSystem.minEmitPower = 0.1;
                particleSystem.maxEmitPower = maxEmitPower;
                particleSystem.updateSpeed = updateSpeed;
                function my_startDirectionFunction(emitPower, worldMatrix, directionToUpdate, particle) {
                    var randX = randomNumber(this.direction1.x, this.direction2.x);
                    var randY = randomNumber(this.direction1.y, this.direction2.y);
                    var randZ = randomNumber(this.direction1.z, this.direction2.z);
                    BABYLON.Vector3.TransformNormalFromFloatsToRef(randX * emitPower, randY * emitPower, randZ * emitPower, worldMatrix, directionToUpdate);
                }

                function my_startPositionFunction(worldMatrix, positionToUpdate, particle) {
                    var randX = randomNumber(this.minEmitBox.x, this.maxEmitBox.x);
                    var randY = randomNumber(this.minEmitBox.y, this.maxEmitBox.y);
                    var randZ = randomNumber(this.minEmitBox.z, this.maxEmitBox.z);
                    BABYLON.Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
                }

                function my_updateFunction(particles) {
                    for (var index = 0; index < particles.length; index++) {
                        var particle = particles[index];
                        particle.age += this._scaledUpdateSpeed;
                        if (particle.age >= particle.lifeTime) {
                            this.recycleParticle(particle);
                            index--;
                            continue;
                        } else {
                            particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                            particle.color.addInPlace(this._scaledColorStep);
                            if (particle.color.a < 0) particle.color.a = 0;
                            particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                            particle.position.addInPlace(this._scaledDirection);
                            this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                            particle.direction.addInPlace(this._scaledGravity);
                        }
                    }
                }
                var randomNumber = function (min, max) {
                    if (min === max) {
                        return min;
                    }
                    var random = Math.random();
                    return random * (max - min) + min;
                };
                particleSystem.startDirectionFunction = my_startDirectionFunction;
                particleSystem.startPositionFunction = my_startPositionFunction;
                particleSystem.updateFunction = my_updateFunction;
                // particleSystem.start();
                return particleSystem;
            }

            var cloud1=new BABYLON.Mesh("",scene);
            cloud1.position=new BABYLON.Vector3(15,30,0);
            particleSystem1 = RainFX(particleSystem1, "./static/image/RainStreak.png", 1.5, 2.5, 0.04, 500, 0.3, cloud1);
            particleSystem1.layerMask = 0x20000000;

            var cloud2=new BABYLON.Mesh("",scene);
            cloud2.position=new BABYLON.Vector3(15,30,0);
            particleSystem2 = RainFX(particleSystem2, "./static/image/RainStreak.png", 1.5, 2.5, 0.04, 500, 0.3, cloud2);
            particleSystem2.layerMask = 0x20000000;

            particleSystem1.start();
            particleSystem2.stop();

            var out = new BABYLON.ShaderMaterial("shader", scene, {vertex: "custom",fragment: "custom",}, {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
                ,needAlphaBlending: true});
            out.setTexture("map",  new BABYLON.Texture("static/image/Cloud.png", scene));
            out.setVector3("fogColor",new BABYLON.Vector3(1,1,1));
            out.setFloat("fogNear", 1.8);
            out.setFloat("fogFar", 0.8);
            out.backFaceCulling = false;

            var group1=new BABYLON.Mesh("",scene);
            var group2=new BABYLON.Mesh("",scene);
            var planeone = BABYLON.Mesh.CreatePlane("ground1", 6, scene);
            planeone.material=out;
            planeone.layerMask = 0x20000000;
            for ( var i = 0; i < positions.length; i+=2 ) {
                var plane=planeone.clone("ss");
                plane.position=positions[i];
                var s=Math.random() * Math.random() * 1.5 + 2;
                plane.scaling=new BABYLON.Vector3(s,s,s);
                plane.visibility =true;
                plane.setParent(group1);
            }
            for ( var i = 0; i < positions2.length; i+=2 ) {
              var plane=planeone.clone("ss");
              plane.position=positions2[i];
              var s=Math.random() * Math.random() * 1.5 + 2;
              plane.scaling=new BABYLON.Vector3(s,s,s);
              plane.visibility =false;
              plane.setParent(group2);
            }
            planeone.dispose();

            var materialPlane = new BABYLON.StandardMaterial("texturePlane", scene);
            materialPlane.diffuseTexture = new BABYLON.Texture("static/image/dimian.jpg", scene);
            materialPlane.backFaceCulling = false;
            materialPlane.specularPower=0;
            materialPlane.specularColor=new BABYLON.Color3(0,0,0);

            var material_jiantou = new BABYLON.StandardMaterial("texturePlane", scene);
          material_jiantou.diffuseTexture = new BABYLON.Texture("static/image/beibanquinishizhengjiantou.jpg", scene);
          material_jiantou.backFaceCulling = false;//Always show the front and the back of an element
          material_jiantou.specularPower=0;
          material_jiantou.specularColor=new BABYLON.Color3(0,0,0);

          var material_jiantouA = new BABYLON.StandardMaterial("texturePlane", scene);
          material_jiantouA.diffuseTexture = new BABYLON.Texture("static/image/jiantouA.png", scene);
          material_jiantouA.diffuseTexture.hasAlpha = true;
          material_jiantouA.backFaceCulling = false;//Always show the front and the back of an element

          var material_jiantouB = new BABYLON.StandardMaterial("texturePlane", scene);
          material_jiantouB.diffuseTexture = new BABYLON.Texture("static/image/jiantou2.png", scene);
          material_jiantouB.diffuseTexture.hasAlpha = true;
          material_jiantouB.backFaceCulling = false;//Always show the front and the back of an element

            var mesh1 = [];
            BABYLON.SceneLoader.ImportMesh("","","data:"+ this.strData1, scene, function(newMeshes, particleSystems, skeletons) {
              for (var i = 0; i < newMeshes.length; i++) {
                newMeshes[i].isVisible = true;
                newMeshes[i].layerMask = 0x20000000;
                if (!newMeshes[i].rotationQuaternion) {
                    newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
                    newMeshes[i].rotation = BABYLON.Vector3.Zero();
                    newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                    newMeshes[i].position = BABYLON.Vector3.Zero();
                    mesh1.push(newMeshes[i]);
                    if(newMeshes[i].name == "toumingmianpian"){
                      newMeshes[i].material.backFaceCulling = false;
                    } else if (newMeshes[i].name == "longjuanfeng") {
                      newMeshes[i].material.backFaceCulling = false;
                      newMeshes[i].material.alpha = 0.4;
                    } else if (newMeshes[i].name == "dimian") {
                      newMeshes[i].material=materialPlane;
                    } else if (newMeshes[i].name == "jiantouA") {
                      newMeshes[i].material= material_jiantou;
                    } else if (newMeshes[i].name == "UVdonghuaA") {
                      newMeshes[i].material= material_jiantouA;
                    } else if (newMeshes[i].name == "UVdonghuaB") {
                      newMeshes[i].material= material_jiantouB;
                    }
                }
              }
            });
            var mesh2 = [];
            BABYLON.SceneLoader.ImportMesh("","","data:"+ this.strData2, scene, function(newMeshes, particleSystems, skeletons) {
            for (var i = 0; i < newMeshes.length; i++) {
              newMeshes[i].isVisible = true;
              newMeshes[i].layerMask = 0x20000000;
              if (!newMeshes[i].rotationQuaternion) {
                newMeshes[i].rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(newMeshes[i].rotation.y, newMeshes[i].rotation.x, newMeshes[i].rotation.z);
                newMeshes[i].rotation = BABYLON.Vector3.Zero();
                newMeshes[i].scaling = new BABYLON.Vector3(1, 1, 1);
                newMeshes[i].position = BABYLON.Vector3.Zero();
                mesh2.push(newMeshes[i]);
                if(newMeshes[i].name == "toumingmianpian"){
                  newMeshes[i].material.backFaceCulling = false;
                } else if (newMeshes[i].name == "longjuanfeng") {
                  newMeshes[i].material.backFaceCulling = false;
                    newMeshes[i].material.alpha = 0.4;
                } else if (newMeshes[i].name == "dimian") {
                  newMeshes[i].material=materialPlane;
                } else if (newMeshes[i].name == "jiantouA") {
                  newMeshes[i].material= material_jiantou;
                } else if (newMeshes[i].name == "UVdonghuaA") {
                  newMeshes[i].material= material_jiantouA;
                } else if (newMeshes[i].name == "UVdonghuaB") {
                  newMeshes[i].material= material_jiantouB;
                }
              }
            }
          });

          initModel();

          function initModel() {
            for (var i = 0; i < mesh1.length; i++) {
              mesh1[i].visibility = true;
            }
            for (var i = 0; i < mesh2.length; i++) {
              mesh2[i].visibility = false;
            }
          }

          var index = 0;
          // Events
            var show=true;
            var onPointerDown = function (evt) {
                var pickInfo = scene.pick(scene.pointerX, scene.pointerY);
                if (pickInfo.hit) {
                var currentMesh = pickInfo.pickedMesh;
                console.log("==========currentMesh===========",currentMesh.name);
                }
            };
          var onPointerUp = function () {

          };
          var onPointerMove = function (evt) {

          };

          thiz.canvas.addEventListener("pointerdown", onPointerDown, false);
          thiz.canvas.addEventListener("pointerup", onPointerUp, false);
          thiz.canvas.addEventListener("pointermove", onPointerMove, false);
          scene.onDispose = function () {
            thiz.canvas.removeEventListener("pointerdown", onPointerDown);
            thiz.canvas.removeEventListener("pointerup", onPointerUp);
            thiz.canvas.removeEventListener("pointermove", onPointerMove);
          };

        scene.registerBeforeRender(function () {
          material_jiantouA.diffuseTexture.vOffset -= 0.01;
          material_jiantouB.diffuseTexture.vOffset -= 0.01;
          if(index==0){
              for(var i = 0; i < group1.getChildMeshes().length; i++){
                  group1.getChildren()[i].lookAt(camera.position);
              }
          }else{
              for(var i = 0; i < group2.getChildMeshes().length; i++){
                  group2.getChildren()[i].lookAt(camera.position);
              }
          }
        });
        var changeSence=function() {
            var index=$(this).index();
            if(index==0 && thiz.cameraF){
              scene.clearColor = new BABYLON.Color4(0,0,0,0);
            }else if(index==1){
              scene.clearColor = new BABYLON.Color4(0.95,0.95,0.95,1);
            }else if(index==2){
              scene.clearColor = new BABYLON.Color4(0.1,0.1,0.1,1);
            }
        }
        var swithBtn = function () {
            $('#switchBtn>div').css('background','#a9a9a9');
            $(this).css('background','#6a6a6a');
            index=$(this).index();
            if(index == 0){
              particleSystem1.start();
              particleSystem2.stop();
              for (var i = 0; i < mesh1.length; i++) {
                mesh1[i].visibility = true;
              }
              for(var i = 0; i < group1.getChildMeshes().length; i++){
                group1.getChildren()[i].visibility =true;
              }
              for(var i = 0; i < group2.getChildMeshes().length; i++){
                group2.getChildren()[i].visibility =false;
              }
              for (var i = 0; i < mesh2.length; i++) {
                mesh2[i].visibility = false;
              }
            }else if(index == 1){
              particleSystem2.start();
              particleSystem1.stop();
              for (var i = 0; i < mesh2.length; i++) {
                mesh2[i].visibility = true;
              }
              for (var i = 0; i < mesh1.length; i++) {
                mesh1[i].visibility = false;
              }
              for(var i = 0; i < group1.getChildMeshes().length; i++){
                group1.getChildren()[i].visibility =false;
              }
              for(var i = 0; i < group2.getChildMeshes().length; i++){
                group2.getChildren()[i].visibility =true;
              }
            }
        }
        var isMob=/iPad|Android/g.test(navigator.userAgent);
        if(isMob){
            $('#changeSence>div').on('touchstart',changeSence);
            $('#switchBtn>div').on('touchstart',swithBtn);
        }else{
            $('#changeSence>div').on('click',changeSence);
            $('#switchBtn>div').on('click',swithBtn);
        }
        return scene;
        }
    },
    mounted() {
        this.init();
        $('#showhide').hide();
    }
}
</script>

<style>
html,body,h1,h2,h3,h4,h5,h6,hr,p,iframe,dl,dt,dd,ul,ol,li,pre,form,button,input,textarea,th,td,fieldset {
    margin: 0;
    padding: 0;
    border: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}

body,html {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    border: none;
    overflow: hidden;
    position: fixed;
    font-family: "Segoe WP", "Segoe UI", Verdana, Arial;
    touch-action: none;
    background-color: #fff;
    -ms-touch-action: none
}
body {
    height: 100%;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
canvas{
    position:absolute;
    top:0;
    left:0;
    z-index: 9;
}
#video {
    position: absolute;
    left:0;
    right:0;
    margin:auto;
    z-index: 1;
    background: #fff;
  }
  #video.videoW{
    height:auto;
    width:100%;
  }
  #video.videoH{
    width:auto;
    height:100%;
  }
  .wxtip {
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    display: none;
    background-size: 70% auto;
    background-position: top right;
    background-repeat: no-repeat;
    background-color: rgba(0, 0, 0, 0.6);
}

/****** 基本样式开始 ******/

  #fps {
    position: absolute;
    right: 20px;
    top: 5em;
    font-size: 20px;
    color: #6cf;
    z-index: 997;
  }

.renderCanvas-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

#notSupported {
    color: #232F32;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    background-color: #ffffff;
    text-align: center;
    padding-top: 0;
    font-size: 30px;
    z-index: 999;
    cursor: default
}

#renderCanvas {
    width: 100%;
    height: 100%;
    outline: 0
}

.hidden {
    display: none
}
  #changeSence{
    width:50px;
    position: absolute;
    z-index: 19;
    left: 15px;
    bottom:0px;
    top:0px;
    margin: auto;
  }
  #changeSence>div{
    margin: 12px 0;
    width:50px;
    height:50px;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0px 0px 3px rgba(0,0,0,0.5);
  }
  #changeSence>div>img{
    width: 50px;
  }

#switchBtn{
  width:182px;
  position: absolute;
  z-index: 19;
  right: 15px;
  bottom:15px;
}
#switchBtn>div{
  color:#fff;
  width: 180px;
  height:34px;
  font-weight: 500;
  line-height: 30px;
  text-align: center;
  background: #a9a9a9;
  border: 2px solid #c5c5c5;
  border-radius: 6px;
  cursor: pointer;
  margin: 12px 0;
  box-shadow: 0px 0px 1px rgba(0,0,0,0.8);
}
</style>
