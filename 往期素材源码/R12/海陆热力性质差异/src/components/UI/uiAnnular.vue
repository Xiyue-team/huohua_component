<template>
    <div id="Instrument" class="UI-annular"> </div>
</template>
<script>
import common from '@/common/common'; //公共函数
export default {
    props: {
        value: { type: [Number, String], default: 0 },
        zoom: { type: [Number, String], default: 1 }, //
    },
    components: {},
    created() {

    },
    watch: {
        myResult(val){
            
            this.$emit("on-result-change",val);//
        },
        value(val){
            if(val==0){
                this.myResult = val;
                var ang = val;
                var x = Math.cos(ang) * 350;
                var y = Math.sin(ang) * 350;
                this.pont.position.x = x;
                this.pont.position.y = y;
            }
        }
    },
    computed: {},
    data() {
        return {
            myResult:null,
            TOI: null,
            pont:null,
        }
    },
    mounted() {
        this.TOI = this.initAnnular();
    },
    methods: {
        initAnnular() {
            var scene, camera, renderer;

            var offsetLeft = parseInt($('#Instrument').offset().left);
            var offsetTop = parseInt($('#Instrument').offset().top);
            var mainWidth = $('#Instrument').width();
            var mainHeight = $('#Instrument').height();
            var raycaster = new THREE.Raycaster();
            var selectObjs = [];
            var selectObj = [];
            var flag = false;
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(60, mainWidth / mainHeight, 0.1, 10000);
            camera.position.set(0, 0, 1200);
            camera.zoom = 1;
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);
            renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, precision: 'highp' });
            renderer.setPixelRatio(window.devicePixelRatio * this.zoom);
            renderer.setClearColor(0xFFFFFF, 0.0);
            renderer.autoClear = false;
            renderer.setSize(mainWidth, mainHeight);
            $("#Instrument").append(renderer.domElement);
            var texture = new THREE.TextureLoader().load('static/UI/1111.png');
            var texture1 = new THREE.TextureLoader().load('static/UI/11.png');
            texture.generateMipmaps = false;
            texture.magFilter = THREE.LinearFilter;
            texture.minFilter = THREE.LinearFilter;
            texture1.generateMipmaps = false;
            texture1.magFilter = THREE.LinearFilter;
            texture1.minFilter = THREE.LinearFilter;
            texture.wrapS = 1001;
            texture.wrapT = 1001;
            texture.repeat.set(1, 1);
            var pointPos = {
                o: [0, 0, 0]
            }
            var creartObj = () => {
                var instrument = common.createCircle(500, { color: '', segments: 50, opacity: 1, depthTest: false });
                instrument.position.set(0, 0, 0);
                instrument.material.map = texture;
                scene.add(instrument);
                this.pont = common.createCircle(52, { color: '#FFF', segments: 50, opacity: 1, depthTest: false });
                this.pont.material.map = texture1;
                scene.add( this.pont);
                this. pont.name = 'a';
                this.pont.position.y = 350;
                this.pont.position.z = 50;
                var ang = this.value;
                var x = Math.cos(ang) * 350;
                var y = Math.sin(ang) * 350;
                this.pont.position.x = x;
                this.pont.position.y = y;

                selectObjs.push( this.pont);
                selectObj.push( this.pont);
                selectObj.push(instrument);
                // var axisHelper = new THREE.AxisHelper(500);
                // scene.add(axisHelper);
            }
            creartObj();
            var onDocumentMouseDown = (event) => {
                var mouse = {};
                mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectObjs);
                if (intersects.length > 0) {
                    flag = true;
                }
            };
            var onDocumentMouseMove = (event) => {
                var mouse = {};
                mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectObj);
                if (flag == true&&intersects.length > 0) {
                    var ange = Math.atan2(mouse.y, mouse.x);
                    var x = Math.cos(ange) * 350;
                    var y = Math.sin(ange) * 350;
                    this.pont.position.x = x;
                    this.pont.position.y = y;
                    this.myResult = ange;
                }
            };
            var onDocumentMouseUp = (event) => {
                flag = false;
            }
            var onDocumentTouchStart = (event) => {
                var mouse = {};
                event.preventDefault();
                if (event.touches.length === 1) {
                mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectObjs);
                if (intersects.length > 0) {
                    flag = true;
                }}
            };
            var onDocumentTouchMove = (event) => {
                var mouse = {};
                event.preventDefault();
                if (event.touches.length === 1) {
                    mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                    mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectObj);
               if(flag){
                    var ange = Math.atan2(mouse.y, mouse.x);
                    var x = Math.cos(ange) * 350;
                    var y = Math.sin(ange) * 350;
                    this.pont.position.x = x;
                    this.pont.position.y = y;
                    this.myResult = ange;
                }
                }
            };
            var onDocumentTouchEnd = (event) => {
                flag = false;
            };
            renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
            renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
            window.addEventListener('mouseup', onDocumentMouseUp, false);
            renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
            renderer.domElement.addEventListener('touchmove', onDocumentTouchMove, false);
            renderer.domElement.addEventListener('touchend', onDocumentTouchEnd, false);

            var renderAll = () => {
                renderer.clear();
                renderer.render(scene, camera);
                requestAnimationFrame(renderAll);
            }
            renderAll();
        }
    },
};
</script>
<style type="text/css">
.UI-annular {
    position: absolute;
    width:20vw;
    height:20vw;
    right:24px;
    bottom:24px;
    z-index: 100;
}

</style>