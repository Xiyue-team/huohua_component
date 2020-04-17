<template>
  <div id="app" class="noselect">
    <div class="menu" @click="sildeMenu(1)" ref="menu"></div>
    <div class="container" ref="container">
      <!--头部-->
      <h3 v-html="title" class="app_title"></h3>
      <div class="Tip" v-if="needTip">建议您在电脑或平板上打开，以获取最佳的演示效果</div>
      <div id="renderCanvas" @click="sildeMenu(2)">
        <!--<canvas id="renderCanvas" touch-action="none"></canvas>-->
      </div>
      <!--视图区-->
    </div>
    <!--<div class="leftMask" v-show="!isHidden && ismob" @click="sildeMenu(2)"></div>-->
    <!--侧边按钮区-->
    <div class="app_aside" ref="sides" :class="ismob?'mobleRightColor':'normalRightColor'">
      <ui-btn id="clear" type="reset1" class="titleBtn" @click.native="reset"></ui-btn>
      <div class="radioBtn">
        <h4>东南信风</h4>
        <ui-group type="radio"
                :margin="20"
                :groups="groups"
                v-model="radio">

        </ui-group>
      </div>
      <ui-btn btn type="switch" v-model="move" class="rightBtn">沃克环流</ui-btn>
    </div>
    <div id="notSupported" class="hidden">loading...</div>
    <div class="hen" v-show="ismobhen">
      <div><img src="static/image/xuanzhuan.png" alt=""><span>请将屏幕自动旋转功能打开
并横屏使用</span></div>
    </div>
    <div class="loading" v-show="loaded"><span>正在加载中({{progress}}%)......</span></div>
  </div>
</template>
<script>
  import uiBtn from '@/components/UI/uiBtn';
  import uiGroup from '@/components/UI/uiGroup';

  export default {
    name: 'app',
    components: {uiBtn,uiGroup},
    data() {
      return {
        blue: '',
        move: false,
        isMob: /iPad|Android/g.test(navigator.userAgent),
        isHidden: false,
        canSlide: false,
        ismob: false,
        ismobhen: false,
        canvas: null,
        checked: false,
        modelGroup:null,
        isFirst:true,
        To:null,
        title: '厄尔尼诺现象和拉尼娜现象',

        FG:false,
        needTip:false,
        isOver:false,
        imgViewWidth: 0,
        imgViewHeight: 0,
        progress:0,
        radio:'middle',
        loaded:true,
        groups:[{
            name:'big',
            txt:'大'
          },{
            name:'middle',
            txt:'中'
          },{
            name:'small',
            txt:'小'
          }
        ]
      };
    },
    watch: {
      radio(v){
        let that=this;
        let Node=$('#renderCanvas canvas');
        // if(!this.isOver) {
          if (v === 'middle' && this.move) {
            if (this.modelGroup){
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},400,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/zcn_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                 Node.animate({'opacity':1},400,function () {
                  })
                });
              })
            }

          }
          else if (v === 'middle' && !this.move) {
            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},400,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/zcn1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
               Node.animate({'opacity':1},400,function () {
                  })
                });
              })
            }
          }
          else if (v === 'small' && this.move) {


            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},400,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/elnino_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                 Node.animate({'opacity':1},400,function () {
                  })
                });
              })
            }

          }
          else if (v === 'small' && !this.move) {

            if (this.modelGroup) {
              let M=this.modelGroup;
                 Node.stop();
                 Node.animate({'opacity':0},400,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/elnino1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},400,function () {
                  })
                });

              })
            }


          }
          else if (v === 'big' && this.move) {

            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
               Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/lanina_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {
                  })
                });
              })

            }

          }
          else if (v === 'big' && !this.move) {
            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
               Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/lanina1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                 Node.animate({'opacity':1},800,function () {
                  })
                });
              })
            }
          }
        // }
      },
      move(val) {
        let v = this.radio;
        let that=this;
        let Node=$('#renderCanvas canvas');
        // if (!this.isOver) {
          if (v === 'middle' && val) {
            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/zcn_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                Node.animate({'opacity':1},800,function () {
                  })
                });
              })
            }

          }

          else if (v === 'middle' && !val) {
            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/zcn1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {
                  })
                });
              })
            }

          }

          else if (v === 'small' && val) {

            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/elnino_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {
                  })
                });
              })
            }

          }

          else if (v === 'small' && !val) {

            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/elnino1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {
                  })
                });
              })

            }

          }
          else if (v === 'big' && val) {

            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
              Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/lanina_wkhl1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {

                  })
                });

              })

            }

          }
          else if (v === 'big' && !val) {

            if (this.modelGroup) {
              let M=this.modelGroup;
              Node.stop();
                 Node.animate({'opacity':0},600,function () {
                that.To.scene.remove(M);
                that.To.modelPut('static/GLTF/lanina1.gltf').then(function () {
                  that.To.scene.add(that.modelGroup);
                  Node.animate({'opacity':1},800,function () {
                  })
                });

              })

            }

          }
        // }
      }
    },
    methods:{
      init() {
        let clock = new THREE.Clock();
        this.canvas = document.getElementById("renderCanvas");
        let thiz = this;

        let renderer,camera,scene,objs;
        let W=$('#renderCanvas').width();
        let H=$('#renderCanvas').height();
        let W1=window.innerWidth;
        let H1=window.innerHeight;
        let mixer;
       renderer=new THREE.WebGLRenderer({
          antialias:true
        });


        if(W1<500||H1<500){

          if(W1<H1){
            renderer.setSize(H1-100,W1-80);
            camera=new THREE.PerspectiveCamera(30,H1/W1,0.1,1000);
            camera.position.set(0,0,800);
          }
          else{

            renderer.setSize(W+120,H);
            camera=new THREE.PerspectiveCamera(30,(W+120)/H,0.1,1000);
            camera.position.set(0,0,800);
          }
        }
        else{
          renderer.setSize(W,H);
          camera=new THREE.PerspectiveCamera(30,W/H,0.1,1000);
          camera.position.set(0,0,800);
        }
        renderer.setPixelRatio(window.devicePixelRatio);
        this.canvas.appendChild(renderer.domElement);
        scene=new THREE.Scene();
        camera.lookAt(new THREE.Vector3(0,0,0));
        scene.add(camera);
        renderer.setClearColor(0xf9f9f9);
        let light = new THREE.AmbientLight( 0xfff ); // soft white light
        light.castShadow=true;
        scene.add( light );
        scene.add(new THREE.AmbientLight(0xf0f0f0));
        let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);
        let dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.color.setHSL(0.1, 1, 0.95);
        dirLight.position.set(-1, 1.75, 1);
        dirLight.position.multiplyScalar(30);
        scene.add(dirLight);
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        let d = 50;
        dirLight.shadow.camera.left = -d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = -d;
        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = -0.0001;
        let dirLight1 = dirLight.clone();
        dirLight1.position.set(1, -1.75, -1);
        dirLight1.intensity = 1;
        scene.add(dirLight1);
let Texture,Texture1,Texture2,Texture3,Texture4,Texture5,Texture6,xiao1,zhong1,da1,xiao2,zhong2,da2,textnuan,textleng;





//导入模型
let modelPut=(url)=> {
  return new Promise(function (resolve,reject) {


  let loader = new THREE.GLTFLoader();
  let gltf;
  loader.load(url, (data) => {
    gltf = data;
    let objects = gltf.scene;
      objects.traverse( ( node )=>{
      if (node.isMesh) {
        node.visible = true;
          node.material.opacity = 1;
      }
    });

    console.log(objects);
    mixer = new THREE.AnimationMixer( objects );
    let action=mixer.clipAction( gltf.animations[0] );
    action.clampWhenFinished = true;
    action.setLoop(THREE.LoopOnce);
    action.play();
    objects.rotation.y=-90/180*Math.PI;
    objects.rotation.x=40/180*Math.PI;
if(thiz.isFirst) {
  scene.add(objects);
}
    thiz.modelGroup=objects;
    objects.scale.set(350,350,350);

    //正常年
    if(!thiz.move&&thiz.radio!=='small'){
      Texture = objects.children[2].children[0].material;
      Texture1 = objects.children[2].children[1].material;
      Texture1.opacity=0;

    }


    if(thiz.move&&thiz.radio!=='small'){
      //流箭头
      Texture = objects.children[0].children[1].material;
      //水面箭头1
      Texture1 = objects.children[0].children[2].material;
      //水面箭头2
      Texture2 = objects.children[0].children[3].material;
      Texture1.opacity=0;
      //雨
        Texture3 = objects.children[0].children[25].material;
    }


    if(!thiz.move&&thiz.radio==='middle'){
      xiao1=objects.children[2].children[3].children[1].material;
      zhong1=objects.children[2].children[3].children[2].material;
      da1=objects.children[2].children[3].children[0].material;
      da2=objects.children[2].children[2].children[0].material;
      xiao2=objects.children[2].children[2].children[1].material;
      zhong2=objects.children[2].children[2].children[2].material;
      xiao1.visible=false;
      da1.visible=false;
      zhong1.visible=false;
      xiao2.visible=false;
      zhong2.visible=false;

    }

    //去除文字遮盖
    if(thiz.move){
      objects.children[0].children[8].material.depthTest=false;
    }
    //厄尔尼诺年
    if(thiz.radio==='small'&&!thiz.move){
      Texture=objects.children[2].children[1].children[0].material;
      Texture1=objects.children[2].children[1].children[1].material;
      Texture.map.offset.x=0.3;
      // Texture1.map.offset.x=-0.3;
      // Texture1.opacity=0;



    }

if(thiz.radio==='small'&&thiz.move){
  Texture = objects.children[0].children[1].material;
  Texture1 = objects.children[0].children[2].material;
  Texture2 = objects.children[0].children[24].material;
  //水面左箭头1
  Texture3 = objects.children[0].children[13].children[0].material;
  //水面右箭头1
  Texture4 = objects.children[0].children[13].children[1].material;
  //水面左箭头2
  Texture5 = objects.children[0].children[14].children[0].material;
  //水面右箭头2
  Texture6 = objects.children[0].children[14].children[1].material;
  Texture3.map.offset.x=0.1;
  Texture4.map.offset.x=-0.3;
  Texture3.map.offset.x=0.1;
  Texture4.map.offset.x=-0.3;
}


if(thiz.radio==='big'&&!thiz.move){
  xiao1=objects.children[2].children[3].children[1].material;
  zhong1=objects.children[2].children[3].children[2].material;
  da1=objects.children[2].children[3].children[0].material;

  da2=objects.children[2].children[2].children[0].material;
  xiao2=objects.children[2].children[2].children[1].material;
  zhong2=objects.children[2].children[2].children[2].material;
  xiao1.visible=true;
  da1.visible=true;
  zhong1.visible=true;
  xiao2.visible=true;
  zhong2.visible=true;

}
  }, function (xhr) {

    thiz.progress=Math.ceil(xhr.loaded/xhr.total*100);
    if(thiz.progress===100){
      setTimeout(()=>{
        thiz.loaded=false;
        thiz.isFirst=false;
        resolve();
      },400)
    }
  }, function (error) {
    reject();
    console.error(error);
  });
  })
  };

          let controls = new THREE.OrbitControls(camera, renderer.domElement);
          // 如果使用animate方法时，将此函数删除
          //controls.addEventListener( 'change', render );
          // 使动画循环使用时阻尼或自转 意思是否有惯性
          controls.enableDamping = true;
          //动态阻尼系数 就是鼠标拖拽旋转灵敏度
          controls.dampingFactor = 0.25;
          //是否可以缩放
          controls.enableZoom = true;
          //是否自动旋转
          controls.autoRotate = false;
          //设置相机距离原点的最远距离
          controls.minDistance = 50;
          //设置相机距离原点的最远距离
          controls.maxDistance = 900;
          //是否开启右键拖拽
          controls.enablePan = false;
          controls.maxZoom=1.4;
          controls.minZoom=0.6;
          controls.maxPolarAngle=Math.PI*0.6;
          controls.minPolarAngle=Math.PI/3;
          controls.maxAzimuthAngle=0;
          controls.minAzimuthAngle=0;
          let listenSide = () => {
          let w = window.innerWidth;
          let h = window.innerHeight;
          if (w < 500 || h < 500) {
            this.isHidden = true;
            this.canSlide = true;
            this.$refs.container.style.width = '100%';
            this.$refs.menu.style.top = '24px';
            this.$refs.sides.style.right = '-280px';
            this.ismob = true;
            if (w <= h) {
              this.ismobhen = true
            } else {
              this.ismobhen = false;
            }
          } else {
            this.isHidden = false;
            this.canSlide = false;
            this.$refs.container.style.width = w - 280 + 'px';
            this.$refs.sides.style.right = '0';
            this.ismob = false;
          }
        };
        listenSide();
        window.addEventListener("resize", () => {
          listenSide();
        });


function Animate(obj,fg,offset) {
  obj.wrapT=THREE.RepeatWrapping;
  if(fg){
      obj.offset.x+=offset;
    obj.offset.x%=1;
  }
  else {
      obj.offset.y+=offset;
    obj.offset.y%=1;
  }
  obj.needsUpdate=true
}

let that=this;
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  controls.update();

  //正常年份
  if (that.radio === 'middle')
    if (Texture1) {
      Animate(Texture.map, true, 0.01);

      if(tm1){
        clearTimeout(tm1);
      }
      let tm1=setTimeout(()=>{
        if(tm2){
          clearTimeout(tm1);
        }
        let tm2=setTimeout(()=>{
          zhong2.visible=true;
        },300);

        xiao2.visible=true;
        if(tm3){
          clearTimeout(tm3);
        }
        let tm3=setTimeout(()=>{
         xiao1.visible=true;
          if(tm4){
            clearTimeout(tm1);
          }
         let tm4=setTimeout(()=>{
           da1.visible=true
         },300)
        },1500)

      },2000);
      // Animate(Texture1.map, true,0.01);
    }


  //正常年份加沃克环流
  if (that.radio === 'middle' && that.move) {
    if (Texture3) {

      Animate(Texture.map, true, 0.01);
      Animate(Texture1.map, true, 0.01);
      Animate(Texture2.map, true, 0.01);
      Animate(Texture3.map, false, -0.01);
    }

  }


//拉尼娜
  if (that.radio === 'big') {
    if (Texture1) {

      Animate(Texture.map, true, 0.012);
      // Animate(Texture1.map, true,0.012);
    }

  }


  //拉尼娜加沃克环流


  if (that.move && that.radio === 'big') {
    if (Texture3) {
      Animate(Texture.map, true, 0.02);
      Animate(Texture1.map, true, 0.02);
      Animate(Texture2.map, true, 0.02);
      Animate(Texture3.map, false, -0.02);
    }
  }


  // if ( that.move&&that.radio!=='small'){
  //   if(Texture3){
  //     Animate(Texture.map, true, 1);
  //     Animate(Texture1.map, true, 1);
  //     Animate(Texture2.map, true, -1);
  //     Animate(Texture3.map, false, 1);
  //   }
  // }


  //厄尔尼诺

  if (!that.move && that.radio === 'small') {
    Animate(Texture.map, true, 0.005);
    // Animate(Texture2.map, true, 0.005);

    // Animate(Texture1.map, true,0.005);
  }
  //厄尔尼诺加沃克环流
  if (that.move && that.radio === 'small') {
    if (Texture6) {
      Animate(Texture.map, true, 0.005);
      Animate(Texture1.map, true, 0.005);
      Animate(Texture2.map, false, 0.005);
      Animate(Texture3.map, true, -0.005);
      Animate(Texture4.map, true, 0.005);
    }
  }

  let time = clock.getDelta();
  if (mixer) {
    mixer.update(time);
  }
}
render();

return {
  modelPut:modelPut,
  scene:scene,
  Texture:Texture,
  Texture1:Texture1,
  Texture2:Texture2,
  Texture3:Texture3,
  Texture4:Texture4,
  camera:camera

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
      reset(){
        this.isOver=true;
        this.move=false;
        this.radio='middle';
        this.To.camera.position.set(0,0,800);
        this.To.camera.lookAt(new THREE.Vector3(0,0,0));
        setTimeout(()=> {
          this.isOver=false;
        },50)
      }
    },

    mounted() {
      this.To=this.init();
      this.To.modelPut('static/GLTF/zcn1.gltf');
      this.W = window.innerWidth;
      this.H = window.innerHeight;
      if(window.innerWidth<500||window.innerHeight<500){
        this.needTip=true;
        setTimeout(()=>{
          this.needTip=false
        },3000)
      }
      this.imgViewWidth = window.innerHeight / 600 * 1920 * 1.3;
      this.imgViewHeight = window.innerHeight * 1.3;
      $('#showhide').hide();
    }
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
  .Tip{
    padding: 0 10px;
    position: fixed;
    display: inline-block;
    width: 450px;
    height: 48px;
    border-radius: 100px;
    z-index: 200;
    border: 2px solid #ddd  ;
    font-size: 18px;
    color: #333;
    line-height: 46px;
    margin: 0 auto;
    left: 50%;
    background-color: white;
    transform: translateX(-50%);
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
    width:calc(100% - 280px);
    transition: width 1s, height 1s;
    background-color: #f9f9f9;
  }

  .container h3 {
    font-size: 24px;
    color: #000;
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
    opacity: 1;
  }

  .normalRightColor {
    background: #f9f9f9;
  }

  .mobleRightColor {
    background: #f9f9f9
  }

  .menu {
    position: fixed;
    height: 48px;
    width: 48px;
    right: 24px;
    top: -45px;
    cursor: pointer;
    background: url('./img/menu.png') no-repeat;
    background-size: contain;
    background-position: center center;
    z-index: 19;
    transition: all 1s;
  }


  #renderCanvas{
    width:100%;
    height:calc(100% - 76px);
    background-color: #f9f9f9;
  }
  .app_title {
    z-index: 999;

  }

  .titleBtn {
    position: absolute;
    top: 24px;
    right: 24px;
  }
  .radioBtn{
    width: 240px;
    height: 108px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.10);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.3);
    border-radius: 6px;
    padding: 14px 12px 11px 12px;
    position: absolute;
    bottom: 88px;
    right: 20px;
  }
  .radioBtn h4{
    text-align: center;
    font-size: 16px;
    color: #4D4D4D;
    line-height: 16px;
    padding-bottom: 19px;
  }
  .rightBtn {
    position: absolute;
    bottom: 24px;
    right: 20px;
  }
.btn-switch{
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.5) !important;
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
  .btn-radio{
    width: 24px !important;
    background-color: transparent !important;
    padding:0 !important;
    margin-right: 72px !important;
  }
   .btn-radio:last-child{
    margin-right: 0 !important;
   }
.btn-radio.UI-btn{
   box-shadow:  0 0 0 transparent !important;
}
.btn-radio p{
  width: 24px !important;
  text-align: center !important;
  margin-left:0 !important;
  position: relative !important;
  bottom: 5px !important;
  font-size: 16px !important;
  color: #1A1A1A !important;
}
  .loading{
    width: 100%;
    margin-top: 72px;
    height: calc(100% - 72px);
    background: #f9f9f9;
    z-index: 997;
    position: absolute;
    left: 0;

  }
  .loading span{
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  @media screen and (min-width: 1600px) {

    #renderCanvas {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1400px;
      height: 700px;
      transform-origin: top left;
    }
    canvas {
      position: absolute;
      left: 0;
      top: 0;
    }

  }



</style>
