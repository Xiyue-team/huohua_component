<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div class="ViewSpace" id="threeContainer">
        <div v-if="loadF" id="loading">loading...</div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="btn-img"><img :src="src" draggable="false"></div>
        <div class="btn-group">
          <ui-btn :type="blue1" size="big" @click.native="btnClick(1)"><sup>32</sup> P标记脱氧核苷酸</ui-btn>
          <ui-btn :type='blue2' size="big" @click.native="btnClick(2)"><sup>35</sup> S标记甲硫氨酸</ui-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
  name: 'app',
  components: { uiBtn },
  data() {
    return {
      title: '同位素标记法',
      BtnSpaceStyle: 'flex',
      zoom: {}, //区域大小
      mainWidth: '',
      TODO: null,
      mainHeight: '',
      blue: 0,
      blue1: 'blue',
      blue2: '',
      src: 'static/UI/32p.png',
      loadF: true
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
     $('#loading').css('line-height', $('#loading').height() + 'px');
    setTimeout(() => {
      this.TODO = this.inits();
    }, 2000);
    window.onresize = () => {
      this.setSideStyle();
      this.getViewSize();
    }
  },
  computed: {},
  watch: {
    blue1() {
      this.TODO.show1(this.blue1);
    },
    blue2() {
      this.TODO.show2(this.blue2);
    },
  },
  methods: {
    btnClick(val) {
      if (this.blue == val) {
        return;
      }
      if (val != 3) { this.blue = val; }
      if (val == 1) {
        this.blue1 = 'blue';
        this.blue2 = '';
        this.imgL("static/UI/32p.png", (src) => {
          this.src = src;
        });
      } else if (val == 2) {
        this.blue2 = 'blue';
        this.blue1 = '';
        this.imgL("static/UI/35s.png", (src) => {
          this.src = src;
        });
      }
    },
    imgL(src, callback) {
      var img = new Image();
      img.src = src;
      img.onload = function() {
        callback && callback(img.src);
      }
    },
    inits() {
      this.setSideStyle();
      this.getViewSize();
      var container, camera, renderer, scene, scene2, controls, text;
      container = $('#threeContainer')[0];
      camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.set(320, 36, 1240);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
      //场景
      scene = new THREE.Scene();
      scene2 = new THREE.Scene();
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

      
      //创建发光球体
      var geometry = new THREE.BufferGeometry();
      geometry.addAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      geometry.addAttribute('size', new THREE.Float32BufferAttribute(5, 1).setDynamic(true));
      var geometry1 = new THREE.BufferGeometry();
      geometry1.addAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0], 3));
      geometry1.addAttribute('size', new THREE.Float32BufferAttribute(5, 1).setDynamic(true));
      var shaderBall = (color, g) => {
        var obj;
        var uniforms = {
          texture: { value: new THREE.TextureLoader().load("static/obj/spark1.png") },
          myColor: { value: new THREE.Color(color) }
        };
        var shaderMaterial = new THREE.ShaderMaterial({
          uniforms: uniforms,
          vertexShader: document.getElementById('vertexshader').textContent,
          fragmentShader: document.getElementById('fragmentshader').textContent,
          transparent: true,
          vertexColors: true
        });

        obj = new THREE.Points(g, shaderMaterial);
        return obj;
      };
      var ball1 = shaderBall('#ff8d00', geometry);
      ball1.position.set(310, 70, -55);
      var ball2 = shaderBall('#00ff27', geometry1);
      ball2.position.set(-150, 90, 100);
      ball2.visible = false;

      // 模型导入
      var model = null;
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
              if (O.children[i].name.indexOf('jlas') != -1) {
                O.children[i].visible = false;
                // O.children[i].scale.set(1.4, 1.4, 1.4);
              }
              if (O.children[i].name.indexOf('ball_35_S') != -1) {
                O.children[i].material = new THREE.MeshPhongMaterial({ color: '#00ff27' });

              }
            }
            callback && callback(O);
          }, onProgress, onError);
        });
      }
      modelPut('tongweisu.obj', 'tongweisu.mtl', model, 8, (O) => {
        model = O;
        if (!model == null) {
          scene.remove(model);
        }
        scene.add(model);
        this.loadF = false;
      });

      var show1 = (f) => {
        if (f) {
          for (var i in model.children) {
            if (model.children[i].name.indexOf('jlas') != -1) {
              model.children[i].visible = false;

            }
            if (model.children[i].name.indexOf('tyhgs') != -1) {
              model.children[i].visible = true;
            }
          }
          ball1.visible = true;
          ball2.visible = false;
        }
      }
      var show2 = (f) => {
        if (f) {
          for (var i in model.children) {
            if (model.children[i].name.indexOf('tyhgs') != -1) {
              model.children[i].visible = false;
            }
            if (model.children[i].name.indexOf('jlas') != -1) {
              model.children[i].visible = true;
            }
          }
          ball2.visible = true;
          ball1.visible = false;
        }
      };
      var reset = () => {
        this.blue1 = 'blue';
        this.blue2 = '';
        this.blue = 0;
        ball1.visible = true;
        ball2.visible = false;
        camera.position.set(320, 36, 1240);
        camera.zoom = 1;
        camera.updateProjectionMatrix();
        this.imgL("static/UI/32p.png", (src) => {
          this.src = src;
        });
        for (var i in model.children) {
          if (model.children[i].name.indexOf('jlas') != -1) {
            model.children[i].visible = false;
          }
          if (model.children[i].name.indexOf('tyhgs') != -1) {
            model.children[i].visible = true;
          }
        }
      };
      var render = () => {
        // if (model) {
        //   var time = Date.now() * 0.005;
        //   var sizes = geometry.attributes.size.array;
        //   sizes[0] = 5 * (2 + Math.sin(time));
        //   geometry.attributes.size.needsUpdate = true;
        //   var sizes1 = geometry1.attributes.size.array;
        //   sizes1[0] = 6 * (2 + Math.sin(time));
        //   geometry1.attributes.size.needsUpdate = true;
        //   scene.add(ball1,ball2);
        // }
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
          show2: show2
        }
      }
      return TODO();
    },
    //计算侧边
    setSideStyle() {
      const el = document.getElementById('btn_space');
      if (el && el.scrollHeight > el.offsetHeight) {
        this.BtnSpaceStyle = 'block'
      } else {
        this.BtnSpaceStyle = 'flex'
        $('#loading').css('line-height', $('#loading').height() + 'px');
      }
    },
    //计算区块大小
    getViewSize() {
      this.mainWidth = window.innerWidth - 280;
      this.mainHeight = window.innerHeight;
      var cW = this.mainHeight / 2 + 100;
      $('.ViewImg').css({ 'top': cW });
      if (this.mainWidth / this.mainHeight >= 744 / 505) {
        this.zoom = {
          zoom: this.mainHeight / 505
        }
      } else {
        this.zoom = {
          zoom: this.mainWidth / 744
        }
      }
    },

    //窗口大小更改
    resize() {
      const vm = this;
      window.addEventListener('resize', function() {
        vm.setSideStyle();
        vm.getViewSize();
      })
    },
    //重置
    resetWidget() {
      this.TODO.reset();
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
  width: calc(100% - 280px);
  float: left;
  height: 100%;
  position: relative;
}

.container h3 {
  font-size: 24px;
  color: #fff;
  line-height: 1.0;
  padding: 24px;
  font-weight: normal;
  position: absolute;
  z-index: 999;
}

.app_aside {
  float: left;
  width: 280px;
  height: 100%;
  background: transparent;
}

.insp-wrapper {
  width: 100%;
  height: 100%;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

.btn_space {
  padding: 0 20px 20px 20px;
  width: 100%;
  height: calc(100% - 80px);
  clear: both;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
}

.btn-group {
  position: absolute;
  bottom: 0;
  left: 20px;
}

.btn_space .UI-btn {
  margin-bottom: 15px;
  line-height: 36px;
}


/*视图区*/

.ViewSpace {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.btn-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 260px;
  height: 187px;
}

.btn-img img {
  display: block;
  width: 100%;
  height: 100%;
}

#loading {
  position: absolute;
  width: 100%;
  height: 100%;
  color: #000;
  text-align: center;
  top: 0;
  left: 0;
  font-size: 14px;
  background-image: url('/static/UI/bg.png');
  background-position: left top;
  background-repeat: repeat-x;
  background-size: 100% 100%;
}
</style>