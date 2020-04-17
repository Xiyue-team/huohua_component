<template>
    <div class="renderCanvas" id="renderCanvas" ref="renderCanvas">
        <div v-show="markT" style="position:absolute; width:100%;height: 100%;z-index:2;display: flex;justify-content: center;background-color:#292929">
            <img src="static/UI/Group 6.png" style="height:100%;width:auto;">
        </div>
        <div id="loading" v-show="loadingF">
            <div>loading...</div>
        </div>
        <ui-btn style="z-index: 3" type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
        <ui-btn style="z-index: 3" type="switch" class="checkedBtn" v-model="checked">辅助线</ui-btn>
    </div>
</template>
<script>
/* global THREE:true */
/* global $:true */
import uiBtn from '@/components/UI/uiBtn'
export default {
    data() {
        return {
            loadingF: true,
            checked: false,
            camera: '',
            markT: false
        }
    },
    components: {
        uiBtn
    },
    watch: {
        checked(val) {
            if (val) {
                this.markT = true
            } else {
                this.markT = false
            }
        }
    },
    created() {
        this.WIDTH = window.innerWidth
        this.HEIGHT = window.innerHeight
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.group4 = new THREE.Group()
        this.VIEW_ANGLE = 60
        this.ASPECT = this.WIDTH / this.HEIGHT
        this.NEAR = 1
        this.FAR = 10000
        this.raycaster = new THREE.Raycaster()
        this.plane = new THREE.Plane()
        this.offset = new THREE.Vector3()
        this.intersection = new THREE.Vector3()
        this.mouse = new THREE.Vector2()
        this.INTERSECTED = null
        this.mousedownflag = false
        this.luminescence = false
        this.nameF = null
        this.touchFirst = false
        this.fragmentary = new THREE.Group()
        this.markT = false
        // 首次静态点
    },
    mounted() {
        this.createRender()
        this.createScene()
        this.creatCamera()
        this.createMirror()
        this.createModel()
        this.createLight()
        this.createSky()
        this.resize()
        this.animate()
    },
    methods: {
        createRender() {
            let renderCanvas = this.$refs.renderCanvas;
            this.left = renderCanvas.getBoundingClientRect().left
            this.top = renderCanvas.getBoundingClientRect().top
            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.renderer.setClearColor('#292929')
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(this.WIDTH, this.HEIGHT)
            this.renderer.domElement.addEventListener('mousedown', this.onDocumentMouseDown, false);
            this.renderer.domElement.addEventListener('touchstart', this.onDocumentTouchStart, false);
            $(' #renderCanvas ').append(this.renderer.domElement)
        },
        createScene() {
            this.scene = new THREE.Scene()
        },
        creatCamera() {
            this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.ASPECT, this.NEAR, this.FAR);
            this.camera.rotation.y = Math.PI
            this.camera.position.set(0, -100, 500)
            this.cameraControls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.cameraControls.target.set(0, 0, 0)
            this.cameraControls.saveState()
            this.cameraControls.dampingFactor = 0.25;
            this.cameraControls.maxDistance = 150
            this.cameraControls.minDistance = 100
            this.cameraControls.minAzimuthAngle = -Math.PI / 4.5; // radians
            this.cameraControls.maxAzimuthAngle = Math.PI / 4.5; // radians
            this.cameraControls.minPolarAngle = Math.PI / 2.2; // radians
            this.cameraControls.maxPolarAngle = Math.PI / 2.2; // radians
            this.cameraControls.update()
        },
        createSky() {
            let path = 'static/UI/'; // 设置路径
            let directions = ['posx', 'negx', 'posy', 'negy', 'posz', 'negz']; // 获取对象
            let format = '.jpg'; // 格式
            // 创建盒子，并设置盒子的大小为( 5000, 5000, 5000 )
            let skyGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
            // 设置盒子材质
            let materialArray = [];
            for (let i = 0; i < 6; i++) {
                materialArray.push(new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(path + directions[i] + format), // 将图片纹理贴上
                    side: THREE.BackSide
                }));
            }
            let skyMaterial = new THREE.MeshFaceMaterial(materialArray);
            let skyBox = new THREE.Mesh(skyGeometry, skyMaterial); // 创建一个完整的天空盒，填入几何模型和材质的参数
            this.scene.add(skyBox)
        },
        createLight() {
            let d = 50
            let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.3)
            let dirLight = new THREE.DirectionalLight(0xffffff, 0.3)
            let dirLight1 = dirLight.clone()
            hemiLight.position.set(0, 60, 20)
            dirLight.color.setHSL(0.1, 1, 0.95)
            dirLight.position.set(-1, 1.75, 1)
            dirLight.position.multiplyScalar(30)
            dirLight.castShadow = true
            dirLight.shadow.mapSize.width = 2048
            dirLight.shadow.mapSize.height = 2048
            dirLight.shadow.camera.left = -d
            dirLight.shadow.camera.right = d
            dirLight.shadow.camera.top = d
            dirLight.shadow.camera.bottom = -d
            dirLight.shadow.camera.far = 3500
            dirLight.shadow.bias = -0.0001
            dirLight1.position.set(1, -1.75, -1)
            dirLight1.intensity = 0.4
            this.scene.add(new THREE.AmbientLight('#f0f0f0', 0.5), hemiLight, dirLight)
        },
        createModel() {
            let model4X = null,
                effectFXAA,
                outlinePass,
                selectedObjects = []
            let thiz = this
            this.model4 = null
            this.composer = null
            this.dragGroup = null
            this.modelLGBL = null
            this.selectobjs = []
            this.selectobjs1 = []
            this.modelLG4 = null

            function modelPut(obj, mtl, callback) {
                let onProgress = function(xhr) {
                    if (xhr.lengthComputable) {
                        let percentComplete = xhr.loaded / xhr.total * 100;
                        console.log(Math.round(percentComplete, 2) + '% downloaded');
                    }
                };
                let onError = function(xhr) {};
                let mtlLoader = new THREE.MTLLoader();
                mtlLoader.setPath('static/model/');
                mtlLoader.load(mtl, function(materials) {
                    materials.preload();
                    let objLoader = new THREE.OBJLoader();
                    objLoader.setMaterials(materials);
                    objLoader.setPath('static/model/');
                    objLoader.load(obj, function(object) {
                        let helperBox = new THREE.BoxHelper(object, 0xff0000)
                        helperBox.update()
                        object.children[0].geometry.computeBoundingBox()
                        object.children[0].position.y = (object.children[0].geometry.boundingBox.max.y + object.children[0].geometry.boundingBox.min.y) / 2
                        object.children[0].position.z = (object.children[0].geometry.boundingBox.max.z + object.children[0].geometry.boundingBox.min.z) / 2
                        object.children[0].geometry.center()
                        object.children[3].geometry.computeBoundingBox()
                        object.children[3].position.y = (object.children[3].geometry.boundingBox.max.y + object.children[3].geometry.boundingBox.min.y) / 2
                        object.children[3].geometry.center()
                        thiz.object33 = object
                        for (let i in materials.materials) {
                            let name = materials.materials[i].name;
                            if (name === 'blinn5SG') {
                                materials.materials[i].color = new THREE.Color(0.2, 0.2, 0.2); // 滑杆与底座
                            } else if (name === 'blinn4SG') {
                                materials.materials[i].color = new THREE.Color(0.5, 0.5, 0.5); // 尺子刻度
                            } else if (name === '_blinn2SG') {
                                materials.materials[i].color = new THREE.Color(0.1, 0.1, 0.1); // 尺子
                            }
                        }
                        object.traverse((node) => {
                            if (node.isMesh) {
                                let name = node.name;
                                if (name.includes('xkcx_dangban') || name.includes('guangping')) {
                                    node.visible = false
                                } else if (name.includes('xkcx_4')) { // 数字4
                                    node.visible = false;
                                    node.material.transparent = true;
                                    node.material.opacity = 0.2;
                                    node.material = new THREE.MeshPhongMaterial({
                                        color: '#FFB863',
                                        transparent: true
                                    });
                                    model4X = node;
                                    model4X.material.opacity = 0.5;
                                    thiz.model4 = node.clone();
                                    thiz.model4.visible = true;

                                    thiz.model4.material = new THREE.MeshPhongMaterial({
                                        color: '#FFB863'
                                    });
                                } else if (name.includes('xkcx_hengla_4')) { // 数字4支台
                                    thiz.modelLG4 = node;
                                    thiz.modelLG4.visible = false
                                } else if (name.includes('xkcx_hengla_dangban')) { // 玻璃支台
                                    this.modelLGBL = node;
                                } else if (node.material.name === 'blinn5SG' || node.name === 'xiaokongchengxiang xkcx_chizi' || node.name === 'xiaokongchengxiang xkcx_dizuo_front' || node.name === 'xiaokongchengxiang xkcx_dizuo_back') {
                                    node.visible = false
                                }
                            }
                        });
                        thiz.model4.material.depthTest = true
                        thiz.modelLG4.material.depthTest = true
                        thiz.model4.scale.set(1.5, 1.5, 1.5)
                        thiz.model4.position.z = 40
                        thiz.model4.position.y = 5
                        thiz.model4.rotateY(-Math.PI / 2)

                        // thiz.selectobjs1.push(thiz.modelLG4, thiz.model4, model4X);
                        thiz.scene.add(object, thiz.group4)
                        thiz.group4.add(thiz.model4)
                        thiz.group4.position.z = 10
                        thiz.group4.position.x = -23
                        thiz.loadingF = false
                        thiz.maskShow = true
                        thiz.loadingF = false
                        // thiz.createLine()
                        callback && callback()
                    }, onProgress, onError);
                });
            }

            let materialChange = () => {
                this.composer = new THREE.EffectComposer(thiz.renderer);
                let renderPass = new THREE.RenderPass(thiz.scene, thiz.camera);
                this.composer.addPass(renderPass);
                outlinePass = new THREE.OutlinePass(new THREE.Vector2(this.WIDTH / 1000, this.HEIGHT / 1000), thiz.scene, thiz.camera);
                this.composer.addPass(outlinePass);
                effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
                effectFXAA.uniforms['resolution'].value.set(1 / this.WIDTH, 1 / this.HEIGHT);
                effectFXAA.renderToScreen = true;
                this.composer.addPass(effectFXAA);
                selectedObjects = [];
                selectedObjects.push(thiz.model4);
                outlinePass.selectedObjects = selectedObjects;
                outlinePass.edgeStrength = 2.5;
                outlinePass.edgeGlow = 0;
                outlinePass.edgeThickness = 4;
                outlinePass.visibleEdgeColor.set('#ffb863');
                outlinePass.hiddenEdgeColor.set('#000');
                this.selectobjs1.push(this.plane1)
            }
            modelPut('xiaokongchengxiang_7_17_d.obj', 'xiaokongchengxiang_7_17_d.mtl', materialChange)
        },
        createMirror() {
            let geometry0 = new THREE.SphereGeometry(80, 36, 36, 0, Math.PI, 0, Math.PI)
            this.verticalMirror = new THREE.Reflector(geometry0, {
                clipBias: 0,
                textureWidth: this.WIDTH * window.devicePixelRatio,
                textureHeight: this.HEIGHT * window.devicePixelRatio,
                color: '#808080',
                recursion: 0,
                transparent: true,
                side: THREE.FrontSide,
                opacity: 0
            })
            this.verticalMirror.position.x = 0
            this.verticalMirror.position.y = 0
            this.verticalMirror.position.z = 0
            let background = new THREE.CircleBufferGeometry(20, 36)
            let materialBack = new THREE.MeshBasicMaterial({
                color: '#999999',
                transparent: true,
                opacity: 1,
                side: THREE.DoubleSide
            })
            let backMesh = new THREE.Mesh(background, materialBack)
            this.verticalMirror.add(backMesh)
            // this.verticalMirror.position.y = -5
            this.verticalMirror.scale.set(0.6, 0.6, 0.4)
            let points = [],
                length = 100,
                circle = 50.1;
            for (let i = 0; i <= length; i += 1) {
                points.push(new THREE.Vector2(circle * Math.cos(Math.PI * 2 * i / length), circle * Math.sin(Math.PI * 2 * i / length)))
            }
            points.push(points[0])
            let shape = new THREE.Shape(points);
            let hole = new THREE.Path(); // 添加“眼睛”孔洞1
            hole.absellipse(0, 0, 48.5, 48.5, 0, Math.PI * 2, false);
            shape.holes.push(hole);
            let option = {
                amount: 0.1,
                bevelThickness: 1,
                bevelSize: 1,
                bevelSegments: 50,
                bevelEnabled: true,
                curveSegments: 50,
                steps: 2
            }
            let arcGeometry = new THREE.ExtrudeGeometry(shape, option)

            let arc = new THREE.Mesh(arcGeometry, new THREE.MeshPhongMaterial({
                side: THREE.DoubleSide,
                color: '#0099FF',
                specular: '#0099FF',
                shininess: 20
            }))

            arc.position.set(0, 0, -1.1)
            arc.rotateY(100 * Math.PI / 100)
            this.planeG = new THREE.BoxGeometry(30, 30, 30)
            this.planeM = new THREE.MeshBasicMaterial({
                transparent: true,
                color: '#FF0000',
                opacity: 0
            })
            this.plane1 = new THREE.Mesh(this.planeG, this.planeM)
            this.plane1.position.set(0, 0, 20)
            this.scene.add(arc, this.verticalMirror)
            this.group4.add(this.plane1)
        },
        Move(f, x, y) {
            if (f) {} else {
                y = y + 5
                let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                r = Math.abs(r)
                if (r > 26) {
                    let k = y / x
                    let ang = Math.atan(k)
                    if (x < 0) {
                        ang = ang + Math.PI
                    }
                    x = Math.cos(ang) * 26
                    y = Math.sin(ang) * 26
                    this.group4.position.x = x
                    this.group4.position.y = y
                } else {
                    this.group4.position.x = x
                    this.group4.position.y = y
                }
            }
        },
        animate() {
            requestAnimationFrame(this.animate)
            this.renderer.clear();
            this.renderer.render(this.scene, this.camera)
            if (this.luminescence) {
                // this.composer.render()
            }
        },
        resize() {
            window.onresize = () => {
                window.resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
                this.camera.aspect = window.innerWidth / window.innerHeight;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(window.innerWidth, window.innerHeight);
                this.left = parseInt($('#renderCanvas').offset().left);
                this.top = parseInt($('#renderCanvas').offset().top);
                this.WIDTH = $('#renderCanvas').width();
                this.HEIGHT = $('#renderCanvas').height();
                this.width = $('#renderCanvas').width();
                this.height = $('#renderCanvas').height();
            }
        },
        reset() {
            this.group4.position.set(-23, 0, 10)
            this.cameraControls.reset()
            this.checked = false
        },
        onDocumentMouseDown(event) {
            event.preventDefault()
            let mouse = {}
            mouse.x = ((event.clientX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.clientY - this.top) / this.height) * 2 + 1;
            this.mousedownHandle(mouse);
        },
        onDocumentTouchStart(event) {
            event.preventDefault()
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - this.top) / this.height) * 2 + 1;
            this.mousedownHandle(mouse);
        },
        onDocumentMouseMove(event) {
            event.preventDefault()
            let mouse = {};
            mouse.x = ((event.clientX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.clientY - this.top) / this.height) * 2 + 1;
            this.mouseMoveHandle(mouse);
        },
        onDocumentTouchMove(event) {
            event.preventDefault()
            let mouse = {};
            mouse.x = ((event.touches[0].pageX - this.left) / this.width) * 2 - 1;
            mouse.y = -((event.touches[0].pageY - this.top) / this.height) * 2 + 1;
            this.mouseMoveHandle(mouse);
        },
        onDocumentMouseUp(event) {
            event.preventDefault()
            this.touchFirst = false
            this.cameraControls.enableRotate = true
            this.mousedownflag = false
            this.selectobj = null
            this.renderer.domElement.removeEventListener('mousemove', this.onDocumentMouseMove)
            window.removeEventListener('mouseup', this.onDocumentMouseUp)
            this.renderer.domElement.removeEventListener('touchmove', this.onDocumentTouchMove)
            this.renderer.domElement.removeEventListener('touchend', this.onDocumentMouseUp)
        },
        mousedownHandle(mouse) {
            this.raycaster.setFromCamera(mouse, this.camera);
            let intersects = this.raycaster.intersectObjects(this.selectobjs1)
            if (intersects.length > 0) {
                this.selectobj = intersects[0].object
                this.cameraControls.enableRotate = false
                this.renderer.domElement.addEventListener('mousemove', this.onDocumentMouseMove, false)
                window.addEventListener('mouseup', this.onDocumentMouseUp, false)
                this.renderer.domElement.addEventListener('touchmove', this.onDocumentTouchMove, false)
                this.renderer.domElement.addEventListener('touchend', this.onDocumentMouseUp, false)
                this.mousedownflag = true
                if (!this.luminescence) {
                    this.luminescence = true
                }
                this.nameF = false;
            }
        },
        mouseMoveHandle(mouse) {
            this.raycaster.setFromCamera(mouse, this.camera)
            let intersects = this.raycaster.intersectObjects(this.selectobjs1)
            if (intersects.length > 0) {
                if (this.INTERSECTED !== intersects[0].object) {
                    this.INTERSECTED = intersects[0].object
                    this.plane.setFromNormalAndCoplanarPoint(this.camera.getWorldDirection(this.plane.normal), this.INTERSECTED.position)
                }
            }
            if (this.mousedownflag) {
                if (this.raycaster.ray.intersectPlane(this.plane, this.intersection)) {
                    let obj = this.intersection.sub(this.offset),
                        x, y
                    x = obj.x.toFixed(1) - 0
                    y = obj.y.toFixed(1) - 0
                    if (!this.touchFirst) {
                        this.touchFirst = true
                        return;
                    }
                    this.Move(this.nameF, x, y)
                }
            }
        }
    }
}

</script>
<style scoped>
*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
}

#loading {
    width: 100%;
    height: 100%;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
}

#loading>div {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
}

.aside_reset {
    margin: 20px 24px;
    float: right;
    position: fixed;
    right: 0;
    top: 0;
}

.checkedBtn {
    width: 180px;
    position: absolute;
    bottom: 20px;
    right: 24px;
}

.UI-btn {
    /* background-color:#4a4a4a4a!important ;*/
}

.btn-switch p {
    color: #000000!important;
}

</style>
