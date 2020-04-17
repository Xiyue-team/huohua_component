<template>
    <div id="app" class="noselect">
        <div class="landscape-tip" v-if="!isLandscape">
            <div class="landscape-content">
                <img src="../static/UI/tip.png" alt="">
                <p>请将屏幕自动旋转功能打开并横屏使用</p>
            </div>
        </div>
        <transition name="fade">
            <div class="mobile-tip" v-if="hiddenMobTip"> 建议您在电脑或平板上打开，以获取最佳的演示效果 </div>
        </transition>
        <h3 v-text="title" class="app_title"></h3>
        <div class="main_wrap">
            <div class="container">
                <!--头部-->
                <!--视图区-->
                <div id="renderCanvas"> </div>
            </div>
        </div>
        <ui-btn type="reset1" class="aside_reset" @click.native='reset'></ui-btn>
        <ui-group type="radio" :margin="10" :groups="groups" v-model="radio" class="radio-group scale-group" ></ui-group>
        <!-- <ui-btn class="btn-show" :type="showCutPlane?'blue':''" v-model="showCutPlane">显示切面</ui-btn> -->
        <!--侧边按钮区-->
    </div>
</template>
<script>
import BScroll from 'better-scroll';
import common from '@/common/common'; //引入公共函数;
import pointData from '@/common/pointData'; //引入公共函数;
import uiHead from '@/components/UI/uiHead'; //头部
import uiBtn from '@/components/UI/uiBtn'; //按钮
import uiSlider from '@/components/UI/uiSlider'; //滑块
import uiGroup from '@/components/UI/uiGroup'; //滑块
const {
    sin,
    cos,
    PI,
    tan,
    pow,
    abs,
    sqrt
} = Math;
export default {
    name: 'app',
    components: {
        uiHead,
        uiBtn,
        uiSlider,
        uiGroup
    },
    data() {
        return {
            title: '构图助手',
            nohidden: true,
            isReset: false,
            isLandscape: true,
            hiddenMobTip: false,
            checkPointArr: [],
            checkLineArr: [],
            checkFaceArr: [],
            radio: 1,
            groups: [{ name: 1, txt: '点' }, { name: 2, txt: '线' }, { name: 3, txt: '面' }],
            showCutPlane: false,
            planeArr: [],
            extendArr: new Array(9).fill(false)
        }
    },
    created() {
        document.title = this.title;
        this.num = 0;
        this.tipTimer = null;
    },
    mounted() {
        //禁止选择
        document.onselectstart = function() {
            return false;
        };
        let thiz = this;
        this.isMob = (navigator.userAgent.match(
            /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        ))
        if (this.isMob) {
            var mql = window.matchMedia("(orientation: portrait)");

            function onMatchMeidaChange(mql) {
                clearTimeout(thiz.tipTimer);
                if (mql.matches) {
                    // 竖屏
                    thiz.isLandscape = false
                } else {
                    thiz.isLandscape = true
                    if (window.innerWidth < 500 || window.innerHeight < 500) {
                        thiz.hiddenMobTip = true;
                        thiz.tipTimer = setTimeout(() => {
                            thiz.hiddenMobTip = false;
                        }, 3000)
                    }
                }
            }
            onMatchMeidaChange(mql);
            mql.addListener(onMatchMeidaChange);
        } else {}
        this.TO = this.init();
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.content, {
                click: true
            });
        });
    },
    computed: {},
    watch: {
        radio(v) {
            this.TO.resetData();
        },
        showCutPlane(v) {
            this.TO.cutPlaneHandle(v);
        }
    },
    methods: {
        reset() {
            this.TO.reset();
        },
        extend(title, index, radio, event) {
            if (!this.isMob && !event._constructed) {
                return;
            }
            event.preventDefault();
            this.TO.extend(title, index);
        },
        del(title, index, radio, event) {
            if (!this.isMob && !event._constructed) {
                return;
            }
            event.preventDefault();
            this.TO.del(title, index, radio);
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        init() {
            var scene = null,
                camera = null,
                renderer = null,
                mainWidth = null,
                mainHeight = null,
                controls = null,
                selectobjs = [],
                selectobj = null,
                raycaster = new THREE.Raycaster(),
                plane = new THREE.Plane(),
                offset = new THREE.Vector3(),
                intersection = new THREE.Vector3(),
                mouse = new THREE.Vector2(),
                INTERSECTED = null,
                mousedownflag = false,
                isMob = null;
            isMob = /iPad|Android/g.test(navigator.userAgent);
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.autoClear = false;
            mainWidth = $('#renderCanvas').width();
            mainHeight = $('#renderCanvas').height();
            scene = new THREE.Scene();
            let standard = (window.innerWidth) / 3000 * 2.5;
          console.log(mainWidth / -standard, mainWidth / standard, mainHeight / standard, mainHeight / -standard);
            var camera = new THREE.OrthographicCamera(mainWidth / -standard, mainWidth / standard, mainHeight / standard,
                mainHeight / -standard, 1, 10000);
            camera.position.x = 200;
            camera.position.y = 200;
            camera.position.z = 600;
            camera.lookAt(scene.position);
            scene.add(camera);
          console.log(window.devicePixelRatio);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff);
            renderer.setSize(mainWidth, mainHeight);
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.enableZoom = true;
            controls.enableRotate = true;
            controls.enablePan = false;
            controls.minZoom = 0.6;
            controls.maxZoom = 2.5;
            $("#renderCanvas").append(renderer.domElement);
            //虚线盒子
            let dashBox = common.dashLineBox(200);
            scene.add(dashBox);
            //初始化
            let colorArr = ['#A641FF', '#FF001F'];
            var initObj = () => {
                pointData.forEach((point, index) => {
                    point.sphere.position.set(...point.position);
                    point.zoomTouch.position.set(...point.position);
                    point.zoomTouch.name = point.title;
                    point.text = common.createText(point.value, ...point.position, { sub: point.isSub });
                    selectobjs.push(point.zoomTouch);
                    point.text.visible = false;
                    scene.add(point.sphere, point.text, point.zoomTouch);
                });
            }
            var del = (title, index, radio) => {
                let point = null;
                if (radio == 1) {
                    this.checkPointArr.splice(index, 1);
                    point = pointData.find((point) => {
                        return title == point.title;
                    })
                    changePointStyle(point);
                } else if (radio == 2) {
                    let lineObj = this.checkLineArr.splice(index, 1);
                    lineObj[0].titleArr.forEach((value) => {
                        point = pointData.find((point) => {
                            return value == point.title;
                        })
                        changePointStyle(point);
                    })
                    lineGroup.remove(lineArr[index]);
                    lineArr.splice(index, 1);
                } else if (radio == 3) {
                    if (this.checkFaceArr[index].extendPlaneFace) {
                        scene.remove(this.checkFaceArr[index].extendPlaneFace);
                    }
                    let faceObj = this.checkFaceArr.splice(index, 1);
                    faceObj[0].titleArr.forEach((value) => {
                        point = pointData.find((point) => {
                            return value == point.title;
                        })
                        changePointStyle(point);
                    })
                    faceGroup.remove(faceArr[index]);
                    faceArr.splice(index, 1);
                    // if (this.showCutPlane && index < 3) {
                    // delPlaneHandle(title, index);
                    // }
                }
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
            var changePointStyle = (point) => {
                point.count--;
                point.sphere.material.color.set(colorArr[point.count]);
                if (!point.count) {
                    point.sphere.scale.set(1, 1, 1);
                    point.text.visible = false;
                }
            }
            var resetData = () => {
                linePointArr.forEach((point) => {
                    changePointStyle(point);
                })
                linePointArr = [];
            }
            var drawTriangle = (pointArr) => {
                var geometry = new THREE.Geometry();
                pointArr.forEach((value) => {
                    geometry.vertices.push(new THREE.Vector3(...value));
                });
                geometry.faces.push(new THREE.Face3(0, 1, 2));
                var getRandomColor = '#' + ((Math.random() / 2 + 0.5) * 0xffffff << 0).toString(16);
                var material = new THREE.MeshBasicMaterial({
                    color: getRandomColor,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.5,
                    depthTest: false,
                });
                let mesh = new THREE.Mesh(geometry, material);
                let n = 1 - Math.random() * 2;
                mesh.position.set(n, n, n);
                // mesh.scale.set(2,2,2);
                return mesh;
            }
            var drawRect = (pointArr, color) => {
                var geometry = new THREE.Geometry();
                pointArr.forEach((value) => {
                    geometry.vertices.push(new THREE.Vector3(value.x, value.y, value.z));
                });
                geometry.faces.push(new THREE.Face3(0, 1, 2));
                geometry.faces.push(new THREE.Face3(0, 2, 3));
                var getRandomColor = '#' + ((Math.random() / 2 + 0.5) * 0xffffff << 0).toString(16);
                var material = new THREE.MeshBasicMaterial({
                    color: color,
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 0.5,
                    depthTest: false,
                });
                let mesh = new THREE.Mesh(geometry, material);
                let n = 1 - Math.random() * 2;
                let middlePos = {};
                middlePos.x = (pointArr[0].x + pointArr[3].x) / 2 + n;
                middlePos.y = (pointArr[0].y + pointArr[3].y) / 2 + n;
                middlePos.z = (pointArr[0].z + pointArr[3].z) / 2 + n;
                return mesh;
            }
            var delPlaneHandle = (name, index) => {
                if (!this.planeArr[index] || !this.planeArr[index].mesh) {
                    return;
                }
                scene.remove(this.planeArr[index].mesh);
                this.planeArr.splice(index, 1);
            }
            var cutPlaneHandle = (index) => {
                let item = this.checkFaceArr[index];
                faceArr[index].visible = false;
                let group = new THREE.Group();
                let line = common.createStraightLine([...item.position, item.position[0]], { style: 2 });
                let plane = drawCutPlane(item.position1, item.color);
                group.add(line, plane);
                this.checkFaceArr[index].extendPlaneFace = group;
                // this.planeArr[index] = { mesh: group, name: item.title, index: index };
                scene.add(group);
            }
            let count = 0;
            var animate = () => {
                requestAnimationFrame(animate);
                count = ++count % 2;
                if (!count) {
                    return;
                }
                renderer.clear();
                //面和实线场景
                renderer.render(scene, camera);
                //虚线场景
            };
            initObj();
            animate();
            let lineArr = [];
            let linePointArr = [];
            let faceArr = [];
            let lineGroup = new THREE.Group();
            let faceGroup = new THREE.Group();
            scene.add(lineGroup, faceGroup);
            var pushPoint = (name, arr) => {
                let bool = arr.find((value) => {
                    return name == value.title;
                })
                if (!bool) {
                    let point = pointData.find((point) => {
                        return name == point.title;
                    })
                    point.count++;
                    point.sphere.material.color.set(colorArr[point.count]);
                    point.sphere.scale.set(1.5, 1.5, 1.5);
                    point.text.visible = true;
                    arr.push(point);
                }
            }
            var pointClick = (name) => {
                //最多只能出现9次
                //是否点击的是一个已经被点击过的按钮
                if (this.radio == 1) {
                    if (this.checkPointArr.length > 8) return;
                    pushPoint(name, this.checkPointArr);
                } else if (this.radio == 2) {
                    if (this.checkLineArr.length > 8) return;
                    pushPoint(name, linePointArr);
                    //对点的title进行排序，用来判断是否会创建同一条线
                    if (linePointArr.length == 2) {
                        linePointArr.sort((a, b) => {
                            return a.title > b.title;
                        })
                        let title = linePointArr[0].title + linePointArr[1].title;
                        let bool1 = this.checkLineArr.find((value) => {
                            return title == value.title;
                        });
                        //如果创建的是已经创建过的线，就清空点并返回。
                        if (bool1) {
                            linePointArr.forEach((point) => {
                                changePointStyle(point);
                            })
                            linePointArr = [];
                            return false;
                        }
                        //生成线的数据以方便删除操作
                        let obj = {};
                        obj.position = [linePointArr[0].position, linePointArr[1].position];
                        obj.html = linePointArr[0].value + (linePointArr[0].isSub ? '<sub>1</sub>' : '') + linePointArr[1].value + (
                            linePointArr[1].isSub ? '<sub>1</sub>' : '');
                        obj.title = title;
                        obj.titleArr = [linePointArr[0].title, linePointArr[1].title];
                        let line = common.createStraightLine([...obj.position])
                        lineArr.push(line);
                        lineGroup.add(line);
                        this.checkLineArr.push(obj);
                        linePointArr = [];
                    }
                } else if (this.radio == 3) {
                    if (this.checkFaceArr.length > 8) return;
                    pushPoint(name, linePointArr);
                    //对点的title进行排序，用来判断是否会创建同一条面
                    if (linePointArr.length == 3) {
                        linePointArr.sort((a, b) => {
                            return a.title > b.title;
                        })
                        let title = linePointArr[0].title + linePointArr[1].title + linePointArr[2].title;
                        let bool1 = this.checkFaceArr.find((value) => {
                            return title == value.title;
                        });
                        let vertices = [];
                        linePointArr.forEach((value) => {
                            vertices.push(new THREE.Vector3(...value.position));
                        })
                        //使用内置方法获取三角形的面积
                        let area = new THREE.Triangle(...vertices).getArea();
                        //如果创建的是已经创建过的面或者构不成面，就清空点并返回。
                        if (bool1 || area < 100) {
                            linePointArr.forEach((point) => {
                                changePointStyle(point);
                            })
                            linePointArr = [];
                            return false;
                        }
                        //生成线的数据以方便删除操作
                        let obj = {};
                        //用于创建面的三个点坐标
                        obj.position = [linePointArr[0].position, linePointArr[1].position, linePointArr[2].position];
                        obj.position1 = vertices;
                        //用于生成标签的html
                        obj.html = linePointArr[0].value + (linePointArr[0].isSub ? '<sub>1</sub>' : '') + linePointArr[1].value + (
                            linePointArr[1].isSub ? '<sub>1</sub>' : '') + linePointArr[2].value + (linePointArr[2].isSub ? '<sub>1</sub>' :
                            '');
                        //获得排序后的面名称
                        obj.title = title;
                        //获得组成面的三个顶点名称，方便删除操作
                        obj.titleArr = [linePointArr[0].title, linePointArr[1].title, linePointArr[2].title];
                        let face = drawTriangle(obj.position);
                        obj.color = face.material.color;
                        faceArr.push(face);
                        faceGroup.add(face);
                        obj.extend = false;
                        obj.extendPlaneFace = null;
                        this.checkFaceArr.push(obj);
                        linePointArr = [];
                    }
                }
                setTimeout(() => {
                    this.refresh();
                }, 20);
            }
            let extend = (name, index) => {

                const bool = !this.checkFaceArr[index].extend;
                const length = this.checkFaceArr.filter((item) => {
                    return item.extend;
                }).length;
                if (length > 2 && bool) return;
                let item = this.checkFaceArr[index];
                this.checkFaceArr[index].extend = bool;
                if (bool) {
                    // if (this.planeArr[index]) {
                    //     this.planeArr[index].mesh.visible = true;
                    // } else {

                    //     cutPlaneHandle(index);
                    // }
                    if (item.extendPlaneFace) {
                        item.extendPlaneFace.visible = true;
                    } else {
                        cutPlaneHandle(index);
                    }
                } else {
                    // this.planeArr[index].mesh.visible = false;
                    faceArr[index].visible = true;
                    item.extendPlaneFace.visible = false;
                }

            }
            let drawCutPlane = (vertices, color) => {
                let pt = vertices[0];
                let begin = vertices[1];
                let end = vertices[2];
                let dx = begin.x - end.x;
                let dy = begin.y - end.y;
                let dz = begin.z - end.z;
                let u = (pt.x - begin.x) * (begin.x - end.x) +
                    (pt.y - begin.y) * (begin.y - end.y) + (pt.z - begin.z) * (begin.z - end.z);
                u = u / ((dx * dx) + (dy * dy) + (dz * dz));
                let centerPos = {};
                centerPos.x = begin.x + u * dx;
                centerPos.y = begin.y + u * dy;　　
                centerPos.z = begin.z + u * dz;
                let ver = {};
                ver.x = pt.x - centerPos.x;
                ver.y = pt.y - centerPos.y;
                ver.z = pt.z - centerPos.z;
                let copyBegin = {};
                copyBegin.x = ver.x + begin.x;
                copyBegin.y = ver.y + begin.y;
                copyBegin.z = ver.z + begin.z;
                let copyEnd = {};
                copyEnd.x = ver.x + end.x;
                copyEnd.y = ver.y + end.y;
                copyEnd.z = ver.z + end.z;
                let doubleBegin = calcDoublePos(copyEnd, begin);
                let doubleEnd = calcDoublePos(copyBegin, end);
                let doubleCopyBegin = calcDoublePos(end, copyBegin);
                let doubleCopyEnd = calcDoublePos(begin, copyEnd);
                // drawRect([begin, end, copyEnd, copyBegin]);
                let plane = drawRect([doubleBegin, doubleEnd, doubleCopyEnd, doubleCopyBegin], color);
                return plane;

            }
            var calcDoublePos = (startPos, endPos) => {
                let pos = {};
                pos.x = 2 * endPos.x - startPos.x;
                pos.y = 2 * endPos.y - startPos.y;
                pos.z = 2 * endPos.z - startPos.z;
                return pos;
            }
            var onDocumentMouseDown = (event) => {
                var offsetLeft = parseInt($('#renderCanvas').offset().left);
                var offsetTop = parseInt($('#renderCanvas').offset().top);
                event.preventDefault();
                var mouse = {};
                mouse.x = ((event.clientX - offsetLeft) / mainWidth) * 2 - 1;
                mouse.y = -((event.clientY - offsetTop) / mainHeight) * 2 + 1;
                raycaster.setFromCamera(mouse, camera);
                var intersects = raycaster.intersectObjects(selectobjs);
                if (intersects.length > 0) {
                    selectobj = intersects[0].object;
                    mousedownflag = true;
                    pointClick(selectobj.name);
                }
            };
            var onDocumentTouchStart = (event) => {
                var offsetLeft = parseInt($('#renderCanvas').offset().left);
                var offsetTop = parseInt($('#renderCanvas').offset().top);
                event.preventDefault();
                if (event.touches.length === 1) {
                    var mouse = {};
                    mouse.x = ((event.touches[0].pageX - offsetLeft) / mainWidth) * 2 - 1;
                    mouse.y = -((event.touches[0].pageY - offsetTop) / mainHeight) * 2 + 1;
                    raycaster.setFromCamera(mouse, camera);
                    var intersects = raycaster.intersectObjects(selectobjs);
                    if (intersects.length > 0) {
                        selectobj = intersects[0].object;
                        mousedownflag = true;
                        pointClick(selectobj.name);
                    }
                }
            };
            renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
            renderer.domElement.addEventListener('touchstart', onDocumentTouchStart, false);
            window.onresize = () => {
                standard = (window.innerWidth) / 3000 * 2.5;
                mainWidth = $('#renderCanvas').width();
                mainHeight = $('#renderCanvas').height();
                camera.left = mainWidth / -standard;
                camera.right = mainWidth / standard;
                camera.top = mainHeight / standard;
                camera.bottom = mainHeight / -standard;
                camera.updateProjectionMatrix();
                renderer.setSize(mainWidth, mainHeight);
            };
            var resetWidget = () => {
                this.checkFaceArr.forEach((item) => {
                    if (item.extendPlaneFace) {
                        scene.remove(item.extendPlaneFace);
                    }
                })
                this.checkPointArr = [];
                this.checkLineArr = [];
                this.checkFaceArr = [];
                this.radio = 1;
                pointData.forEach((point) => {
                    point.count = 1;
                    changePointStyle(point);
                });
                linePointArr = [];
                lineArr.forEach((line) => {
                    lineGroup.remove(line);
                })
                lineArr = [];
                faceArr.forEach((face) => {
                    faceGroup.remove(face);
                })
                faceArr = [];
                camera.position.set(200, 200, 600);
                camera.zoom = 1;
                camera.updateProjectionMatrix();
                camera.lookAt(0, 0, 0);
                // console.log(fac);
            };
            var TO = function() {
                return {
                    reset: resetWidget,
                    del,
                    resetData,
                    cutPlaneHandle,
                    extend,
                }
            }
            return TO();
        },
    },
}

</script>
<style lang="less">
* {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

input,
button {
    outline: none;
    -webkit-appearance: none;
    border-radius: 0;
}







/*盒模型，padding尺寸不用再减去*/

*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "PingFang SC", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
    background-color: #fff;
    touch-action: none;
}

#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.noselect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Chrome/Safari/Opera */
    -khtml-user-select: none;
    /* Konqueror */
    -moz-user-select: none;
    /* Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently not supported by any browser */
}








/*ui*/


/*内容区*/


/*#app {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
}*/

.mobile-tip {
    position: fixed;
    left: 0;
    top: 24px;
    right: 0;
    margin: 0 auto;
    width: 80%;
    padding: 0 24px;
    line-height: 48px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
    border-radius: 100px;
    z-index: 100;
    text-align: center;
}

.main_wrap {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    /*align-items: flex-start;*/
    justify-content: center;
}

.landscape-tip {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #fff;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.landscape-content {
    width: 80%;
    padding: 32px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.09);
    border-radius: 12px;
}

.landscape-content img {
    width: 50%;
    height: auto;
}

.landscape-content p {
    margin-top: 10px;
}

.content {
    width: 25%;
    min-width: 200px;
    padding: 5px;
    padding-top: 80px;
    background-color: #fff;
    border-radius: 6px;
    height: 100%;
    margin: 0 0 0 24px;
    overflow: hidden;
}

.content {
    .part {
        display: flex;
        margin-bottom: 20px;
        &:last-child .right {
            .label {
                width: 50%;
                min-width: 150px;
            }
        }
        .left {
            width: 50px;
            font-size: 24px;
            line-height: 32px;
        }
        .right {
            flex-grow: 1;
            display: flex;
            flex-wrap: wrap;

            .label {
                box-sizing: border-box;
                width: 30%;
                min-width: 100px;
                line-height: 32px;
                height: 32px;
                padding-right: 6px; // margin-right: 6px;
                position: relative;
                text-align: center;
                font-style: italic;
                font-family: 'Times new roman';
                letter-spacing: 1px;
                text-align: right;
                span {
                    display: inline-block;
                }
                sub {
                    font-size: 12px;
                    line-height: 1;
                }
                i {
                    display: inline-block;
                    height: 32px;
                    width: 32px;
                    background-size: cover;
                }
                i.extend {
                    width: auto;
                    height: 26px;
                    color: #8A8A8A;
                    border: 1px solid #E0E0E0;
                    border-radius: 12px;
                    letter-spacing: 0;
                    font-style: normal;
                    padding: 0 5px;
                    line-height: 26px;
                    font-size: 14px;
                    &.active {
                        color: #fff;
                        background: #0199FF;
                    }
                }
                .zoom-touch {
                    height: 24px;
                    width: 24px;
                    top: -3px;
                    right: -3px;
                    z-index: 100;
                }
            }
        }
    }
}

.container {
    position: relative;
    width: 100%;
    /*float: left;*/
    // height: calc( 100% - 72px);
    height: 100%;
    /* flex-grow: 1; */
    flex-grow: 1;
    flex-shrink: 1;
}

.radio-group {
    position: fixed;
    right: 24px;
    bottom: 24px;
    width: 100px;
}

.app_title {
    position: fixed;
    font-size: 24px;
    color: #000;
    line-height: 1.0;
    padding: 24px;
    font-weight: normal;
    width: 100%;
}

#renderCanvas {
    width: 100%;
    /*height: calc(100% - 72px);*/
    height: 100%;
    outline: none;
    position: relative;
    border: none;
    /* overflow: hidden; */
}

canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    border: none;
}

#app .aside_reset {
    position: fixed;
    right: 24px;
    top: 24px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
    transform: translateY(-30px);
    opacity: 0;
}

.btn-show {
    position: fixed;
    left: 24px;
    bottom: 24px;
}

@media screen and (max-width: 500px) {
    .scale-group {
        transform: scale(0.6, 0.6);
        transform-origin: right bottom;
    }
}

</style>
