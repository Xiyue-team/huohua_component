<template>
  <div id="app" class="noselect" :style="appStyle">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="threeContainer">
        <div id="loading">loading...</div>
      </div>
    </div>
    <!--重制按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
    <!--清除浮动-->
    <div class="center">
      <ui-group type="radio"
                :groups="groups"
                v-model="radio"></ui-group>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiGroup, uiSlider},
    data() {
      return {
        title: 'ATP',
        played: true,
        radio: 'ATP',
        groups: [{
          name: 'ATP',
          txt: 'ATP'
        }, {
          name: 'ADP',
          txt: 'ADP'
        }, {
          name: 'AMP',
          txt: 'AMP'
        }],
        TO: null,
        hide: null,
        show: null,
        rest: false,
        appStyle: {
          background: 'url(static/UI/bg.png) no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        },
      }
    },
    created() {
      document.title = this.title;
    },
    mounted() {
      this.setSideStyle();
      this.TO = this.init();
      window.onresize = () => {
        this.setSideStyle();
      }
    },
    computed: {},
    watch: {
      radio(val) {
        this.TO.showHide(val);
      }
    },
    methods: {
      //计算侧边
      setSideStyle() {
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        var leftC = ($('#threeContainer').width() - cW) / 2;
        $('canvas').css({'left': leftC + 'px', 'top': ($('#threeContainer').height() - cH) / 2 + 'px'});
        $('.loading').css('line-height', window.innerHeight + 'px');
      },
      //初始化
      init() {
        var threeW = $('#threeContainer').width();
        var threeH = $('#threeContainer').height();
        var container, camera, renderer, scene, controls, hemiLight;
        container = $('#threeContainer')[0];
        camera = new THREE.OrthographicCamera(threeW / -3, threeW / 3, threeH / 3, threeH / -3, 1, 20000);
        camera.position.set(0, 0, 10000);

        // scene
        scene = new THREE.Scene();

        // light
        var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
        dirLight1.position.set(-200, 400, 200);
        dirLight1.distance = 0;
        var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
        dirLight2.position.set(200, -400, -200);
        dirLight2.distance = 0;
        scene.add(dirLight1, dirLight2);
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 0, 0);
        scene.add(hemiLight);
        //判断是否支持webGL

        renderer = null;
        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(threeW, threeH);
        renderer.setClearColor(0xffffff, 0);
        container.appendChild(renderer.domElement);

        //控制
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        function animate() {
          requestAnimationFrame(animate);
          render();
        }

        function render() {
          if (camera.zoom <= 0.5) {
            camera.zoom = 0.5000001;
          } else if (camera.zoom >= 2) {
            camera.zoom = 1.99999999;
          }
          camera.updateProjectionMatrix();
          controls.update();
          camera.lookAt(scene.position);
          renderer.render(scene, camera);
        }

        animate();

        // 模型导入
        var model1 = new THREE.Group();
        var Ball1, Ball2;

        function modelPut(obj, mtl, O, scale, callback) {
          var vm = this;
          var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
              var percentComplete = xhr.loaded / xhr.total * 100;
              console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
          };
          var onError = function (xhr) {
          };
          var mtlLoader = new THREE.MTLLoader();
          mtlLoader.setPath('static/obj/');
          mtlLoader.load(mtl, function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('static/obj/');
            objLoader.load(obj, function (object) {
              object.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                  for (var i in node.material.materials) {
                    node.material.materials[i] = new THREE.MeshPhongMaterial({
                      color: node.material.materials[i].color,
                      shading: THREE.SmoothShading,
                      transparent: true
                    });
                  }
                }
                if (node.name.indexOf('ATDMP1 ADP')) {
                  Ball2 = node;
                } else if (node.name.indexOf('ATDMP1 ATP')) {
                  Ball1 = node;
                }
              });
              object.scale.x = scale;
              object.scale.y = scale;
              object.scale.z = scale;
              O.add(object);
              scene.add(O);
              callback && callback(O);
            }, onProgress, onError);
          });
        };
        modelPut('ATDMP.obj', 'ATDMP.mtl', model1, 2.5, function (O) {
          $('#loading').hide();
        });
        var resetWidget = () => {
          camera.zoom = 1;
          camera.position.set(0, 0, 10000);
          if (this.radio = 'ATP') {
            return;
          }
          this.rest = true;
          this.radio = 'ATP';
          model1.children.traverse(function (node) {
            if (node instanceof THREE.Mesh) {
              for (var i in node.material.materials) {
                node.material.materials[i].opacity = 1;
              }
            }
          });
        };
        var SET = {};
        var show = (o, num) => {
          var an = () => {
            if (o.material.materials[0].opacity >= 1) {
              cancelAnimationFrame(SET[num]);
              for (var i in o.material.materials) {
                o.material.materials[i].opacity = 1;
              }
              return;
            }
            for (var i in o.material.materials) {
              o.material.materials[i].opacity += 0.05;
            }
            SET[num] = requestAnimationFrame(an);
          }
          an();
        };
        var hide = (o, num) => {
          var an = () => {
            if (o.material.materials[0].opacity <= 0) {
              cancelAnimationFrame(SET[num]);
              for (var i in o.material.materials) {
                o.material.materials[i].opacity = 0;
              }
              return;
            }
            for (var i in o.material.materials) {
              o.material.materials[i].opacity -= 0.05;
            }
            SET[num] = requestAnimationFrame(an);
          }
          an();
        };
        var showHide = (val) => {
          for (var i in SET) {
            cancelAnimationFrame(SET[i]);
          }
          SET = {};
          if (val == 'ATP') {
            show(Ball1, 1);
            show(Ball2, 2);
          } else if (val == 'ADP') {
            show(Ball1, 1);
            hide(Ball2, 2);
          } else if (val == 'AMP') {
            hide(Ball1, 1);
            hide(Ball2, 2);
          }
        };
        var TO = function () {
          return {
            reset: resetWidget,
            showHide: showHide,
          }
        };
        return TO();
      },
      //重置
      resetWidget() {
        this.TO.reset();
      }
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

  input, button {
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

  html, body, #app {
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
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently not supported by any browser */
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
    float: left;
    height: 100%;
    position: relative;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    position: absolute;
    top: 0;
    z-index: 999;
  }

  .app_aside {
    float: left;
    width: 280px;
    height: 100%;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }

  .aside_reset {
    position: absolute;
    float: right;
    top: 20px;
    right: 20px;
  }

  #threeContainer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }

  #threeContainer canvas {
    position: absolute;
  }

  #loading {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    height: 20px;
    line-height: 20px;
    width: 100%;
  }

  .center {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
</style>
