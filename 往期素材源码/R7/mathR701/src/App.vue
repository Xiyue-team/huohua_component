<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <div class="show_main">
          <img :src="src1">
        </div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" id="buttom1" class="aside_reset"  @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
        <div class="step">
          <div class="add" id="buttom2" @click="btnAdd">＋</div>
          <!--<div id="cell">-->
            <!--<span></span><span></span><span></span><span></span>-->
          <!--</div>-->
          <!--<div id="remove"  @click="btnRemove">－</div>-->
        </div>
        <ui-btn type="switch" id="buttom3"  v-model="checked" style="margin-bottom: 50px;" @click.native="btnClick">
          三视图
        </ui-btn>
        <ui-group type="radio"
                  :margin="12"
                  :groups="groups"
                  v-model="radio"></ui-group>
      </div>
    </div>
  </div>
</template>

<script>
  import uiHead from '@/components/UI/uiHead';//头部
  import uiBtn from '@/components/UI/uiBtn';//按钮
  import uiGroup from '@/components/UI/uiGroup';//单选组
  export default {
    name: 'app',
    components: {uiHead, uiBtn,uiGroup},
    data(){
      return {
        title: '三视图还原实物图（不唯一性）',
        camera: null,
        canvas: null,
        scene: null,
        obj_c: null,
        obj_out1: null,
        obj_out2: null,
        obj_out3: null,
        obj_out4: null,
        src1: 'static/UI/sub.png',
        back_flag: 0,
        timer: null,
        timer2:null,
        point:{
          1:[-200,-200,200],
          2:[200,-200,200],
          3:[200,-200,-200],
          4:[-200,-200,-200],
          5:[-200,200,-200],
          6:[-200,200,200],
          7:[200,200,200],
          8:[200,200,-200]
        },
        point2:{
          1:[-200.5,-200.5,200.5],
          2:[200.5,-200.5,200.5],
          3:[200.5,-200.5,-200.5],
          4:[-200.5,-200.5,-200.5],
          5:[-200.5,200.5,-200.5],
          6:[-200.5,200.5,200.5],
          7:[200.5,200.5,200.5],
          8:[200.5,200.5,-200.5]
        },
        point3:{
          1:[-215,-215,215],
          2:[215,-215,215],
          3:[215,-215,-215],
          4:[-215,-215,-215],
          5:[-215,220,-215],
          6:[-215,215,215],
          7:[215,240,215],
          8:[215,215,-215]
        },
        BtnSpaceStyle:'flex',
        radio:'',
        checked : true,
        groups: [{
          name: 'one',
          txt: '正视角',
          id:'buttom4'
        }, {
          name: 'two',
          txt: '侧视角',
          id:'buttom5'
        }, {
          name: 'three',
          txt: '俯视角',
          id:'buttom6'
        }],
        isMob:/iPad|Android/g.test(navigator.userAgent),
        roateFlag:false,
        marginLeft:-142,
        anFlag:false
      }
    },
    created(){
      document.title = this.title;
    },
    watch: {
      radio() {
        if (this.radio === 'one') {
          clearInterval(this.timer);
          this.rotate([0,0,1200]);
        } else if (this.radio === 'two') {
          clearInterval(this.timer);
          this.rotate([-1200, 0, -0]);
        } else if (this.radio === 'three'){
          clearInterval(this.timer);
          this.rotate([0,1200,0.1]);
        }
      }
    },
    methods: {
      //计算侧边
      setSideStyle(){
        const el =document.getElementById('btn_space')
        if(el && el.scrollHeight>el.offsetHeight){
          this.BtnSpaceStyle = 'block'
        }else{
          this.BtnSpaceStyle = 'flex'
        }
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
            'left': ($('#renderCanvas').width() - cW) / 2 + 'px',
            'top': ($('#renderCanvas').height() - cH) / 2 + 'px'
        });
      },

      //创建模型
      createScene(){
        var mainWidth = $('#renderCanvas').width();
        var mainHeight = $('#renderCanvas').height();
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(mainWidth/-1,mainWidth/1,mainHeight/1,mainHeight/-1,-100,10000);
        this.camera.position.x = -200;
        this.camera.position.y = 720;
        this.camera.position.z = 1200;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.scene.add(this.camera);
        var renderer = new THREE.WebGLRenderer({
            antialias: true              //抗锯齿
        });
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setClearColor(0xffffff);
        renderer.setSize(mainWidth, mainHeight);
        $("#renderCanvas").append(renderer.domElement);
        var controls = new THREE.OrbitControls(this.camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enableRotate =true;
        controls.enablePan =false;
        var thiz=this;
        if(window.innerHeight<540){
            this.camera.zoom=0.63;
            $('.show_main').width(200).height(200);
            this.marginLeft=-100;
        }else{
            this.camera.zoom=1;
            $('.show_main').width(300).height(300);
            this.marginLeft=-142;
        }
        $('canvas').css('margin-left',this.marginLeft+'px');
        this.camera.updateProjectionMatrix();
        function renderAll() {
           controls.update();
           requestAnimationFrame(renderAll);
           renderer.render(thiz.scene,thiz.camera);
        }
        renderAll();
      },

      //线条材质
      createLineMesh:function(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
          color = '#000';
        }
        if(style==2) {
          geometryLine.vertices = vertices;
          geometryLine.computeLineDistances();
          lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            transparent:true,
            opacity: 0.5,
            dashSize: 15,
            gapSize: 15,
            depthTest:false,
            linewidth:1
          }));
        }else if( style == 3){
          geometryLine.vertices = vertices;
          lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:2}));
        }
        return lineMesh;
      },

      vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
      },
      //文字
      createText(vertices,font,size,color){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(font, textStyle);
        text.position.x=vertices[0].x;
        text.position.y=vertices[0].y;
        text.position.z=vertices[0].z;
        return text;
      },

      createTriangleFace: function (vertices, color) {
        var material = new THREE.MeshBasicMaterial({color: color});
        var geom = new THREE.Geometry();
        geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
        geom.vertices = vertices;
        var mesh = new THREE.Mesh(geom, material);
        return mesh;
      },

      //构造线
      line_c:function(n1,n2,o){
        var line1,line2;
        var vertices=[];
        vertices.push(this.vec3(this.point2[n1][0],this.point2[n1][1],this.point2[n1][2]));
        vertices.push(this.vec3(this.point2[n2][0],this.point2[n2][1],this.point2[n2][2]));
        line1=this.createLineMesh(vertices,'#000000',3);
        line2=this.createLineMesh(vertices,'#000000',2);
        if(o){
            o.add(line1,line2);
        }else{
            var l=new THREE.Group();
            l.add(line1,line2);
            return l;
        }
      },
      //构造面
      ceratemesh:function(n1,n2,n3,o){
        var vertices=[];
        vertices.push(this.vec3(this.point[n1][0],this.point[n1][1],this.point[n1][2]))
        vertices.push(this.vec3(this.point[n2][0],this.point[n2][1],this.point[n2][2]))
        vertices.push(this.vec3(this.point[n3][0],this.point[n3][1],this.point[n3][2]))
        var mesh=this.createTriangleFace(vertices,'#CFEAF8');
        o.add(mesh)
      },
      //椎体
      createA:function(a,b,c,d,o1,o2,flag){
        this.ceratemesh(a,b,c,o1);
        this.ceratemesh(b,c,d,o1);
        this.ceratemesh(c,d,a,o1);
        this.ceratemesh(d,a,b,o1);

        this.line_c(a,b,o1);
        this.line_c(a,c,o1);
        this.line_c(a,d,o1);
        if(flag){
          this.line_c(b,c,o2);
          this.line_c(b,d,o2);
          this.line_c(c,d,o2);
        }
      },
      //构造文字
      createTextPoint: function(n,font,o){
        var vertices=[];
        vertices.push(this.vec3(this.point3[n][0],this.point3[n][1],this.point3[n][2]));
        var text=this.createText(vertices,font,32,'#000');
        o.add(text);
      },
      //构造箭头
      createVa:function (){
        var Va = new THREE.Object3D();
        var material = new THREE.MeshBasicMaterial({color:'#4a4a4a',side:THREE.DoubleSide});
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 60, 36, 3), material);
        cylinder1.rotation.x=-Math.PI/2;
        cylinder1.position.z=280;
        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(6, 0, 20, 36, 3), material);
        cylinder2.rotation.x=Math.PI/2;
        cylinder2.position.z=240;
        var vertices=[];
        vertices.push(this.vec3(0,-10,330));
        var text=this.createText(vertices,'正视方向',22,'#4a4a4a');
        Va.add(cylinder1,cylinder2,text);
        this.scene.add(Va);
      },
      //初始三棱锥
      createObj() {
        this.scene.remove(this.obj_c);
        this.obj_c = new THREE.Object3D();
        //三棱锥 连面
        this.ceratemesh(1,5,7,this.obj_c);
        this.ceratemesh(3,5,7,this.obj_c);
        this.ceratemesh(1,3,5,this.obj_c);
        this.ceratemesh(1,3,7,this.obj_c);

        //三棱锥 连线
        var line1=this.line_c(1,3);
        var line2=this.line_c(1,5);
        var line3=this.line_c(1,7);
        var line4=this.line_c(3,5);
        var line5=this.line_c(3,7);
        var line6=this.line_c(5,7);

        //三棱锥 字母
        this.createTextPoint(1,'A',this.obj_c);
        this.createTextPoint(3,'C',this.obj_c);
        this.createTextPoint(5,'D',this.obj_c);
        this.createTextPoint(7,'B',this.obj_c);

        this.scene.add(this.obj_c,line1,line2,line3,line4,line5,line6);
      },
      createBash(){
        if(this.obj_c!=null){
          this.scene.remove(this.obj_out1,this.obj_out2,this.obj_out3,this.obj_out4);
        }
        var o1=new THREE.Group();
        var o2=new THREE.Group();
        this.obj_out1 = new THREE.Object3D();
        this.createA(4,1,3,5,o1,o2,true);
        this.createTextPoint(4,'E',o1);
        this.createTextPoint(1,'A',o2);
        this.createTextPoint(3,'C',o2);
        this.createTextPoint(5,'D',o2);
        this.obj_out1.add(o1,o2);
        this.scene.add(this.obj_out1);
        this.obj_out1.visible=false;

        o1=new THREE.Group();
        o2=new THREE.Group();
        this.obj_out2 = new THREE.Object3D();
        this.createA(2,1,3,7,o1,o2,true);
        this.createTextPoint(2,'Q',o1);
        this.createTextPoint(1,'A',o2);
        this.createTextPoint(3,'C',o2);
        this.createTextPoint(7,'B',o2);
        this.obj_out2.add(o1,o2);
        this.scene.add(this.obj_out2);
        this.obj_out2.visible=false;

        o1=new THREE.Group();
        o2=new THREE.Group();
        this.obj_out3 = new THREE.Object3D();
        this.createA(6,1,5,7,o1,o2,true);
        this.createTextPoint(6,'M',o1);
        this.createTextPoint(1,'A',o2);
        this.createTextPoint(7,'B',o2);
        this.createTextPoint(5,'D',o2);
        this.obj_out3.add(o1,o2);
        this.scene.add(this.obj_out3);
        this.obj_out3.visible=false;

        o1=new THREE.Group();
        o2=new THREE.Group();
        this.obj_out4 = new THREE.Object3D();
        this.createA(8,3,5,7,o1,o2,true);
        this.createTextPoint(8,'P',o1);
        this.createTextPoint(7,'B',o2);
        this.createTextPoint(3,'C',o2);
        this.createTextPoint(5,'D',o2);
        this.obj_out4.add(o1,o2);
        this.scene.add(this.obj_out4);
        this.obj_out4.visible=false;
      },

      //显示隐藏三视图
      btnClick() {
        if(this.checked==false){
          $('canvas').css('margin-left','0');
          $('.show_main').hide();
        }else{
          $('canvas').css('margin-left',this.marginLeft+'px');
          $('.show_main').show();
        }
      },
      //添加边角
      btnAdd(){
        if(this.anFlag){
          return;
        }
        if(this.back_flag>3){
            this.back_flag=0;
        }
        this.anFlag=true;
//        $('#cell span').css('background','#dadada');
//        $('#cell span:lt('+(this.back_flag+1)+')').css('background','#5CAEFD');
        this.back_flag++;
        switch(this.back_flag){
          case 1:
            this.obj_out2.visible=false;
            this.obj_out3.visible=false;
            this.obj_out4.visible=false;
            this.obj_out1.position.set(-150,-150,-150);
            this.obj_out1.visible=true;
            this.obj_out1.children[1].visible=true;
            this.an(this.obj_out1,()=>{
                this.anFlag=false;
                this.obj_out1.children[1].visible=false;
            });
            break;
          case 2:
            this.obj_out1.visible=false;
            this.obj_out3.visible=false;
            this.obj_out4.visible=false;
            this.obj_out2.position.set(150,-150,150);
            this.obj_out2.visible=true;
            this.obj_out2.children[1].visible=true;
            this.an(this.obj_out2,()=>{
                this.anFlag=false;
                this.obj_out2.children[1].visible=false;
            });
            break;
          case 3:
            this.obj_out1.visible=false;
            this.obj_out2.visible=false;
            this.obj_out4.visible=false;
            this.obj_out3.position.set(-150,150,150);
            this.obj_out3.visible=true;
            this.obj_out3.children[1].visible=true;
            this.an(this.obj_out3,()=>{
                this.anFlag=false;
                this.obj_out3.children[1].visible=false;
            });
            break;
          case 4:
            this.obj_out1.visible=false;
            this.obj_out2.visible=false;
            this.obj_out3.visible=false;
            this.obj_out4.position.set(150,150,-150);
            this.obj_out4.visible=true;
            this.obj_out4.children[1].visible=true;
            this.an(this.obj_out4,()=>{
                this.anFlag=false;
                this.obj_out4.children[1].visible=false;
            });
            break;
        }
      },
//      //删除边角
//      btnRemove(){
//        if(this.back_flag<1 || this.anFlag){
//          return;
//        }
//        this.anFlag=true;
//        this.back_flag--;
//        $('#cell span').css('background','#dadada');
//        $('#cell span:lt('+(this.back_flag)+')').css('background','#5CAEFD');
//        switch(this.back_flag){
//          case 0:
//            this.obj_out1.visible=true;
//            this.obj_out1.children[1].visible=true;
//            this.an(this.obj_out1,()=>{
//                this.anFlag=false;
//                this.obj_out1.visible=false;
//            },[-150,-150,-150]);
//            break;
//          case 1:
//            this.obj_out2.visible=true;
//            this.obj_out2.children[1].visible=true;
//            this.an(this.obj_out2,()=>{
//                this.anFlag=false;
//                this.obj_out2.visible=false;
//            },[150,-150,150]);
//            break;
//          case 2:
//            this.obj_out3.visible=true;
//            this.obj_out3.children[1].visible=true;
//            this.an(this.obj_out3,()=>{
//                this.anFlag=false;
//                this.obj_out3.visible=false;
//            },[-150,150,150]);
//            break;
//          case 3:
//            this.obj_out4.visible=true;
//            this.obj_out4.children[1].visible=true;
//            this.an(this.obj_out4,()=>{
//                this.anFlag=false;
//                this.obj_out4.visible=false;
//            },[150,150,-150]);
//            break;
//        }
//      },
      rotate: function(aim){
        var position = this.camera.position;
        var x = aim[0] - position.x,
          y = aim[1] - position.y,
          z = aim[2] - position.z;
        var n = 25, v1 = x/n, v2 = y/n, v3 = z/n;
        this.timer = setInterval(() => {
          n--;
          if (n < 0) {
            clearInterval(this.timer);
            return false;
          }
          position = this.camera.position;
          this.camera.position.set(position.x+v1,position.y+v2,position.z+v3);
        }, 40);
      },
      an:function(O,callback,v){
          var position = O.position;
          if(v){
              var x =v[0]-position.x,
                  y =v[1]-position.y,
                  z =v[2]-position.z;
          }else{
              var x = - position.x,
                  y = - position.y,
                  z = - position.z;
          }
          var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
          this.timer2 = setInterval(() => {
              n--;
              if (n < 0) {
                  clearInterval(this.timer2);
                  callback && callback();
                  return false;
              }
              position = O.position;
              O.position.set(position.x+v1,position.y+v2,position.z+v3);
          }, 40);
      },
      //重置
      resetWidget(){
        this.back_flag=0;
        this.obj_out1.visible=false;
        this.obj_out2.visible=false;
        this.obj_out3.visible=false;
        this.obj_out4.visible=false;
        this.checked=true;
        this.camera.updateProjectionMatrix();
        this.radio='';
        this.anFlag=false;
        clearInterval(this.timer);
        clearInterval(this.timer2);
        this.camera.position.x = -200;
        this.camera.position.y = 720;
        this.camera.position.z = 1200;
        if(window.innerHeight<540){
            this.camera.zoom=0.63;
        }else{
            this.camera.zoom=1;
        }
        this.camera.updateProjectionMatrix();
        $('canvas').css('margin-left','-142px');
        $('.show_main').show();
//        $('#cell span').css('background','#dadada');
      }
    },
    mounted(){
        //禁止选择
        document.onselectstart = function () {
            return false;
        };
        this.setSideStyle();
        this.createScene();
        this. createLineMesh();
        this.createTriangleFace();
        this.createVa();
        this.createObj();
        this.createBash();
        window.onresize = () => {
            this.setSideStyle();
        };
        if(this.isMob){
            $('canvas').on('touchstart',()=>{
                this.roateFlag=true;
            })
            $('canvas').on('touchmove',()=>{
                if(this.roateFlag){
                    this.radio='';
                    clearInterval(this.timer);
                }
            })
            $('canvas').on('touchend',()=>{
                this.roateFlag=false;
            })
        }else{
            $('canvas').on('mousedown',()=>{
                this.roateFlag=true;
            })
            $('canvas').on('mousemove',()=>{
                if(this.roateFlag){
                    this.radio='';
                    clearInterval(this.timer);
                }
            })
            $('canvas').on('mouseup',()=>{
                this.roateFlag=false;
            })
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
    background-color:#fff;
    touch-action: none;
    -ms-touch-action: none;
  }
   body{
	-webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
    width:calc(100% - 280px);
    float: left;
    height:100%;
  }
  .container h3{
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
  }
  .app_aside{
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0,0,0,0.12);
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
    width: 100%;
    height:100%;
    /*margin-left: -142px;*/
  }
  .show_main{
    width: 300px;
    height: 300px;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 10px;
    margin: auto;
    text-align: center;
    z-index: 999;
  }

  .show_main img{
    display: block;
    width: 100%;
    height: 100%;
  }

  .insp-wrapper {
    width: 100%;
    height: 100%;
  }
  .aside_reset{
    margin: 20px 24px;
    float: right;
  }
  .btn_space{
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
  .btn_space .UI-btn{
    margin-bottom: 10px;
  }

  .step{
    margin-bottom: 60px;
  }
  .step .add,
  .step #remove{
    display: block;
    width: 60px;
    height: 60px;
    padding: 0;
    line-height: 63px;
    font-size: 45px;
    text-align: center;
    border-radius: 50%;
    border:0 solid rgba(0,0,0,0.06);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.24);
    background-color: #ffffff;
    color: #5caefd;
    float: left;
    cursor: pointer;
    margin-left:90px;
  }
  .step #remove{
    float: right;
  }

  #cell{
    float: left;
    display: inline-block;
    height: 12px;
    position: relative;
    top: 28px;
    left: 38px;
    text-align: center;
    font-size: 0;
  }

  #cell span{
    display: inline-block;
    width: 6px;
    height: 12px;
    background: rgb(213, 213, 213);
    border-radius: 2px;
    text-align: center;
    margin: 0 2px;
  }

  #cell span.active{
    background: #5CAEFD;
  }



</style>
