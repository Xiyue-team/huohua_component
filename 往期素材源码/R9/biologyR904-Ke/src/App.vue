<template>
   <div id="app" class="noselect">
      <!--头部-->
      <ui-head :title="title">
         <ui-btn type="reset1" @click.native="resetWidget" id="button1"></ui-btn>
      </ui-head>
      <!--模型区域-->
      <div class="container">
         <div class="ViewSpace" id="threeContainer">
            <div v-if="loadF" id="loading">loading...</div>
            <div class="center" :style="'background-image:url('+src+')'" v-model ='checked' @click='played'></div>
            <div class="bottom">
               <ui-btn :type="blue1" size="big" @click.native="btnClick(1)" id="button2" style="width:120px;">切割</ui-btn>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
   name: 'app',
   components: { uiHead, uiBtn },
   data() {
      return {
         title: '限制性核酸内切酶 ',
         zoom: {}, //区域大小
         checked: false,
         mainWidth: window.innerWidth,
         TOOUT: null,
         mainHeight: window.innerHeight,
         blue1: '',
         src: './static/img/1.png',
         blue: 0,
         loadF: true,
      }
   },
   created() {
      document.title = this.title;
   },
   mounted() {
      this.TOOUT = this.inits();
      window.onresize = () => {
         this.TOOUT.onWindowResize();
      }

   },
   computed: {},
   watch: {
      blue1() {
         this.TOOUT.show1(this.blue1);
      },
       checked() {
         this.TOOUT.show2(this.checked);
      },
   },
   methods: {
      btnClick(val) {
         if (this.blue == val) {
            return;
         }
         this.blue = 0;
         if (val == 1) {
            this.blue1 = 'blue';
         }
      },
       played(){
         if(!this.checked){
            this.src = 'static/img/2.png';
            this.checked=false;
         }else{
             this.src = 'static/img/1.png';
         }
          this.checked = !this.checked;
      },
      inits() {
         var container, camera, renderer, scene, controls, text;
         var SET = null;
         var SET1 = null;
         var SET2 = null;
         var timer1 = null;
         var timer2 = null;
         var timer3 = null;
         //相机
         container = $('#threeContainer')[0];
         camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
         // new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 1, 1000 );
         camera.position.set(0, 0, 800);
         // camera.zoom = 1.3;
         // camera.updateProjectionMatrix();
         //场景
         scene = new THREE.Scene();
         scene.background = new THREE.Color(29 / 255, 59 / 255, 94 / 255);
         //灯光
          var Lights = new THREE.Group();
         var ambientLight = new THREE.AmbientLight(0xcccccc);

         var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
         dirLight.color.setHSL(0.4, 1, 0.95);
         dirLight.position.set(-1000, -1000, 1000);
         dirLight.position.multiplyScalar(30);
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
         Lights.add(ambientLight, dirLight);
         scene.add(Lights);

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
         controls.minDistance = 500;
         controls.maxDistance = 1100;

         function vec3(x, y, z) {
            return new THREE.Vector3(x, y, z);
         }
         var createImg = (w, h, src) => {
            var PlaneG = new THREE.PlaneGeometry(w, h);
            var PlaneM = new THREE.MeshBasicMaterial({
               map: THREE.ImageUtils.loadTexture(src),
               transparent: true,
               depthTest: false
            });
            var Plane = new THREE.Mesh(PlaneG, PlaneM);
            return Plane;
         };;
         // 模型导入
         var model = null;
         var model1 = null;

         //文字贴图
         text = createImg(45, 15, 'static/img/text.png');
         text.material.opacity = 0;
         scene.add(text);

         //创建模型
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
                  object.traverse(function(child) {
                     if (child instanceof THREE.Mesh) {
                        child.material.shading = THREE.SmoothShading;
                     }
                  });
                  object.scale.x = scale;
                  object.scale.y = scale;
                  object.scale.z = scale;
                  O = object;
                  callback && callback(O);
               }, onProgress, onError);
            });
         }
         var start = (m, s1) => {
            for (var i in m.children) {
               if (m.children[i].name.indexOf(s1) != -1) {
                  m.children[i].material = new THREE.MeshPhongMaterial({ transparent: true, opacity: 0 });
               }
               text.position.x = m.children[i].position.x - 105;
               text.position.y = m.children[i].position.y + 75;
               text.position.z = 28;
            }
         };
         modelPut('dna1.obj', 'dna1.mtl', model, 5, (O) => {
            model = O;
            if (!model == null) {
               scene.remove(model);
            }
            for (var i in model.children) {
               if (model.children[i].name.indexOf('zhaozi') != -1) {
                  model.children[i].scale.set(1.1, 1.15, 1.1);
               }
            }
            start(model, 'zhaozi');
            scene.add(model);
            this.loadF = false;
         });
         modelPut('dna2.obj', 'dna2.mtl', model1, 5, (O1) => {
            model1 = O1;
            if (!model1 == null) {
               scene.remove(model1);
            }
            for (var i in model1.children) {
               if (model1.children[i].name.indexOf('zhaozi') != -1) {
                  model1.children[i].scale.set(1.15, 1.1, 1.1);
               }
            }
            start(model1, 'zhaozi');
            scene.add(model1);
            model1.visible = false;
            this.loadF = false;
         });

         var show1 = (f) => {
            if (f) {
               clearTimeout(timer1);
               timer1 = setTimeout(() => {
                  var op = 0;
                  var op1 = 0;
                  var showOp = () => {
                     op += 0.02;
                     op1 += 0.05;
                     if (op >= 0.4 && op1 >= 1) {
                        cancelAnimationFrame(SET1);
                        return;
                     }
                     for (var i in model.children) {
                        if (model.children[i].name.indexOf('zhaozi') != -1) {
                           model.children[i].material.opacity = op;
                        }
                     }
                     for (var i in model1.children) {
                        if (model1.children[i].name.indexOf('zhaozi') != -1) {
                           model1.children[i].material.opacity = op;
                        }
                     }
                     text.material.opacity = op1;
                     SET1 = requestAnimationFrame(showOp);
                  }
                  showOp();
               }, 1000);

               clearTimeout(timer2);
               timer2 = setTimeout(() => {
                  var j = 0;
                  var an = () => {
                     j += 0.2;
                     if (j <= 5) {
                        clearTimeout(timer3);
                        timer3 = setTimeout(() => {
                           var op = 0.4;
                           var op1 = 1;
                           var hideOp = () => {
                              op -= 0.01;
                              op1 -= 0.05;
                              if (op == 0 && op1== 0) {
                                 cancelAnimationFrame(SET2);
                                 return;
                              }
                              for (var i in model.children) {
                                 if (model.children[i].name.indexOf('zhaozi') != -1) {
                                    model.children[i].material.opacity = op;
                                 }
                              }
                              for (var i in model1.children) {
                                 if (model1.children[i].name.indexOf('zhaozi') != -1) {
                                    model1.children[i].material.opacity = op;
                                 }
                              }
                              text.material.opacity = op1;
                              SET2 = requestAnimationFrame(hideOp);
                           };
                           hideOp();
                        }, 100);
                     }
                     if (j > 20) {
                        cancelAnimationFrame(SET);
                        return;
                     }
                     j = j.toFixed(1) * 1;
                     for (var i in model.children) {
                        if (model.children[i].name.indexOf('group1') != -1) {
                           model.children[i].position.x += 0.2;
                           model.children[i].position.y += 0.2;
                        }
                        if (model.children[i].name.indexOf('group2') != -1) {
                           model.children[i].position.x -= 0.2;
                           model.children[i].position.y -= 0.2;
                        }
                     }
                     for (var i in model1.children) {
                        if (model1.children[i].name.indexOf('group1') != -1) {
                           model1.children[i].position.x += 0.2;
                           model1.children[i].position.y += 0.2;
                        }
                        if (model1.children[i].name.indexOf('group2') != -1) {
                           model1.children[i].position.x -= 0.2;
                           model1.children[i].position.y -= 0.2;
                        }
                     }
                     SET = requestAnimationFrame(an);
                  };
                  an();
               }, 3000);
            }
         };
         var show2 = (f) =>{
            if(f){
               if(this.checked){
                  model.visible = false;
                  model1.visible = true;
               }
            }else{
               model.visible = true;
               model1.visible = false;
            }
         };
         var onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
         }
         var reset = () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            for (var i in model.children) {
               if (model.children[i].name.indexOf('group1') != -1) {
                  model.children[i].position.x = 0;
                  model.children[i].position.y = 0;
               }
               if (model.children[i].name.indexOf('group2') != -1) {
                  model.children[i].position.x = 0;
                  model.children[i].position.y = 0;
               }
            }
            for (var i in model1.children) {
               if (model1.children[i].name.indexOf('group1') != -1) {
                  model1.children[i].position.x = 0;
                  model1.children[i].position.y = 0;
               }
               if (model1.children[i].name.indexOf('group2') != -1) {
                  model1.children[i].position.x = 0;
                  model1.children[i].position.y = 0;
               }
            }
            cancelAnimationFrame(SET);
            cancelAnimationFrame(SET1);
            cancelAnimationFrame(SET2);
            camera.position.set(0, 0, 800);
            this.blue1 = '';
            this.src ='./static/img/1.png';
            this.checked = false;
            start(model, 'zhaozi');
            start(model1, 'zhaozi');
            text.material.opacity=0;
         };

         function render() {
            requestAnimationFrame(render);
            controls.update();
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
         }
         render();
         var TOOUT = function() {
            return {
               reset: reset,
               show1: show1,
               show2: show2,
               onWindowResize: onWindowResize
            }
         }
         return TOOUT();
      },
      //重置
      resetWidget() {
         this.TOOUT.reset();
         this.TOOUT.show1();
      },

   },
}
</script>
<style>
* {
   margin: 0;
   padding: 0;
}

li {
   list-style: none;
}

input,
button {
   outline: none;
   -webkit-appearance: none;
   border-radius: 0;
}

canvas {
   outline: none;
}


/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
   -moz-box-sizing: border-box;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
   -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
   -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
   width: 100%;
   height: 100%;
   overflow: hidden;
   font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
   background-color: #fff;
   touch-action: none;
   -ms-touch-action: none;
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


/*ui*/

.UI-camera {
   width: 80px;
   height: 80px;
   cursor: pointer;
}


/*内容区*/

.container {
   width: 100%;
   height: 100%;
}

.btn_space .UI-btn {
   margin-bottom: 15px;
   line-height: 44px;
}


/*视图区*/

.ViewSpace {
   width: 100%;
   height: 100%;
   position: relative;
}

canvas {
   position: absolute;
   width: 100%;
   height: 100%;
   z-index: 1;
}

#loading {
   display: flex;
   justify-content: center;
   align-items: center;
   position: absolute;
   width: 100%;
   height: 100%;
   background: #fff;
   z-index: 9999;
   font-size: 18px;
}

.bottom {
   position: absolute;
   z-index: 9;
   right: 24px;
   bottom: 24px;
}

.center {
   width: 60px;
   height: 60px;
   position: absolute;
   z-index: 9;
   background-size: 60px 60px;
   right: 24px;
   top: 50%;
   cursor: pointer;
}
</style>