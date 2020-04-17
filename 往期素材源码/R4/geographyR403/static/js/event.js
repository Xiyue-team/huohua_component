// Events
var minvalue = 0;
var sliderR = r + 0.6;
var maxvalue = sliderR / Math.sqrt(2);
var lines = BABYLON.Mesh.CreateLines("lines", [
    new BABYLON.Vector3(0, sliderR + 0.3, 0),
    new BABYLON.Vector3(0, -sliderR - 0.3, 0)
], scene);
lines.setParent(earthgroup);
var redMat = new BABYLON.StandardMaterial("ground", scene);
redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
redMat.specularColor = new BABYLON.Color3(0, 0, 0);
redMat.emissiveColor = new BABYLON.Color3(1, 1, 1);
var dot = BABYLON.Mesh.CreateSphere("controller", 32, 1, scene);
var dots = BABYLON.Mesh.CreateSphere("dot", 32, 0.05, scene);
dots.material = redMat;
dot.position = new BABYLON.Vector3(0, sliderR, 0);
dots.position = new BABYLON.Vector3(0, sliderR, 0);
dots.setParent(dot);
dot.isVisible = false;
dots.isVisible = false;
var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
ground.rotation.x = -1 / 180 * 90 * Math.PI;
ground.isVisible = false;

var startingPoint;
var currentMesh;
var getGroundPosition = function () {
    var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
        return mesh == ground;
    });
    if (pickinfo.hit) {
        return pickinfo.pickedPoint;
    }
    return null;
}

var onPointerDown = function (evt) {
    if (evt.button !== 0) {
        return;
    }
    var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) {
        return mesh !== ground;
    });
    if (pickInfo.hit) {
        currentMesh = pickInfo.pickedMesh;
        if (currentMesh.name == "controller") {
            startingPoint = getGroundPosition(evt);
            if (startingPoint) {
                camera.detachControl(thiz.canvas);
            }
        }
    }
};

var onPointerUp = function () {
    if (startingPoint) {
        camera.attachControl(thiz.canvas, true);
        startingPoint = null;
        return;
    }
}

var onPointerMove = function (evt) {
    if (!startingPoint) {
        return;
    }
    var current = getGroundPosition(evt);
    if (!current) {
        return;
    }
    var sliderang;
    if (startingPoint.x <= maxvalue && startingPoint.x >= minvalue) {
        currentMesh.position.x = startingPoint.x;
        currentMesh.position.y = Math.sqrt(sliderR * sliderR - startingPoint.x * startingPoint.x);
        sliderang = Math.atan(currentMesh.position.x / currentMesh.position.y);
    } else if (startingPoint.x > maxvalue) {
        currentMesh.position.x = maxvalue;
        currentMesh.position.y = maxvalue;
        sliderang = 1 / 180 * 45 * Math.PI;
    } else if (startingPoint.x < minvalue) {
        currentMesh.position.x = minvalue;
        currentMesh.position.y = sliderR;
        sliderang = 0;
    }
    earthp.rotation.z = -sliderang;
    var ang = sliderang / Math.PI * 180;
    onValueChange(ang);
    console.log("黄赤交角:" + ang.toFixed(2) + "°");
    startingPoint = current;
}

canvas.addEventListener("pointerdown", onPointerDown, false);
canvas.addEventListener("pointerup", onPointerUp, false);
canvas.addEventListener("pointermove", onPointerMove, false);

scene.onDispose = function () {
    canvas.removeEventListener("pointerdown", onPointerDown);
    canvas.removeEventListener("pointerup", onPointerUp);
    canvas.removeEventListener("pointermove", onPointerMove);
}