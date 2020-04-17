<template>
    <div id="app" class="noselect">
        <div class="container" :style="'position: relative;'">
            <!--头部-->
            <h3 v-text="title" class="app_title"></h3>
            <!--视图区-->
            <div id='show'>
                <div class="view_space" :style="'background:url(./static/UI/'+index+'/'+num+'.png) center center / 100% 100% no-repeat;'"></div>
            </div>
            <ui-slider id='slider' value="1"
                       :min="1"
                       :max="max"
                       :boxWidth="W"
                       :boxHeight="70"
                       :title="false"
                       :tooltip="false"
                       :timeLine="false"
                       :speed='0'
                       v-model='value'
                       :style="'position: absolute;right:'+R+'px;z-index:999;'">
            </ui-slider>
        </div>
        <!--侧边按钮区-->
        <div class="app_aside">
            <!--重制按钮-->
            <ui-btn type="reset1" class="aside_reset" @click.native="resetWidget"></ui-btn>
            <!--清除浮动-->
            <div class="btn_space" id="btn_space">
                <img :src="src" class="rightMainImg"/>
                <div id="rightMain"><div class="btn_spaceDiv"><span style="display: block;float: left;margin: 0 auto auto 25px;">气压(hpa)</span><span style="display: block;float: right;margin: 0 32px auto auto;">气温(℃)</span ></div></div>
                <ui-btn :type="index === 'len'?'blue':''" :width="110" :height="44" style="float: left" id="btn1" @click.native="btnChange('len')">冷锋</ui-btn>
                <ui-btn :type="index === 'nuan'?'blue':''" :width="110" :height="44" style="float: right" id="btn2" @click.native="btnChange('nuan')">暖锋</ui-btn>
                <ui-btn type="play" v-model="played" style='margin:74px auto auto auto;display: block;'></ui-btn>
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
                title:'锋的形成及天气特征',
                played:true,
                num:1,
                value:1,
                W:(window.innerWidth-280)/(window.innerHeight-140)>740/440?600*(window.innerHeight-140)/440:600*(window.innerWidth-280)/740,
                R:(window.innerWidth-280)/(window.innerHeight-140)>740/440?(window.innerWidth-280-700*(window.innerHeight-140)/440)/2:(window.innerWidth-280-700*(window.innerWidth-280)/740)/2,
                TM:null,
                src:'./static/UI/qing.png',
                INIT:null,
                index:'len',
                time:null,
                max:80,
                lineTmpOld:null,
                lineHpaOld:null,
                circleTmp:null,
                cicleHpa:null,
            }
        },
        created(){
            document.title = this.title;
        },
        watch:{
            value(v){
                var I=new Image();
                I.src='./static/UI/'+this.index+'/'+v+'.png';
                var thiz=this;
                I.onload=function(){
                    thiz.num=v;
                }
                if(this.index === 'len'){
                    if(v>65&&v<=80){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#5caefd')
                        $('#s4').css('background','#5caefd')
                    }else if(v>45&&v<=65){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#5caefd')
                        $('#s4').css('background','#f0f0f0')
                    }else if(v>15&&v<=45){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#f0f0f0')
                        $('#s4').css('background','#f0f0f0')
                    }else if(v>=1&&v<=15){
                        $('#s2').css('background','#f0f0f0')
                        $('#s3').css('background','#f0f0f0')
                        $('#s4').css('background','#f0f0f0')
                    }
                }else {
                    if(v>85&&v<=95){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#5caefd')
                        $('#s4').css('background','#5caefd')
                    }else if(v>46&&v<=85){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#5caefd')
                        $('#s4').css('background','#f0f0f0')
                    }else if(v>11&&v<=46){
                        $('#s2').css('background','#5caefd')
                        $('#s3').css('background','#f0f0f0')
                        $('#s4').css('background','#f0f0f0')
                    }else if(v>=1&&v<=11){
                        $('#s2').css('background','#f0f0f0')
                        $('#s3').css('background','#f0f0f0')
                        $('#s4').css('background','#f0f0f0')
                    }
                }
                this.INIT.TH.removeCircle(v);
                this.rainPlay(v);
            },
            played(){
                var thiz=this;
                if(!this.played){
                    if(thiz.value==thiz.max){
                        thiz.value=1;
                    }
                    this.TM=setInterval(function(){
                        if(thiz.value==thiz.max){
                            thiz.played=true;
                            clearInterval(thiz.TM);
                            return;
                        }
                        thiz.value++;
                    },80)
                }else{
                    clearInterval(thiz.TM);
                }
            },
        },
        mounted(){
            this.setSideStyle();
            $('#slider').append('<div id="sliderP"><span id="s1"></span><span id="s2"><span>T1</span></span><span id="s3"><span>T2</span></span><span id="s4"><span>T3</span></span><span id="s5"></span></div>');
            this.poitPosition();
            $('#s1').css('background','#5caefd')
            window.addEventListener('resize', ()=>{
                this.setSideStyle();
            });
            this.INIT=this.init1();
        },
        methods: {
            rainPlay(i) {
                var _this=this;
                if(this.index === 'len'){
                    if(i<=30){
                        _this.src='./static/UI/qing.png';
                    }else if(i>30 && i<=37){
                        _this.src='./static/UI/duo.png';
                    } else if(i>37 && i<=40){
                        _this.src='./static/UI/small.png';
                    }else if(i>40 && i<=45){
                        _this.src='./static/UI/mid.png';
                    }else if(i>45 && i<=52){
                        _this.src='./static/UI/big.png';
                    }else if(i>52 && i<=55){
                        _this.src='./static/UI/mid.png';
                    }else if(i>52 && i<=60){
                        _this.src='./static/UI/small.png';
                    }else if(i>60 && i<=70){
                        _this.src='./static/UI/duo.png';
                    }else if(i>70 && i<=80){
                        _this.src='./static/UI/qing.png';
                    }
                }else {
                    if(i<=20){
                        _this.src='./static/UI/qing.png';
                    }else if(i>20 && i<=30){
                        _this.src='./static/UI/duo.png';
                    }else if(i>30 && i<=40){
                        _this.src='./static/UI/small.png';
                    }else if(i>40 && i<=45){
                        _this.src='./static/UI/mid.png';
                    }else if(i>45 && i<=53){
                        _this.src='./static/UI/big.png';
                    }else if(i>53 && i<=56){
                        _this.src='./static/UI/mid.png';
                    }else if(i>56 && i<=65){
                        _this.src='./static/UI/small.png';
                    }else if(i>65 && i<=75){
                        _this.src='./static/UI/duo.png';
                    }else if(i>75 && i<=95){
                        _this.src='./static/UI/qing.png';
                    }
                }
            },
            poitPosition(){
              if(this.index === 'len'){
                  $('#s2').css('left','17%');
                  $('#s3').css('left','55%');
                  $('#s4').css('left','80%');
              }else if(this.index === 'nuan'){
                  $('#s2').css('left','10%');
                  $('#s3').css('left','47%');
                  $('#s4').css('left','89%');
              }
            },
            btnChange(type){
                var _this = this;
                this.played=true;
                if(type === this.index){
                    return;
                }else {
                    _this.index = type;
                    this.poitPosition();
                    _this.value = 1;
                    if(type === 'len'){
                        this.index = 'len';
                        this.max=80;
                    }else if(type === 'nuan'){
                        this.index = 'nuan';
                        this.max=95;
                    }
                    this.INIT.TH.poitT();

                    if(_this.TM){
                        clearInterval(_this.TM);
                        _this.value = 1;
                    }
                    var m1 = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
                    var m2 = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
                    var mm1 = new THREE.MeshBasicMaterial({color:'#fb8681'});
                    var mm2 =  new THREE.MeshBasicMaterial({color:'#24adfb'});
                    if(this.index === 'len'){
                        this.lineTmpOld.material = m1;
                        this.lineHpaOld.material = m2;
                        this.circleTmp.material = mm1;
                        this.cicleHpa.material = mm2;
                    }else if(this.index === 'nuan'){
                        this.lineTmpOld.material = m2;
                        this.lineHpaOld.material = m1;
                        this.circleTmp.material = mm2;
                        this.cicleHpa.material = mm1;
                    }
                    this.INIT.TH.removeCircle(1);
                }
            },
            init1(){
                var container = document.getElementById('rightMain');
                var width = 240,height=200;
                var scene = new THREE.Scene();
                var camera = new THREE.PerspectiveCamera( 45, width / height, 1, 2000 );
                var renderer = new THREE.CanvasRenderer({antialias:true});
                var lineHpa,lineTmp,arrTmp=[],arrHpa =[];
                var textAlign = THREE_Text.textAlign, SpriteText2D = THREE_Text.SpriteText2D;
                var text1,text2,text3;
                var TH={
                    initScence:()=>{
                        camera.position.z = 1000;
                        renderer.setPixelRatio( window.devicePixelRatio );
                        renderer.setSize( width, height );
                        renderer.setClearColor(0xffffff);
                        container.appendChild( renderer.domElement );

                        var vertices = [],line,text,shape = new THREE.Shape(),material;
                        vertices.push(new THREE.Vector3(-250,-300,0));
                        vertices.push(new THREE.Vector3(250,-300,0));
                        line = TH.createLine(vertices,'#000');
                        scene.add(line);

                        vertices = [];
                        vertices.push(new THREE.Vector3(-250,-300,0));
                        vertices.push(new THREE.Vector3(-250,300,0));
                        line = TH.createLine(vertices,'#24adfb');
                        scene.add(line);

                        shape.moveTo(-250,300,0);
                        shape.lineTo(-250-15,300-20);
                        shape.lineTo(-250+15,300-20);

                        var material1 = new THREE.MeshBasicMaterial({color:'#24adfb'});
                        line = new THREE.Mesh(new THREE.ShapeGeometry(shape),material1);
                        scene.add(line);

                        vertices = [];
                        vertices.push(new THREE.Vector3(250,-300,0));
                        vertices.push(new THREE.Vector3(250,300,0));
                        line = TH.createLine(vertices,'#fb8681');
                        scene.add(line);

                        shape = new THREE.Shape();
                        shape.moveTo(250,300,0);
                        shape.lineTo(250-15,300-20);
                        shape.lineTo(250+15,300-20);

                        var material2 = new THREE.MeshBasicMaterial({color:'#fb8681'});
                        line = new THREE.Mesh(new THREE.ShapeGeometry(shape),material2);
                        scene.add(line);

//                        text = TH.createText('气压(hpa)',[-250,370,0],'#000',50);
//                        scene.add(text);
//
//                        text = TH.createText('气温(°C)',[250,370,0],'#000',50);
//                        scene.add(text);

                        text = TH.createText('t',[250+40,-300+50,0],'#000',70);
                        scene.add(text);
                        //0.5π-1.5π
                        var x,y;
                        for(x = 0.5*Math.PI+0.01;x<1.5*Math.PI;x+=0.01){
                            y = Math.tan(x);
                            if((y*100 <= 255)&&(y*100 >= -255)){
                                arrHpa.push(new THREE.Vector3(y*100,x*50-200,0));
                            }
                        }
                        var curve = new THREE.CatmullRomCurve3(arrHpa);
                        var geometry = new THREE.Geometry();
                        geometry.vertices = curve.getPoints(100);
                        material = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
                        this.lineHpaOld = new THREE.Line(geometry, material);
                        // scene.add(lineHpaOld);


                        var m = new THREE.CircleGeometry(12,10);
                        var g = new THREE.MeshBasicMaterial({color:'#24adfb'});
                        this.cicleHpa = new THREE.Mesh(m,g);
                        this.cicleHpa.position.x = arrHpa[0]['x'];
                        this.cicleHpa.position.y = arrHpa[0]['y'];
                        scene.add(this.cicleHpa);

                        for(var i=0;i<arrHpa.length;i++){
                            var arr =new THREE.Vector3(-arrHpa[i]['x'],arrHpa[i]['y'],0);
                            arrTmp.unshift(arr);
                        }
                        vertices.reverse();
                        curve = new THREE.CatmullRomCurve3(arrTmp);
                        geometry = new THREE.Geometry();
                        geometry.vertices = curve.getPoints(100);
                        material = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
                        this.lineTmpOld = new THREE.Line(geometry, material);
                        // scene.add(lineTmpOld);

                        m = new THREE.CircleGeometry(12,10);
                        g = new THREE.MeshBasicMaterial({color:'#fb8681'});
                        this.circleTmp = new THREE.Mesh(m,g);
                        this.circleTmp.position.x = arrTmp[0]['x'];
                        this.circleTmp.position.y = arrTmp[0]['y'];
                        scene.add(this.circleTmp);
                        TH.poitT();
                    },
                    createText:function(content, coordinate, color,size,offset){
                        if (!color) {
                            color = '#000';
                        }
                        if(!size){
                            size = 26;
                        }
                        var fontsize = size+'px Cambria Math';

                        var textStyle = TH.objStyle(color, fontsize),
                            text = new SpriteText2D(content, textStyle),x,y,z;

                        if(!offset){
                            text.position.set(coordinate[0], coordinate[1], coordinate[2]);
                        }else{
                            if(coordinate[0]>0){ x = coordinate[0]+30;}else{x = coordinate[0]-30; }
                            if(coordinate[1]>0){ y = coordinate[1]+30;}else{y = coordinate[1]-30; }
                            if(coordinate[2]>0){ z = coordinate[2]+30;}else{z = coordinate[2]-30; }
                            text.position.set(x, y, z);
                        }

                        return text;
                    },
                    objStyle:function(color, fontsize){
                        return {align: textAlign.center, font: fontsize, fillStyle: color, antialias: true};
                    },
                    createLine:function(vertices, color, style){
                        var lineMesh = null, geometryLine = new THREE.Geometry();
                        geometryLine.vertices = vertices;
                        if (!color) {
                            color = '#000';
                        }
                        if (!style) {
                            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:2}));
                        } else {
                            geometryLine.computeLineDistances();
                            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                                color: color,
                                opacity: 0.8,
                                dashSize: 5,
                                gapSize: 5
                            }));
                        }
                        return lineMesh;
                    },
                    poitT:function() {
//                         scene.remove(text1,text2,text3);
//                         if(this.index === 'len'){
//                             text1 = createText('t1',[-100,-305,0],'#000',35);
//
//                             text2 = createText('t2',[30,-305,0],'#000',35);
//
//                             text3 = createText('t3',[100,-305,0],'#000',35);
//                         }else if(this.index === 'nuan'){
//                             text1 = createText('t1',[-220,-305,0],'#000',35);
//
//                             text2 = createText('t2',[-15,-305,0],'#000',35);
//
//                             text3 = createText('t3',[200,-305,0],'#000',35);
//                         }
//                         scene.add(text1,text2,text3);
                    },
                    animate:function() {
                        requestAnimationFrame(TH.animate);
                        renderer.clear();
                        //面和实线场景
                        renderer.render(scene, camera);
                    },
                    removeCircle:(num)=>{
                        if(lineHpa){
                            scene.remove(lineHpa);
                        }
                        if(lineTmp){
                            scene.remove(lineTmp);
                        }
                        var arr=[],i,color1,color2;
                        if(this.index == 'len'){
                            color1 = '#24adfb';
                            color2 = '#fb8681';
                        }else if(this.index == 'nuan'){
                            color1 = '#fb8681';
                            color2 = '#24adfb';
                        }
                        if(this.index === 'len'){
                            if(num === 80){
                                num = arrHpa.length-1;
                            }else{
                                num = Math.floor(arrHpa.length*((num-1)/80));
                            }
                        }else if(this.index === 'nuan'){
                            if(num === 95){
                                num = arrHpa.length-1;
                            }else{
                                num = Math.floor(arrHpa.length*((num-1)/95));
                            }
                        }
                        this.cicleHpa.position.x = arrHpa[num]['x'];
                        this.cicleHpa.position.y = arrHpa[num]['y'];
                        if(num){
                            for(i=0;i<num;i++){
                                arr.push(arrHpa[i]);
                            }
                            var curve = new THREE.CatmullRomCurve3(arr);
                            var geometry = new THREE.Geometry();
                            geometry.vertices = curve.getPoints(100);
                            var material = new THREE.LineBasicMaterial({color : color1,linewidth:3});
                            lineHpa = new THREE.Line(geometry, material);
                            scene.add(lineHpa);
                        }

                        this.circleTmp.position.x = arrTmp[num]['x'];
                        this.circleTmp.position.y = arrTmp[num]['y'];
                        if(num){
                            arr = [];
                            for(i=0;i<num;i++){
                                arr.push(arrTmp[i]);
                            }
                            curve = new THREE.CatmullRomCurve3(arr);
                            geometry = new THREE.Geometry();
                            geometry.vertices = curve.getPoints(100);
                            material = new THREE.LineBasicMaterial({color : color2,linewidth:3});
                            lineTmp = new THREE.Line(geometry, material);
                            scene.add(lineTmp);
                        }
                    },
                };
                var init2=function () {
                    return {
                        TH:TH
                    }
                };
                TH.animate();
                TH.initScence();
                return init2();
            },
            //计算侧边
            setSideStyle(){
                var W=window.innerWidth-280;
                var H=window.innerHeight-140;
                var zoom;
                if( W/H > 740/440){
                    zoom=H/440;
                }else{
                    zoom=W/740;
                }
                $('#show').css('zoom',zoom);
                this.W=600*zoom;
                this.R=(window.innerWidth-280-700*zoom)/2;
                var T=(window.innerHeight-440*zoom)/2+420*zoom;
                $('#slider').css('top',T+'px');
            },
            //重置
            resetWidget(){
                clearInterval(this.TM);
                this.value=1;
                this.num=1;
                this.played=true;
                this.index = 'len';
                this.max = 80
                this.poitPosition();
                var m1 = new THREE.LineDashedMaterial({color : '#fb8681',linewidth:1,dashSize: 2,gapSize: 2});
                var m2 = new THREE.LineDashedMaterial({color : '#24adfb',linewidth:1,dashSize: 2,gapSize: 2});
                var mm1 = new THREE.MeshBasicMaterial({color:'#fb8681'});
                var mm2 =  new THREE.MeshBasicMaterial({color:'#24adfb'});
                if(this.index === 'len'){
                    this.lineTmpOld.material = m1;
                    this.lineHpaOld.material = m2;
                    this.circleTmp.material = mm1;
                    this.cicleHpa.material = mm2;
                }else if(this.index === 'nuan'){
                    this.lineTmpOld.material = m2;
                    this.lineHpaOld.material = m1;
                    this.circleTmp.material = mm2;
                    this.cicleHpa.material = mm1;
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

    input, button {
        outline: none;
        -webkit-appearance: none;
        border-radius: 0;
    }
    .vue-slider{
        margin:45px auto !important;
    }
    .ui-label{
        margin:auto !important;
        width:95% !important;
        top:15px !important;
    }
    .ui-label li{
        color:#000 !important;
    }
    #slider{
        position: relative;
    }
    #slider>div#sliderP{
        position: absolute;
        background: transparent;
        top:42px;
        width:calc(100% - 44px);
        height: 14px;
    }
    #slider>div#sliderP>span{
        display: inline-block;
        width:14px;
        height: 14px;
        background: #f0f0f0;
        border-radius: 50%;
        position: absolute;
        top:-1px;
    }
    #slider>div#sliderP>span>span{
        position: absolute;
        top:-20px;
        left:-2px;
    }
    #slider>div#sliderP>span#s1{
        left:-6px;
    }
    #slider>div#sliderP>span#s5{
        right:-6px;
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
    #renderCanvas {
        border: 1px solid rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        border-radius: 6px;
        padding: 10px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
    }
    .canvas_item{
        float: left;
        width: 50%;
        height: 50%;
    }
    .canvas_item img{
        width: 100%;
        height: 100%;
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
        position: relative;
    }

    .view_space {
        width: 700px;
        height: 380px;
        padding: 10px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20);
        border-radius: 5px;
        background-origin: content-box;
        background-position: center;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        margin: 20px auto;
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
        padding:0 20px;
        width: 100%;
        height:470px;
        overflow: hidden;
        margin: auto;
        top:80px;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }

    #show{
        position: absolute;
        width:740px;
        height:440px;
        top:0px;
        bottom:0;
        right:0;
        left:0;
        margin:auto;
    }
    .rightMainImg{
        width: 63px;
        height: 63px;
        margin: 0 auto 10px auto;
        display: block;
    }
    #rightMain{
        width: 240px;
        height: 200px;
        overflow: hidden;
        margin:0 auto 20px auto;
        background-color: #ffffff;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        -webkit-box-shadow: 0px 1px 2px 0px #d2d2d2;
        -moz-box-shadow: 0px 1px 2px 0px #d2d2d2;
        box-shadow: 0px 1px 2px 0px #d2d2d2;
    }
    .btn_spaceDiv{
        height: 28px;
        width: 240px;
        position: absolute;
        line-height: 28px;
    }
    .btn_spaceDiv>span{
        font-size: 16px;
    }
</style>
