<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas"></div>
    </div>
    <!--返回按钮-->
    <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
    <!--侧边按钮区-->
    <div id="ctrl">
      <div id="add" @click="addU"><img src="static/UI/add.png" alt=""></div>
      <div id="mark"><img src="static/UI/mark.png" alt=""></div>
    </div>
  </div>
</template>
<script>
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
export default {
  name: 'app',
  components: {
    uiHead,
    uiBtn,
  },
  data() {
    return {
      title: '核裂变和链式反应',
      Boom:false,
      TO: null,
      SET:null
    }
  },
  created() {
    document.title = this.title;
  },
  mounted() {
    //禁止选择
    document.onselectstart = function() {
      return false;
    };
    this.TO = this.init();
  },
  computed: {},
  watch: {},
  methods: {
    reset() {
      this.TO.reset();
    },
    addU(){
      if(!this.Boom){
        clearTimeout(this.SET);
        this.SET=setTimeout(()=>{
          this.TO.addU();
        },50);
      }
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        selectobjs = [],
        selectobj = null,
        raycaster = new THREE.Raycaster(),
        plane = new THREE.Plane(),
        offset = new THREE.Vector3(),
        intersection = new THREE.Vector3(),
        INTERSECTED = null,
        mousedownflag = false;
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha:true
        });
      var offsetLeft = parseInt($('#renderCanvas').offset().left);
      var offsetTop = parseInt($('#renderCanvas').offset().top);
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      if(mainWidth/mainHeight<=1.4){
        camera.position.z = 1200;
      }else{
        camera.position.z = 1000;
      }
      camera.lookAt(scene.position);
      scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff,0);
      renderer.setSize(mainWidth, mainHeight);
      $("#renderCanvas").append(renderer.domElement);

      var OBJ=new THREE.Group();
      scene.add(OBJ);

      //创建平面
      var createP=(W,H,src)=>{
        var geometry = new THREE.PlaneGeometry(W, H, 1, 1);
        var material = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture(src),transparent:true,overdraw:true});
        return new THREE.Mesh( geometry, material );
      }
      var U235='./static/UI/U235.png';
      var zq='./static/UI/zq.png';
      var zp='./static/UI/z.png';
      var l1='./static/UI/l1.png';
      var l2='./static/UI/l2.png';
      var text='./static/UI/text.png'

      //发射器
      var angP=0;
      var Ctrl=new THREE.Group();
      var ctrl=createP(140,140,zq);
      Ctrl.add(ctrl);
      Ctrl.position.x=-600;
      Ctrl.position.z=5;
      selectobjs.push(ctrl);
      scene.add(Ctrl);

      var Text=createP(364*0.6,120*0.6,text);
      Text.position.set(-600,80,5);
      scene.add(Text);

      var UP=createP(56,56,U235);

      var Z=[];//中子
      var U=[];//铀
      var addi=0;
      var addU=()=>{
        if(addi>=10){
          addi=0;
          return;
        }
        var length=U.length;
        if(length>=70){
          return;
        }
        var x=500-Math.random()*1000;
        var y=400-Math.random()*800;
        for(let j=0;j<length;j++){
          let ux=U[j].position.x;
          let uy=U[j].position.y;
          if(Math.sqrt((ux-x)*(ux-x)+(uy-y)*(uy-y))<64){
            addU();
            return;
          }
        }
        addi++;
        U[length]=UP.clone();
        U[length].position.set(x,y,4);
        OBJ.add(U[length]);
        addU();
      }

      U[0]=UP.clone();
      U[0].position.set(0,0,4);
      OBJ.add(U[0]);

      var SET=[];
      var ZP=createP(12,12,zp);
      //生成中子并发射
      var createZ=(x,y,f)=>{
        let ang;
        if(f){
          ang=angP;
        }else{
          ang=Math.random()*Math.PI*2;
        }
        let length=Z.length;
        Z[length]=ZP.clone();
        Z[length].position.set(x,y,1);
        OBJ.add(Z[length]);
        let SETl=SET.length;
        SET[SETl]=null;
        var an=()=>{
          var L=Math.sqrt(x*x+y*y);
          if(L>1500||Z[length]==null){
            OBJ.remove(Z[length]);
            cancelAnimationFrame(SET[SETl]);
            SET[SETl]=null;
            return;
          }
          x=Math.cos(ang)*10+x;
          y=Math.sin(ang)*10+y;
          Z[length].position.set(x,y,0);
          SET[SETl]=requestAnimationFrame(an);
        }
        an();
      }

      var LB1=createP(30,30,l1);
      var LB2=createP(30,30,l2);
      var LB=[];
      //裂变生成并发射
      var createLB=(x,y,obj)=>{
        let ang=Math.random()*Math.PI*2;
        let len=LB.length;
        LB[len]=obj.clone();
        LB[len].position.set(x,y,3);
        OBJ.add(LB[len]);
        let SETl=SET.length;
        SET[SETl]=null;
        var an=()=>{
          var L=Math.sqrt(x*x+y*y);
          if(L>1500||LB[len]==null){
            OBJ.remove(LB[len]);
            cancelAnimationFrame(SET[SETl]);
            SET[SETl]=null;
            return;
          }
          x=Math.cos(ang)*8+x;
          y=Math.sin(ang)*8+y;
          LB[len].position.set(x,y,0);
          SET[SETl]=requestAnimationFrame(an);
        }
        an();
      }
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        renderer.render(scene, camera);
        if(U.length>=70){
          this.Boom=true;
        }else{
          this.Boom=false;
        }
        if(Z.length>0){
          for(let i=0;i<Z.length;i++){
            if(Z[i]==null){
              continue;
            }
            let zx=Z[i].position.x;
            let zy=Z[i].position.y;
            for(let j=0;j<U.length;j++){
              let ux=U[j].position.x;
              let uy=U[j].position.y;
              if(Math.sqrt((zx-ux)*(zx-ux)+(zy-uy)*(zy-uy))<34){
                var Num=Math.ceil(Math.random()*2)+1;
                OBJ.remove(Z[i]);
                OBJ.remove(U[j]);
                Z[i]=null;
                U.splice(j,1);
                createLB(ux,uy,LB1);
                createLB(ux,uy,LB2);
                for(let k=0;k<Num;k++){
                  createZ(ux,uy);
                }
              }
            }
          }
        }
      };
      animate();

      window.addEventListener('resize', () => {
        offsetLeft = parseInt($('#renderCanvas').offset().left);
        offsetTop = parseInt($('#renderCanvas').offset().top);
        mainWidth = $('#renderCanvas').width();
        mainHeight = $('#renderCanvas').height();
        camera.aspect = mainWidth / mainHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( mainWidth, mainHeight );
      });
      var MoveF=false;
      var onDocumentMouseDown = (event) => {
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        if (intersects.length > 0) {
          selectobj = intersects[0].object;
          mousedownflag = true;
        }
      };
      var onDocumentMouseMove = (event) => {
        event.preventDefault();
        var mouse = {};
        mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
        mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(selectobjs);
        raycaster.setFromCamera(mouse, camera);
        if (intersects.length > 0) {
          if (INTERSECTED != intersects[0].object) {
            INTERSECTED = intersects[0].object;
            plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset);
            Move(obj);
          }
        }
      };
      var onDocumentMouseUp = (event) => {
        event.preventDefault();
        Up();
      };
      var onDocumentTouchStart = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          if (intersects.length > 0) {
            selectobj = intersects[0].object;
            mousedownflag = true;
          }
        }
      };
      var WH = $(window).height();

      var onDocumentTouchMove = (event) => {
        event.preventDefault();
        if (event.touches.length === 1) {
          var mouse = {};
          var Y = event.touches[0].pageY;
          if (Y < 72) {
            Y = 72;
          } else if (Y > WH - 20) {
            Y = WH - 20;
          }
          mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
          mouse.y = -((Y - offsetTop) / mainHeight) * 2 + 1;
          raycaster.setFromCamera(mouse, camera);
          var intersects = raycaster.intersectObjects(selectobjs);
          raycaster.setFromCamera(mouse, camera);
          if (intersects.length > 0) {
            if (INTERSECTED != intersects[0].object) {
              INTERSECTED = intersects[0].object;
              plane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(plane.normal), INTERSECTED.position);
            }
          }
        }
        if (mousedownflag) {
          if (raycaster.ray.intersectPlane(plane, intersection)) {
            var obj = intersection.sub(offset);
            Move(obj);
          }
        }
      };
      var onDocumentTouchEnd = (event) => {
        event.preventDefault();
        Up();
      };
      var Move=(obj)=>{
        let x = obj.x;
        let y = obj.y;
        angP=Math.atan(y/(x+600));
        ctrl.rotation.z=angP;
        MoveF=true;
        if(Text!=null){
          scene.remove(Text);
          Text=null;
        }
      }
      var Up=()=>{
        if(mousedownflag){
          if(!MoveF){
            createZ(-600,0,true);
          }
          if(Text!=null){
            scene.remove(Text);
            Text=null;
          }
          mousedownflag = false;
          selectobj = null;
        }
        MoveF=false;
      }
      renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
      renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
      renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
      renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
      renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
      renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);
      var resetWidget = () => {
        for(var i in SET){
          SET[i]!=null && cancelAnimationFrame(SET[i]);
        }
        OBJ.visible=false;
        scene.remove(OBJ);
        angP=0;
        ctrl.rotation.z=0;
        OBJ=new THREE.Group();
        scene.add(OBJ);
        U=[];
        Z=[];
        SET=[];
        LB=[];
        addi=0;
        U[0]=UP.clone();
        U[0].position.set(0,0,4);
        OBJ.add(U[0]);
      };
      var TO = function() {
        return {
          reset: resetWidget,
          addU:addU
        }
      }
      return TO();
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

input, button {
  outline: none;
  -webkit-appearance: none;
  border-radius: 0;
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

/*内容区*/

.container {
  width: 100%;
  height: 100%;
  background-image: -webkit-radial-gradient(circle at center, #490188,#04163E);
  background-image: radial-gradient(circle at center, #490188,#04163E);
}

.container h3 {
  font-size: 24px;
  line-height: 1.0;
  padding: 24px;
  position: absolute;
  top:0;
  z-index: 999;
  color: #ffffff;
  font-weight: normal;
  background-color: transparent;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  outline: none;
  position: absolute;
  top:0;
  overflow: hidden;
}

canvas {
  position: absolute;
}

.aside_reset {
  margin: 20px 24px;
  float: right;
}

#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}
#ctrl{
  position:absolute;
  bottom:0;
  right:0;
  padding: 20px 30px;
  width:240px;
  height:170px;
}
#ctrl>#add{
  width:86px;
  height: 132px;
  float: right;
}
#ctrl>#mark{
  width:86px;
  height: 132px;
  float: left;
  position:relative;
}
#ctrl>#mark>img{
  position: absolute;
  bottom:10px;
}
#ctrl>div>img{
  width: 100%;
  height:auto;
}
</style>
