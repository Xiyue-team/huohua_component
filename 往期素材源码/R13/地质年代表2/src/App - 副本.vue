<template>
    <div id="app" class="noselect">
        <!--头部-->
        <h3 v-html="title" class="app_title"></h3>
        <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
        <div class="container" :style="'height:'+H+'px'">
            <!--视图区-->
            <div class="View" :style="'width:'+VW+'px;height:'+VH+'px'" id="scaleWrap">
                <div class="ViewSpace" :style="'transform: scale('+zoomF+');background-image:url(./static/UI/bg.png);'">    
                <div class="btn-group">
                  <ui-btn :type="blue1" size="reset1" @click.native="btnClick(1)">被子植物</ui-btn>
                  <ui-btn :type='blue2' size="reset1" @click.native="btnClick(2)">盾皮鱼</ui-btn>
                  <ui-btn :type='blue3' size="reset1" @click.native="btnClick(3)">红藻</ui-btn>
                  <ui-btn :type='blue4' size="reset1" @click.native="btnClick(4)">剑齿虎</ui-btn>
                  <ui-btn :type='blue5' size="reset1" @click.native="btnClick(5)">蓝藻</ui-btn>
                  <ui-btn :type='blue6' size="reset1" @click.native="btnClick(6)">三角龙</ui-btn>
                  <ui-btn :type='blue7' size="reset1" @click.native="btnClick(7)">石松</ui-btn>
                  <ui-btn :type='blue8' size="reset1" @click.native="btnClick(8)">蜥蜴</ui-btn>
                  <ui-btn :type='blue9' size="reset1" @click.native="btnClick(9)">细菌</ui-btn>
                  <ui-btn :type='blue10' size="reset1" @click.native="btnClick(10)">银杏树</ui-btn>
                  <ui-btn :type='blue11' size="reset1" @click.native="btnClick(11)">智人</ui-btn>
                  
                </div>  
                </div>
            </div>
        </div>
        <div class="threeContainer" id="threeContainer" v-show="canvasToggle">
            <div class="closeBtn" @click="close"><img src="static/UI/close.png" draggable="false"></div>
        </div>
    </div>
    
</template>
<script type="text/javascript">
    import uiBtn from '@/components/UI/uiBtn'; //按钮
    export default {
        name: 'app',
        components: {
            uiBtn,
        },
        data() {
            return {
                title: '地质年代表_模型',
                H:window.innerHeight-72,
                mainWidth :'',
                mainHeight:'',
                played: true,
                VW:0,
                VH:0,
                zoomF:0,
                value:0,
                canvasToggle:false,    
                blue:0,
                blue1:'',
                blue2:'',
                blue3:'',
                blue4:'',
                blue5:'',
                blue6:'',
                blue7:'',            
                blue8:'',            
                blue9:'',            
                blue10:'',            
                blue11:'',            
            }
        },
        created() {
            document.title = this.title;
        },
        mounted() {
           this.TODO = this.inits();
            this.getViewSize();
            window.addEventListener('resize', () => {
                this.getViewSize();
            })
        },
        computed: {},
        watch: {
            blue1() {
              this.TODO.show1(this.blue1);
            },
            blue2() {
              this.TODO.show2(this.blue2);
            },
            blue3() {
              this.TODO.show3(this.blue3);
            },
            blue4() {
              this.TODO.show4(this.blue4);
            },
            blue5() {
              this.TODO.show5(this.blue5);
            },
            blue6() {
              this.TODO.show6(this.blue6);
            },
            blue7() {
              this.TODO.show7(this.blue7);
            },
            blue8() {
              this.TODO.show8(this.blue8);
            },
            blue9() {
              this.TODO.show9(this.blue9);
            },
            blue10() {
              this.TODO.show10(this.blue10);
            },
            blue11() {
              this.TODO.show11(this.blue11);
            }

        },
        methods: {
            btnClick(val) {
                this.canvasToggle=true;
                this.blue1='';
                this.blue2='';
                this.blue3='';
                this.blue4='';
                this.blue5='';
                this.blue6='';
                this.blue7='';
                this.blue8='';
                this.blue9='';
                this.blue10='';
                this.blue11='';
                this['blue'+val]='blue';
                this.blue=val;
            },
            close(){
              this.canvasToggle=false;
              this.blue1='';
              this.blue2='';
              this.blue3='';
              this.blue4='';
              this.blue5='';
              this.blue6='';
              this.blue7='';
              this.blue8='';
              this.blue9='';
              this.blue10='';
              this.blue11='';
              this.TODO.close(this.close);
            },
            inits() {
              this.getCanvansSize();
              var container, camera, renderer, scene, controls, text;
              container = $('#threeContainer')[0];
              camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
              camera.position.set(320, 36, 1240);
              camera.zoom = 1;
              camera.updateProjectionMatrix();
              //场景
              scene = new THREE.Scene();
              //灯光
              var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
              hemiLight.position.set(0, 50, 0);
              scene.add(hemiLight);

              var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
              dirLight.color.setHSL(0.1, 1, 0.95);
              dirLight.position.set(-1, 1.75, 1);
              dirLight.position.multiplyScalar(30);
              scene.add(dirLight);
              dirLight.castShadow = true;
              dirLight.shadow.mapSize.width = 2048;
              dirLight.shadow.mapSize.height = 2048;
              var d = 50;
              dirLight.shadow.camera.left = -d;
              dirLight.shadow.camera.right = d;
              dirLight.shadow.camera.top = d;
              dirLight.shadow.camera.bottom = -d;
              dirLight.shadow.camera.far = 3500;
              dirLight.shadow.bias = -0.0001;

              var dirLight1 = dirLight.clone();
              dirLight1.position.set(1, -1.75, -1);
              dirLight1.intensity = 0.4;
              scene.add(dirLight1);

              //渲染器
              renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
              renderer.setPixelRatio(window.devicePixelRatio);
              renderer.setSize(this.mainWidth, this.mainHeight);
              renderer.setClearColor(0xffffff, 0);
              container.appendChild(renderer.domElement);

              //控制器
              controls = new THREE.OrbitControls(camera, renderer.domElement);
              controls.enableDamping = true;
              controls.dampingFactor = 0.25;
              controls.enableZoom = true;
              controls.minDistance = 848;
              controls.maxDistance = 2000;

              

              // 模型导入
              var model1 = null,
              model2 = null,
              model3 = null,
              model4 = null,
              model5 = null,
              model6 = null,
              model7 = null,
              model8 = null,
              model9 = null,
              model10 = null,
              model11 = null;
              function modelPut(obj, mtl, O, scale, callback) {
                var onProgress = function(xhr) {
                  if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log(Math.round(percentComplete, 2) + '% downloaded');
                  }
                };
                var onError = function(xhr) {};
                var mtlLoader = new THREE.MTLLoader();
                mtlLoader.setPath('static/obj/');
                mtlLoader.load(mtl, function(materials) {
                  materials.preload();
                  var objLoader = new THREE.OBJLoader();
                  objLoader.setMaterials(materials);
                  objLoader.setPath('static/obj/');
                  objLoader.load(obj, function(object) {
                    for (let i in materials.materials) {
                      // console.log(materials.materials[i])
                      materials.materials[i].flatShading = THREE.SoomthShading;
                    }
                    object.scale.x = scale;
                    object.scale.y = scale;
                    object.scale.z = scale;
                    O = object;
                    for (var i in O.children) {
                      // console.log(O.children[i].name);
                      O.children[i].visible=false;
                     
                    }
                    callback && callback(O);
                  }, onProgress, onError);
                });
              }
              modelPut('zhiwu.obj', 'zhiwu.mtl', model1, 15, (O) => {
                model1 = O;
                if (!model1 == null) {
                  scene.remove(model1);
                }
                scene.add(model1);
                this.loadF = false;
              });

              modelPut('fish.obj', 'fish.mtl', model2, 8, (O1) => {
                model2 = O1;
                if (!model2 == null) {
                  scene.remove(model2);
                }
                scene.add(model2);
                this.loadF = false;
              });

              modelPut('hongzao.obj', 'hongzao.mtl', model3, 8, (O2) => {
                model3 = O2;
                if (!model3 == null) {
                  scene.remove(model3);
                }
                scene.add(model3);
                this.loadF = false;
              });

              modelPut('tiger.obj', 'tiger.mtl', model4, 25, (O3) => {
                model4 = O3;
                if (!model4 == null) {
                  scene.remove(model4);
                }
                scene.add(model4);
                this.loadF = false;
              });

              modelPut('lanzao.obj', 'lanzao.mtl', model5, 25, (O4) => {
                model5 = O4;
                if (!model5 == null) {
                  scene.remove(model5);
                }
                scene.add(model5);
                this.loadF = false;
              });

              modelPut('long.obj', 'long.mtl', model6, 8, (O5) => {
                model6 = O5;
                if (!model6 == null) {
                  scene.remove(model6);
                }
                scene.add(model6);
                this.loadF = false;
              });

              modelPut('shisong.obj', 'shisong.mtl', model7, 8, (O6) => {
                model7 = O6;
                if (!model7 == null) {
                  scene.remove(model7);
                }
                scene.add(model7);
                this.loadF = false;
              });

              modelPut('xiyi.obj', 'xiyi.mtl', model8, 0.5, (O7) => {
                model8 = O7;
                if (!model8 == null) {
                  scene.remove(model8);
                }
                scene.add(model8);
                this.loadF = false;
              });

              modelPut('xijun.obj', 'xijun.mtl', model9, 100, (O8) => {
                model9 = O8;
                if (!model9 == null) {
                  scene.remove(model9);
                }
                scene.add(model9);
                this.loadF = false;
              });

              //这个模型有问题 name文字乱码  mesh太多没整合
              modelPut('tree.obj', 'tree.mtl', model10, 0.5, (O9) => {
                model10 = O9;
                if (!model10 == null) {
                  scene.remove(model10);
                }
                scene.add(model10);
                this.loadF = false;
                for (var i in model10.children) {
                  console.log(model10.children[i]);

                }
              });

              modelPut('ren.obj', 'ren.mtl', model10, 50, (O10) => {
                model11 = O10;
                if (!model11 == null) {
                  scene.remove(model11);
                }
                
                scene.add(model11);
                this.loadF = false;
              });
              var show1 = (f) => {
                if (f) {
                  for (var i in model1.children) {
                    if (model1.children[i].name.indexOf('Plane015') != -1) {
                      model1.children[i].visible = true;
                    }
                  }
                }
              }
              var show2 = (f) => {
                if (f) {
                  for (var i in model2.children) {
                    if (model2.children[i].name.indexOf('Box004') != -1) {
                      model2.children[i].visible = true;
                    }
                  }
                }
              };
              var show3 = (f) => {
                if (f) {
                  for (var i in model3.children) {
                    if (model3.children[i].name.indexOf('Cylinder001') != -1) {
                      model3.children[i].visible = true;
                    }
                  }
                }
              };
              var show4 = (f) => {
                if (f) {
                  for (var i in model4.children) {
                    if (model4.children[i].name.indexOf('default001') != -1) {
                      model4.children[i].visible = true;
                    }
                  }
                }
              };
              var show5 = (f) => {
                if (f) {
                  for (var i in model5.children) {
                    if (model5.children[i].name.indexOf('Group45428') != -1) {
                      model5.children[i].visible = true;
                    }
                  }
                }
              };
              var show6 = (f) => {
                if (f) {
                  for (var i in model6.children) {
                    if (model6.children[i].name.indexOf('default004') != -1) {
                      model6.children[i].visible = true;
                    }
                  }
                }
              };
              var show7 = (f) => {
                if (f) {
                  for (var i in model7.children) {
                    if (model7.children[i].name.indexOf('Line008') != -1) {
                      model7.children[i].visible = true;
                    }
                  }
                }
              };
              var show8 = (f) => {
                if (f) {
                  for (var i in model8.children) {
                    if (model8.children[i].name.indexOf('Cylinder011') != -1) {
                      model8.children[i].visible = true;
                    }
                  }
                }
              };
              var show9 = (f) => {
                if (f) {
                  for (var i in model9.children) {
                    if (model9.children[i].name.indexOf('001') != -1) {
                      model9.children[i].visible = true;
                    }
                  }
                }
              };
              var show10 = (f) => {
                if (f) {
                  for (var i in model10.children) {
                    if (model10.children[i].name.indexOf('Cylinder') != -1) {
                      model10.children[i].visible = true;
                    }
                  }
                }
              };
              var show11 = (f) => {
                if (f) {
                  for (var i in model11.children) {
                    if (model11.children[i].name.indexOf('Cylinder004') != -1) {
                      model11.children[i].visible = true;
                    }
                  }
                }
              };
              var reset = () => {
           
              };
              var close =()=>{
                for (var i in model1.children) {
                  model1.children[i].visible = false;
                }
                for (var i in model2.children) {
                  model2.children[i].visible = false;
                }
                for (var i in model3.children) {
                  model3.children[i].visible = false;
                }
                for (var i in model4.children) {
                  model4.children[i].visible = false;
                }
                for (var i in model5.children) {
                  model5.children[i].visible = false;
                }
                for (var i in model6.children) {
                  model6.children[i].visible = false;
                }
                for (var i in model7.children) {
                  model7.children[i].visible = false;
                }
                for (var i in model8.children) {
                  model8.children[i].visible = false;
                }
                for (var i in model9.children) {
                  model9.children[i].visible = false;
                }
                for (var i in model10.children) {
                  model10.children[i].visible = false;
                }
                for (var i in model11.children) {
                  model11.children[i].visible = false;
                }
                camera.position.set(320, 36, 1240);
                camera.zoom = 1;
                camera.updateProjectionMatrix();
              };
              var render = () => {
                if (camera.zoom <= 0.5) {
                  camera.zoom = 0.5000001;
                } else if (camera.zoom >= 2.5) {
                  camera.zoom = 2.49999999;
                }
                requestAnimationFrame(render);
                controls.update();
                camera.lookAt(scene.position);
                renderer.render(scene, camera);
              };
              render();
              var TODO = function() {
                return {
                  reset: reset,
                  show1: show1,
                  show2: show2,
                  show3: show3,
                  show4: show4,
                  show5: show5,
                  show6: show6,
                  show7: show7,
                  show8: show8,
                  show9: show9,
                  show10: show10,
                  show11: show11,
                  close: close,
                }
              }
              return TODO();
            },
            //计算区块大小
            getViewSize() {
                let W =window.innerWidth;
                let H=window.innerHeight-72;
                this.H=H;
                if(W/H>976/416){
                    this.VW=parseInt(976*H/416);
                    this.VH=H;
                    this.zoomF=(H/416).toFixed(2);
                }else{
                    this.VW=W;
                    this.VH=parseInt(416*W/976);
                    this.zoomF=(W/976).toFixed(2);
                }
            },

            getCanvansSize() {
                this.mainWidth = window.innerWidth;
              this.mainHeight = window.innerHeight;
               this.H=this.mainHeight;
              if(this.mainWidth /this.mainHeight>976/416){
                    this.VW=parseInt(976*this.mainHeight/416);
                    this.VH=this.mainHeight;
                    this.zoomF=(this.mainHeight/416).toFixed(2);
                }else{
                    this.VW=this.mainWidth;
                    this.VH=parseInt(416*this.mainWidth/976);
                    this.zoomF=(this.mainWidth/976).toFixed(2);
                }
            },


            //重置
            resetWidget() {
            },
        },
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        line-height: 0;
    }
    li {
        list-style: none;
    }

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }
    canvas {
        outline: none;
    }
    /*盒模型，padding尺寸不用再减去*/
    *, *:before, *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color: transparent;
    }
    html, body, #app {
        width: 100%;
        height: 100%;
        overflow: hidden;
        font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        background-color: #fff;
    }
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .noselect {
        -webkit-touch-callout: none;
        /* iOS Safari */
        -webkit-user-select: none;
        /* Chrome/Safari/Opera */
        -khtml-user-select: none;
        /* Konqueror */
        -moz-user-select: none;
        /* Firefox */
        -ms-user-select: none;
        /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently not supported by any browser */
    }
    h3 {
        font-size: 24px;
        color: #000;
        line-height: 1.0;
        padding: 24px;
        font-weight: normal;
    }
    .container {
        width: 100%;
        position: relative;
    }
    .aside_reset {
        position: fixed;
        right: 0;
        top: 0;
        margin: 20px 24px;
    }
    .View{
        position: absolute;
        left:0;
        right:0;
      top:0;
        bottom:0;
        margin: auto;
    }
    canvas {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    .ViewSpace{
        position: relative;
        width:976px;
        height: 416px;
        padding: 24px;
        box-sizing: border-box;
        transform-origin: top left;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: 0 0;
        background-origin: content-box;
    }
     .ViewSpace>img{
        position:absolute;
        display: block;
        width: 100%;
        height: 100%;
    }
    .threeContainer{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 999;
        left: 0;
        top: 0;
        background-color: #fff;
    }
    
    .closeBtn{
        width: 60px;
        height: 60px;
        display: inline-block;
        position: absolute;
        right: 24px;
        top: 24px;
        cursor: pointer;
        z-index: 9999999;
    }
    .closeBtn img{
        display: block;
        width: 100%;
        height: 100%;
    }
    .btn-group {
      position: absolute;
      top: 60px;
      left: 100px;
    }

.btn_space .UI-btn {
  margin-bottom: 15px;
  line-height: 36px;
}

</style>