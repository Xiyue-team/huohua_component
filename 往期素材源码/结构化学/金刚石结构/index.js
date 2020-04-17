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
document.onselectstart = function() { return false; };
var isMob = /iPad|Android/g.test(navigator.userAgent);
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;
var zoom = 1;
if (wHeight < 580) {
    zoom = 0.8
    $('#main_right').css('zoom', zoom);
}
$('#main_left').width(wWidth - 280 * zoom);
$('#threeContainer').height(wHeight - 80);
window.onresize = function() {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    if (wWidth <= 580) wWidth = 580;
    if (wHeight < 580) {
        zoom = 0.8;
        $('#main_right').css('zoom', zoom);
    } else {
        zoom = 1;
        $('#main_right').css('zoom', zoom);
    }
    $('#main_left').width(wWidth - 280 * zoom);
    $('#threeContainer').height(wHeight - 80);
    var cW = $('#threeContainer canvas').width();
    var cH = $('#threeContainer canvas').height();
    $('#threeContainer canvas').css({ 'left': ($('#threeContainer').width() - cW) / 2 + 'px', 'top': ($('#threeContainer').height() - cH) / 2 + 'px' });
    offsetLeft = parseInt($('canvas').offset().left);
    offsetTop = parseInt($('canvas').offset().top);
}
var canWebgl = (function() {
    try {
        var canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
        return false;
    }
})();
var threeW = $('#threeContainer').width();
var threeH = $('#threeContainer').height();
var container, camera, renderer, scene, controls;
//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW / -1, threeW / 1, threeH / 1, threeH / -1, 1, 2000);
    camera.position.set(100, 0, 500);
    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xf0f0f0, 1);
    dirLight2.position.set(-200, -200, -100);
    scene.add(dirLight1, dirLight2);
    //判断是否支持webGL
    renderer = null;
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeW, threeH);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan=false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.25;
}

function animate() {
    requestAnimationFrame(animate);
    count = (++count) % 2;
    if (count) {
        render();

    }
}
let count = 0;

function render() {
    controls.update();
    renderer.render(scene, camera);
}
init();
animate();
//视图区鼠标事件操作相关变量
// var raycaster = new THREE.Raycaster(),
//     plane = new THREE.Plane(),
//     offset = new THREE.Vector3(),
//     intersection = new THREE.Vector3(),
//     mouse = new THREE.Vector2(),
//     INTERSECTED = null;
var offsetLeft = parseInt($('canvas').offset().left);
var offsetTop = parseInt($('canvas').offset().top);
var touchF = false;

function onDocumentMouseDown() {
    touchF = true;
    if (stepNum != 2) {
        T.visible = true;
    }
}
// function onDocumentMouseMove(){
//     if(touchF && stepNum!=2){
//         T.visible=true;
//     }
// }
function onDocumentMouseUp() {
    T.visible = false;
    touchF = false;
}

function onDocumentTouchStart() {
    touchF = true;
    if (stepNum != 2) {
        T.visible = true;
    }
}
// function onDocumentTouchMove(){
//     if(touchF && stepNum!=2){
//         T.visible=true;
//     }
// }
function onDocumentTouchEnd() {
    T.visible = false;
    touchF = false;
}
renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
// renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
// renderer.domElement.addEventListener( 'touchmove', onDocumentTouchMove, false );
renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

function createText(texts, x, y, z, color, size) {
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = { align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true };
    var text = new SpriteText2D(texts, textStyle);
    // text.rotation = camera.rotation;
    text.position.set(x, y, z);
    return text;
}

function createLineMesh(vertices, color, style) {
    var lineMesh = null,
        geometryLine = new THREE.Geometry();
    if (!color) {
        color = '#000';
    }
    if (style == 2) {
        geometryLine.vertices = vertices;
        geometryLine.computeLineDistances();
        lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
            color: color,
            dashSize: 3,
            gapSize: 3,
            depthTest: false
        }));
    } else if (style == 3) {
        geometryLine.vertices = vertices;
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({ color: color }));
    }
    return lineMesh;
}

function vec3(x, y, z) {
    return new THREE.Vector3(x, y, z);
}
var T = new THREE.Group();

function createB() {
    var text1 = createText('109.5°', 80, 260, 0, '＃000', 18);
    var text2 = createText('0.154nm', -75, 295, 0, '＃000', 18);
    var vertices = [];
    for (var i = 0; i < 81; i += 5) {
        vertices.push(vec3(50 * Math.cos(i * Math.PI / 180), 50 * Math.sin(i * Math.PI / 180), 0))
    }
    var lineA = createLineMesh(vertices, '#000', 3);
    lineA.position.y = 207;
    lineA.position.x = -10;
    T.add(text1, text2, lineA);
    vertices = [];
    vertices.push(vec3(-60, 355, 0), vec3(-80, 355, 0));
    var line1 = createLineMesh(vertices, '#000', 3);
    vertices = [];
    vertices.push(vec3(-60, 220, 0), vec3(-80, 220, 0));
    var line2 = createLineMesh(vertices, '#000', 3);
    vertices = [];
    vertices.push(vec3(-70, 355, 0), vec3(-70, 330, 0));
    var line3 = createLineMesh(vertices, '#000', 3);
    vertices = [];
    vertices.push(vec3(-70, 220, 0), vec3(-70, 250, 0));
    var line4 = createLineMesh(vertices, '#000', 3);
    T.add(text1, text2, lineA, line1, line2, line3, line4);
    T.visible = false;
    scene.add(T);
}
createB();
// 模型导入
var model1 = new THREE.Group();
var model2 = new THREE.Group();
var model3 = new THREE.Group();
var model4 = new THREE.Group();
var model5 = new THREE.Group();
var model6 = new THREE.Group();
var model7 = new THREE.Group();
var model8 = new THREE.Group();
var model9 = new THREE.Group();
var model10 = new THREE.Group();
var model11 = new THREE.Group();
var model12 = new THREE.Group();
var model13 = new THREE.Group();
var model14 = new THREE.Group();

function modelPut(obj, mtl, O, scale, callback) {
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            // console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function(xhr) {};
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('obj/');
    mtlLoader.load(mtl, function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load(obj, function(object) {
            if (mtl == 'cut.mtl') {
                object.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        for (var i in child.material) {
                            if (i == 0 || i == 1) {
                                child.material[i].shading = THREE.SmoothShading;
                                if (i == 0) {
                                    child.material[i].color.set('#eee');
                                }
                            }
                        }
                    }
                })
            }
            object.scale.x = scale;
            object.scale.y = scale;
            object.scale.z = scale;
            O.add(object);
            callback && callback(O);
        }, onProgress, onError);
    });
}
modelPut('botton.obj', 'botton.mtl', model1, 8, function(O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('top.obj', 'top.mtl', model2, 8, function(O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('mid.obj', 'mid.mtl', model3, 8, function(O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('gun.obj', 'gun.mtl', model4, 8, function(O) {
    changeColor(O, '#eee');
    // addSelectobjs(O)
});
modelPut('line.obj', 'line.mtl', model5, 8);
modelPut('a2.obj', 'a2.mtl', model6, 8, function(O) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.transparent = true;
        G[i].material.color.set('#5CAEFD');
    }
});
modelPut('a3.obj', 'a3.mtl', model7, 8, function(O) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.transparent = true;
        G[i].material.color.set('#eee');
    }
});
modelPut('b2.obj', 'b2.mtl', model8, 8);
modelPut('b3.obj', 'b3.mtl', model9, 8, function(O) {
    changeColor(O, '#eee');
});
modelPut('c.obj', 'c.mtl', model10, 8);
modelPut('cut.obj', 'cut.mtl', model11, 8);
modelPut('o1.obj', 'o1.mtl', model12, 5, function(O) {
    O.position.set(0, -50, 0);
    changeColor(O, '#eee');
});
modelPut('o2.obj', 'o2.mtl', model13, 5, function(O) {
    O.position.set(0, -50, 0);
    for (var i in O.children[0].children) {
        if (i != 'contains') {
            if (O.children[0].children[i].name.indexOf('pSphere') != -1) {
                O.children[0].children[i].material.color.set('#5CAEFD');
            } else {
                O.children[0].children[i].material.color.set('#eee');
            }
        }
    }
});
modelPut('o3.obj', 'o3.mtl', model14, 5, function(O) {
    O.position.set(0, -50, 0);
    changeColor(O, '#5CAEFD');
});
scene.add(model1, model2, model3, model4, model5, model6, model7, model8, model9, model10, model11, model12, model13, model14);
model5.visible = false;
model6.visible = false;
model7.visible = false;
model8.visible = false;
model9.visible = false;
model10.visible = false;
model11.visible = false;
model12.visible = false;
model13.visible = false;
model14.visible = false;


if(window.innerWidth<500||window.innerHeight<500){
    scene.scale.set(0.5,0.5,0.5);
}
function changeColor(O, color) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.color.set(color);
    }
}

function changOpacity(O, op) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.opacity = op;
    }
}
var S, ST, stepNum = 10;

function step() {
    var index = $(this).index();
    if (stepNum == index) {
        return;
    }
    controls.enableRotate = true;
    // scene.remove(model1,model2,model3,model4,model5,model6,model7,model8,model9,model10,model11,model12,model13,model14);
    model1.visible = false;
    model2.visible = false;
    model3.visible = false;
    model4.visible = false;
    model5.visible = false;
    model6.visible = false;
    model7.visible = false;
    model8.visible = false;
    model9.visible = false;
    model10.visible = false;
    model11.visible = false;
    model12.visible = false;
    model13.visible = false;
    model14.visible = false;
    clearInterval(S);
    clearTimeout(ST);
    $('#step>div').css({ 'background': '#fff', 'color': '#000' });
    $(this).css({ 'background': '#5CAEFD', 'color': '#fff' });
    stepNum = index;
    $('#addC,#check').hide();
    if (index == 0) {
        $('#check').hide();
        checked = false;
        $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
        // scene.add(model1,model2,model3,model4,model5);
        model1.visible = true;
        model2.visible = true;
        model3.visible = true;
        model4.visible = true;
        model5.visible = true;
        changeColor(model3, '#5CAEFD');
        changeColor(model2, '#F00');
        // addSelectobjs(model1);
        // addSelectobjs(model2);
        // addSelectobjs(model3);
        // addSelectobjs(model4);
    } else if (index == 1) {
        $('#check').hide();
        checked = false;
        $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
        // scene.add(model1,model2,model3,model4);
        model1.visible = true;
        model2.visible = true;
        model3.visible = true;
        model4.visible = true;
        changeColor(model2, '#5CAEFD');
        changeColor(model3, '#F00');
        // addSelectobjs(model1);
        // addSelectobjs(model2);
        // addSelectobjs(model3);
        // addSelectobjs(model4);
    } else if (index == 3) {
        // scene.add(model6,model7,model8,model9,model10);
        model6.visible = true;
        model7.visible = true;
        model8.visible = true;
        model9.visible = true;
        model10.visible = true;
        // addSelectobjs(model6);
        // addSelectobjs(model7);
        // addSelectobjs(model8);
        // addSelectobjs(model9);
        changOpacity(model6, 1);
        changOpacity(model7, 1);
        var op = 1;
        controls.enableRotate = false;
        ST = setTimeout(function() {

            S = setInterval(function() {
                if (op <= 0) {
                    clearInterval(S);
                    controls.enableRotate = true;
                    model6.visible = false;
                    model7.visible = false;
                    $('#check').show();
                    $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
                    checked = false;
                    return;
                }
                op -= 0.1;
                changOpacity(model6, op);
                changOpacity(model7, op);
            }, 100)
        }, 1000);
    } else if (index == 2) {
        addNum = 0;
        $('.t1 span').css('background', '#5CAEFD');
        model12.visible = true;
        model13.visible = true;
        model14.visible = true;
        changeColor(model14, '#f00');
        model14.children[0].children[23].material = new THREE.MeshPhongMaterial({ color: '#000' });
        $('#addC').show();
    }
}
var checked = false;

function check() {
    if (checked) {
        $(this).children('span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
        checked = false;
        // scene.remove(model11);
        // scene.add(model8, model9);
        model11.visible = false;
        model8.visible = model9.visible = true;
    } else {
        $(this).children('span').css('background', '#5CAEFD').children().css({ 'right': '2px', 'left': 'auto' });
        checked = true;
        // scene.add(model11);
        // scene.remove(model8, model9);
        model11.visible = true;
        model8.visible = model9.visible = false;
    }
}
var addNum = 0;

function addC() {
    addNum++;
    if (addNum > 12) return;
    $('.t1 span:lt(' + addNum + ')').css('background', '#D5D5D5');
    $(this).css({ 'background': '#5CAEFD', 'color': '#fff' });
    var nameN;
    switch (addNum) {
        case 1:
            nameN = 'one';
            break;
        case 2:
            nameN = 'two';
            break;
        case 3:
            nameN = 'three';
            break;
        case 4:
            nameN = 'four';
            break;
        case 5:
            nameN = 'five';
            break;
        case 6:
            nameN = 'six';
            break;
        case 7:
            nameN = 'seven';
            break;
        case 8:
            nameN = 'eight';
            break;
        case 9:
            nameN = 'nine';
            break;
        case 10:
            nameN = 'ten';
            break;
        case 11:
            nameN = 'eleven';
            break;
        case 12:
            nameN = 'twelve';
            break;
    }
    for (var i in model14.children[0].children) {
        if (i != 'contains') {
            if (model14.children[0].children[i].name.indexOf(nameN) != -1) {
                model14.children[0].children[i].material = new THREE.MeshPhongMaterial({ color: '#f00' });
            } else {
                model14.children[0].children[i].material = new THREE.MeshPhongMaterial({ color: '#5CAEFD' });
            }
            if (i == '23') {
                model14.children[0].children[23].material = new THREE.MeshPhongMaterial({ color: '#000' });
            }
        }
    }
}

function reset() {
    stepNum = 10;
    clearTimeout(ST);
    clearInterval(S);
    $('#step>div').css({ 'background': '#fff', 'color': '#000' });
    $('#step>div.step1').css({ 'background': '#5CAEFD', 'color': '#fff' });
    $('#check,#addC').hide();
    checked = false;
    $('#check>span').css('background', '#F0F0F0').children().css({ 'left': '2px', 'right': 'auto' });
    // scene.remove(model1, model2, model3, model4, model5, model6, model7, model8, model9, model10, model11, model12, model13, model14);
    // scene.add(model1, model2, model3, model4);
    model1.visible = true;
    model2.visible = true;
    model3.visible = true;
    model4.visible = true;
    model5.visible = false;
    model6.visible = false;
    model7.visible = false;
    model8.visible = false;
    model9.visible = false;
    model10.visible = false;
    model11.visible = false;
    model12.visible = false;
    model13.visible = false;
    model14.visible = false;

    controls.enableRotate = true;
    changeColor(model3, '#5CAEFD');
    changeColor(model2, '#5CAEFD');
    $('.t1 span').css('background', '#5CAEFD');
    addNum = 0;
    camera.position.set(100, 0, 500);
    camera.zoom = 1;
    camera.updateProjectionMatrix();
}
if (isMob) {
    $('#step>div').on('touchstart', step);
    $('#reset img').on('touchstart', reset);
    $('#check').on('touchstart', check);
    $('.addB').on('touchstart', addC);
    $('.addB').on('touchend', function() {
        $(this).css({ 'background': '#fff', 'color': '#000' });
    });
} else {
    $('#step>div').on('click', step);
    $('#reset img').on('click', reset);
    $('#check').on('click', check);
    $('.addB').on('mousedown', addC);
    $('.addB').on('mouseup', function() {
        $(this).css({ 'background': '#fff', 'color': '#000' });
    });
}