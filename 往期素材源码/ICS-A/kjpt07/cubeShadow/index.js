//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});

//禁止选择
document.onselectstart=function(){return false;};

//判断设备类型进行缩放
var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
function init_(){
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    scale=bodyWidth/1920;
    if(1200*scale>bodyHeight){
        scale=bodyHeight/1200;
        $('#app').width(1920).css("zoom",scale);
    }else{
        $('#app').height(1200).css("zoom",scale);
    }
    $('#app .main_left div div').height($('#app .main_left div div').width())
    $('#app .main_left>div').css('margin-top',($('#app .main_left').height()-$('#app .main_left>div').height())/2+'px')
    $('#app .main_right #threeContainer>div.show_main').height($('#app .main_right #threeContainer>div.show_main').width()*3/4)
}
init_();
window.onresize=function(){
    init_();
}
var grid = true, side = 350, isRun = false, a;



/****** 位置相关 ******/
var $obj = $('#threeContainer');
    threeHeight = $obj.height(),
    threeWidth = $obj.width();

function ThreeDimensional() {
    var self = this;
    /****** 判断是否支持WebGL ******/
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    this.renderer = null;
    if(canWebgl){
        this.renderer = new THREE.WebGLRenderer({antialias:true});
    }else{
        this.renderer = new THREE.CanvasRenderer();
    }
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.autoClear = false;
    this.scene1 = new THREE.Scene();
    this.scene2 = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(threeWidth/-2.5,threeWidth/2.5,threeHeight/2.5,threeHeight/-2.5,-100,10000);
    
    this.controls = null;

    /****** 分割线 ******/
    this.int = function () {
        this.camera.position.x = 200;
        this.camera.position.y = 300;
        this.camera.position.z = 600;
        this.camera.lookAt(new THREE.Vector3(0,0,0));
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(threeWidth, threeHeight);
        $obj.append(this.renderer.domElement);
        this.createControls();
        this.createGrid();
        this.box();
        this.solidLine();
        this.dashLine();

    };
    this.createControls = function () {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.enableZoom = true;
        this.controls.enableRotate =true;
        this.controls.enablePan =false;
    };

    /****** 事件函数 ******/
    function createLineMesh(vertices, color, style) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.LineSegments(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 10,
                gapSize: 10,
                depthTest:false
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
        }
        return lineMesh;
    }
    function vec3(x,y,z){
        return new THREE.Vector3(x, y, z);
    }
    function createLine(json,n){
        var geo1 = new THREE.Geometry();
        var geo2 = new THREE.Geometry();
        var geo3 = new THREE.Geometry();


        var vertices1 = [],vertices2 = [],vertices3 = [];
        for(var i=0;i<4;i++){
            vertices1.push(vec3(json[i][0],json[i][1],json[i][2]));
            vertices3.push(vec3(json[i+4][0],json[i+4][1],json[i+4][2]));
            vertices2.push(vec3(json[i][0],json[i][1],json[i][2]));
            vertices2.push(vec3(json[i+4][0],json[i+4][1],json[i+4][2]));
        }
        vertices1.push(vec3(json[0][0],json[0][1],json[0][2]));
        vertices3.push(vec3(json[4][0],json[4][1],json[4][2]));

        geo1.vertices = vertices1;
        geo2.vertices = vertices2;
        geo3.vertices = vertices3;

        if(n){
            var material = new THREE.LineBasicMaterial({color:"#000",side:THREE.DoubleSide});
            var line1 = new THREE.Line(geo1,material);
            var line2 = new THREE.LineSegments(geo2,material);
            var line3 = new THREE.Line(geo3,material);
        }else{
            geo1.computeLineDistances();
            geo2.computeLineDistances();
            geo3.computeLineDistances();
            material = new THREE.LineDashedMaterial({color:"#000",dashSize:10,gapSize:10,depthTest:false,side:THREE.DoubleSide});
            line1 = new THREE.Line(geo1,material);
            line2 = new THREE.LineSegments(geo2,material);
            line3 = new THREE.Line(geo3,material);
        }

        var line = new THREE.Object3D();
        line.add(line1,line2,line3);
        return line;
    }

    /****** 其他事件 ******/
    this.createGrid=function (){
        var geometry = new THREE.Geometry();
        var size=400, bottom = - 0.001, step = 40;
        var lineMaterial = new THREE.LineBasicMaterial( {color : 0x949494, transparent: false, opacity: 0.5} );
        for(var i = 0;i < 21;i ++){
            geometry.vertices.push( new THREE.Vector3( - size, bottom, i*step - size ) );
            geometry.vertices.push( new THREE.Vector3( size, bottom, i*step - size ) );
            geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, - size ) );
            geometry.vertices.push( new THREE.Vector3( i*step - size, bottom, size ) );
        }
        self.grid = new THREE.LineSegments( geometry, lineMaterial,1);
        self.grid.position.y = -side/2;
        three.scene1.add(self.grid);
    };

    //顶点json
    this.boxJson = function(){
        var json = [], x = side/2, j = 0.5;
        json.push([x+j,-x-j,x+j],[x+j,-x-j,-x-j],[-x-j,-x-j,-x-j],[-x-j,-x-j,x+j]);
        json.push([x+j,x+j,x+j],[x+j,x+j,-x-j],[-x-j,x+j,-x-j],[-x-j,x+j,x+j]);
        return json;
    };

    //创建正方体
    this.box = function(){
        var material = new THREE.MeshBasicMaterial({color:"#cfeaf8"});
        var boxGeo = new THREE.BoxGeometry(side,side,side);
        var box = new THREE.Mesh(boxGeo,material);
        this.scene1.add(box);
    };
    this.solidLine = function(){
        var line = createLine(this.boxJson(),1);
        this.scene1.add(line);
    };
    this.dashLine = function(){
        var line = createLine(this.boxJson());
        this.scene2.add(line);
    };

}


var three = new ThreeDimensional();
three.int();

renderAll();
function renderAll(){
    three.controls.update();
    requestAnimationFrame(renderAll);
    three.renderer.clear();
    three.renderer.render(three.scene1,three.camera);
    three.renderer.render(three.scene2,three.camera);
}
function reset(){
    if(isRun) clearInterval(a);
    isRun = false;
    three.camera.position.set(200,300,600);
    three.camera.zoom=1;
    three.camera.updateProjectionMatrix();
    grid = true;
    three.scene1.add(three.grid);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'});
}

function zView(){
    if(isRun) return;
    rotate([0,0,600]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'});
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'})
}
function cView(){
    if(isRun) return;
    rotate([600/Math.sqrt(2),0,600/Math.sqrt(2)]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'});
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'});
}
function fView(){
    if(isRun) return;
    rotate([600/Math.sqrt(2),-425,600/Math.sqrt(2)]);
    $('.view span').css({'background':'#fff','color':'#000','border':'1px solid #4a4a4a'});
    $(this).css({'background':'#F5A623','color':'#fff','border':'1px solid #F5A623'});
}

function rotate(aim){
    isRun = true;
    var position = three.camera.position;
    var x = aim[0] - position.x,
        y = aim[1] - position.y,
        z = aim[2] - position.z;
    var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
    a = setInterval(function(){
        n--;
        if(n<0){
            isRun = false;
            clearInterval(a);
            return false;
        }
        position = three.camera.position;
        three.camera.position.set(position.x+v1,position.y+v2,position.z+v3);
    },40);
}

if(isMob){
    $('.reset').on('touchstart',reset);
    $('.zView').on('touchstart',zView);
    $('.cView').on('touchstart',cView);
    $('.fView').on('touchstart',fView);
    $(".wg").on('touchstart',function(){
        if(grid){
            three.scene1.remove(three.grid);
        }else{
            three.scene1.add(three.grid);
        }
        grid = !grid;
    });
}else{
    $('.reset').on('click',reset);
    $('.zView').on('click',zView);
    $('.cView').on('click',cView);
    $('.fView').on('click',fView);
    $(".wg").on('click',function(){
        if(grid){
            three.scene1.remove(three.grid);
        }else{
            three.scene1.add(three.grid);
        }
        grid = !grid;
    });
}
