<template>
  <div id="app" class="noselect">
    <div class="container">
      <!--头部-->
      <h3 v-text="title" class="app_title"></h3>
      <!--视图区-->
      <div id="renderCanvas">
          <div class="loading" :style="'height:100%;width:100%;text-align:center;'">loading...</div>
      </div>
    </div>
    <!--侧边按钮区-->
    <div class="app_aside">
      <!--重制按钮-->
      <ui-btn type="reset1" class="aside_reset"  id="button1" @click.native="resetWidget"></ui-btn>
      <!--清除浮动-->
      <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
          <div :style="'height:56px;'">
            <ui-btn type="radio" id="button2" v-model="radio1" :width="119" :height="44" @callback="radioC(1)">
              顶点
            </ui-btn>
            <div class="add" id="button3" @click="addC(1)">
              <span v-for="i in 8" :class="{marginR:i!=8,bBlue:add1>=i}" ></span>
            </div>
          </div>
          <div :style="'height:56px;'">
            <ui-btn type="radio" id="button4" v-model="radio2" :width="119" :height="44" @callback="radioC(2)">
              面心
            </ui-btn>
            <div class="add" id="button5" @click="addC(2)">
              <span v-for="i in 6" :class="{marginR:i!=6,bBlue:add2>=i}"></span>
            </div>
          </div>
          <div :style="'height:56px;'">
            <ui-btn type="radio" id="button6" v-model="radio3" :width="119" :height="44" @callback="radioC(3)">
              内部
            </ui-btn>
            <div class="add" id="button7" @click="addC(3)">
              <span v-for="i in 4" :class="{marginR:i!=4,bBlue:add3>=i}"></span>
            </div>
          </div>
          <div :style="'height:56px;'">
            <ui-btn type="radio" id="button8" v-model="radio4" :width="119" :height="44" @callback="radioC(4)">
              无隙并置
            </ui-btn>
            <div class="add" id="button9" @click="addC(4)">
              <span v-for="i in 7" :class="{marginR:i!=7,bBlue:add4>=i}"></span>
            </div>
          </div>
          <div :style="'margin-top:18px;margin-bottom:20px;height:72px;'">
              <p :style="'height:16px;margin-bottom:12px;font-size:16px;line-height:16px;color:#4D4D4D;text-align:center;'">视角取向</p>
              <div :style="'display:flex;justify-content:space-between;'">
                <ui-btn  :width="85" :height="44" :type="blue1" @callback="sjs(1)">取向1</ui-btn>
                <div :style="'width:50px;height:44px;'">
                  <img src="static/UI/jt.png" alt="" :style="'width:50px;height:auto;'">
                </div>
                <ui-btn :width="85" :height="44" :type="blue2" @callback="sjs(2)">取向2</ui-btn>
              </div>
          </div>
          <ui-btn type="switch" v-model="switch_checked">
            坐标参数
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
        title: '金刚石晶胞原子坐标参数',
        BtnSpaceStyle: 'flex',
        radio1:false,
        radio2:false,
        radio3:false,
        radio4:false,
        radio:0,
        add1:0,
        add2:0,
        add3:0,
        add4:0,
        blue1:'',
        blue2:'',
        switch_checked:false
      }
    },
    created(){
      document.title = this.title;
    },
    watch:{
        switch_checked(){
            if(this.switch_checked){
                if(this.blue2==''){
                    this.sjs(1);
                    this.blue1='blue';
                }
                if(this.radio==4){
                    this.radio4=false;
                    this.add4=0;
                    this.TOOUT.resetC(true);
                    this.TOOUT.changeCamera(false);
                    this.radio=0;
                }
            }else{
                this.blue1='';
                this.blue2='';
            }
            this.TOOUT.showZXY();
            this.TOOUT.showArrow();
        }
    },
    methods: {
      //计算侧边
      setSideStyle(){
        const el = document.getElementById('btn_space');
        if (el && el.scrollHeight > el.offsetHeight) {
          this.BtnSpaceStyle = 'block';
        } else {
          this.BtnSpaceStyle = 'flex';
        }
        var cW=$('canvas').width();
        var cH=$('canvas').height();
        var leftC=($('#renderCanvas').width()-cW)/2;
        $('canvas').css({'left':leftC+'px','top':($('#renderCanvas').height()-cH)/2+'px'});
        $('.loading').css('line-height',window.innerHeight+'px');
      },
      radioC(num){
        if(this.radio==num){
            this['radio'+num]=true;
            return;
        }
        if(num==4){
            this.TOOUT.changeCamera(true);
            this.switch_checked=false;
        }else{
            if(this.radio==4){
                this.TOOUT.changeCamera(false);
            }
        }
        this.TOOUT.resetC();
        this.add1=0,
        this.add2=0,
        this.add3=0,
        this.add4=0,
        this.radio1=false;
        this.radio2=false;
        this.radio3=false;
        this.radio4=false;
        this['radio'+num]=true;
        this.radio=num;
        this.TOOUT.changeColor(num,'#d3ff41');
      },
      addC(num){
        if(this.radio==num){
            this['add'+num]+=1;
            if(num==1){
                this.TOOUT.addD(this.add1);
            }else if(num==2){
                this.TOOUT.addM(this.add2);
            }else if(num==3){
                this.TOOUT.addN(this.add3);
            }else if(num==4){
                this.TOOUT.addB(this.add4);
            }
        }
      },
      sjs(num){
        if(num==1&&this.blue1!=''||num==2&&this.blue2!=''){
            return;
        }
        this.blue1='';
        this.blue2='';
        this['blue'+num]='blue';
        if(num==1){
            this.TOOUT.anC(true);
            this.TOOUT.rotateArrow(true);
        }else{
            this.TOOUT.anC(false);
            this.TOOUT.rotateArrow(false);
        }
        this.TOOUT.showZXY();
      },
      //初始化
      init(){
          var thiz=this;
          this.setSideStyle();
          var renderCanvas=document.getElementById('renderCanvas');
          var widthC=window.innerWidth-280,heightC=window.innerHeight;
          var  controls, renderer, scene, camera;
          renderer = new THREE.WebGLRenderer({antialias: true});
          renderer.setPixelRatio( window.devicePixelRatio );
          renderer.setClearColor(0xffffff);
          renderer.setSize(widthC, heightC);
          renderCanvas.appendChild(renderer.domElement);
          renderer.setFaceCulling(THREE.CullFaceBack,THREE.FrontFaceDirectionCW);

          scene = new THREE.Scene();
          camera = new THREE.OrthographicCamera(widthC/-1,widthC/1,heightC/1,heightC/-1,1,20000);
          camera.position.set(2000,2000,10000);
          camera.lookAt(scene.position);
          scene.add(camera);

          controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;
          controls.enableRotate = true;
          controls.enablePan = false;
          // Light
          var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.65);
          dirLight1.position.set(150, 250, 150);
          scene.add(dirLight1);
          var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.65);
          dirLight2.position.set(-150, -250, -150);
          scene.add(dirLight2);
          var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.56);
          hemiLight.color.setHSL( 0.6, 1, 0.6 );
          hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
          hemiLight.position.set( 0, 0, 0 );
          scene.add(hemiLight);

          var render=()=>{
              if(camera.zoom<=0.5){
                  camera.zoom=0.5000001;
              }else if(camera.zoom>=2&&this.radio!=4){
                  camera.zoom=1.99999999;
              }else if(camera.zoom>=1.05&&this.radio==4){
                  camera.zoom=1.049999999;
              }
              camera.updateProjectionMatrix();
              controls.update();
              requestAnimationFrame(render);
              renderer.render(scene, camera);
          }
          requestAnimationFrame(render);

          // 模型导入
          var model=null;
          var modelG=[];
          function modelPut(obj,mtl,O,scale,callback) {
              var onProgress = function ( xhr ) {
                  if ( xhr.lengthComputable ) {
                      var percentComplete = xhr.loaded / xhr.total * 100;
                      console.log( Math.round(percentComplete, 2) + '% downloaded' );
                  }
              };
              var onError = function ( xhr ) { };
              var mtlLoader = new THREE.MTLLoader();
              mtlLoader.setPath( 'static/obj/' );
              mtlLoader.load( mtl, function( materials ) {
                  materials.preload();
                  var objLoader = new THREE.OBJLoader();
                  objLoader.setMaterials( materials );
                  objLoader.setPath( 'static/obj/' );
                  objLoader.load( obj, function ( object ) {
                      object.traverse(function(child){
                          if(child instanceof THREE.Mesh){
                              child.material.shading=THREE.SmoothShading;
                          }
                      });
                      object.scale.x=scale;
                      object.scale.y=scale;
                      object.scale.z=scale;
                      O=object;
                      callback && callback(O);
                  }, onProgress, onError );
              });
          }
          modelPut('1.obj','1.mtl',model,10,function (O) {
              for(var i in O.children){
                  if(i!='contains'){
                      if(O.children[i].name.indexOf('pCylinder')==-1){
                          O.children[i].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                      }else{
                          O.children[i].material=new THREE.MeshPhongMaterial({color:'#eeeeee'});
                      }
                  }
              }
              model=O;
              model.rotation.y=Math.PI/4;
              modelG[1]=model.clone();
              modelG[2]=model.clone();
              modelG[3]=model.clone();
              modelG[4]=model.clone();
              modelG[5]=model.clone();
              modelG[6]=model.clone();
              modelG[7]=model.clone();
              modelG[1].visible=false;
              modelG[2].visible=false;
              modelG[3].visible=false;
              modelG[4].visible=false;
              modelG[5].visible=false;
              modelG[6].visible=false;
              modelG[7].visible=false;
              scene.add(model,modelG[1],modelG[2],modelG[3],modelG[4],modelG[5],modelG[6],modelG[7]);
              $('.loading').hide();
          });
          var TEXTG=new THREE.Group();
          var TEXTG1=new THREE.Group();
          var TEXTG2=new THREE.Group();
          var fontS=15*2;
          var textO=[];
          textO[1]=createText('(0,0,0)',-115*2,-130*2,115*2,'#000',fontS);
          textO[2]=createText('(0,0,0)',115*2,-130*2,115*2,'#000',fontS);
          textO[3]=createText('(0,0,0)',115*2,-130*2,-115*2,'#000',fontS);
          textO[4]=createText('(0,0,0)',-115*2,-130*2,-115*2,'#000',fontS);
          textO[5]=createText('(0,0,0)',-115*2,158*2,115*2,'#000',fontS);
          textO[6]=createText('(0,0,0)',115*2,158*2,115*2,'#000',fontS);
          textO[7]=createText('(0,0,0)',115*2,158*2,-115*2,'#000',fontS);
          textO[8]=createText('(0,0,0)',-115*2,158*2,-115*2,'#000',fontS);

          var textM=[];
          textM[1]=createText('(1/2,1/2,0)',0,-130*2,0,'#000',fontS);
          textM[2]=createText('(1/2,1/2,0)',0,158*2,0,'#000',fontS);
          TEXTG.add(textO[1],textO[2],textO[3],textO[4],textO[5],textO[6],textO[7],textO[8],textM[1],textM[2]);
          for(var i in TEXTG.children){
              TEXTG.children[i].visible=false;
          }

          var text1M=[];
          text1M[3]=createText('(0,1/2,1/2)',-115*2,-15*2,0,'#000',fontS);
          text1M[4]=createText('(0,1/2,1/2)',115*2,-15*2,0,'#000',fontS);
          text1M[5]=createText('(1/2,0,1/2)',0,-15*2,115*2,'#000',fontS);
          text1M[6]=createText('(1/2,0,1/2)',0,-15*2,-115*2,'#000',fontS);

          var text1N=[];
          text1N[1]=createText('(1/4,1/4,1/4)',-67*2,-82*2,67*2,'#000',fontS);
          text1N[2]=createText('(3/4,3/4,1/4)',67*2,-82*2,-67*2,'#000',fontS);
          text1N[3]=createText('(1/4,3/4,3/4)',-67*2,97*2,-67*2,'#000',fontS);
          text1N[4]=createText('(3/4,1/4,3/4)',67*2,97*2,67*2,'#000',fontS);
          TEXTG1.add(text1M[3],text1M[4],text1M[5],text1M[6],text1N[1],text1N[2],text1N[3],text1N[4]);

          var text2M=[];
          text2M[3]=createText('(1/2,0,1/2)',-115*2,-15*2,0,'#000',fontS);
          text2M[4]=createText('(1/2,0,1/2)',115*2,-15*2,0,'#000',fontS);
          text2M[5]=createText('(0,1/2,1/2)',0,-15*2,115*2,'#000',fontS);
          text2M[6]=createText('(0,1/2,1/2)',0,-15*2,-115*2,'#000',fontS);

          var text2N=[];
          text2N[1]=createText('(1/4,3/4,1/4)',-67*2,-82*2,67*2,'#000',fontS);
          text2N[2]=createText('(3/4,1/4,1/4)',67*2,-82*2,-67*2,'#000',fontS);
          text2N[3]=createText('(3/4,3/4,3/4)',-67*2,97*2,-67*2,'#000',fontS);
          text2N[4]=createText('(1/4,1/4,3/4)',67*2,97*2,67*2,'#000',fontS);
          TEXTG2.add(text2M[3],text2M[4],text2M[5],text2M[6],text2N[1],text2N[2],text2N[3],text2N[4]);

          TEXTG1.visible=false;
          TEXTG2.visible=false;

          var TEXTZ=new THREE.Group();
          TEXTZ.add(TEXTG,TEXTG1,TEXTG2)
          scene.add(TEXTZ);

          var textHide=()=>{
              for(var i in TEXTG.children){
                  TEXTG.children[i].visible=false;
              }
              for(var i in TEXTG1.children){
                  TEXTG1.children[i].visible=false;
              }
              for(var i in TEXTG2.children){
                  TEXTG2.children[i].visible=false;
              }
          };
          textHide();

          var showZXY=()=>{
                if(!this.switch_checked){
                    textHide();
                }else{
                    if(this.radio1){
                        for(var i in textO){
                            if(this.add1>=i){
                                textO[i].visible=true;
                            }else{
                                textO[i].visible=false;
                            }
                        }
                    }else if(this.radio2){
                        for(var i in textM){
                            if(this.add2>=i){
                                textM[i].visible=true;
                            }else{
                                textM[i].visible=false;
                            }
                        }
                        if(this.blue1!=''){
                            TEXTG1.visible=true;
                            TEXTG2.visible=false;
                            for(var i in text1M){
                                if(this.add2>=i){
                                    text1M[i].visible=true;
                                }else{
                                    text1M[i].visible=false;
                                }
                            }
                        }else if(this.blue2!=''){
                            TEXTG1.visible=false;
                            TEXTG2.visible=true;
                            for(var i in text2M){
                                if(this.add2>=i){
                                    text2M[i].visible=true;
                                }else{
                                    text2M[i].visible=false;
                                }
                            }
                        }
                    }else if(this.radio3){
                        if(this.blue1!=''){
                            TEXTG1.visible=true;
                            TEXTG2.visible=false;
                            for(var i in text1N){
                                if(this.add3>=i){
                                    text1N[i].visible=true;
                                }else{
                                    text1N[i].visible=false;
                                }
                            }
                        }else if(this.blue2!=''){
                            TEXTG1.visible=false;
                            TEXTG2.visible=true;
                            for(var i in text2N){
                                if(this.add3>=i){
                                    text2N[i].visible=true;
                                }else{
                                    text2N[i].visible=false;
                                }
                            }
                        }
                    }
                }
          }

          var addD=(num)=>{
              var index='';
              switch (num){
                  case 6:index='one';
                      break;
                  case 7:index='eight';
                      break;
                  case 8:index='six';
                      break;
                  case 5:index='seven';
                      break;
                  case 2:index='three';
                      break;
                  case 3:index='five';
                      break;
                  case 4:index='four';
                      break;
                  case 1:index='two';
                      changeColor(1,'#5CAEFD');
                      break;
              }
              for(var i in model.children){
                  if(i!='contains'){
                      if(model.children[i].name.indexOf('jiao'+index)!=-1){
                          model.children[i].material.color.set('#d3ff41');
                      }
                  }
              }
              if(this.switch_checked){
                  showZXY();
              }
          };
          var addM=(num)=>{
              var index='';
              switch (num){
                  case 1:index='three';
                      changeColor(2,'#5CAEFD');
                      break;
                  case 2:index='one';
                      break;
                  case 3:index='six';
                      break;
                  case 4:index='two';
                      break;
                  case 5:index='five';
                      break;
                  case 6:index='four';
                      break;
              }
              for(var i in model.children){
                  if(i!='contains'){
                      if(model.children[i].name.indexOf('angle'+index)!=-1){
                          model.children[i].material.color.set('#d3ff41');
                      }
                  }
              }
              if(this.switch_checked){
                  showZXY();
              }
          };
          var addN=(num)=>{
              switch (num){
                  case 1:num='5';
                      changeColor(3,'#5CAEFD');
                      break;
                  case 2:num='3';
                      break;
                  case 3:num='4';
                      break;
                  case 4:num='';
              }
              for(var i in model.children){
                  if(i!='contains'){
                      if(model.children[i].name.indexOf('sphere'+num)!=-1){
                          model.children[i].material.color.set('#d3ff41');
                      }
                  }
              }
              if(this.switch_checked){
                  showZXY();
              }
          };
          var changeColor=(num,color)=>{
              var string=''
              if(num==1){
                  string='jiao'
              }else if(num==2){
                  string='angle'
              }else if(num==3){
                  string='sphere'
              }else{
                  return;
              }
              for(var i in model.children){
                  if(i!='contains'){
                      if(model.children[i].name.indexOf(string)!=-1){
                          model.children[i].material.color.set(color);
                      }
                  }
              }
          };
          var an=(O,xend)=>{
              var x=O.position.x;
              var step=(xend-x)/40;
              var i=0;
              var SET=setInterval(function(){
                  if(i>=40){
                      clearInterval(SET);
                      return;
                  }
                  O.position.x+=step;
                  i++;
              },40)
          };
          var SETC=null;
          var anC=(f)=>{
              clearInterval(SETC);
              var x=camera.position.x;
              var y=camera.position.y;
              var z=camera.position.z;
              if(f){
                  var stepx=(0-x)/40;
                  var stepy=(0-y)/40;
                  var stepz=(2000-z)/40;
              }else{
                  var stepx=(2000-x)/40;
                  var stepy=(0-y)/40;
                  var stepz=(0-z)/40;
              }
              var i=0;
              SETC=setInterval(function(){
                  if(i>=40){
                      clearInterval(SETC);
                      return;
                  }
                  camera.position.x+=stepx;
                  camera.position.y+=stepy;
                  camera.position.z+=stepz;
                  i++;
              },40)
          };
          var addB=(num)=>{
              if(num>7){
                  return;
              }
              modelG[num].visible=true;
              switch (num){
                  case 1:
                      model.position.x=-115*2;
                      modelG[num].position.set(600*2,0,0);
                      an(modelG[num],115*2);
                      LINEG.position.x=-115*2;
                      TEXTZ.position.x=-115*2;
                      break;
                  case 2:
                      model.position.y=-115*2;
                      modelG[1].position.y=-115*2;
                      modelG[num].position.set(-600*2,115*2,0);
                      an(modelG[num],-115*2);
                      LINEG.position.y=-115*2;
                      TEXTZ.position.y=-115*2;
                      break;
                  case 3:
                      modelG[num].position.set(600*2,115*2,0);
                      an(modelG[num],115*2);
                      break;
                  case 4:
                      model.position.z=-115*2;
                      modelG[1].position.z=-115*2;
                      modelG[2].position.z=-115*2;
                      modelG[3].position.z=-115*2;
                      modelG[num].position.set(-600*2,-115*2,115*2);
                      an(modelG[num],-115*2);
                      LINEG.position.z=-115*2;
                      TEXTZ.position.z=-115*2;
                      break;
                  case 5:
                      modelG[num].position.set(600*2,-115*2,115*2);
                      an(modelG[num],115*2);
                      break;
                  case 6:
                      modelG[num].position.set(-600*2,115*2,115*2);
                      an(modelG[num],-115*2);
                      break;
                  case 7:
                      modelG[num].position.set(600*2,115*2,115*2);
                      an(modelG[num],115*2);
                      break;
              }
          };
          var changeCamera=(f)=>{
              if(f){
                  camera.zoom=0.65;
              }else{
                  camera.zoom=1;
              }
              camera.updateProjectionMatrix();
          };
          var resetC=(f)=>{
              model.position.set(0,0,0);
              LINEG.position.set(0,0,-2);
              TEXTZ.position.set(0,0,0);
              textHide();
              if(!f){
                  for(var i in model.children){
                      if(i!='contains'){
                          if(model.children[i].name.indexOf('pCylinder')==-1){
                              model.children[i].material=new THREE.MeshPhongMaterial({color:'#5CAEFD'});
                          }
                      }
                  }
              }
              for(var i=1;i<=7;i++){
                  modelG[i].visible=false;
              }
          }
          var reset = ()=>{
              this.add1=0,
              this.add2=0,
              this.add3=0,
              this.add4=0,
              this.radio=0;
              this.radio1=false;
              this.radio2=false;
              this.radio3=false;
              this.radio4=false;
              this.blue1='';
              this.blue2='';
              this.switch_checked=false;
              clearInterval(SETC);
              camera.position.set(2000,2000,10000);
              camera.zoom=1;
              camera.updateProjectionMatrix();
              resetC();
          };

          //绘制坐标轴
          function drawC(top,bottom,h) {
              var geometry = new THREE.CylinderGeometry(top,bottom,h,16);
              var material = new THREE.MeshBasicMaterial({color:0xff0000,depthTest:false});
              var cylinder = new THREE.Mesh(geometry,material);
              return cylinder;
          }
          function createText(texts,x,y,z,color,size){
              var SpriteText2D = THREE_Text.SpriteText2D;
              var textAlign = THREE_Text.textAlign;
              var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
              var text = new SpriteText2D(texts, textStyle);
              text.position.set(x,y,z);
              return text;
          }
          //x轴
          var linex=new THREE.Group();
          var c1=drawC(2,2,320*2);
          var c2=drawC(0,3*2,10*2);
          c2.position.y=160*2;
          var textx=createText('x',0,190*2,0,'#f00',18*2);
          linex.add(c1,c2,textx);
          linex.rotation.z=-Math.PI/2;
          linex.position.set(0,-115*2,115*2);
          //y轴
          var liney=new THREE.Group();
          var c3=c1.clone();
          var c4=c2.clone();
          var texty=createText('y',0,190*2,0,'#f00',18*2);
          liney.add(c3,c4,texty);
          liney.rotation.x=-Math.PI/2;
          liney.position.set(-115*2,-115*2,0);
          //z轴
          var linez=new THREE.Group();
          var c5=c1.clone();
          var c6=c2.clone();
          var textz=createText('z',0,190*2,0,'#f00',18*2);
          linez.add(c5,c6,textz);
          linez.position.set(-115*2,0,115*2);

          var LINEG=new THREE.Group();
          LINEG.add(linex,liney,linez);
          LINEG.visible=false;
          LINEG.position.set(0,0,-2);
          scene.add(LINEG);

          var showArrow=()=> {
              LINEG.visible=this.switch_checked;
          }
          var rotateArrow=(f)=>{
            if(f){
                LINEG.rotation.y=0;
            }else{
                LINEG.rotation.y=Math.PI/2;
            }
          }
          var touchF=false;
          var step1=()=>{
              touchF=true;
          }
          var step2=()=>{
            if(touchF){
                clearInterval(SETC);
            }
          }
          var step3=()=> {
              touchF=false;
          }
          var canvas=$('#renderCanvas canvas')[0];
          canvas.addEventListener('mousedown',step1);
          canvas.addEventListener('mousemove',step2);
          window.addEventListener('mouseup',step3);
          canvas.addEventListener('touchstart',step1);
          canvas.addEventListener('touchmove',step2);
          window.addEventListener('touchend',step3);

          var TOOUT=function() {
              return{
                reset:reset,
                resetC:resetC,
                addD:addD,
                addM:addM,
                addN:addN,
                addB:addB,
                changeCamera:changeCamera,
                anC:anC,
                showArrow:showArrow,
                rotateArrow:rotateArrow,
                showZXY:showZXY,
                changeColor:changeColor
              }
          }
          return TOOUT();
      },
      //重置
      resetWidget(){
          this.TOOUT.reset();
      }
    },
    mounted(){
        this.TOOUT=this.init();
        window.onresize=()=>{
            this.setSideStyle();
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
    position: absolute;
    z-index: 999;
  }

  .app_aside {
    float: left;
    width: 280px;
    background-color: #F7F7F7;
    height: 100%;
    box-shadow: -0.5px 0 0 rgba(0, 0, 0, 0.12);
  }

  #renderCanvas {
    width: calc(100% - 280px);
    height: 100%;
    outline: none;
    position: absolute;
    top:0;
    left:0;
    overflow: hidden;
  }

  canvas {
    position: absolute;
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
  .add{
    width:109px;
    height:44px;
    float:right;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 3px 0 rgba(0,0,0,0.08);
    border-radius: 6px;
    cursor: pointer;
    text-align: center;
    line-height: 44px;
  }
  .add span{
    display: inline-block;
    width: 6px;
    height: 12px;
    background: #D5D5D5;
    border-radius: 2px;
  }
  .marginR{
    margin-right: 5px;
  }
  .add span.bBlue{
    background: #5CAEFD;
  }
</style>
