//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
$(function() {
    FastClick.attach(document.body);
});
(function doThree() {
    //判断设备类型进行缩放
    var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
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
    }
    init_();
    window.onresize=function(){
        init_();
    }
    var container;
    var camera, scene, renderer;
    var group,group1;
    var W,H;

    init();
    animate();

    function init() {
        container = document.getElementById( 'WebGLCanvas' );
        W=$(container).width();
        H=$(container).height();
        camera = new THREE.PerspectiveCamera( 60, W / H, 1, 2000 );
        camera.position.z = 500;

        scene = new THREE.Scene();
        group = new THREE.Group();
        group1 = new THREE.Group();
        
        // earth
        var loader = new THREE.TextureLoader();
        loader.load( 'images/1.jpg', function ( texture ) {
            var geometry = new THREE.SphereGeometry( 150, 36, 36 );
            var material = new THREE.MeshBasicMaterial( { map: texture, overdraw: true } );
            var mesh = new THREE.Mesh( geometry, material );
            group1.add( mesh );
        });

        var material = new THREE.MeshBasicMaterial({color:'#000',side:THREE.DoubleSide,overdraw: true });
        var cylinder1 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 50, 36, 3), material); 
        cylinder1.position.y=175;
        group1.add(cylinder1);
        var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 50, 36, 3), material); 
        group1.add(cylinder2);
        cylinder2.position.y=-175;
        group.add( group1);
        scene.add( group );

        renderer = null;
        if(canWebgl){
            renderer = new THREE.WebGLRenderer({antialias:true});
        }else{
            renderer = new THREE.CanvasRenderer({antialias:true});
        }
        renderer.setClearColor( 0xFFFFFF );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( W, H );
        container.appendChild( renderer.domElement );


        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enableRotate =true;
    }
    function createLineMesh(vertices, color, style,size) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 8,
                gapSize: 8,
                linewidth:size
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:size}));
        }
        return lineMesh;
    }
    function animate() {
        requestAnimationFrame( animate );
        render();
    }
    var X=Math.sin(23.5*Math.PI/180)*500;
    var Y=Math.cos(23.5*Math.PI/180)*500;
    var Row=false;
    var S=setTimeout(function () {
        group.rotation.z=-Math.PI/180*23.5;
        Row=true;
        if(choose1Flag){
            camera.position.set(X,Y,0);
        }
        if(choose2Flag){
            camera.position.set(-X,-Y,0);
        }
        clearTimeout(S);
    },5000);
    
    
    function render() {
        controls.update();
        camera.lookAt( scene.position );
        group1.rotation.y+=0.005;
        renderer.render( scene, camera );
    }
    var a;
    function rotate(aim,callback){
        var position = camera.position;
        var x = aim[0] - position.x,
            y = aim[1] - position.y,
            z = aim[2] - position.z;
        var n = 20, v1 = x/n, v2 = y/n, v3 = z/n;
        a = setInterval(function(){
            n--;
            if(n<0){
                clearInterval(a);
                camera.position.set(aim[0],aim[1],aim[2]);
                callback&&callback()
                return false;
            }
            position = camera.position;
            camera.position.set(position.x+v1,position.y+v2,position.z+v3);
        },40);
    }

    $('canvas').on('touchmove',function(){
        $('#ctrl div').css({'background': '#fff','color':'#27282B'});
        choose1Flag=false;
        choose2Flag=false;
        clearInterval(a);
    })
    var mouse_flag=false;
    $('canvas').on('mousedown',function(){
        mouse_flag=true;
    })
    $('canvas').on('mousemove',function(){
        if(mouse_flag){
            $('#ctrl div').css({'background': '#fff','color':'#27282B'});
            choose1Flag=false;
            choose2Flag=false;
            clearInterval(a);
        }
    })
    $('canvas').on('mouseup',function(){
        mouse_flag=false;
    })

    var choose1Flag=false,choose2Flag=false;
    function choose() {
        clearInterval(a);
        var index=$(this).index();
        $('#ctrl div').css({'background': '#fff','color':'#27282B'});
        if(index==0){
            if(choose1Flag==false){
                choose1Flag=true;
                $(this).css({'background': '#4A90E2','color':'#fff'});
                if(choose2Flag==false){
                    if(Row){
                        rotate([X,Y,0]);
                    }else{
                        rotate([0,500,0]);
                    }
                }else{
                    if(Row){
                        rotate([X,Y,0]);
                    }else{
                        rotate([0,500,0])
                    }
                }
            }else{
                rotate([0,0,500]);
                choose1Flag=false;
            }
            choose2Flag=false;
        }else{
            if(choose2Flag==false){
                choose2Flag=true;
                $(this).css({'background': '#4A90E2','color':'#fff'});
                if(choose1Flag==false){
                    if(Row){
                        rotate([-X,-Y,0]);
                    }else{
                        rotate([0,-500,0]);
                    }
                }else{
                    if(Row){
                        rotate([-X,-Y,0]);
                    }else{
                        rotate([0,-500,0]);
                    }
                }
            }else{
                rotate([0,0,500]);
                choose2Flag=false;
            }
            choose1Flag=false;
        }
    }

    if(isMob){
        $('#ctrl div').on('touchstart',choose);
    }else{
        $('#ctrl div').on('click',choose);
    }
})();




