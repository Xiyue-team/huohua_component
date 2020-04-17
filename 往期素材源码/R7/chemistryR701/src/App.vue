<template>
    <div id="app" class="noselect">
        <div class="container">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div class="ViewSpace" id="threeContainer" >
               <!-- <div :style="[zoom]" class="viewBox"> -->
                  <div class="ViewImg" id="img"></div>
                  <div v-if="loadF" id="loading">loading...</div>
              <!-- </div> -->
            </div>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside" :style="{pointerEvents:pe}">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space" :style="{display:BtnSpaceStyle}">
                <ui-btn :type="blue1" size="big" @click.native="btnClick(1)">四面体空隙</ui-btn>
                <ui-btn :type='blue2' size="big" @click.native="btnClick(2)" style="margin-bottom: 50px;">八面体空隙</ui-btn>
                <ui-btn type="switch" v-model="checked1" @click.native='radioClick(1)'>
                    晶胞
                </ui-btn>
                <ui-btn type="switch" v-model="checked2">
                    球棍模型
                </ui-btn>
                <ui-btn type="switch" v-model="checked3" :class="{math:blue==0}">
                    数学模型
                </ui-btn>
            </div>
        </div>
    </div>
</template>

<script>
  import uiBtn from '@/components/UI/uiBtn';//按钮
  export default {
    name: 'app',
    components: {uiBtn},
    data(){
      return {
        title: '六方堆积中的四面体空隙和八面体空隙',
        BtnSpaceStyle: 'flex',
        zoom: {},//区域大小
        checked1:false,
        checked2:false,
        checked3:false,
        mainWidth:'',
        TOOUT:null,
        mainHeight:'',
        blue1:'',
        blue2:'',
        blue:0,
        src:'',
        loadF:true,
        pe:'none'
      }
    },
    created(){
      document.title = this.title;
    },
    mounted(){
      this.TOOUT=this.inits();
      window.onresize=()=>{
        this.setSideStyle();
        this.getViewSize();
      }
    },
    computed: {},
    watch: {
        blue1(){
            this.TOOUT.show1(this.blue1);
            this.TOOUT.show5(this.checked3);
        },
        blue2(){
            this.TOOUT.show2(this.blue2);
            this.TOOUT.show5(this.checked3);
        },
        checked1(){
            this.TOOUT.show3(this.checked1);
        },
        checked2(){
            this.TOOUT.show4(this.checked2);
        },
        checked3(){
            this.TOOUT.show1(this.blue1);
            this.TOOUT.show2(this.blue2);
            this.TOOUT.show5(this.checked3);
        },
    },
    methods: {
      btnClick(val){
           if(this.blue==val){
               return;
           }
          this.blue=0;
          this.checked1=false;
          if(val==1){
              this.blue1='blue';
              this.blue2='';
              this.blue=1;;
          }else if(val==2){
              this.blue1='';
              this.blue2='blue';
              this.blue=2;
          }
      },
      radioClick(val){
        if(val == 1){
            if(this.checked1){
                this.blue1='';
                this.blue2='';
            }
        }
      },
      inits(){
        var opN=0.3;
        var colorD='#fefefe';
        var colorL='#57e1e5';
        this.setSideStyle();
        this.getViewSize();
        var container , camera , renderer , scene , controls;
        //相机
        container = $('#threeContainer')[0];
        camera = new THREE.OrthographicCamera(this.mainWidth/-2,this.mainWidth/2,this.mainHeight/2,this.mainHeight/-2,1,2000);
        camera.position.set(160,131,460);
        camera.zoom=1.5;
        camera.updateProjectionMatrix();
        //场景
        scene = new THREE.Scene();
        //灯光
        var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight1.position.set(200, 200, 100);
        var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.5);
        dirLight2.position.set(-200, -200, -100);
        scene.add(dirLight1, dirLight2);
        var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.65);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 0, 0);
        scene.add(hemiLight);
        //渲染器
        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( this.mainWidth,this.mainHeight );
        renderer.setClearColor(0xffffff,0);
        container.appendChild( renderer.domElement );

        //控制器
        controls = new THREE.OrbitControls(camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;

        function vec3(x,y,z){
          return new THREE.Vector3(x, y, z);
        }
        // 模型导入
        var model=null;
        var modelC = null;
        //创建模型
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
              for(var i in O.children){
                console.log(O.children[i].name);
                //晶胞隐藏
                if(O.children[i].name.indexOf('jinbao')!=-1 || O.children[i].name.indexOf('diuqi')!=-1){
                  O.children[i].visible = false;
                }
                //八面体晶体透明
                if(O.children[i].name.indexOf('Octahedron')!=-1){
                    O.children[i].material=new THREE.MeshPhongMaterial({color:'#c9fffe',transparent:true,opacity:0.8});
                }
                //四面体晶体透明
                if(O.children[i].name.indexOf('tetrahedron')!=-1){
                    O.children[i].material=new THREE.MeshPhongMaterial({color:'#c9fffe',transparent:true,opacity:0.8});
                }
                 //球棍模型隐藏
                if(O.children[i].name.indexOf('qiugun')!=-1){
                    O.children[i].visible = false;
                }
                //模型颜色除晶体
                if(O.children[i].name.indexOf('pSphere')!=-1){
                    O.children[i].material=new THREE.MeshPhongMaterial({color:colorD});
                }
                if(O.children[i].name.indexOf('pCylinder')!=-1){
                    O.children[i].material=new THREE.MeshPhongMaterial({color:colorD});
                }
              }
              model=O;
              //克隆模型
              modelC = model.clone();
              modelC.position.y=0;
              modelC.visible=false;
              callback && callback(O);
            }, onProgress, onError );
          });
        }
        modelPut('liufangtiduiji.obj','liufangtiduiji.mtl',model,12,()=>{
          scene.add(model,modelC);
          this.loadF=false;
          this.pe='auto';
        });
        //模型颜色
        var setColor = () =>{
            for (var i in model.children){
                if(model.children[i].name.indexOf('pSphere')!=-1){
                    model.children[i].material=new THREE.MeshPhongMaterial({color:colorD,transparent:true,opacity:1});
                }
                if(model.children[i].name.indexOf('pCylinder')!=-1){
                    model.children[i].material=new THREE.MeshPhongMaterial({color:colorD,transparent:true,opacity:1});
                }
            }
            for (var i in modelC.children){
                if(modelC.children[i].name.indexOf('pSphere')!=-1){
                    modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorD,transparent:true,opacity:1});

                }
                if(modelC.children[i].name.indexOf('pCylinder')!=-1){
                    modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorD,transparent:true,opacity:1});
                }
            }
        }
        //模型晶体显示隐藏
        var setVisible = () =>{
            for(var i in model.children){
                if(model.children[i].name.indexOf('Octahedron') != -1) {
                    model.children[i].visible = false; 
                }
                if(model.children[i].name.indexOf('tetrahedron') != -1) {
                    model.children[i].visible = false; 
                }
            }
            for(var i in modelC.children){
                if(modelC.children[i].name.indexOf('Octahedron') != -1) {
                    modelC.children[i].visible = false; 
                }
                if(modelC.children[i].name.indexOf('tetrahedron') != -1) {
                    modelC.children[i].visible = false; 
                }
            }
        }
        //显示四面体
        var show1=(f)=>{
            if(f) {
                $('#img').hide();
                setColor();
                setVisible();
                //model
                for (var i in model.children) {
                    //bili-比例模型中四面体高亮显示-八面体低亮显示
                    if(model.children[i].name.indexOf('bili') != -1) {
                        //四面体高亮显示
                        if(model.children[i].name.indexOf('_four1') != -1) {
                            model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                    }
                    //qiugun-球棍模型中四面体高亮显示-八面体低亮显示-晶体显示隐藏
                    if(model.children[i].name.indexOf('qiugun') != -1) {
                        //四面体高亮显示
                        if(model.children[i].name.indexOf('_four1') != -1) {
                             model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                        //四面体晶体显示
                        if(model.children[i].name.indexOf('tetrahedron') != -1) {
                            model.children[i].visible = true; 
                        }
                    }
                }
                //modelC
                for (var i in modelC.children) {
                    //bili-比例模型中四面体高亮显示-八面体低亮显示
                    if(modelC.children[i].name.indexOf('bili') != -1) {
                        modelC.children[i].visible=true;
                        //四面体高亮显示
                        if(modelC.children[i].name.indexOf('_four1') != -1) {
                            modelC.children[i].visible=true;
                            modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                    }
                    //qiugun-球棍模型中四面体高亮显示-八面体低亮显示-晶体显示隐藏
                    if(modelC.children[i].name.indexOf('qiugun') != -1) {
                        modelC.children[i].visible=false;
                        //四面体高亮显示
                        if(modelC.children[i].name.indexOf('_four1') != -1) {
                             modelC.children[i].visible=true;
                             modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                        //四面体晶体显示
                        if(modelC.children[i].name.indexOf('tetrahedron') != -1) {
                            modelC.children[i].visible = true; 
                        }
                    }
                }
            }
        }
        //显示八面体
          var show2=(f)=>{
              if(f) {
                $('#img').hide();
                setColor();
                setVisible();
                //model
                for (var i in model.children) {
                    //bili-比例模型中八面体高亮显示
                    if(model.children[i].name.indexOf('bili') != -1) {
                        //四面体高亮显示
                        if(model.children[i].name.indexOf('_eight') != -1) {
                            model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                    }
                    //qiugun-球棍模型中八面体高亮显示-晶体显示隐藏
                    if(model.children[i].name.indexOf('qiugun') != -1) {
                        //八面体高亮显示
                        if(model.children[i].name.indexOf('_eight') != -1) {
                             model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                        //八面体晶体显示
                        if(model.children[i].name.indexOf('Octahedron') != -1) {
                            model.children[i].visible = true; 
                        }
                    }
                }
                //modelC
                for (var i in modelC.children) {
                    //bili-比例模型中八面体高亮显示
                    if(modelC.children[i].name.indexOf('bili') != -1) {
                        modelC.children[i].visible=false;
                        //四面体高亮显示
                        if(modelC.children[i].name.indexOf('_eight') != -1) {
                            modelC.children[i].visible=true;
                            modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                    }
                    //qiugun-球棍模型中八面体高亮显示-晶体显示隐藏
                    if(modelC.children[i].name.indexOf('qiugun') != -1) {
                        modelC.children[i].visible=false;
                        //四面体高亮显示
                        if(modelC.children[i].name.indexOf('_eight') != -1) {
                            modelC.children[i].visible=true;
                             modelC.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                        //八面体晶体显示
                        if(modelC.children[i].name.indexOf('Octahedron') != -1) {
                            modelC.children[i].visible = true; 
                        }
                    }
                }
            }
          }

        //显示晶胞
        var show3=(f)=>{
            if(f) {
                cancelAnimationFrame(SET);
                modelC.visible=false;
                this.blue=0;
                $('#img').hide();
                this.checked3=false;
                setColor();
                setVisible();
                //model
                for(var i in model.children) {
                    //晶胞高亮显示
                    if(model.children[i].name.indexOf('diuqi') != -1 && this.checked2){
                        model.children[i].visible=true;
                    }else if(model.children[i].name.indexOf('diuqi') != -1 && !this.checked2){
                        model.children[i].visible=false;
                    }
                    if(model.children[i].name.indexOf('qiugun') != -1 && model.children[i].name.indexOf('dron') == -1 || model.children[i].name.indexOf('bili') != -1){
                        model.children[i].material.transparent=true;
                        model.children[i].material.opacity=opN;
                        if(model.children[i].name.indexOf('other') == -1){
                            model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                        }
                    }
                }
            }else{     
                setColor();
                setVisible();
                //model
               for(var i in model.children) {
                   if(model.children[i].name.indexOf('diuqi') != -1){
                       model.children[i].visible=false;
                   }
                    //晶胞高亮显示
                    if(model.children[i].name.indexOf('qiugun') != -1 && model.children[i].name.indexOf('dron') == -1 || model.children[i].name.indexOf('bili') != -1){
                        model.children[i].material.transparent=true;
                        model.children[i].material.opacity=1;
                        if(model.children[i].name.indexOf('other') == -1){
                            model.children[i].material=new THREE.MeshPhongMaterial({color:colorD});
                        }
                    }
                }
                if(this.blue1){
                    //model
                    for (var i in model.children) {
                        //bili-比例模型中四面体高亮显示-八面体低亮显示
                        if(model.children[i].name.indexOf('bili') != -1) {
                            //四面体高亮显示
                            if(model.children[i].name.indexOf('_four1') != -1) {
                                model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                            }
                        }
                        //qiugun-球棍模型中四面体高亮显示-八面体低亮显示-晶体显示隐藏
                        if(model.children[i].name.indexOf('qiugun') != -1) {
                            //四面体高亮显示
                            if(model.children[i].name.indexOf('_four1') != -1) {
                                model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                            }
                        //四面体晶体显示
                            if(model.children[i].name.indexOf('tetrahedron') != -1) {
                                model.children[i].visible = true;
                            }
                        }
                    }
                }
                if(this.blue2){
                    //model
                    for (var i in model.children) {
                        //bili-比例模型中八面体高亮显示
                        if(model.children[i].name.indexOf('bili') != -1) {
                            //四面体高亮显示
                            if(model.children[i].name.indexOf('_eight') != -1) {
                                model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                            }
                        }
                        //qiugun-球棍模型中八面体高亮显示-晶体显示隐藏
                        if(model.children[i].name.indexOf('qiugun') != -1) {
                            //四面体高亮显示
                            if(model.children[i].name.indexOf('_eight') != -1) {
                                model.children[i].material=new THREE.MeshPhongMaterial({color:colorL});
                            }
                            //八面体晶体显示
                            if(model.children[i].name.indexOf('Octahedron') != -1) {
                                model.children[i].visible = true;
                            }
                        }
                    }
                }
            }
         }
        //显示球棍模型
          var show4=(f)=>{
            if(f) {
                //model
                for (var i in model.children) {
                    if (model.children[i].name.indexOf('group') != -1&&model.children[i].name.indexOf('diuqi')==-1 || model.children[i].name.indexOf('diuqi')!=-1&&this.checked1) {
                        model.children[i].visible = true;
                    }

                    if (model.children[i].name.indexOf('bili') != -1) {
                        model.children[i].visible = false;
                    }
                }
                
                if(this.blue1){
                //modelC
                    for (var i in modelC.children) {
                        if (modelC.children[i].name.indexOf('group') != -1&&model.children[i].name.indexOf('diuqi')==-1 || modelC.children[i].name.indexOf('diuqi')!=-1&&this.checked1) {
                            modelC.children[i].visible = false;
                        if (model.children[i].name.indexOf('_four1') != -1) {
                             modelC.children[i].visible = true;
                        }
                        }
                        if (modelC.children[i].name.indexOf('bili') != -1) {
                            modelC.children[i].visible = false;
                        }
                    }
                }
                if(this.blue2){
                //modelC
                    for (var i in modelC.children) {
                        if (modelC.children[i].name.indexOf('group') != -1&&model.children[i].name.indexOf('diuqi')==-1 || modelC.children[i].name.indexOf('diuqi')!=-1&&this.checked1) {
                            modelC.children[i].visible = false;
                        if (model.children[i].name.indexOf('_eight') != -1) {
                             modelC.children[i].visible = true;
                        }
                        }
                        if (modelC.children[i].name.indexOf('bili') != -1) {
                            modelC.children[i].visible = false;
                        }
                    }
                }

               
            }
            else{
                //model
                for (var i in model.children) {
                    if (model.children[i].name.indexOf('group') != -1) {
                        model.children[i].visible = false;
                    }
                    if (model.children[i].name.indexOf('bili') != -1) {
                        model.children[i].visible = true;
                    }
                }
                if(this.blue1){
                //modelC
                    for (var i in modelC.children) {
                        if (modelC.children[i].name.indexOf('bili') != -1) {
                            modelC.children[i].visible = false;
                            if (model.children[i].name.indexOf('_four1') != -1) {
                                modelC.children[i].visible = true;
                            }
                        }
                        if (modelC.children[i].name.indexOf('group') != -1&&model.children[i].name.indexOf('diuqi')==-1 || modelC.children[i].name.indexOf('diuqi')!=-1&&this.checked1) {
                            modelC.children[i].visible = false;
                        
                        }                        
                    }
                }
                if(this.blue2){
                //modelC
                    for (var i in modelC.children) {
                        if (modelC.children[i].name.indexOf('bili') != -1) {
                            modelC.children[i].visible = false;
                            if (model.children[i].name.indexOf('_eight') != -1) {
                                modelC.children[i].visible = true;
                            }
                        }
                        if (modelC.children[i].name.indexOf('group') != -1&&model.children[i].name.indexOf('diuqi')==-1 || modelC.children[i].name.indexOf('diuqi')!=-1&&this.checked1) {
                            modelC.children[i].visible = false;
                        
                        }
                        
                    }
                }
            }
          }
        var SET=null;
        var  cartoon = (s1,s2,s3,s4,src) =>{
            cancelAnimationFrame(SET);
            modelC.position.y=0;
            camera.position.set(160,131,460);
            camera.zoom=1.5;
            camera.updateProjectionMatrix();
            // show4();
            for (var i in modelC.children) {
                if(modelC.children[i].name.indexOf(s1) != -1) {
                    
                    if(modelC.children[i].name.indexOf(s2) == -1) {
                        modelC.children[i].visible=false;
                 
                    }
                   if(modelC.children[i].name.indexOf(s3) != -1) {
                        modelC.children[i].visible=true;
                    }
                }
                if(modelC.children[i].name.indexOf(s4) != -1) {
                    modelC.children[i].visible=true;
                }
            }
            var j=0;
            modelC.visible=true;
            var an=()=>{
                 modelC.visible=true;
                if(j<=-140){
                    cancelAnimationFrame(SET);
                     modelC.visible=false;
                    modelC.position.y=0;
                    var img = new Image();
                    img.src = src;
                    img.onload = function () {
                       $('#img').show().css({'background-image':'url('+img.src+')','z-index':1});
                    }
                    return;
                }
                j-=2;
                if(this.checked2){
                    for (var i in modelC.children) {
                        if(modelC.children[i].name.indexOf('bili') != -1) {
                            modelC.children[i].visible=false;
                        }
                    }
                }
                modelC.position.y=j;
               SET= requestAnimationFrame(an);
            }
            an();
        }
        //显示数学模型
          var show5=(f)=>{

            if(f){
                
                if(this.blue1) {
                    if(this.checked2){

                   
                        cartoon('qiugun','_four1',false,'tetrahedron','static/img/pic1.png');
                    }else{
                        cartoon('bili','_four1',false,'tetrahedron','static/img/pic1.png');
                    }
                }
                if(this.blue2) {
                    if(this.checked2){
                        cartoon('qiugun','_eight','4_eight','Octahedron','static/img/pic2.png');
                    }else{
                        cartoon('bili','_eight','4_eight','Octahedron','static/img/pic2.png');
                    }
                }
            }else{
                cancelAnimationFrame(SET);
                modelC.visible=false;
                $('#img').hide();
            }
        }  
            
        var reset = () =>{
            this.blue1='';
            this.blue2='';
            this.checked1=false;
            this.checked2=false;
            this.checked3=false;
            this.blue=0;
            modelC.visible=false;
            $('#img').css({'background-image':'','z-index':-1});
            for(var i in model.children){
                if(model.children[i].name.indexOf('pSphere')!=-1){
                    model.children[i].material=new THREE.MeshPhongMaterial({color:colorD});
                }
                if(model.children[i].name.indexOf('pCylinder')!=-1){
                    model.children[i].material=new THREE.MeshPhongMaterial({color:colorD});
                }
                if(model.children[i].name.indexOf('dron_')!=-1){
                    model.children[i].visible=false;
                }
            }
            camera.position.set(160,131,460);
            camera.zoom=1.5;
            camera.updateProjectionMatrix();
             
        };
        function render() {
            if(camera.zoom<=0.5){
                camera.zoom=0.5000001;
            }else if(camera.zoom>=2.5){
                camera.zoom=2.49999999;
            }
            requestAnimationFrame( render );
            controls.update();
            camera.lookAt( scene.position );
            renderer.render( scene, camera );
        }
        render();
        var TOOUT = function () {
          return{
            reset: reset,
            show1:show1,
            show2:show2,
            show3:show3,
            show4:show4,
            show5:show5,
          }
        }
        return TOOUT();
      },
      //计算侧边
      setSideStyle(){
        const el =document.getElementById('btn_space');
        if(el && el.scrollHeight>el.offsetHeight){
          this.BtnSpaceStyle = 'block'
        }else{
          this.BtnSpaceStyle = 'flex'
        }
        $('#loading').css('line-height',$('#loading').height()+'px');
      },
      //计算区块大小
      getViewSize(){
        this.mainWidth = window.innerWidth - 280;
        this.mainHeight= window.innerHeight;
        var cW = this.mainHeight/2+100;
        $('.ViewImg').css({'top':cW});
        if (this.mainWidth/this.mainHeight >= 744/505) {
          this.zoom = {
            zoom: this.mainHeight/505
          }
        } else {
          this.zoom = {
            zoom: this.mainWidth/744
          }
        }
      },

      //窗口大小更改
      resize(){
        const vm = this;
        window.addEventListener('resize', function () {
          vm.setSideStyle();
          vm.getViewSize();
        })
      },
      //重置
      resetWidget(){
        this.TOOUT.reset();
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
        position: relative;
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

    .btn_space .UI-btn {
        margin-bottom: 15px;
        line-height: 44px;
    }


    /*视图区*/
    .ViewSpace {
        width:100%;
        height: 100%;
        position: absolute;
        top:0;
        left: 0;
        overflow: hidden;
    }
    canvas{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
    }
    .ViewImg{
      width: 280px;
      height: 130px;
      position: absolute;
      z-index: -1;
      left:0;
      right:0;
      margin: auto;
      /*bottom: 45px;*/
      background-size: 100% 100%;
      /*display: block;*/
    }

  /*  .ViewImg img{
      display: block;
      width: 100%;
      height: 100%;
    }*/


    .math{
      opacity: 0;
      transition: all .35s;
      position: relative;
      z-index: -1;
    }
    #loading{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #fff;
        text-align: center;
        top:0;
        left: 0;
        font-size: 14px;
    }
</style>
