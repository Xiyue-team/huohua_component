//fastclick
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}
$(function () {
    FastClick.attach(document.body);
});
(function doThree() {
    //禁止选择
    document.onselectstart = function () {
        return false;
    };

    var isMob = /iPad|Android/g.test(navigator.userAgent);
    var wWidth = window.innerWidth;
    $('#main_left').width(wWidth - 280);
    window.onresize = function () {
        wWidth = window.innerWidth;
        if (wWidth <= 580) wWidth = 580;
        $('#main_left').width(wWidth - 280);
        var cW = $('canvas').width();
        var cH = $('canvas').height();
        $('canvas').css({
            'left': ($('#WebGLCanvas').width() - cW) / 2 + 'px',
            'top': ($('#WebGLCanvas').height() - cH) / 2 + 'px'
        });
    };
    var container;
    var camera, scene, renderer;
    var group;
    var W, H;
    var G = {};

    var controls;
    init();
    animate();

    function init() {
        container = document.getElementById('WebGLCanvas');
        W = $(container).width();
        H = $(container).height();
        camera = new THREE.PerspectiveCamera(60, W / H, 1, 2000);
        camera.position.z = 500;

        scene = new THREE.Scene();
        group = new THREE.Group();

        var geometry = new THREE.SphereGeometry(150, 36, 36);
        // earth1
        var loader = new THREE.TextureLoader();
        loader.load('image/1.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 1});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh1 = mesh;
            group.add(mesh);
        });
        // earth2
        loader.load('image/2.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 0});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh2 = mesh;
            group.add(mesh);
        });
        // earth3
        loader.load('image/3.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 0});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh3 = mesh;
            group.add(mesh);
        });
        // earth4
        loader.load('image/4.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 0});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh4 = mesh;
            group.add(mesh);
        });
        // earth5
        loader.load('image/5.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 0});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh5 = mesh;
            group.add(mesh);
        });
        // earth6
        loader.load('image/6.png', function (texture) {
            var material = new THREE.MeshBasicMaterial({map: texture, overdraw: true, transparent: true, opacity: 0});
            var mesh = new THREE.Mesh(geometry, material);
            G.mesh6 = mesh;
            group.add(mesh);
        });
        group.rotation.y = -Math.PI / 3;
        scene.add(group);

        renderer = null;
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0xFFFFFF);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(W, H);
        container.appendChild(renderer.domElement);


        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.enableRotate = true;
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.clear();
        render();
    }

    function render() {
        controls.update();
        camera.lookAt(scene.position);
        group.rotation.y += 0.001;
        renderer.render(scene, camera);
    }

    var num = 0, num_old = 1, S;

    function choose() {
        $('#ctrl div').css({'color': '#000', 'background': '#fff'});
        $(this).css({'color': '#fff', 'background': '#5caefd'});
        clearInterval(S);
        num = $(this).index() + 1;
        if (num == num_old) return;
        G['mesh1'].material.opacity = 0;
        G['mesh2'].material.opacity = 0;
        G['mesh3'].material.opacity = 0;
        G['mesh4'].material.opacity = 0;
        G['mesh5'].material.opacity = 0;
        G['mesh6'].material.opacity = 0;
        G['mesh' + num_old].material.opacity = 1;
        var hideN = num_old;
        num_old = num;
        var an = function () {
            if (G['mesh' + num].material.opacity >= 1) {
                cancelAnimationFrame(S);
                G['mesh' + hideN].material.opacity = 0;
                G['mesh' + num].material.opacity = 1;
                return;
            }
            G['mesh' + hideN].material.opacity -= 0.05;
            G['mesh' + num].material.opacity += 0.05;
            S = requestAnimationFrame(an);
        };
        an();
    }

    function reset() {
        clearInterval(S);
        $('#ctrl div').css({'color': '#000', 'background': '#fff'});
        $('#ctrl div.one').css({'color': '#fff', 'background': '#5caefd'});
        num = 0;
        num_old = 1;
        G['mesh1'].material.opacity = 1;
        G['mesh2'].material.opacity = 0;
        G['mesh3'].material.opacity = 0;
        G['mesh4'].material.opacity = 0;
        G['mesh5'].material.opacity = 0;
        G['mesh6'].material.opacity = 0;
        camera.position.set(0, 0, 500);
        group.rotation.y = -Math.PI / 3;
    }

    if (isMob) {
        $('#ctrl div').on('touchstart', choose);
        $('#reset img').on('touchstart', reset);
    } else {
        $('#ctrl div').on('click', choose);
        $('#reset img').on('click', reset);
    }
})();
