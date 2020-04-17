<template>
  <div id="app" class="noselect">
    <div v-if="loadF" id="loading">loading...</div>
    <div class="menu" @click="sildeMenu(1)" ref="menu"></div>
    <div class="cover">
      <div class="landscape">
        <img src="static/UI/cover1.png">
      </div>
    </div>
    <div class="hint" style="z-index: 10;" v-if="hiddenMobTip">
      <h5>建议您在电脑或平板上打开，以获取最佳的演示效果</h5>
    </div>
    <div class="container" ref="container"  id="test" @click="sildeMenu(2)">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <div id="renderCanvas-container">

      </div>
      <!--视图区-->
    </div>
    <div class="leftMask" v-show="!isHidden && ismob" @click="sildeMenu(2)"></div>
    <!--侧边按钮区-->
    <div class="app_aside" ref="sides" :class="ismob?'mobleRightColor':'normalRightColor'" >
      <ui-btn id="clear" type="reset1" class="titleBtn" @click.native="ris()"></ui-btn>

      <ui-slider  :min="19"
                  :max="47" v-model="value"  @callback='choose' style="position:absolute; right: 22px; bottom: 80px;" :title="'等压面调整'" :tooltip="false" :clickable ='false' v-if="mmake" ></ui-slider>

      <ui-btn :type="blue" size="big" class="rightBtn" @click.native="changeState"
              :class="{active:isActive}">{{blue}}
      </ui-btn>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
    <div class="hen" v-show="ismobhen">
      <div><img src="static/image/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开
并横屏使用</span></div>
    </div>
  </div>
</template>
<script type="text/javascript">
  var sphere,sphere2,sphere3,sphere4,clippingPos = 19,SSAARenderPass
  import uiBtn from '@/components/UI/uiBtn';
  import uiSlider from '@/components/UI/uiSlider';//按钮
  export default {
    name: 'app',
    components: {
      uiBtn,
      uiSlider
    },
    data() {
      return {
        title: '等压面',
        blue: '等压面',
        isMob: /iPad|Android/g.test(navigator.userAgent),
        hiddenMobTip: false,
        isHidden: false,
        canSlide: false,
        ismob: false,
        isActive: false,
        isActive1: false,
        ismobhen: false,
        model: null,
        ground: null,
        axis: null,
        axisNum: null,
        ctrl: null,
        level1: null,
        level2: null,
        level3: null,
        level4: null,
        controls: null,
        timer:null,
        clippingPos1:19,
        To: null,
        mark:false,
        value:19,
        loadF:true,
        mmake:false
      }
    },
    watch:{
      clippingPos1(val)
      {

        clippingPos = val

        this.To.fis();
        this.To.fis();



      },
      value(val){

      }
    },
    created() {

    },
    mounted() {

      document.title = this.title;
      this.initShader();
      window.addEventListener('resize', this.onWindowResize, false);
      this.resize();
      this.setSideStyle();
      this.getViewSize();
      this.listenSide();
      window.addEventListener("resize", () => {
        this.listenSide();
      });
      let thiz = this;
      this.ll = (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
      if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        var mql = window.matchMedia("(orientation: portrait)");

        function onMatchMeidaChange(mql) {
          clearTimeout(thiz.tipTimer);
          if (mql.matches) {
            // 竖屏
            thiz.isLandscape = false
          } else {
            thiz.isLandscape = true
            if (window.innerWidth < 500 || window.innerHeight < 500) {
              thiz.hiddenMobTip = true;
              thiz.tipTimer = setTimeout(() => {
                thiz.hiddenMobTip = false;
              }, 3000)
            }
          }
        }
        onMatchMeidaChange(mql);
        mql.addListener(onMatchMeidaChange);
      } else {}
      this.To = this.init();
    },
    computed: {},
    methods: {
      ris(){
        this.value = 19
        this.mmake = false
        clippingPos = 19
        this.To.fis();
        this.To.fis();
        this.isActive = false
        this.blue = '等压面'
        this.level1.position.set(0, 3, 0);
        this.level2.position.set(0, -1, 0);
        this.level3.position.set(0, -5, 0);
        this.level4.position.set(0, -8, 0);
        this.ground.visible = false;
        this.ground2.visible = false;
        this.axisNum.visible = false;
        this.axis.visible = false;
        this.ctrl.visible = false;
        this.sphere.visible = false;
        this.sphere2.visible = false;
        this.sphere3.visible = false;
        this.sphere4.visible = false;

        this.controls.reset()
      },
      setSideStyle() {
        const el = document.getElementById('btn_space')
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
      },
      sildeMenu(val) {
        if (!this.canSlide) {
          return;
        }
        if (val == 1 && this.isHidden) {
          this.$refs.sides.style.right = '0';
          this.$refs.menu.style.top = '-45px';
        } else if (val == 2 && !this.isHidden) {
          this.$refs.sides.style.right = '-280px';
          this.$refs.menu.style.top = '24px';
        }
        this.isHidden = !this.isHidden;

      },
      listenSide() {
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (w < 500 || h < 500) {
          this.isHidden = true;
          this.canSlide = true;
          this.$refs.container.style.width = '100%';
          this.$refs.menu.style.top = '24px';
          this.$refs.sides.style.right = '-280px';
          this.ismob = true;
          if(w<=h){
            this.ismobhen = true
          }else{
            this.ismobhen = false;
          }
        } else {
          this.isHidden = false;
          this.canSlide = false;
          this.$refs.container.style.width = w - 280 + 'px';
          this.$refs.sides.style.right = '0';
          this.ismob = false;
        }

      },
      //计算区块大小
      getViewSize() {
        const W = window.innerWidth - 280;
        const H = window.innerHeight - 72;
        if (W / H >= 744 / 505) {
          this.zoom = {
            // transform: 'scale(' + H / 505 + ')'
            zoom: (H / 505).toFixed(1)
          }
        } else {
          this.zoom = {
            // transform: 'scale(' + W / 744+','+W / 744 + ')'
            zoom: (W / 744).toFixed(1)
          }
        }
      },
      resize(){
        const vm = this;
        window.addEventListener('resize', function() {
          vm.setSideStyle();
          vm.getViewSize();
        })
      },
      initShader() {


      },
      choose(v){

        clippingPos = v
        this.To.fis();
        this.To.fis();
      },
      init() {
        let thiz = this;
        //着色器
        var vertexshader =
          `uniform float amplitude;
			attribute float displacement;
			varying vec3 vNormal;
			varying vec2 vUv;
			varying vec3 vPosition;
			void main() {
				vNormal = normal;
				vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );
				vec3 newPosition = position + amplitude * normal * vec3( displacement );
        vPosition = position;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
			}`;

        //裁切及图像震荡
        var fragmentshader = `
			 varying vec3 vNormal;
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform vec3 color;
            uniform float clippingPos;
            uniform sampler2D texture;
            void main() {
            if(vPosition.y>clippingPos || vPosition.y<clippingPos-.5 ) discard;
                gl_FragColor =  vec4( 0.8,0.3,0.3,1.);
            }

   `;
        THREE.AfterimageShader = {

          uniforms: {

            "damp": {value: 0.96},
            "tOld": {value: null},
            "tNew": {value: null}

          },

          vertexShader: [

            "varying vec2 vUv;",

            "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

            "}"

          ].join("\n"),

          fragmentShader: [

            "uniform float damp;",

            "uniform sampler2D tOld;",
            "uniform sampler2D tNew;",

            "varying vec2 vUv;",

            "vec4 when_gt( vec4 x, float y ) {",

            "return max( sign( x - y ), 0.0 );",

            "}",

            "void main() {",

            "vec4 texelOld = texture2D( tOld, vUv );",
            "vec4 texelNew = texture2D( tNew, vUv );",

            "texelOld *= damp * when_gt( texelOld, 0.2 );",

            "gl_FragColor = max(texelNew, texelOld);",

            "}"

          ].join("\n")

        };

        //----------主体

        if (!Detector.webgl) Detector.addGetWebGLMessage();
        var renderer, scene, camera, stats, composer, afterimagePass,scene1,scene2,renderer2;
        var  uniforms, uniforms2, uniforms3, uniforms4;
        var displacement1,displacement2,displacement3,displacement4, noise1,noise2,noise3,noise4,
          somethingChanged = 0,
          afterOperationTimeout,
          afterimagePassTime = 0;
        camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 20000);
        camera.position.set(0.0, 35, 35 * 6);
        scene = new THREE.Scene();
        scene1 = new THREE.Scene();

        // scene.background = new THREE.Color(0x6a90a9);



        //导入模型
        let modelPut = (url) => {
          return new Promise(function (resolve, reject) {
            let loader = new THREE.GLTFLoader();
            let gltf;
            loader.load(url, (data) => {
              gltf = data;
              let objects = gltf.scene;


              objects.traverse((node) => {

                if (node.isMesh) {
                  node.material.depthTest=false;
                  node.material.side=THREE.DoubleSide;
                  node.visible = true;
                  node.transparent = true
                  node.material.opacity = 0.7;
                }
              });

              thiz.model = objects;
              // mixer = new THREE.AnimationMixer(objects);
              // let action = mixer.clipAction(gltf.animations[0]);
              // action.clampWhenFinished = true;
              // action.setLoop(THREE.LoopOnce);
              // action.play();
              objects.rotation.y = -98 / 180 * Math.PI;
              // objects.rotation.x = -10 / 180 * Math.PI;
              // objects.rotation.z = 2 / 180 * Math.PI;


              // objects.scale.set(0.8, 0.8, 0.8);
              //
              objects.position.set(0, -20, 0);
            }, function (xhr) {

              // thiz.progress = Math.ceil(xhr.loaded / xhr.total * 100);
              if (xhr.loaded / xhr.total === 1) {
                setTimeout(() => {
                  resolve(thiz.model)
                  thiz.loadF = false
                }, 2000)

              }

            }, function (error) {
              reject();
              console.error(error);
            });
          })
        };


        modelPut(`static/model/dengyamian/1/dengyamian.gltf`).then((model) => {
          // scene1.add(thiz.model);
          scene.add(thiz.model);
          //地面

          this.ground = thiz.model.children[1];
          this.ground2 = this.ground.clone();
          this.ground2.rotation.y = -98 / 180 * Math.PI;

          scene.add(this.ground2)
          thiz.model.children[2].visible= false
          thiz.model.children[3].visible= false
          this.axisNum = thiz.model.children[2].clone();
          //坐标轴
          this.axis = thiz.model.children[3].clone();
          //可拖动触点
          this.ctrl = thiz.model.children[4];
          this.axisNum.material = new THREE.MeshBasicMaterial({color:'#FFFFFF'})
          this.axis.material = new THREE.MeshBasicMaterial({color:'#FFFFFF'})
          this.group1 = new THREE.Group();
          this.group1.add(this.axis,this.axisNum)
          this.group1.rotation.y = -Math.PI / 2
          this.group1.position.set(-3,-20,-8)
          scene.add(this.group1)
          //坐标轴上数字
          //第一层等压面
          this.level1 = thiz.model.children[5];
          //第二层等压面
          this.level2 = thiz.model.children[6];
          //第三层等压面
          this.level3 = thiz.model.children[7];
          //第四层等压面
          this.level4 = thiz.model.children[8];
          this.level1.material.opacity = 0.4;
          //第二层等压面
          this.level2.material.opacity = 0.4;
          //第三层等压面
          this.level3.material.opacity = 0.4;
          //第四层等压面
          this.level4.material.opacity = 0.4;

          thiz.model.children[0].visible = false;
          this.ground.visible = false;
          this.ground2.visible = false;
          this.axisNum.visible = false;
          this.axis.visible = false;
          this.ctrl.visible = false;
          this.ctrl.position.set(0, 17, 0);
          this.ground2.position.y = this.ctrl.position.y -20 ;
          this.ground2.material = new THREE.MeshBasicMaterial({color:'#464637',side:THREE.DoubleSide,opacity:1})
          this.level1.position.set(0, 3, 0);
          this.level2.position.set(0, -1, 0);
          this.level3.position.set(0, -5, 0);
          this.level4.position.set(0, -8, 0);


          uniforms = {
            amplitude: {value: 1.0},
            clippingPos: {value: .50},
            color: {value: new THREE.Color(0xff0000)}
          };
          uniforms2 = {
            amplitude: {value: 1.0},
            clippingPos: {value: .50},
            color: {value: new THREE.Color(0xff0000)}
          };
          uniforms3 = {
            amplitude: {value: 1.0},
            clippingPos: {value: .50},
            color: {value: new THREE.Color(0xff0000)}
          };
          uniforms4 = {
            amplitude: {value: 1.0},
            clippingPos: {value: .50},
            color: {value: new THREE.Color(0xff0000)}
          };
          //自定义材质
          var shaderMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,

            side: THREE.DoubleSide,
            vertexShader: vertexshader,
            fragmentShader: fragmentshader
          });
          var shaderMaterial2 = new THREE.ShaderMaterial({
            uniforms: uniforms2,

            side: THREE.DoubleSide,
            vertexShader: vertexshader,
            fragmentShader: fragmentshader
          });
          var shaderMaterial3 = new THREE.ShaderMaterial({
            uniforms: uniforms3,

            side: THREE.DoubleSide,
            vertexShader: vertexshader,
            fragmentShader: fragmentshader
          });
          var shaderMaterial4 = new THREE.ShaderMaterial({
            uniforms: uniforms4,

            side: THREE.DoubleSide,
            vertexShader: vertexshader,
            fragmentShader: fragmentshader
          });
          var radius = 18, segments = 8, rings = 150;
          // var geometry = new THREE.TorusKnotBufferGeometry(radius, segments, rings, 200);
          // console.log(thiz.model.children[1]);

          //
          var c1 = thiz.model.children[5].clone();
          var c2 = thiz.model.children[6].clone();
          var c3 = thiz.model.children[7].clone();
          var c4 = thiz.model.children[8].clone();
          var geometry1 = c1.geometry;//new THREE.BoxBufferGeometry(16, 16,16);
          var geometry2 = c2.geometry;
          var geometry3 = c3.geometry;
          var geometry4 = c4.geometry;


          //
          displacement1 = new Float32Array(geometry1.attributes.position.count);

          noise1 = new Float32Array(geometry1.attributes.position.count);
          for (var i = 0; i < displacement1.length; i++) {
            noise1[i] = Math.random() * 1;
          }
          geometry1.addAttribute('displacement', new THREE.BufferAttribute(displacement1, 1));



          displacement2 = new Float32Array(geometry2.attributes.position.count);

          noise2 = new Float32Array(geometry2.attributes.position.count);
          for (var i = 0; i < displacement2.length; i++) {
            noise2[i] = Math.random() * 1;
          }
          geometry2.addAttribute('displacement', new THREE.BufferAttribute(displacement2, 1));




          displacement3 = new Float32Array(geometry3.attributes.position.count);

          noise3 = new Float32Array(geometry3.attributes.position.count);
          for (var i = 0; i < displacement3.length; i++) {
            noise3[i] = Math.random() * 1;
          }
          geometry3.addAttribute('displacement', new THREE.BufferAttribute(displacement3, 1));


          //var geometry=new THREE.PlaneBufferGeometry(36,36);

          displacement4 = new Float32Array(geometry4.attributes.position.count);

          noise4 = new Float32Array(geometry4.attributes.position.count);
          for (var i = 0; i < displacement4.length; i++) {
            noise4[i] = Math.random() * 1;
          }
          geometry4.addAttribute('displacement', new THREE.BufferAttribute(displacement4, 1));
          sphere=new THREE.Mesh(geometry1, shaderMaterial);
          sphere2=new THREE.Mesh(geometry2, shaderMaterial2);
          sphere3=new THREE.Mesh(geometry3, shaderMaterial3);
          sphere4=new THREE.Mesh(geometry4, shaderMaterial4);
          sphere.position.y = 0-20;
          sphere2.position.y = -0.8-20;
          sphere3.position.y = -1.3-20;
          sphere4.position.y = -1.8-20;
          sphere.visible = false;
          sphere2.visible = false;
          sphere3.visible = false;
          sphere4.visible = false;
          this.sphere = sphere;
          this.sphere2 = sphere2;
          this.sphere3 = sphere3;
          this.sphere4 = sphere4;
          this.sphere .rotation.y = -98 / 180 * Math.PI;
          this.sphere2 .rotation.y = -98 / 180 * Math.PI;
          this.sphere3.rotation.y = -98 / 180 * Math.PI;
          this.sphere4 .rotation.y = -98 / 180 * Math.PI;

          scene1.add(sphere,sphere2,sphere3,sphere4);

          // sphere = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
          //   color: 0x80ee10,
          //   transparent: true,
          //   opacity: 0.2,
          //   depthTest: false
          // }));
          // var sphere1 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
          //   color: 0x80ee10,
          //   transparent: true,
          //   opacity: 0.2,
          //   depthTest: false
          // }));
          //
          // sphere.position.set(0,-50,0);
          // box.position.set(0,-50,0);
          //
          //
          // scene.add(sphere, sphere1);

          renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
          });
          renderer2 = new THREE.WebGLRenderer({
            antialias: true,
            alpha:true
          });

          renderer2.domElement.style.position = 'absolute';
          renderer2.domElement.style.top = 0;
          renderer2.domElement.style.left = 0;
          renderer2.domElement.style.zIndex = 1;
          renderer.domElement.style.zIndex = 0;
          renderer.setClearColor(0x111111, 1)
          this.renderer = renderer
          this.renderer2 = renderer2

          renderer.setPixelRatio(window.devicePixelRatio);
          renderer2.setPixelRatio(window.devicePixelRatio);

          if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))&& window.innerWidth<= 500 ){
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer2.setSize(window.innerWidth, window.innerHeight);
          } else if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))&& window.innerHeight<= 500 ){
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer2.setSize(window.innerWidth, window.innerHeight);
          } else{
            renderer.setSize(window.innerWidth-280, window.innerHeight);
            renderer2.setSize(window.innerWidth-280, window.innerHeight);
          }

          var container = document.getElementById('renderCanvas-container');
          container.appendChild(renderer.domElement);
          container.appendChild(renderer2.domElement);

          composer = new THREE.EffectComposer(renderer2);
          composer.addPass(new THREE.RenderPass(scene1, camera));



          //
          // effectSobel = new THREE.ShaderPass(THREE.SobelOperatorShader);
          // effectSobel.uniforms.resolution.value.x = window.innerWidth;
          // effectSobel.uniforms.resolution.value.y = window.innerHeight;
          // composer.addPass(effectSobel);


          afterimagePass = new THREE.AfterimagePass();
          composer.addPass(afterimagePass);

          // if(!this.ll){
          //   afterimagePass.renderToScreen = true;
          // }
          afterimagePass.renderToScreen = true;
          let ssaaRenderPass = new THREE.SSAARenderPass( scene1, camera );
          ssaaRenderPass.unbiased = false;
          ssaaRenderPass.sampleLevel = 2;
          composer.addPass( ssaaRenderPass );

          // Controls
          var controls = new THREE.OrbitControls(camera,container);
          controls.target.set(0, 1, 0);
          controls.update();
          controls.addEventListener('change', afterOperationFn);
          controls.minDistance = 100;
          controls.maxDistance = 300;

          controls.saveState ()
          this.controls = controls;
          // GUI

          //

          afterOperationFn();
        // 首次运行 执行震荡 懒渲染也首次影响,激活首次渲染
          animate();
        });
        function afterOperationFn() {
          // 操作瞬间

          if (afterOperationTimeout) {

            afterimagePass.uniforms["damp"].value = 0;//抗衰减  小于1则衰减 历史图像逐渐消失
            clearTimeout(afterOperationTimeout);
          } else { // 无定时器,结束了操作
            afterimagePass.uniforms["damp"].value = 1.0; // //抗衰减  小于1则衰减

          }
          afterOperationTimeout = setTimeout(
            function () {
              if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
                afterimagePassTime = 10;
              }else{
                afterimagePassTime = 30;
              }
               //震荡次数 重复描线
              afterOperationTimeout = null;
              afterimagePass.uniforms["damp"].value = 0.5; //抗衰减  小于1则衰减


            }, 100
          );

        }
        function asx(){
          composer.render(scene1,camera);

        }
        function animate() {
          requestAnimationFrame(animate);
          render();
          // stats.update();
        }
        function render() {
          if (!afterOperationTimeout) {
            if (afterimagePassTime) {
              afterimagePassTime--; //震荡图像次数


            } else {
              //振荡次数用尽,则不再渲染任何新图像

              return
            }
          }
          thiz.ctrl.position.y = clippingPos -2;
          thiz.ground2.position.y = clippingPos-22;
          uniforms.amplitude.value = 0.18; //描线振幅
          uniforms.color.value.offsetHSL(255, 0, 0); //描线颜色
          uniforms.clippingPos.value = clippingPos-1.5;
          uniforms2.amplitude.value = 0.18; //描线振幅
          uniforms2.color.value.offsetHSL(255, 0, 0); //描线颜色
          uniforms2.clippingPos.value = clippingPos-1;
          uniforms3.amplitude.value = 0.18; //描线振幅
          uniforms3.color.value.offsetHSL(255, 0, 0); //描线颜色
          uniforms3.clippingPos.value = clippingPos-0.5;
          uniforms4.amplitude.value = 0.18; //描线振幅
          uniforms4.color.value.offsetHSL(255, 0, 0); //描线颜色
          uniforms4.clippingPos.value = clippingPos;
          for (var i = 0; i < displacement1.length; i++) {
            displacement1[i] = Math.sin(0.0001 * i); // 大于1时出现大波浪
            noise1[i] = THREE.Math.clamp(Math.random(), -0.4, 300);
            displacement1[i] += noise1[i];
          }
          for (var i = 0; i < displacement2.length; i++) {
            displacement2[i] = Math.sin(0.0001 * i); // 大于1时出现大波浪
            noise2[i] = THREE.Math.clamp(Math.random(), -0.4, 300);
            displacement2[i] += noise2[i];
          }
          for (var i = 0; i < displacement3.length; i++) {
            displacement3[i] = Math.sin(0.0001 * i); // 大于1时出现大波浪
            noise3[i] = THREE.Math.clamp(Math.random(), -0.4, 300);
            displacement3[i] += noise3[i];
          }
          for (var i = 0; i < displacement4.length; i++) {
            displacement4[i] = Math.sin(0.0001 * i); // 大于1时出现大波浪
            noise4[i] = THREE.Math.clamp(Math.random(), -0.4, 300);
            displacement4[i] += noise4[i];
          }

          sphere.geometry.attributes.displacement.needsUpdate = true;
          sphere2.geometry.attributes.displacement.needsUpdate = true;
          sphere3.geometry.attributes.displacement.needsUpdate = true;
          sphere4.geometry.attributes.displacement.needsUpdate = true;



          // composer.render(scene,camera);




          if(thiz.isActive1){
            asx()
          }

          thiz.renderer.render(scene,camera);

          // 后期渲染合成器,包含模型场景及震荡图像残留
        }

        return {
          camera: camera,
          fis: afterOperationFn,
          xr:asx
        }
      },

      onWindowResize() {
        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();
        // renderer.setSize(window.innerWidth, window.innerHeight);


      },
      //切换等压线和等压面
      changeState() {
        this.mmake = true
        cancelAnimationFrame(this.timer);
        if (this.isActive) {
          this.blue = '等压面';
          this.isActive = false;
          this.axis.visible = false;
          this.axisNum.visible = false;
          this.ground.visible = false;
          this.ctrl.visible = false;
          this.ground2.visible = false;
          this.sphere.visible = false;
          this.sphere2.visible = false;
          this.sphere3.visible = false;
          this.sphere4.visible = false;
          this.value = 19
          this.mmake = false
          clippingPos = 19


          // console.log(this.level1,this.level2,this.level3,this.level4,this.controls)
          //
          this.MoveAnimate(this.level1, 0, 3, false);
          this.MoveAnimate(this.level2, -0.8, -1, false);
          this.MoveAnimate(this.level3, -1.3, -5, true);
          this.MoveAnimate(this.level4, -1.8, -8, true,true);
          // this.MoveAnimate(sphere, 0.2-20, 2-20, false);
          // this.MoveAnimate(sphere2, -0.3-20, -1-20, false);
          // this.MoveAnimate(sphere3, -0.8-20, -4-20, true);
          // this.MoveAnimate(sphere4, -1.3-20, -7-20, true,true);

        }
        else {

          this.blue = '等压线';
          this.isActive = true;
          this.MoveAnimate(this.level1, 3, 0, true);
          this.MoveAnimate(this.level2, -1, -0.8, true);
          this.MoveAnimate(this.level3, -5, -1.3, false);
          this.MoveAnimate(this.level4, -8, -1.8, false, true);
          // this.MoveAnimate(sphere,  2-20,0-20, false);
          // this.MoveAnimate(sphere2, -1-20, -0.8-20, false);
          // this.MoveAnimate(sphere3,  -4-20,-1.3-20, true);
          // this.MoveAnimate(sphere4,  -7-20,-1.8-20, true,true);

        }


      },

      MoveAnimate(obj, start, end, fg,tp) {

        let thiz = this;

        let k = 0;
        if (!fg) {
          //
          //向上移动
          let t = start;
          function run() {

            obj.position.set(0, t, 0);
            if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))){
              t += 0.3;
            }else{
              t += 0.05;
            }

            k++;
            if(thiz.isActive) {
              thiz.controls.target.set(0, 1+k * 0.1, 0);
              thiz.controls.update();
            }
            else {

              thiz.controls.target.set(0, 11.5 -k* 0.1, 0);
              thiz.controls.update();
            }

            thiz.timer = requestAnimationFrame(run);
            if (t >= end) {

              cancelAnimationFrame(thiz.timer);
              if(tp&&thiz.isActive){
                thiz.isActive1 = true
                thiz.axis.visible = true;
                thiz.axisNum.visible = true;
                thiz.ground.visible = true;
                thiz.ctrl.visible = true;
                thiz.ground2.visible = true;
                thiz.sphere.visible = true;
                thiz.sphere2.visible = true;
                thiz.sphere3.visible = true;
                thiz.sphere4.visible = true;
              }
              if(tp&&!thiz.isActive){
                thiz.isActive1 = false
                thiz.axis.visible = false;
                thiz.axisNum.visible = false;
                thiz.ground.visible = false;
                thiz.ctrl.visible = false;
                thiz.ground2.visible = false;
                thiz.sphere.visible = false;
                thiz.sphere2.visible = false;
                thiz.sphere3.visible = false;
                thiz.sphere4.visible = false;
              }

            }


          }

          run()

        }
        else {

          let t = start;
          k++;

          function run() {
            t -= 0.05;

            obj.position.set(0, t, 0);
            if(thiz.isActive) {
              thiz.controls.target.set(0, 1+k * 0.1, 0);
              thiz.controls.update();
            }
            else {
              thiz.controls.target.set(0, 11.5 -k* 0.1, 0);
              thiz.controls.update();
            }

            thiz.timer = requestAnimationFrame(run);
            if (t <= end) {
              cancelAnimationFrame(thiz.timer);
              if(tp&&thiz.isActive){
                thiz.axis.visible = true;
                thiz.axisNum.visible = true;
                thiz.ground.visible = true;
                thiz.ctrl.visible = true;
                thiz.ground2.visible = true;
                thiz.sphere.visible = true;
                thiz.sphere2.visible = true;
                thiz.sphere3.visible = true;
                thiz.sphere4.visible = true;

              }
              if(tp&&!thiz.isActive){
                thiz.isActive1 = false
                thiz.axis.visible = false;
                thiz.axisNum.visible = false;
                thiz.ground.visible = false;
                thiz.ground2.visible = false;
                thiz.ctrl.visible = false;
                thiz.sphere.visible = false;
                thiz.sphere2.visible = false;
                thiz.sphere3.visible = false;
                thiz.sphere4.visible = false;
              }
            }
          }
          run()
        }

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
    position: relative;
    touch-action: none;
    -ms-touch-action: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
  }

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ne {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
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

  @media screen and (orientation: portrait) {
  }

  /*ui*/

  .UI-camera {
    width: 80px;
    height: 80px;
    cursor: pointer;
  }

  .clearfix:after {
    content: '';
    display: block;
    clear: both;
  }

  /*内容区*/

  .container {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: #fff;
    transition: width 1s, height 1s;
  }

  .container h3 {
    font-size: 24px;
    color: #FFF;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .app_aside {
    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    transition: all 1s;
    z-index: 20;
  }

  .normalRightColor {
    background: #f7f7f7;
  }

  .mobleRightColor {
    background: rgba(0, 0, 0, .2);
  }

  .menu {
    position: fixed;
    height: 48px;
    width: 48px;
    right: 24px;
    top: 24px;
    cursor: pointer;
    background: url('./img/menu.png') no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 10;
    transition: all 1s;
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
  #renderCanvas-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    /* transition: width 0.5s, height 0.5s; */
  }

  #renderCanvas-container canvas {
    width: 100%;
    height: 100%;
  }

  .app_title {
    position: absolute;
    z-index: 999;
  }

  .titleBtn {
    position: absolute;
    top: 24px;
    right: 24px;
  }

  .rightBtn {
    position: absolute;
    bottom: 24px;
    right: 20px;
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

  .hidden {
    display: none
  }

  .hen {
    width: 100%;
    height: 100%;
    background: #F5F5F5;
    z-index: 998;
    position: absolute;
    top: 0;
    left: 0;
  }

  .hen div {
    width: 260px;
    height: 198px;
    background: rgba(250, 250, 250, 0.92);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  .hen div img {
    width: 72px;
    height: 72px;
    display: block;
    margin: 32px auto;
  }

  .hen div span {
    width: 192px;
    height: 42px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #525252;
    text-align: center;
    line-height: 21px;
    display: block;
    margin: 0 auto;
  }

  .leftMask {
    position: absolute;
    left: 0;
    top: 0;
    width: calc(100% - 280px);
    height: 100%;
    background: #5caefd;
    z-index: 999;
    opacity: 0;
  }

  .active {
    color: #ffffff !important;
    background-color: #5caefd !important;
  }
  .menu {
    position: fixed;
    height: 48px;
    width: 48px;
    right: 24px;
    top: 24px;
    cursor: pointer;
    background: url('./img/menu.png') no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 10;
    transition: all 1s;
  }








  /*内容区*/

  .container {
    width: calc(100% - 280px);
    float: left;
    height: 100%;
  }



  .app_aside {
    position: absolute;
    right: 0;
    top: 0;
    width: 280px;
    height: 100%;
    transition: all 1s;
    z-index: 20;
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
    padding: 20px;
    width: 100%;
    height: calc(100% - 80px);
    clear: both;
    /*display: flex;*/
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }



  @media all and (orientation: portrait) {

    .landscape {
      width: 260px;
      height: 198px;
      margin: auto;
      background: rgba(255, 255, 255, 0.92);
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
      border-radius: 12px;
      z-index: 1000;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    .landscape img {
      width: 100%;
      height: auto;
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .cover {
      width: 100%;
      height: 100%;
      z-index: 1000;
      position: absolute;
      background-color: rgba(255, 255, 255, 1);
    }
    .hint {
      display: none;
    }
  }


  @media all and (orientation: landscape) {

    .landscape {
      display: none;
    }
    .landscape img {
      display: none;
    }

    .cover {
      display: none;
    }

    .hint {
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      top: 10px;
      width: 60%;
      height: 40px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(0, 0, 0, 0.06);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
      border-raius: 100px;
      transition: display 1s;
      line-height: 40px;
    }
    .hint h5 {
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      text-align: center;
    }
  }


</style>
