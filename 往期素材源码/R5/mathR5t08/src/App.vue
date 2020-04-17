<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <ui-slider :label="[0,150]" :max="150" title="高度h" @callback="changeEvent" ref="slider" id="slider" v-model="value"></ui-slider>
        <ui-btn type="switch" v-model="switch_checked1" style="margin-top: 20px;">
          构建
        </ui-btn>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiSlider from '@/components/UI/uiSlider';//滑块
  export default {
    name: 'app',
    components: {uiHead, uiBtn, uiSlider},
    data(){
      return {
        title: '圆台的构建（截面法）',
        BtnSpaceStyle: 'flex',
        value:20,
        blue: '',
        scene: null,
        scene1: null,
        camera: null,
        renderer: null,
        mainWidth: null,
        mainHeight: null,
        mesh1: null,
        controls: null,
        switch_checked1: false,
        h: 130,
        obj1: null,
        obj2: null,
        circle:null,
        line:null,
        line1:null,
        S1:null,
        S:null,
        F:false
      }
    },
    created(){
      document.title = this.title;
    },
    mounted(){
      //禁止选择
      document.onselectstart = function () {
        return false;
      };
      this.setSideStyle();
      this.init();
      this.animate();
      window.onresize = () => {
        this.mainWidth = $('#renderCanvas').width();
        this.mainHeight = $('#renderCanvas').height();
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
          'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
          'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      };
    },
    computed: {},
    watch: {
      switch_checked1(){
        var r = (150-this.value)*3/5,thiz = this;
        if (this.switch_checked1) {
          $('#slider').css({'pointer-events':'none','opacity':'0.5'});
          if (this.value == 0 || this.value == 150) {
            var i = 1;
            var an1=function () {
                if (i < 0) {
                    cancelAnimationFrame(thiz.S1);
                    return;
                }
                i = i - 0.02;
                thiz.mesh1.material.transparent = true;
                thiz.mesh1.material.opacity = i;
                thiz.S1 = requestAnimationFrame(an1);
            }
            an1();
          } else {
            this.obj2 = new THREE.Group();
            //棱台
            var geometry = new THREE.CylinderBufferGeometry( r, 90, this.value, 64);
            var material = new THREE.MeshBasicMaterial( {color: '#A8F1E0'});
            var cylinder = new THREE.Mesh( geometry, material );
            var y = this.value/2 -50;
            cylinder.position.set(0,y, 0);

            this.scene1.visible = false;
            //下圆圈
            this.createCircle(90,-50,2,this.scene);
            this.createCircle(90,-50,3,this.scene);

            //上圆圈
            this.createCircle(r,this.value-50,2,this.scene);
            this.createCircle(r,this.value-50,3,this.scene);

            //虚线
            var vertices2 =[];
            vertices2.push(
                new THREE.Vector3(0,this.value-50,0),
                new THREE.Vector3(0,-50,0)
            );
            var line4 = this.createLineMesh(vertices2, '#000000', 2);

            this.obj2.add(cylinder,line4);
            this.scene.add(this.obj2);

            this.mesh1.position.y+=0.1;
            this.F=true;

            //消失动画
            var i = 1;
            var an2=function () {
                if (i < 0) {
                    cancelAnimationFrame(thiz.S);
                    thiz.mesh1.position.y-=0.1;
                    thiz.F=false;
                    return;
                }
                i = i - 0.02;
                for (var b in thiz.obj1.children) {
                    thiz.obj1.children[b].material.transparent = true;
                    thiz.obj1.children[b].material.opacity = i;
                }
                thiz.S = requestAnimationFrame(an2);
            }
            an2();
          }
        } else {
          cancelAnimationFrame(this.S1);
          cancelAnimationFrame(this.S);
          $('#slider').css({'pointer-events':'auto','opacity':'1'});
          if(this.F){
              this.mesh1.position.y-=0.1;
          }
          this.F=false;
          cancelAnimationFrame(this.S1);
          cancelAnimationFrame(this.S);
          //交面
          this.scene1.visible = true;
          this.scene1.remove(this.line1);
          this.scene.remove(this.line);
          this.createYuanMian(r,this.value-50,2,this.scene1);
          while(this.scene.children.length!=2){
            for(var i in this.scene.children){
              if(i>=2){
                this.scene.remove(this.scene.children[i]);
              }
            }
          }
          this.createYuanMian(r,this.value-50,3,this.scene);
          for (var b in this.obj1.children) {
            this.obj1.children[b].material.transparent = true;
            this.obj1.children[b].material.opacity = 1;
          }
        }
      }
    },
    methods: {
      //滑动条
      changeEvent(val){
        if(val !== this.value){
          this.value = val;
        }
        this.scene1.remove(this.line1);
        this.scene.remove(this.line);
        if(this.switch_checked1){

        }else {
          this.createYuanMian((150 - val)*3/5,val-50,2,this.scene1);
          this.createYuanMian((150 - val)*3/5,val-50,3,this.scene);
        }
        if(val==0){
            this.mesh1.position.set(0, val - 50.5, 0);
        }else{
            this.mesh1.position.set(0, val - 50, 0);
        }

      },
      //计算侧边
      setSideStyle(){
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block'
        } else {
          this.BtnSpaceStyle = 'flex'
        }
      },
      //线
      createLineMesh(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
          color = '#000';
        }
        if (style == 2) {
          geometryLine.vertices = vertices;
          geometryLine.computeLineDistances();
          lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
              color: '#4b4b4b',
              dashSize: 4,
              gapSize: 4,
              depthTest: false,
              transparent:true,
              opacity:0.7
          }));
        } else if (style == 3) {
          geometryLine.vertices = vertices;
          lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
      },
      //棱锥
      createNeng(r,h,obj,y){
        var geometry = new THREE.ConeGeometry( r, h, 64 );
        var material = new THREE.MeshBasicMaterial( {color:'#A8F1E0'} );
        var cone = new THREE.Mesh( geometry, material );
        cone.position.set(0,y,0);
        obj.add( cone );
      },
      //交面圆圈
      createYuanMian(r,y,type,scene){
        if(r == 0){
            return;
        }
        var vertices =[];
        for(var i=0;i<361;i++){
          vertices.push(new THREE.Vector3(r*Math.cos(i*Math.PI/180),0,r*Math.sin(i*Math.PI/180)));
        }
        if(type == 2){
          this.line1 = this.createLineMesh(vertices, '#000000', type);
          this.line1.position.y = y;
          scene.add(this.line1);
        }else {
          this.line = new THREE.Group();
          var line = this.createLineMesh(vertices, '#000000', type);
          var line1 = this.createLineMesh(vertices, '#000000', type);
          line.position.y = y-0.1;
          line1.position.y = y+0.1;
          this.line.add(line,line1)
          scene.add(this.line);
        }
      },
      //圆线
      createCircle(r,y,type,scene){
        var vertices =[];
        for(var i=0;i<361;i=i+3){
          vertices.push(new THREE.Vector3(r*Math.cos(i*Math.PI/180),0,r*Math.sin(i*Math.PI/180)));
        }
        var line = this.createLineMesh(vertices, '#000000', type);
        line.position.y = y;
        scene.add(line);
      },
      //初始化
      init(){
        this.obj1 = new THREE.Group();
        this.obj2 = new THREE.Group();
        this.mainWidth = $('#renderCanvas').width();
        this.mainHeight = $('#renderCanvas').height();
        // renderer
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;
        this.renderer.setSize(this.mainWidth, this.mainHeight);
        this.renderer.setClearColor(0xffffff);
        document.getElementById('renderCanvas').appendChild(this.renderer.domElement);

        // scene
        this.scene = new THREE.Scene();
        this.scene1 = new THREE.Scene();

        // camera
        this.camera = new THREE.PerspectiveCamera(40, this.mainWidth / this.mainHeight, 1, 10000);
        this.camera.position.set(0, 200, 400);
        // controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate = true;
        this.controls.enablePan = false;

        //大平面
        var geometry = new THREE.PlaneGeometry(250, 200, 1, 1);
        // material
        var material = new THREE.MeshBasicMaterial({
          color: '#5CAEFD',
          side: THREE.DoubleSide
        });
        this.mesh1 = new THREE.Mesh(geometry, material);
        this.mesh1.position.set(0, this.value - 50, 0);
        this.mesh1.rotation.x = Math.PI / 2;
        this.obj1.add(this.mesh1);

        //棱锥
        this.createNeng(90,150,this.obj1,25);

        //圆
        this.createCircle(90,-50,2,this.scene1);
        this.createCircle(90,-50,3,this.scene);

        //虚线
        var vertices =[];
        vertices.push(
          new THREE.Vector3(0,100,0),
          new THREE.Vector3(0,-50,0)
        );
        var line = this.createLineMesh(vertices, '#000000', 2);
        this.scene1.add(line);

        //交面圆线
        this.createYuanMian(78,-30,2,this.scene1);
        this.createYuanMian(78,-30,3,this.scene);

        this.scene.add(this.obj1);
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.clear();
        //面和实线场景
        this.renderer.render(this.scene, this.camera);
        this.renderer.render(this.scene1, this.camera);
        //虚线场景
      },
      //重置
      resetWidget(){
        cancelAnimationFrame(this.S);
        cancelAnimationFrame(this.S1);
        this.camera.position.set(0, 200, 400);
        this.switch_checked1 = false;
        this.F=false;
        this.$refs.slider.setValue(20,true);
        var r = (150-this.value)*3/5;
        this.mesh1.position.set(0, this.value - 50, 0);
        this.scene1.visible = true;
        this.scene1.remove(this.line1);
        this.scene.remove(this.line);
        this.createYuanMian(r,this.value-50,2,this.scene1);
        while(this.scene.children.length!=2){
            for(var i in this.scene.children){
                if(i>=2){
                    this.scene.remove(this.scene.children[i]);
                }
            }
        }
        this.createYuanMian(r,this.value-50,3,this.scene);
        for (var b in this.obj1.children) {
            this.obj1.children[b].material.transparent = true;
            this.obj1.children[b].material.opacity = 1;
        }
        $('#slider').css({'pointer-events':'auto','opacity':'1'});
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
    width: calc(100% - 280px);
    float: left;
    height: 100%;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }

  .app_aside {
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  #renderCanvas {
    width: 100%;
    height: calc(100% - 72px);
    outline: none;
    position: relative;
    overflow: hidden;
  }

  canvas {
    position: absolute;
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
    /*align-items: center;*/
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
  }

  .btn_space .UI-btn {
    margin-bottom: 10px;
  }
</style>
