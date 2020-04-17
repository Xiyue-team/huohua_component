var VertexShader = "precision highp float;\r\n// Attributes\r\nattribute vec3 position;\r\n attribute vec3 normal;\r\nattribute vec2 uv;\r\n// Uniforms\r\nuniform mat4 worldViewProjection;\r\n// Varying\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nvoid main(void) {\r\nvec4 outPosition = worldViewProjection * vec4(position, 1.0);\r\n gl_Position = outPosition;\r\n vUV = uv;\r\n vPosition = position;\r\nvNormal = normal;\r\n}\r\n";
var FragmentShader ="precision highp float;\r\nvarying vec3 vPosition;\r\nvarying vec3 vNormal;\r\nvarying vec2 vUV;\r\nuniform mat4 world;\r\nuniform vec3 cameraPosition;\r\nuniform vec3 color1;\r\nuniform vec3 color2;\r\nuniform float lineoffset;\r\nuniform sampler2D textureSampler;\r\nvoid main(void) {\r\n vec3 vLightPosition = vec3(200,0,0);\r\nvec3 vPositionW = vec3(world * vec4(vPosition, 1.0));\r\nvec3 vNormalW = normalize(vec3(world * vec4(vNormal, 0.0)));\r\nvec3 viewDirectionW = normalize(cameraPosition - vPositionW);\r\nvec3 lightVectorW = normalize(vLightPosition - vPositionW);\r\nvec3 color = texture2D(textureSampler, vUV).rgb;\r\n// diffuse\r\n float ndl = max(0., dot(vNormalW, lightVectorW));\r\nvec3 addcolor=vec3(1,1,1);\r\nif(vPosition.y>lineoffset){\r\naddcolor=color1;\r\n}else{\r\naddcolor=color2;\r\n}\r\nvec3 angleW = normalize(viewDirectionW + lightVectorW);\r\nfloat specComp = max(0., dot(vNormalW, angleW));\r\nspecComp = pow(specComp/2., max(1., 64.)) * 2.;\r\ngl_FragColor = vec4(color * ndl*3.0+addcolor  + vec3(specComp) , 1.);\r\n}\r\n";
var isMob = /iPad|Android/g.test(navigator.userAgent);
var dot;
var camera;
function createLabel(advancedTexture, mesh, name) {
    var label = new BABYLON.GUI.Rectangle(name);
    label.background = "black"
    label.height = "36px";
    label.alpha = 0.5;
    label.width = "36px";
    label.cornerRadius = 20;
    label.thickness = 1;
    label.linkOffsetX = 30;
    advancedTexture.addControl(label);
    label.linkWithMesh(mesh);
    var text1 = new BABYLON.GUI.TextBlock();
    text1.text = name;
    text1.fontSize = "24px"
    text1.color = "white";
    label.addControl(text1);
    return text1;
}
 var canvas;
function createScene(engine) {
    var colorindex=0.2;
    var r = 3;
     canvas = engine.getRenderingCanvas();
    engine.enableOfflineSupport = false;
    var scene = new BABYLON.Scene(engine);
    var light1 = new BABYLON.DirectionalLight("Omni2", new BABYLON.Vector3(-1, 0, 0), scene);
    light1.intensity = 2;
    var lights = new BABYLON.HemisphericLight("sss", new BABYLON.Vector3(0, 1, 0), scene);
    lights.intensity = 2;
       camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 12, BABYLON.Vector3.Zero(), scene);
       camera.lowerRadiusLimit =12;
       camera.upperRadiusLimit =12;
       camera.minZ = 1.0;
          
//  var camera = new BABYLON.TargetCamera("", new BABYLON.Vector3(0, 0, -10), scene);
//  camera.setTarget(new BABYLON.Vector3(0, 0, 0));
//  camera.attachControl(canvas, false);
    camera.layerMask = 2;
    scene.activeCamera = camera;
    scene.clearColor.set(0, 0, 0.3, 1);

    BABYLON.Effect.ShadersStore["customVertexShader"] = VertexShader;
    BABYLON.Effect.ShadersStore["customFragmentShader"] = FragmentShader;
    var shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertex: "custom", fragment: "custom",
    },
        {
            attributes: ["position", "normal", "uv"],
            uniforms: ["world", "worldView", "worldViewProjection", "view", "projection"]
        });

    var mainTexture = new BABYLON.Texture("./babylon/5665_96e613415040362e27cb94c335597.jpg", scene);
    shaderMaterial.setTexture("textureSampler", mainTexture);
    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setVector3("color1", new BABYLON.Vector3(0,colorindex,0));
    shaderMaterial.setVector3("color2", new BABYLON.Vector3(colorindex,colorindex,0));//北半球
    shaderMaterial.setVector3("cameraPosition", camera.position);
    shaderMaterial.backFaceCulling = false;
    var earthgroup = new BABYLON.Mesh("g", scene);
    earthgroup.position = new BABYLON.Vector3(0, 0, 0);

    var earthp = new BABYLON.Mesh("p", scene);
    earthp.position = new BABYLON.Vector3(0, 0, 0);

    var earth = BABYLON.Mesh.CreateSphere("earth", 32, 2 * r, scene);
    earth.material = shaderMaterial;
    earth.rotation = new BABYLON.Vector3(0, 0, Math.PI);
    earthgroup.setParent(earthp);
    earth.setParent(earthgroup);



    var txt = BABYLON.Mesh.CreateSphere("txt", 4, 0.01, scene);
    txt.position = new BABYLON.Vector3(0, r/4*3, 0);
    var txt2 = BABYLON.Mesh.CreateSphere("txt2", 4, 0.01, scene);
    txt2.position = new BABYLON.Vector3(0, -r/4*3, 0);

    var advancedTexture2 = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    advancedTexture2.layer.layerMask = 2;
    var ntxt= createLabel(advancedTexture2, txt, "秋");
    var stxt= createLabel(advancedTexture2, txt2, "春");
// Another GUI on the right
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
advancedTexture.layer.layerMask = 2;

var panel3 = new BABYLON.GUI.StackPanel();
panel3.width = "220px";
panel3.fontSize = "18px";
panel3.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
panel3.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
advancedTexture.addControl(panel3);

var header = new BABYLON.GUI.TextBlock();
header.text = "黄赤交角:"+0+"°";
header.height = "60px";
header.color = "#03F1FF";
header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
header.paddingTop = "10px";
panel3.addControl(header);


    var tex=new BABYLON.Texture("./image/SPACE006SX.jpg",scene);
    var material2 = new BABYLON.StandardMaterial("kosh2", scene);
    var skybox = BABYLON.Mesh.CreateSphere("skyBox", 50, 2000, scene);
    material2.diffuseTexture=tex;
    material2.emissiveTexture=tex;
    material2.backFaceCulling = false;
    skybox.material = material2;

var sliderangular=23.26;
    var gotoautumn = true;
    function onValueChange(value) {
        advancedTexture2.layer.layerMask = 2;
        var val = value / Math.PI * 180;
        if (val >= sliderangular) {
            gotoautumn = true;
        } else if (val <= -sliderangular) {
            gotoautumn = false;
        }
        var scol;
        var ncol;
        if (val < -sliderangular) {
            scol = new BABYLON.Vector3(colorindex, 0, 0);
            stxt.text="夏";
            ntxt.text="冬";
            ncol = new BABYLON.Vector3(0, 0, colorindex);
        } else if (val > sliderangular) {
            stxt.text="冬";
            ntxt.text="夏";
            scol = new BABYLON.Vector3(0, 0, colorindex);
            ncol = new BABYLON.Vector3(colorindex, 0, 0);
        } else if (val <= sliderangular && val >= -sliderangular) {
            var valueadd = val /sliderangular;
            if (gotoautumn == true) {
                if (valueadd > 0) {
                    ncol = new BABYLON.Vector3(colorindex,colorindex - colorindex * valueadd, 0);//夏到秋
                    scol = new BABYLON.Vector3(0,colorindex - colorindex * valueadd,colorindex * valueadd);//冬到春
                } else {
                    ncol = new BABYLON.Vector3(colorindex + colorindex * valueadd, colorindex + colorindex * valueadd, -colorindex * valueadd);//秋到冬
                    scol = new BABYLON.Vector3(-colorindex * valueadd,colorindex + colorindex * valueadd,0);//春到夏
                }
                stxt.text="春";
                ntxt.text="秋";
            } else {
                if (valueadd <= 0) {
                    ncol = new BABYLON.Vector3(0, colorindex + colorindex * valueadd, - colorindex * valueadd);//冬到春
                    scol = new BABYLON.Vector3(colorindex,colorindex + colorindex * valueadd, 0);//夏到秋
                } else {
                    ncol = new BABYLON.Vector3(colorindex * valueadd, colorindex - colorindex * valueadd, 0);//春到夏
                    scol = new BABYLON.Vector3( colorindex - colorindex * valueadd, colorindex - colorindex * valueadd,colorindex * valueadd);//秋到冬
                }
                stxt.text="秋";
                ntxt.text="春";
                //绿：0,1,0  红：1,0,0  黄：1,1,0  蓝：0,0,1
            }
        }
        shaderMaterial.setVector3("color1", scol);
        shaderMaterial.setVector3("color2", ncol);//北半球
        //极端情况
        if (val == -90 || val == 90) {
            advancedTexture2.layer.layerMask = 5;
            var colorgray = new BABYLON.Vector3(0.3, 0.3, 0.3);
            shaderMaterial.setVector3("color1", colorgray);
            shaderMaterial.setVector3("color2", colorgray);
        }
    }


    // Events
    var sliderR = r + 0.6;
    var minvalue = -sliderR;
    var maxvalue = sliderR;
//  var lines = BABYLON.Mesh.CreateLines("lines", [
//      new BABYLON.Vector3(0, sliderR + 0.3, 0),
//      new BABYLON.Vector3(0, -sliderR - 0.3, 0)
//  ], scene);
//  lines.setParent(earthgroup);
     var cylinder = BABYLON.Mesh.CreateCylinder("cylinder",2*sliderR + 0.6, 0.05, 0.05, 16, 1, scene);
    var cylinderMat = new BABYLON.StandardMaterial("cylinder", scene);
//  cylinderMat.alpha=0;
    cylinderMat.emissiveColor = BABYLON.Color3.Gray();
    cylinder.material = cylinderMat;
    cylinder.setParent(earthgroup);
    var redMat = new BABYLON.StandardMaterial("ground", scene);
    redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    redMat.specularColor = new BABYLON.Color3(0, 0, 0);
    dot = BABYLON.Mesh.CreateSphere("nocontroller", 32, 0.8, scene);
    var dots = BABYLON.Mesh.CreateSphere("dot", 32, 0.05, scene);
    dots.material = redMat;
    dot.position = new BABYLON.Vector3(0, sliderR, 0);
    dots.position = new BABYLON.Vector3(0, sliderR, 0);
    dots.setParent(dot);
    dots.isVisible = false;
    dot.isVisible = false;
    var ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 1, scene, false);
    ground.rotation.x = -1 / 180 * 90 * Math.PI;
    ground.isVisible = false;
    
    var startingPoint;
    var currentMesh;
    var getGroundPosition = function () {
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) { return pickinfo.pickedPoint; }
        return null;
    }
    camera.attachControl(canvas, false);
    var onPointerDown = function (evt) {
        if (evt.button !== 0) { return; }
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== ground; });
        if (pickInfo.hit) {
            currentMesh = pickInfo.pickedMesh;
            if (currentMesh.name == "controller") {
                startingPoint = getGroundPosition(evt);
                if (startingPoint) {
                    setTimeout(function () {
//                      camera.detachControl(canvas);
                    }, 0);
                }
            }
        }
    }

    var onPointerUp = function () {
        if (startingPoint) {
//          camera.attachControl(canvas, true);
            startingPoint = null;
            return;
        }
    }

    var onPointerMove = function (evt) {
        if (!startingPoint) { return; }
        var current = getGroundPosition(evt);
        if (!current) { return; }
        var sliderang;
        if (startingPoint.x <= maxvalue && startingPoint.x >= minvalue) {
            currentMesh.position.x = startingPoint.x;
            currentMesh.position.y = Math.sqrt(sliderR * sliderR - startingPoint.x * startingPoint.x);
            sliderang = Math.atan(currentMesh.position.x / currentMesh.position.y);
        } else if (startingPoint.x > maxvalue) {
            currentMesh.position.x = maxvalue;
            currentMesh.position.y = 0;
            sliderang = 1 / 180 * 90 * Math.PI;
        } else if (startingPoint.x < minvalue) {
            currentMesh.position.x = minvalue;
            currentMesh.position.y = 0;
            sliderang = -1 / 180 * 90 * Math.PI;
        }
        
        var slidervalue = currentMesh.position.x / sliderR / 180 * 90 * Math.PI;
        onValueChange(slidervalue);
        var ang=sliderang/Math.PI*180;
        header.text = "黄赤交角:"+ang.toFixed(2)+"°";
        earthp.rotation.z = -sliderang;
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



    $('#clear').on('click', function () {
        onValueChange(0);
        earthp.rotation.z = 0;
        header.text = "黄赤交角:0°";
        dot.position = new BABYLON.Vector3(0, sliderR, 0);
         checked=false;
        dot.name = "nocontroller";
          camera.attachControl(canvas, false);
          camera.radius=12;
          camera.alpha=0;
    camera.beta=0;
        $('#check>span').css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
    });
    var alpha = 0;
    scene.registerBeforeRender(function () {
        earthgroup.rotation = new BABYLON.Vector3(0, -alpha, 0);
        alpha += 0.002;
    });
    
    return scene;
}
var checked=false;
function check(){
    if(checked){
        $(this).css('background','#F0F0F0').children().css({'left':'2px','right':'auto'});
        checked=false;
        dot.name = "nocontroller";
          camera.attachControl(canvas, false);
    }else{
        $(this).css('background','#5CAEFD').children().css({'right':'2px','left':'auto'});
        checked=true;
        
         dot.name = "controller";
         camera.detachControl(canvas);
    }
}
if(isMob){
    $('#check>span').on('touchstart',check);
}else{
    $('#check>span').on('click',check);
}