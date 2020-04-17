//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});
//禁止选择
document.onselectstart = function () {
    return false;
};
var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var zoom = 1;
if (wHeight < 580) {
    zoom = 0.8;
    $('#app').css('zoom', zoom);
}
$('#main_left').width(wWidth / zoom - 280);
window.onresize = function () {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('#app').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#app').css('zoom', zoom);
    }
    $('#main_left').width(wWidth / zoom - 280);
    var cW = $('#threeContainer canvas').width();
    var cH = $('#threeContainer canvas').height();
    $('#threeContainer canvas').css({
        'left': ($('#threeContainer').width() - cW) / 2 + 'px',
        'top': ($('#threeContainer').height() - cH) / 2 + 'px'
    });
}
var threeW = $('#threeContainer').width();
var threeH = $('#threeContainer').height();
var container, camera, renderer, scene, controls;

//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW / -3, threeW / 3, threeH / 3, threeH / -3, 1, 20000);
    camera.position.set(0, 0, 2000);

    // scene
    scene = new THREE.Scene();

    // light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
    dirLight1.position.set(-200,400,200);
    dirLight1.distance = 0;
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 0.65);
    dirLight2.position.set(200,-400,-200);
    dirLight2.distance = 0;
    scene.add(dirLight1,dirLight2);
    hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 0, 0 );
    scene.add( hemiLight );
    //判断是否支持webGL

    renderer = null;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeW, threeH);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {
    if(camera.zoom<=0.5){
        camera.zoom=0.5000001;
    }else if(camera.zoom>=2){
        camera.zoom=1.99999999;
    }
    camera.updateProjectionMatrix();
    controls.update();
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

init();
animate();

// 模型导入
var f1 = false, f2 = false;
var model1 = new THREE.Group();
var model2 = new THREE.Group();

function modelPut(obj, mtl, O, scale) {
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('obj/');
    mtlLoader.load(mtl, function (materials) {
        materials.preload();
        for (var i in materials.materials) {
            if (materials.materials[i].name == 'qiugun') {
                materials.materials[i] = new THREE.MeshPhongMaterial({color: '#B4B4B4'});
            } else if (materials.materials[i].name == '09___Default') {
                materials.materials[i] = new THREE.MeshPhongMaterial({color: '#efefef'})
            } else if (materials.materials[i].name == '07___Default') {
                materials.materials[i] = new THREE.MeshPhongMaterial({color: '#c40000'})
            } else if (materials.materials[i].name == '08___Default') {
                materials.materials[i] = new THREE.MeshPhongMaterial({color: '#000'})
            }
        }
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load(obj, function (object) {
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    if (child.material.type == 'MeshPhongMaterial') {
                        child.material.shading = THREE.SmoothShading;
                    } else {
                        for (var i in child.material.materials) {
                            child.material.materials[i].shading = THREE.SmoothShading;
                        }
                    }
                }
            });
            object.scale.x = scale;
            object.scale.y = scale;
            object.scale.z = scale;
            O.add(object);
            var mesh = O.children[0].children;
            mesh.sort(compare("name"));
            for (var i in mesh) {
                if (i >= 3 && i <= 18) {
                    mesh[i].visible = false;
                }
            }
            O.mesh = mesh;
            scene.add(O);
            if (mtl == 'hfg_qj.mtl') {
                f1 = true;
            } else {
                f2 = true;
            }
            if (f1 && f2) {
                $('#main_right').css('pointer-events', 'auto');
                $('#loading').hide();
                // $("#threeContainer3 img").css({'pointer-events':'none','opacity':'0.4'});
            }
        }, onProgress, onError);
    });
}

modelPut('hfg_qj.obj', 'hfg_qj.mtl', model1, 0.7);
modelPut('hf_qj.obj', 'hf_qj.mtl', model2, 0.75);
model2.rotation.z = Math.PI;
model2.rotation.y = -Math.PI / 1.5;
model1.rotation.z = Math.PI;
model1.rotation.y = -Math.PI / 1.5;
model2.visible = false;
model2.position.y -= 60;
model2.position.x -= 20;

var P1 = {
    1: [0.914, -0.32, -2.258],
    2: [-0.019, -0.371, -1.581],
    3: [0.214, -0.421, -1.872],
    4: [1.104, 0.396, -1.434],
    5: [1.026, 0.144, -1.827],
    6: [0.085, -0.198, -0.506],
    7: [-0.029, -0.327, -1.103],
    8: [0.319, 0.655, -0.753],
    9: [0.697, 0.528, -1.03],
    10: [-0.581, -0.219, 0.393],
    11: [-0.456, -0.265, 0.022],
    12: [0.544, 1.425, 0.114],
    13: [0.466, 1.174, -0.279],
    14: [-0.013, -0.775, 1.273],
    15: [-0.305, -0.509, 0.694],
    16: [-0.219, 1.558, 0.894],
    17: [0.138, 1.557, 0.518],
    18: [0.646, -1.607, 1.25],
    19: [0.442, -1.289, 1.227]
};

function compare(propertyName) {
    return function (object1, object2) {
        var value1 = parseInt(object1[propertyName]);
        var value2 = parseInt(object2[propertyName]);
        if (value2 < value1) {
            return 1;
        } else if (value2 > value1) {
            return -1;
        } else {
            return 0;
        }
    }
}

var dragNum = 0;
var dragNum1 = 0;
var dragNum2 = 0;
var YES = null;
$(".draggable").draggable({
    revert: true
});
$("#threeContainer").droppable({
    accept: '.draggable',
    drop: function (event, id) {
        var id = id.draggable[0].id;
        dragNum++;
        if (id === 'm1') {
            YES = true;
            $("#threeContainer2 img").css({'pointer-events': 'none', 'opacity': '0.4'});
            $("#threeContainer3 img").css({'pointer-events': 'auto', 'opacity': '1'});
            dragNum1++;
            $("#threeContainer2 img").hide().css({'left': '0px', 'top': '0px'});
            $('#point span:lt(' + dragNum1 + ')').css('background', '#D5D5D5');
            switch (dragNum1) {
                case 1:
                    an(3, 4);
                    break;
                case 2:
                    an(9, 10);
                    break;
                case 3:
                    an(11, 12);
                    break;
                case 4:
                    an(17, 18);
                    break;
            }
        } else if (id === 'm2') {
            YES = false;
            $("#threeContainer2 img").css({'pointer-events': 'auto', 'opacity': '1'});
            $("#threeContainer3 img").css({'pointer-events': 'none', 'opacity': '0.4'});
            dragNum2++;
            $("#threeContainer3 img").hide().css({'left': '0px', 'top': '0px'});
            $('#point1 span:lt(' + dragNum2 + ')').css('background', '#D5D5D5');
            switch (dragNum2){
                case 1:
                    an(5, 6);
                    break;
                case 2:
                    an(7, 8);
                    break;
                case 3:
                    an(13, 14);
                    break;
                case 4:
                    an(15, 16);
                    break;
            }
        }
    }
});

function an(i, j, k) {
    if (chooseN == 0) {
        model1.mesh[i].position.set(P1[i][0] * 1000, P1[i][1] * 1000, P1[i][2] * 1000);
        model2.mesh[i].position.set(P1[i][0] * 1000, P1[i][1] * 1000, P1[i][2] * 1000);
        moveTo(model1.mesh[i], function () {
            if (j || j == 0) {
                model1.mesh[j].visible = true;
                model2.mesh[j].visible = true;
            }
            if (k) {
                model1.mesh[k].visible = true;
                model2.mesh[k].visible = true;
            }
            model2.mesh[i].visible = true;
            model2.mesh[i].position.set(0, 0, 0);
            model2.mesh[i].material.materials[0].opacity = 1;
            model2.mesh[i].material.materials[1].opacity = 1;
        });
    } else {
        model1.mesh[i].position.set(P1[i][0] * 1000, P1[i][1] * 1000, P1[i][2] * 1000);
        model2.mesh[i].position.set(P1[i][0] * 1000, P1[i][1] * 1000, P1[i][2] * 1000);
        moveTo(model2.mesh[i], function () {
            if (j || j == 0) {
                model1.mesh[j].visible = true;
                model2.mesh[j].visible = true;
            }
            if (k) {
                model1.mesh[k].visible = true;
                model2.mesh[k].visible = true;
            }
            model1.mesh[i].visible = true;
            model1.mesh[i].position.set(0, 0, 0);
            model1.mesh[i].material.materials[0].opacity = 1;
            model1.mesh[i].material.materials[1].opacity = 1;
        });
    }
}

var SP;

function moveTo(O, callback) {
    clearInterval(SP);
    O.visible = true;
    $("#threeContainer2 img").css({'pointer-events': 'none', 'opacity': '0.4'});
    $("#threeContainer3 img").css({'pointer-events': 'none', 'opacity': '0.4'});
    $("#step div").css('pointer-events', 'none');
    var position = O.position;
    var x = -position.x,
        y = -position.y,
        z = -position.z;
    var n = 30, v1 = x / n, v2 = y / n, v3 = z / n;
    SP = setInterval(function () {
        n--;
        if (n < 0) {
            clearInterval(SP);
            O.position.x = 0;
            $("#step div").css('pointer-events', 'auto');
            if(dragNum <7){
                if (!YES) {
                    $("#threeContainer2 img").css({'pointer-events': 'auto', 'opacity': '1'});
                    $("#threeContainer3 img").css({'pointer-events': 'none', 'opacity': '0.4'});
                } else {
                    $("#threeContainer2 img").css({'pointer-events': 'none', 'opacity': '0.4'});
                    $("#threeContainer3 img").css({'pointer-events': 'auto', 'opacity': '1'});
                }
            }else if(dragNum <9){
                if(dragNum1 == 4 && dragNum2 != 4) {
                    $("#threeContainer2 img").css({'pointer-events': 'none', 'opacity': '0.4'});
                    $("#threeContainer3 img").css({'pointer-events': 'auto', 'opacity': '1'});
                }else if(dragNum2 == 4 && dragNum1 != 4){
                    $("#threeContainer2 img").css({'pointer-events': 'auto', 'opacity': '1'});
                    $("#threeContainer3 img").css({'pointer-events': 'none', 'opacity': '0.4'});
                }
            }
            $("#threeContainer2 img").fadeIn();
            $("#threeContainer3 img").fadeIn();
            callback && callback();
            return;
        }
        position = O.position;
        O.position.set(position.x + v1, position.y + v2, position.z + v3);
    }, 40);
}

var chooseN = 0;

function step() {
    var index = $(this).index();
    if (chooseN == index) return;
    $('#step>div').css({'background': '#fff', 'color': '#000'});
    $(this).css({'background': '#5CAEFD', 'color': '#fff'});
    chooseN = index;
    if (index == 0) {
        model1.visible = true;
        model2.visible = false;
        $('#threeContainer2 img').attr('src', 'image/model1.png');
        $('#threeContainer3 img').attr('src', 'image/model2.png');
    } else {
        model1.visible = false;
        model2.visible = true;
        $('#threeContainer2 img').attr('src', 'image/model21.png');
        $('#threeContainer3 img').attr('src', 'image/model22.png');
    }
}

function reset() {
    clearInterval(SP);
    $("#threeContainer2 img").show();
    $("#threeContainer3 img").show();
    dragNum = 0;
    dragNum1 = 0;
    dragNum2 = 0;
    chooseN = 0;
    $("#threeContainer2 img").css('pointer-events', 'auto');
    $("#threeContainer3 img").css('pointer-events', 'auto');
    $("#step div").css('pointer-events', 'auto');
    $('#step>div').css({'background': '#fff', 'color': '#000'});
    $('#step>div.step1').css({'background': '#5CAEFD', 'color': '#fff'});
    $('#point span').css('background', '#5CAEFD');
    $('#point1 span').css('background', '#5CAEFD');
    $('#threeContainer2 img').attr('src', 'image/model1.png');
    $('#threeContainer3 img').attr('src', 'image/model2.png');
    for (var i in model1.mesh) {
        if (i >= 3 && i <= 18) {
            model1.mesh[i].visible = false;
        }
    }
    for (var i in model2.mesh) {
        if (i >= 3 && i <= 18) {
            model2.mesh[i].visible = false;
        }
    }
    model1.visible = true;
    model2.visible = false;
    $("#threeContainer2 img").css({'pointer-events': 'auto', 'opacity': '1'});
    $("#threeContainer3 img").css({'pointer-events': 'auto', 'opacity': '1'});
    camera.position.set(0, 0, 200);
    camera.zoom = 1;
    camera.updateProjectionMatrix();
}

if (isMob) {
    $('#step>div').on('touchstart', step);
    $('#reset img').on('touchstart', reset);
} else {
    $('#step>div').on('click', step);
    $('#reset img').on('click', reset);
}

