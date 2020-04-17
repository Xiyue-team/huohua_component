<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
        <img v-if="src" :src="'static/UI/'+src+'.png'" id="mark">
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space">
        <ui-btn :type="blue1" class="btn" @click.native="choose(1)">α衰变</ui-btn>
        <ui-btn :type="blue2" class="btn" @click.native="choose(2)" :style="'margin-top:12px;'">β衰变</ui-btn>
        <ui-btn type="switch" id="checkedS" v-model="checked" :class="{op:op1}" :style="'margin-top: 20px;margin-bottom:80px;'">
          匀强磁场
        </ui-btn>
        <ui-btn type="play" id="play" style="zoom:0.9" v-model="played" :class="{op:op2}"></ui-btn>
      </div>
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
      title: '原子核的衰变',
      checked: false,
      blue1:'',
      blue2:'',
      blueN:0,
      op1:true,
      op2:true,
      played:true,
      TO: null,
      src:'',
      Obj:null,
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
  watch: {
    checked(f){
      this.TO.showHideArrow(f);
    },
    played(f){
      if(f){
        cancelAnimationFrame(this.SET);
      }else{
        this.TO.Play(this.blueN);
      }
    }
  },
  methods: {
    //计算侧边
    reset() {
      this.TO.reset();
    },
    choose(num){
      if(this.blueN==num){
        return;
      }
      this.checked=false;
      this.played=true;
      this.op1=false;
      this.op2=false;
      if(num==1){
        this.blue1='blue';
        this.blue2='';
        this.blueN=1;
        this.src='mark1';
      }else if(num==2){
        this.blue1='';
        this.blue2='blue';
        this.blueN=2;
        this.src='mark2';
      }
      this.TO.chooseType(num);
    },
    init() {
      var scene = null,
        camera = null,
        renderer = null,
        mainWidth = null,
        mainHeight = null,
        isMob = /iPad|Android/g.test(navigator.userAgent);
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha:true
      });
      var offsetLeft = parseInt($('#renderCanvas').offset().left);
      var offsetTop = parseInt($('#renderCanvas').offset().top);
      mainWidth = $('#renderCanvas').width();
      mainHeight = $('#renderCanvas').height();
      scene = new THREE.Scene();
      scene.position.x=-100;
      camera = new THREE.PerspectiveCamera(50, mainWidth / mainHeight, 1, 10000);
      camera.position.x = 0;
      camera.position.y = 0;
      camera.position.z = 1000;
      // camera.lookAt(scene.position);
      // scene.add(camera);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff,0);
      renderer.setSize(mainWidth, mainHeight);
      $("#renderCanvas").append(renderer.domElement);

      //创建平面
      var createP=(W,H,y,src)=>{
        var geometry = new THREE.PlaneGeometry(W, H, 1, 1);
        var material = new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture(src),transparent:true,depthTest:false,overdraw:true});
        var P=new THREE.Mesh( geometry, material );
        P.position.z=y;
        P.visible=false;
        return P;
      }
      var arrowPic='./static/UI/arrow.png';
      var UPic='./static/UI/U.png';
      var ThPic='./static/UI/Th.png';
      var PaPic='./static/UI/Pa.png';
      var AlphaPic='./static/UI/alpha.png';
      var DZPic='./static/UI/DZ.png';
      var ZWPic='./static/UI/ZW.png';

      //U原子
      var U=createP(110,108,5,UPic);
      //Th原子
      var Th=createP(110,108,5,ThPic);
      //Pa原子
      var Pa=createP(110,108,5,PaPic);
      //Alpha原子
      var Alpha=createP(128*0.35,122*0.35,1,AlphaPic);
      //电子
      var DZ=createP(60*0.25,60*0.25,1,DZPic);
      //反电子中微子
      var ZW=createP(60*0.25,60*0.25,1,ZWPic);
      //匀强磁场
      var Arrow=createP(691*1.4,428*1.4,0,arrowPic);
      scene.add(U,Th,Pa,Alpha,DZ,ZW,Arrow);

      //选择衰变类型
      var chooseType=(type)=>{
        cancelAnimationFrame(this.SET);
        U.visible=false;
        Th.visible=false;
        Pa.visible=false;
        Alpha.visible=false;
        DZ.visible=false;
        ZW.visible=false;
        Arrow.visible=false;
        Alpha.position.set(0,0,1);
        DZ.position.set(0,0,1);
        ZW.position.set(0,0,1);
        if(type==1){
          U.visible=true;
          this.Obj=U;
        }else if(type==2){
          Th.visible=true;
          this.Obj=Th;
        }
      }
      var PI=Math.PI/180;
      var ang10=null,ang11,ang12,r1,x0,y0,stepx,stepy;
      var ang20=null,ang21,ang22,r2,x1,y1,step1x,step1y,step1x0=null,step1y0;
      //匀强磁场显示隐藏
      var FF=false;
      var showHideArrow=(f)=>{
        Arrow.visible=f;
        FF=f;
        if(this.blueN==1){
          if(ang10==null){
            return;
          }
          if(f){
            ang11=ang10-90;
            ang12=ang10+90;
            x0=r1*Math.cos(ang12*PI)+Alpha.position.x;
            y0=r1*Math.sin(ang12*PI)+Alpha.position.y;
          }else{
            ang10=ang11+90;
            stepx=Math.cos(ang10*PI)*2;
            stepy=Math.sin(ang10*PI)*2;
          }
        }else if(this.blueN==2){
          if(ang20==null){
            return;
          }
          if(f){
            ang21=ang20+90;
            ang22=ang20-90;
            x1=r2*Math.cos(ang22*PI)+DZ.position.x;
            y1=r2*Math.sin(ang22*PI)+DZ.position.y;
          }else{
            ang20=ang21-90;
            step1x=Math.cos(ang20*PI)*2;
            step1y=Math.sin(ang20*PI)*2;
          }
        }
      }
      var Play=(type)=>{
        var an=null;
        if(type==1){
          Alpha.visible=true;
          U.visible=false;
          Th.visible=true;
          this.Obj=Th;
          if(Alpha.position.y==0&&ang10==null){
            ang10=Math.floor(Math.random()*361);
              ang11=ang10-90;
              ang12=ang10+90;
          }else{
              ang10=ang11+90;
              ang12=ang10+90;
          }
          r1=150;
          x0=r1*Math.cos(ang12*PI)+Alpha.position.x;
          y0=r1*Math.sin(ang12*PI)+Alpha.position.y;
          stepx=Math.cos(ang10*PI)*2;
          stepy=Math.sin(ang10*PI)*2;
          an=()=>{
            if(Alpha.position.y<-330||Alpha.position.y>330||Alpha.position.x>530||Alpha.position.x<-530){
              Alpha.visible=false;
              this.played=true;
              this.op1=false;
              cancelAnimationFrame(this.SET);
              return;
            }
            if(this.checked){
              ang11+=4;
              if(ang11==360){
                ang11=0;
              }
              if(FF){
                Alpha.position.x=Math.cos(ang11*PI)*r1+x0;
                Alpha.position.y=Math.sin(ang11*PI)*r1+y0;
              }
            }else{
              if(!FF){
                Alpha.position.x+=stepx;
                Alpha.position.y+=stepy;
              }
            }
            this.SET=requestAnimationFrame(an);
          }
        }else if(type==2){
          DZ.visible=true;
          ZW.visible=true;
          Th.visible=false;
          Pa.visible=true;
          this.Obj=Pa;
          if(DZ.position.y==0&&ang20==null){
            ang20=Math.floor(Math.random()*361);
              ang21=ang20+90;
              ang22=ang20-90;
          }else{
              ang20=ang21-90;
              ang22=ang20-90;
          }
          r2=80;
          x1=r2*Math.cos(ang22*PI)+DZ.position.x;
          y1=r2*Math.sin(ang22*PI)+DZ.position.y;
          step1x=Math.cos(ang20*PI)*2;
          step1y=Math.sin(ang20*PI)*2;
          if(step1x0==null){
            step1x0=step1x;
            step1y0=step1y;
          }
          an=()=>{
            if(ZW.position.y<-330||ZW.position.y>330||ZW.position.x>530||ZW.position.x<-530){
              ZW.visible=false;
            }
            if(DZ.position.y<-330||DZ.position.y>330||DZ.position.x>530||DZ.position.x<-530){
              DZ.visible=false;
            }
            if(!ZW.visible && !DZ.visible){
              this.played=true;
              this.op1=false;
              cancelAnimationFrame(this.SET);
              return;
            }
            if(this.checked){
              ang21-=4;
              if(ang21==-360){
                ang21=0;
              }
              if(FF){
                DZ.position.x=Math.cos(ang21*PI)*r2+x1;
                DZ.position.y=Math.sin(ang21*PI)*r2+y1;
              }
            }else{
              if(!FF){
                DZ.position.x+=step1x;
                DZ.position.y+=step1y;
              }
            }
            ZW.position.x-=step1x0;
            ZW.position.y-=step1y0;
            this.SET=requestAnimationFrame(an);
          }
        }
        an();
      }

      var renderN=0;
      var animate = () => {
        requestAnimationFrame(animate);
        renderer.clear();
        renderer.render(scene, camera);
        renderN++;
        if(renderN==4){
          renderN=0;
          if(this.Obj!=null){
            this.Obj.position.set(5-Math.random()*10,5-Math.random()*10,5);
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

      var resetWidget = () => {
        cancelAnimationFrame(this.SET);
        this.checked=false;
        this.blue1='';
        this.blue2='';
        this.blueN=0;
        this.played=true;
        this.op1=true;
        this.op2=true;
        this.src='';
        FF=false;
        U.visible=false;
        Th.visible=false;
        Pa.visible=false;
        Alpha.visible=false;
        DZ.visible=false;
        ZW.visible=false;
        Arrow.visible=false;
        this.Obj=null;
        ang10=null;
        ang20=null;
        step1x0=null;
      };
      var TO = function() {
        return {
          reset: resetWidget,
          showHideArrow:showHideArrow,
          chooseType:chooseType,
          Play:Play
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
  background-image: -webkit-radial-gradient(circle at center, #490188,#04163E);
  background-image: radial-gradient(circle at center, #490188,#04163E);
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
  float:left;
  position: relative;
}

.container h3 {
  font-size: 24px;
  color: #fff;
  line-height: 1.0;
  padding: 24px;
  position: absolute;
  top:0;
  z-index: 999;
  font-weight: normal;
  background-color: transparent;
}
.app_aside {
  position: absolute;
  right:0;
  width: 140px;
  background-color: transparent;
  height: 100%;
  z-index: 888;
  /*box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);*/
}
#renderCanvas {
  width: 100%;
  height: 100%;
  outline: none;
  position: absolute;
  top:0;
}
canvas {
  position: absolute;
}
.aside_reset {
  margin: 24px;
  float: right;
}
.btn_space {
  margin-top: 80px;
  padding: 20px;
  width: 100%;
  height: calc(100% - 80px);
  clear: both;
  background-color: transparent;
}
#app .aside_reset {
  position: fixed;
  right: 0;
  top: 0;
}
#checkedS{
  cursor: pointer;
}
.btn{
  cursor: pointer;
  width:100%;
}
#play{
  position:absolute;
  bottom:30px;
  right:20px;
}
#mark{
  width:auto;
  height:140px;
  position: absolute;
  right:90px;
  bottom:10px;
  z-index: 999;
}
.op{
  opacity: 0.5;
  pointer-events: none;
}
</style>
