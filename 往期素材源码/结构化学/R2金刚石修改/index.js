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
// var zoom = 1;
// if (wHeight < 580) {
//     zoom = 0.8
//     $('#main_right').css('zoom', zoom);
// }
// $('#main_left').width(wWidth - 280 * zoom);
// $('#threeContainer').height(wHeight - 80);
window.onresize = function () {
    wWidth = window.innerWidth;
    if (wWidth <= 580) wWidth = 580;
    $('#main_left').width(wWidth - 280);
    $('#threeContainer').height(wHeight - 80);
    var cW = $('#threeContainer canvas').width();
    var cH = $('#threeContainer canvas').height();
    $('#threeContainer canvas').css({
        'left': ($('#threeContainer').width() - cW) / 2 + 'px',
        'top': ($('#threeContainer').height() - cH) / 2 + 'px'
    });
    offsetLeft = parseInt($('canvas').offset().left);
    offsetTop = parseInt($('canvas').offset().top);
}

var threeW = $('#threeContainer').width();
var threeH = $('#threeContainer').height();
var container, camera, renderer, scene, controls,roateAble = false;

//初始化three场景
function init() {
    container = $('#threeContainer')[0];
    camera = new THREE.OrthographicCamera(threeW / -1, threeW / 1, threeH / 1, threeH / -1, 1, 4000);
    camera.position.set(100, 0, 1000);
    // scene
    scene = new THREE.Scene();
    //light
    var dirLight1 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight1.position.set(200, 200, 100);
    var dirLight2 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight2.position.set(-200, -200, -100);
    scene.add(dirLight1, dirLight2);
    //判断是否支持webGL
    renderer = null;
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(threeW, threeH);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    //控制
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
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
    $('#left_img').css('display', 'block');
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
    $('#left_img').css('display', 'block');
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


renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
// renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
// renderer.domElement.addEventListener( 'touchmove', onDocumentTouchMove, false );
renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

function createText(texts, x, y, z, color, size) {
    var SpriteText2D = THREE_Text.SpriteText2D;
    var textAlign = THREE_Text.textAlign;
    var textStyle = {align: textAlign.center, font: size + 'px "Cambria Math"', fillStyle: color, antialias: true};
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
        lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color}));
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
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
        }
    };
    var onError = function (xhr) {
    };
    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath('obj/');
    mtlLoader.load(mtl, function (materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/');
        objLoader.load(obj, function (object) {
            if (mtl == 'cut.mtl') {
                object.traverse(function (child) {
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
            if(window.innerWidth<500||window.innerHeight<500) {

                object.scale.x = scale-1;
                object.scale.y = scale-1;
                object.scale.z = scale-1;
           object.position.set(0,150,0)
            }
            else {
                object.scale.x = scale;
                object.scale.y = scale;
                object.scale.z = scale;
            }
            O.add(object);
            callback && callback(O);
        }, onProgress, onError);
    });
}
function onlodImg(src,callback) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
        $('#left_img').attr('src', img.src);
        $('#left_img').css('display', 'block');
        callback && callback();
    };
}

let rotateNum = 0, rotateTime = null;


function rotate(value) {
    $('#ctrl').addClass('noClick');
    controls.enableRotate = false;
    if (value === 0) {
        rotateTime = function () {
            if (rotateNum >= 90) {
                cancelAnimationFrame(rotateTime);
                rotateTime = null;
                rotateNum = 0;
                $('#ctrl').removeClass('noClick');
                controls.enableRotate = true;
                return;
            }
            rotateNum++;
            model1.rotation.y = rotateNum * Math.PI / 90;
            model2.rotation.y = rotateNum * Math.PI / 90;
            model3.rotation.y = rotateNum * Math.PI / 90;
            model4.rotation.y = rotateNum * Math.PI / 90;
            model5.rotation.y = rotateNum * Math.PI / 90;
            if (rotateTime) {
                requestAnimationFrame(rotateTime);
            }
        };
        rotateTime();
        onlodImg('image/2.png');
    } else if (value === 1) {
        rotateTime = function () {
            if (rotateNum >= 90) {
                cancelAnimationFrame(rotateTime);
                rotateTime = null;
                rotateNum = 0;
                $('#ctrl').removeClass('noClick');
                controls.enableRotate = true;
                return;
            }
            rotateNum++;
            model1.rotation.y = rotateNum * Math.PI / 90;
            model2.rotation.y = rotateNum * Math.PI / 90;
            model3.rotation.y = rotateNum * Math.PI / 90;
            model4.rotation.y = rotateNum * Math.PI / 90;
            if (rotateTime) {
                requestAnimationFrame(rotateTime);
            }
        };
        rotateTime();
        onlodImg('image/3.png');
    } else if (value === 2) {
        rotateTime = function () {
            if (rotateNum >= 90) {
                cancelAnimationFrame(rotateTime);
                rotateTime = null;
                rotateNum = 0;
                $('#ctrl').removeClass('noClick');
                controls.enableRotate = true;
                return;
            }
            rotateNum++;
            model12.rotation.y = rotateNum * Math.PI / 90;
            model13.rotation.y = rotateNum * Math.PI / 90;
            model14.rotation.y = rotateNum * Math.PI / 90;
            if (rotateTime) {
                requestAnimationFrame(rotateTime);
            }
        };
        rotateTime();
        onlodImg('image/4.png');
    } else if (value === 3) {
        rotateTime = function () {
            if (rotateNum >= 90) {
                cancelAnimationFrame(rotateTime);
                rotateTime = null;
                rotateNum = 0;
                $('#ctrl').removeClass('noClick');
                controls.enableRotate = true;
                var op = 1;
                ST = setTimeout(function () {
                    S = setInterval(function () {
                        if (op <= 0) {
                            clearInterval(S);
                            controls.enableRotate = true;
                            model6.visible = false;
                            model7.visible = false;
                            $('#check').show();
                            $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
                            checked = false;
                            return;
                        }
                        op -= 0.1;
                        changOpacity(model6, op);
                        changOpacity(model7, op);
                    }, 80)
                }, 1000);
                return;
            }
            rotateNum++;
            model6.rotation.y = rotateNum * Math.PI / 90;
            model7.rotation.y = rotateNum * Math.PI / 90;
            model8.rotation.y = rotateNum * Math.PI / 90;
            model9.rotation.y = rotateNum * Math.PI / 90;
            model10.rotation.y = rotateNum * Math.PI / 90;
            if (rotateTime) {
                requestAnimationFrame(rotateTime);
            }

        };
        rotateTime();
        onlodImg('image/5.png');
    }else if(value === 4){
        roateAble = true;
        rotateTime = function () {
            if(!roateAble){
                cancelAnimationFrame(rotateTime);
                rotateTime = null;
                rotateNum = 0;
                $('#ctrl').removeClass('noClick');
                controls.enableRotate = true;
                return;
            }
            if (rotateNum === 90) {
                $('#left_img').fadeOut(1000,function () {
                    onlodImg('image/7.png',function () {
                        settime = setTimeout(function () {
                            $('#left_img').fadeOut(1000,function () {
                                onlodImg('image/8.png');
                                roateAble = false;
                            });
                        },2000);
                    });
                });
            }
            rotateNum++;
            model10.rotation.y = rotateNum * Math.PI / 180;
            model11.rotation.y = rotateNum * Math.PI / 180;
            model12.rotation.y = rotateNum * Math.PI / 180;
            if (rotateTime) {
                requestAnimationFrame(rotateTime);
            }
        };
        rotateTime();
        onlodImg('image/6.png');
    }
}

modelPut('botton.obj', 'botton.mtl', model1, 6, function (O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('top.obj', 'top.mtl', model2, 6, function (O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('mid.obj', 'mid.mtl', model3, 6, function (O) {
    changeColor(O, '#5CAEFD');
    // addSelectobjs(O)
});
modelPut('gun.obj', 'gun.mtl', model4, 6, function (O) {
    changeColor(O, '#eee');
    // addSelectobjs(O)
});
modelPut('line.obj', 'line.mtl', model5, 6);
modelPut('a2.obj', 'a2.mtl', model6, 6, function (O) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.transparent = true;
        G[i].material.color.set('#5CAEFD');
    }
});
modelPut('a3.obj', 'a3.mtl', model7, 6, function (O) {
    var G = O.children[0].children;
    for (var i = 0; i < G.length; i++) {
        G[i].material.transparent = true;
        G[i].material.color.set('#eee');
    }
})
modelPut('b2.obj', 'b2.mtl', model8, 6);
modelPut('b3.obj', 'b3.mtl', model9, 6, function (O) {
    changeColor(O, '#eee');
});
modelPut('c.obj', 'c.mtl', model10, 6);
modelPut('cut.obj', 'cut.mtl', model11, 6);
modelPut('o1.obj', 'o1.mtl', model12, 4, function (O) {
    O.position.set(0, -50, 0);
    changeColor(O, '#eee');
});
modelPut('o2.obj', 'o2.mtl', model13, 4, function (O) {
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
modelPut('o3.obj', 'o3.mtl', model14, 4, function (O) {


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

var S, ST, stepNum = 10,settime;

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
    $('#step>div').css({'background': '#fff', 'color': '#000'});
    $(this).css({'background': '#5CAEFD', 'color': '#fff'});
    stepNum = index;
    $('#addC,#check').hide();
    if (index == 0) {
        $('#check').hide();
        checked = false;
        $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
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
        rotate(0);
    } else if (index == 1) {
        $('#check').hide();
        checked = false;
        $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
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
        rotate(1);
    } else if (index == 2) {
        addNum = 0;
        $('.t1 span').css('background', '#5CAEFD');
        model12.visible = true;
        model13.visible = true;
        model14.visible = true;
        changeColor(model14, '#f00');
        model14.children[0].children[23].material = new THREE.MeshPhongMaterial({color: '#000'});
        $('#addC').show();
        rotate(2);
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

        controls.enableRotate = false;
        rotate(3);
    }
}

var checked = false;

function check() {
    if (checked) {
        $(this).children('span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
        checked = false;
        // scene.remove(model11);
        // scene.add(model8, model9);
        model11.visible = false;
        model8.visible = model9.visible = true;
        model9.rotation.y = Math.PI/2;
        model8.rotation.y = Math.PI/2;
    } else {
        $(this).children('span').css('background', '#5CAEFD').children().css({'right': '2px', 'left': 'auto'});
        checked = true;
        // scene.add(model11);
        // scene.remove(model8, model9);
        model11.visible = true;
        // model11.rotation.y = Math.PI/3;
        model8.visible = model9.visible = false;
        rotate(4);
    }
}

var addNum = 0;

function addC() {
    addNum++;
    if (addNum > 12) return;
    $('.t1 span:lt(' + addNum + ')').css('background', '#D5D5D5');
    $(this).css({'background': '#5CAEFD', 'color': '#fff'});
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
                model14.children[0].children[i].material = new THREE.MeshPhongMaterial({color: '#f00'});
            } else {
                model14.children[0].children[i].material = new THREE.MeshPhongMaterial({color: '#5CAEFD'});
            }
            if (i == '23') {
                model14.children[0].children[23].material = new THREE.MeshPhongMaterial({color: '#000'});
            }
        }
    }
}

function reset() {
    cancelAnimationFrame(rotateTime);
    onlodImg('image/1.png');

    roateAble = false;
    rotateTime = null;
    rotateNum = 0;
    $('#ctrl').removeClass('noClick');
    stepNum = 10;
    clearTimeout(ST);
    clearTimeout(settime);
    clearInterval(S);
    $('#step>div').css({'background': '#fff', 'color': '#000'});
    $('#step>div.step1').css({'background': '#5CAEFD', 'color': '#fff'});
    $('#check,#addC').hide();
    checked = false;
    $('#check>span').css('background', '#F0F0F0').children().css({'left': '2px', 'right': 'auto'});
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
    $('#left_img').stop().css({
        'display':'none',
        'opacity':'1'
    });
}

if (isMob) {
    $('#step>div').on('touchstart', step);
    $('#reset img').on('touchstart', reset);
    $('#check').on('touchstart', check);
    $('.addB').on('touchstart', addC);
    $('.addB').on('touchend', function () {
        $(this).css({'background': '#fff', 'color': '#000'});
    });
    $('#mask').on('touchstart',function () {
        $('#mask').css('display', 'none');
        $('#tip_img').css('display', 'none');
    });
    $('#tip_img').on('touchstart',function () {
        $('#mask').css('display', 'none');
        $('#tip_img').css('display', 'none');
    })
} else {
    $('#step>div').on('click', step);
    $('#reset img').on('click', reset);
    $('#check').on('click', check);
    $('.addB').on('mousedown', addC);
    $('.addB').on('mouseup', function () {
        $(this).css({'background': '#fff', 'color': '#000'});
    });
    $('#mask').on('click',function () {
        $('#mask').css('display', 'none');
        $('#tip_img').css('display', 'none');
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    })
    $('#tip_img').on('click',function () {
        $('#mask').css('display', 'none');
        $('#tip_img').css('display', 'none');
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    })

}
