var canvas = document.getElementById("renderCanvas");
// UI
var sceneChecked;
// Babylon
var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
var scene;
var demo = {
    constructor: createScene,
    onload: function (re) {
        // console.log(re);
    }
};
var loadCustomScene = function (demoConstructor, then) {
    // engine.displayLoadingUI();
    document.getElementById("notSupported").className = "";
    setTimeout(function () {
        scene = demoConstructor(engine);
        if (scene.activeCamera) {
            scene.activeCamera.attachControl(canvas, false);
        }
        scene.executeWhenReady(function () {
            canvas.style.opacity = 1;
            // engine.hideLoadingUI();
            if (then) {
                then(scene);
            }
        });
    }, 15);
    return;
};

// Render loop
var renderFunction = function () {
    // Fps
    // Render scene
    if (scene) {
        if (scene.activeCamera) {
            scene.render();
        }
        // Streams
        if (scene.useDelayedTextureLoading) {
            var waiting = scene.getWaitingItemsCount();
            if (waiting <= 0) {
                document.getElementById("notSupported").className = "hidden";
            }
        }else if (!sceneChecked) {
            var remaining = scene.getWaitingItemsCount();
            if (remaining === 0) {
                sceneChecked = true;
                document.getElementById("notSupported").className = "hidden";
            }
        }
    }
};

// Launch render loop
engine.runRenderLoop(renderFunction);

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});

// Check support
if (!BABYLON.Engine.isSupported()) {
    //TODO显示webgl不支持信息
} else {
    loadCustomScene(demo.constructor, demo.onload);
};
$(function () {
    $('.renderCanvas-container').height($(window).height()-76);
    engine.resize();
});