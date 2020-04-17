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
var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth=window.innerWidth;
var wHeight=window.innerHeight;
var zoom=1;
if(wHeight<580){
    zoom=0.8
    $('#app').css('zoom',zoom);
    $('#ctrl').css('zoom',zoom);
}
$('#main_left').width(wWidth/zoom-280);
window.onresize=function(){
    wWidth=window.innerWidth;
    wHeight=window.innerHeight;
    if(wWidth<=580) wWidth=580;
    if(wHeight<580){
        zoom=0.8;
        $('#app').css('zoom',zoom);
    }else{
        zoom=1;
        $('#app').css('zoom',zoom);
    }
    $('#main_left').width(wWidth/zoom-280);
    var cW=$('#threeContainer canvas').width();
    var cH=$('#threeContainer canvas').height();
    $('#threeContainer canvas').css({'left':($('#threeContainer').width()-cW)/2+'px','top':($('#threeContainer').height()-cH)/2+'px'});
}

var canWebgl=(function(){
    try {
        var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
    } catch ( e ) {
        return false;
    }
})();
var threeW=$('#threeContainer').width();
var threeH=$('#threeContainer').height();
var container , camera , renderer , scene , controls;
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW/-3,threeW/3,threeH/3,threeH/-3,1,2000);
    camera.position.set(0,0,200);

    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
    dirLight2.position.set(-200, -200, -100);
    scene.add(dirLight1,dirLight2);
	hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
	hemiLight.color.setHSL( 0.6, 1, 0.6 );
	hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
	hemiLight.position.set( 0, 0, 0 );
	scene.add( hemiLight );
    //判断是否支持webGL

    renderer = null;
    if(canWebgl){
        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
    }else{
        renderer = new THREE.CanvasRenderer({antialias:true,alpha:true});
    }
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( threeW,threeH );
    renderer.setClearColor(0xffffff,0);
    container.appendChild( renderer.domElement );

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}

function animate() {
	requestAnimationFrame( animate );
    render();
}
function render() {
    controls.update();
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}
init();
animate();

// 模型导入
var f1=false,f2=false;
var model1=new THREE.Group();
var model2=new THREE.Group();
function modelPut(obj,mtl,O,scale) {
	var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) { };
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'obj/' );
    mtlLoader.load( mtl, function( materials ) {
        materials.preload();
        for(var i in materials.materials){
        		if(materials.materials[i].name=='qiugun'){
        			materials.materials[i]=new THREE.MeshPhongMaterial({color:'#B4B4B4'});
        		}else if(materials.materials[i].name=='Chemistry16c_blinn8'||materials.materials[i].name=='blinn26'){
        			materials.materials[i]=new THREE.MeshPhongMaterial({color:'#efefef'})
        		}else if(materials.materials[i].name=='lambert1'||materials.materials[i].name=='lambert16'){
        			materials.materials[i]=new THREE.MeshPhongMaterial({color:materials.materials[i].color})
        		}
        }
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );
        objLoader.setPath( 'obj/' );
        objLoader.load( obj, function ( object ) {
        		object.traverse(function(child){
        			if(child instanceof THREE.Mesh){
        				if(child.material.type=='MeshPhongMaterial'){
	        				child.material.shading=THREE.SmoothShading;
	        			}else{
	        				for(var i in child.material.materials){
	        					child.material.materials[i].shading=THREE.SmoothShading;
	        				}
	        			}
        			}
        		})
            object.scale.x=scale;
            object.scale.y=scale;
            object.scale.z=scale;
            O.add( object );
            var mesh=O.children[0].children;
            mesh.sort(compare("name"));
            for(var i in mesh){
            		if(i!=3){
            			mesh[i].visible=false;
            			if(i>=0&&i<=10){
	            			mesh[i].visible=false;
	            		}
            		}
            }
            O.mesh=mesh;
            scene.add(O);
            if(mtl=='nh3g_qj.mtl'){
                f1=true;
            }else{
                f2=true;
            }
            if(f1 && f2){
                $('#main_right').css('pointer-events','auto');
                $('#loading').hide();
            }
        }, onProgress, onError );
    });
}
modelPut('nh3g_qj.obj','nh3g_qj.mtl',model1,1.5);
modelPut('nh3_qj.obj','nh3_qj.mtl',model2,2);
model2.visible=false;

var P={
	0:[-344,706,-37],
	1:[-261,385,-127],
	2:[-198,189,162],
	4:[281,-81,162],
	5:[335,19,354],
	6:[-23,-357,167],
	7:[22,-539,379],
	8:[241,-71,164],
	9:[-55,-78,-234],
	10:[225,-206,-372]
}

 function compare(propertyName) {
    return function(object1, object2) {
      var value1 = parseInt(object1[propertyName].slice(7));
      var value2 = parseInt(object2[propertyName].slice(7));
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    }
  }

var dragNum=0;
$( "#threeContainer2 img" ).draggable({
    revert: true
});
$( "#threeContainer" ).droppable({
    accept: '#threeContainer2 img',
    drop: function(event,ui) {
    		$( "#threeContainer2 img").hide().css({'left':'0px','top':'0px'});
        dragNum++;
        $('#point span:lt('+dragNum+')').css('background','#D5D5D5');
        switch (dragNum){
        		case 1: 
        			an(2,13);
        			break;
        		case 2:
        			an(4,14);
        			break;
        		case 3:
        			an(9,19);
        			break;
        		case 4:
        			an(6,16);
        			break;
        		case 5:
        			an(7,17);
        			break;
        		case 6:
        			an(5,15);
        			break;
        		case 7:
        			an(1,12);
        			break;
        		case 8:
        			an(0,11);
        			break;
        		case 9:
        			an(10,20);
        			break;
        		case 10:
        			an(8,18);
        			break;
        }
    }
});
function an(i,j,k){
	model1.mesh[i].position.set(P[i][0]/4,P[i][1]/4,P[i][2]/4);
	model2.mesh[i].position.set(P[i][0]/4,P[i][1]/4,P[i][2]/4);
	if(chooseN==0){
		moveTo(model1.mesh[i],function(){
			if(j||j==0){
				model1.mesh[j].visible=true;
				model2.mesh[j].visible=true;
			} 
			if(k) {
				model1.mesh[k].visible=true;
				model2.mesh[k].visible=true;
			}
			model2.mesh[i].visible=true;
			model2.mesh[i].position.set(0,0,0);
			model2.mesh[i].material.materials[0].opacity=1;
			model2.mesh[i].material.materials[1].opacity=1;
		});
	}else{
		moveTo(model2.mesh[i],function(){
			if(j||j==0){
				model1.mesh[j].visible=true;
				model2.mesh[j].visible=true;
			} 
			if(k) {
				model1.mesh[k].visible=true;
				model2.mesh[k].visible=true;
			}
			model1.mesh[i].visible=true;
			model1.mesh[i].position.set(0,0,0);
			model1.mesh[i].material.materials[0].opacity=1;
			model1.mesh[i].material.materials[1].opacity=1;
		});
	}
}
var SP;
function moveTo(O,callback){
	clearInterval(SP);
	O.visible=true;
	$( "#threeContainer2 img" ).css('pointer-events','none');
	$( "#step div" ).css('pointer-events','none');
	var position = O.position;
    var x = - position.x,
        y = - position.y,
        z = - position.z;
    var n = 30, v1 = x/n, v2 = y/n, v3 = z/n;
	SP=setInterval(function(){
		n--;
		if(n<0){
			 clearInterval(SP);
			 O.position.x=0;
			 $( "#threeContainer2 img" ).css('pointer-events','auto');
			 $( "#step div" ).css('pointer-events','auto');
			 if(dragNum==10){
	            $( "#threeContainer2 img" ).css('pointer-events','none');
	        }
			 $( "#threeContainer2 img").fadeIn();
			callback && callback();
			return;
		}
		position = O.position;
        O.position.set(position.x+v1,position.y+v2,position.z+v3);
	},40);
}

var chooseN=0;
function step() {
	 var index=$(this).index();
	if(chooseN==index) return;
    $('#step>div').css({'background':'#fff','color':'#000'});
    $(this).css({'background':'#5CAEFD','color':'#fff'});
    chooseN=index;
    if(index==0){
    		model1.visible=true;
    		model2.visible=false;
    		$('#threeContainer2 img').attr('src','image/model1.png');
    }else{
   	 	model1.visible=false;
    		model2.visible=true;
    		$('#threeContainer2 img').attr('src','image/model2.png');
    }
}

function reset() {
	clearInterval(SP);
	$( "#threeContainer2 img").show();
    dragNum=0;
    chooseN=0;
    $( "#threeContainer2 img" ).css('pointer-events','auto');
    $( "#step div" ).css('pointer-events','auto');
    $('#step>div').css({'background':'#fff','color':'#000'});
    $('#step>div.step1').css({'background':'#5CAEFD','color':'#fff'});
    $('#point span').css('background','#5CAEFD');
    $('#threeContainer2 img').attr('src','image/model1.png');
    for(var i in model1.mesh){
    		if(i!=3){
    			model1.mesh[i].visible=false;
    			if(i>=0&&i<=10){
        			model1.mesh[i].visible=false;
        		}
    		}
    }
    for(var i in model2.mesh){
    		if(i!=3){
    			model2.mesh[i].visible=false;
    			if(i>=0&&i<=10){
        			model2.mesh[i].visible=false;
        		}
    		}
    }
    model1.visible=true;
    model2.visible=false;
    camera.position.set(0,0,200);
    camera.zoom=1;
	camera.updateProjectionMatrix();
}
function back() {
    window.location.href='../index.html';
}
if(isMob){
    $('#step>div').on('touchstart',step);
    $('#reset img').on('touchstart',reset);
    $('#back img').on('touchstart',back);
}else{
    $('#step>div').on('click',step);
    $('#reset img').on('click',reset);
    $('#back img').on('click',back);
}
