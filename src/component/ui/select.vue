<template>
    <div class="pd-select-item" v-bind:style = "{width: widthChange + 'px'}">
        <div class="pd-select-list">
            <ul class="pd-select-ul" ref="list">
                <li class="pd-select-list-item" v-for="(el,index) in renderData " :class="{'hidden':setHidden(el.index)}"
                    :key="index">
                    <span v-if="showSymbol && el.value >=0">+</span>{{el.value}}
                </li>
            </ul>
        </div>
        <ul class="pd-select-wheel" ref="wheel">
            <li class="pd-select-wheel-item" :class="{'hidden':setHidden(el.index)}" :style="setWheelItemDeg(el.index)"
                :index="el.index" v-for="(el,index) in renderData " :key="index">
                <span v-if="showSymbol && el.value >=0">+</span>{{el.value}}
            </li>
        </ul>
    </div>
</template>
<script>
    /*
     * select components
     * @param value {String} current select value or init value  轮盘显示值
     * @param listData {Array} loop array value    轮盘显示值集合
     * @param type {String} 'cycle' ,default 'line'   line为线性滑块   cycle为无限滚轮滑块
     * @param parameter1 {Number} default '1.8'   parameter1 滑块移动加速度
     *
     * */
    export default {
        name: 'pdSelectItem',
        data() {
            return {
                /* 滚轮展示大小限定 */
                spin: {start: -9, end: 9, branch: 9},
                finger: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0},
                mouse: {startY: 0, lastY: 0, startTime: 0, lastTime: 0, transformY: 0},
                indexSend: null,
                control: false,
                widthChange: 24,

            }
        },
        props: {
            listData: {
                type: Array,
                required: true
            },
            type: {
                type: String,
                default: 'line'
            },
            value: {},

            showSymbol: {
                type: Boolean,
                default: true
              },
            /**
             * 用于控制轮盘转动的加速度
             */
            parameter1: {
                type: Number,
                default: 1.8
            },
        },
        computed: {
            renderData() {
                let temp = [];
                for (let k = this.spin.start; k <= this.spin.end; k++) {
                    let data = {
                        value: this.getSpinData(k),
                        index: k
                    };
                    temp.push(data);
                }
                return temp;
            }
        },
        mounted() {

            /* 事件绑定 */
            this.$el.addEventListener('touchstart', this.itemTouchStart);
            this.$el.addEventListener('touchmove', this.itemTouchMove);
            this.$el.addEventListener('touchend', this.itemTouchEnd);

            this.$el.addEventListener('mousedown', this.itemMouseDown);
            this.$el.addEventListener('mouseout', this.itemMouseOut);

            this.init();

        },
        methods: {

            bindEvent() {
                document.addEventListener('mousemove', this.itemMouseMove);
                document.addEventListener('mouseup', this.itemMouseUp);
            },

            removeEvent() {
                document.removeEventListener('mousemove', this.itemMouseMove);
                document.removeEventListener('mouseup', this.itemMouseUp);
            },

            /* 初始化状态 */
            init(type) {
                let index, move;
                this.$nextTick(() => {
                    if (!type) {
                        index = this.listData.indexOf(this.value);
                        if (index === -1) {
                            this.setListTransform();
                            this.getPickValue(0);
                        } else {
                            move = index * 34;
                            /* 因为往上滑动所以是负 */
                            this.setStyleForFinger(-move);
                            this.setStyleForMouse(-move);
                            this.setListTransform(-move, -move);
                        }
                    }
                });

                  for (let i = 0; i < this.listData.length; i++) {
                    if ((this.listData[i] + '').length >= (this.listData[i + 1] + '').length) {
                      if (this.showSymbol) {
                        this.widthChange = ((this.listData[i] + '').length + 1) * 12;
                      } else {
                        this.widthChange = (this.listData[i] + '').length * 12;
                      }
                    } else {
                      if (this.showSymbol) {
                        this.widthChange = ((this.listData[i + 1] + '').length + 1) * 12;
                      } else {
                        this.widthChange = (this.listData[i + 1] + '').length * 12;
                      }
                    }
                  }
            },

            /* 根据type 控制滚轮显示效果 */
            setHidden(index) {
                if (this.type === 'line') {
                    return index < 0 || index > this.listData.length - 1;
                } else {
                    return false;
                }
            },

            setWheelItemDeg(index) {
                return {
                    transform: `rotate3d(1, 0, 0, ${-index * 20 % 360}deg) translate3d(0px, 0px, 100px)`,
                }
            },

            setWheelDeg(updateDeg, type, time = 1000) {
                if (type === 'end') {
                    this.$refs.wheel.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
                    this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
                } else {
                    this.$refs.wheel.style.webkitTransition = '';
                    this.$refs.wheel.style.webkitTransform = `rotate3d(1, 0, 0, ${updateDeg}deg)`;
                }
            },

            setListTransform(translateY = 0, marginTop = 0, type, time = 1000) {
                if (type === 'end') {
                    this.$refs.list.style.webkitTransition = `transform ${time}ms cubic-bezier(0.19, 1, 0.22, 1)`;
                    this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`;
                    this.$refs.list.style.marginTop = `${-marginTop}px`;
                    this.$refs.list.setAttribute('scroll', translateY);
                } else {
                    this.$refs.list.style.webkitTransition = '';
                    this.$refs.list.style.webkitTransform = `translateY(${translateY - this.spin.branch * 34}px)`;
                    this.$refs.list.style.marginTop = `${-marginTop}px`;
                    this.$refs.list.setAttribute('scroll', translateY);
                }
            },

            itemTouchStart(event) {
                this.expandFunction();
                let finger = event.changedTouches[0];
                this.finger.startY = finger.pageY;
                this.finger.startTime = event.timestamp || Date.now();
                this.finger.transformY = this.$refs.list.getAttribute('scroll');
                event.preventDefault();
            },

            itemTouchMove(event) {
                let finger = event.changedTouches[0];
                this.finger.lastY = finger.pageY;
                this.finger.lastTime = event.timestamp || Date.now();
                /* 设置css */
                let move = this.finger.lastY - this.finger.startY;
                this.setStyleForFinger(move);
                event.preventDefault();
            },

            itemTouchEnd(event) {
                this.expandFunctionTwo();
                let finger = event.changedTouches[0];
                this.finger.lastY = finger.pageY;
                this.finger.lastTime = event.timestamp || Date.now();
                let move = this.finger.lastY - this.finger.startY;
                /* 计算速度 */
                /* 速度计算说明
                 * 当时间小于300毫秒 最后的移动距离等于 move + 减速运动距离
                 * */
                let time = this.finger.lastTime - this.finger.startTime;
                let v = move / time;
                /* 减速加速度parameter1 */
                /* 设置css */
                if (time <= 300) {
                    move = v * this.parameter1 * time;
                    time = 1000 + time * this.parameter1;
                    this.setStyleForFinger(move, 'end', time);
                } else {
                    this.setStyleForFinger(move, 'end');
                }
            },

            itemMouseDown(event) {
                this.bindEvent();
                this.control = true;
                let mouse = event;
                this.mouse.startY = mouse.pageY;
                this.mouse.startTime = event.timestamp || Date.now();
                this.mouse.transformY = this.$refs.list.getAttribute('scroll');
                event.preventDefault();
            },

            /**
             * 拓展函数
             */
            expandFunction() {
                // TODO
                this.$emit('downHandle',this.$el);
            },

            itemMouseMove(event) {
                this.expandFunction();
                if (this.control) {
                    let mouse = event;
                    this.mouse.lastY = mouse.pageY;
                    this.mouse.lastTime = event.timestamp || Date.now();
                    /* 设置css */
                    let move = this.mouse.lastY - this.mouse.startY;
                    this.setStyleForMouse(move);
                    event.preventDefault();
                }
            },

            itemMouseUp(event) {
                this.removeEvent();
                this.time == 0 ? new Date().getTime() : void(0);
                this.time = new Date().getTime();
                this.control = false;
                let mouse = event;
                this.mouse.lastY = mouse.pageY;
                this.mouse.lastTime = event.timestamp || Date.now();
                let move = this.mouse.lastY - this.mouse.startY;
                /* 计算速度 */
                /* 速度计算说明
                 * 当时间小于300毫秒 最后的移动距离等于 move + 减速运动距离
                 * */
                let time = this.mouse.lastTime - this.mouse.startTime;
                let v = move / time;
                /* 减速加速度parameter1 */
                /* 设置css */
                if (time <= 300) {
                    move = v * this.parameter1 * time;
                    time = 1000 + time * this.parameter1;
                    this.setStyleForMouse(move, 'end', time);
                } else {
                    this.setStyleForMouse(move, 'end');
                }
            },

            itemMouseOut() {
                this.expandFunctionTwo();
            },

            /**
             * 拓展函数
             */
            expandFunctionTwo() {
                // TODO
                this.$emit('mouseOut');
            },

            /* 设置css */
            setStyleForFinger(move, type, time) {
                const singleHeight = 34;
                const deg = 20;
                const singleDeg = deg / singleHeight;
                let currentListMove = this.finger.transformY;
                let updateMove = move + Number(currentListMove);
                let updateDeg, spinAim, margin, endMove, endDeg;
                if (type === 'end' && this.type === 'line') {
                    /*这里只在释放的时候判断 实现缓动效果*/
                    /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
                    if (updateMove > 0) {
                        updateMove = 0;
                    }
                    if (updateMove < -(this.listData.length - 1) * singleHeight) {
                        updateMove = -(this.listData.length - 1) * singleHeight;
                    }
                }
                updateDeg = -updateMove * singleDeg;
                spinAim = Math.round(updateDeg / 20);
                margin = Math.round(updateMove / singleHeight) * singleHeight; // 如果不这么写 会导致没有滚动效果
                /* 计算touchEnd移动的整数距离 */
                endMove = margin;
                endDeg = Math.round(updateDeg / deg) * deg;
                if (type === 'end') {
                    this.setListTransform(endMove, margin, type, time);
                    this.setWheelDeg(endDeg, type, time);
                    /* 设置$emit 延迟 */
                    setTimeout(() => this.getPickValue(endMove), 500);
                } else {
                    this.setListTransform(updateMove, margin);
                    this.setWheelDeg(updateDeg);
                }
                this.updateSpin(spinAim);
            },

            setStyleForMouse(move, type, time) {
                const singleHeight = 34;
                const deg = 20;
                const singleDeg = deg / singleHeight;
                let currentListMove = this.mouse.transformY;
                let updateMove = move + Number(currentListMove);
                let updateDeg, spinAim, margin, endMove, endDeg;
                if (type === 'end' && this.type === 'line') {
                    /*这里只在释放的时候判断 实现缓动效果*/
                    /* 根据滚轮类型 line or cycle 判断 updateMove最大距离 */
                    if (updateMove > 0) {
                        updateMove = 0;
                    }
                    if (updateMove < -(this.listData.length - 1) * singleHeight) {
                        updateMove = -(this.listData.length - 1) * singleHeight;
                    }
                }
                updateDeg = -updateMove * singleDeg;
                spinAim = Math.round(updateDeg / 20);
                margin = Math.round(updateMove / singleHeight) * singleHeight; // 如果不这么写 会导致没有滚动效果
                /* 计算touchEnd移动的整数距离 */
                endMove = margin;
                endDeg = Math.round(updateDeg / deg) * deg;
                if (type === 'end') {
                    this.setListTransform(endMove, margin, type, time);
                    this.setWheelDeg(endDeg, type, time);
                    /* 设置$emit 延迟 */
                    setTimeout(() => this.getPickValue(endMove), 500);
                } else {
                    this.setListTransform(updateMove, margin);
                    this.setWheelDeg(updateDeg);
                }
                this.updateSpin(spinAim);
            },

            /* 更新spin */
            updateSpin(spinAim) {
                this.spin.start = this.spin.branch * -1 + spinAim;
                this.spin.end = this.spin.start + this.spin.branch * 2;
            },

            /* 获取spin 数据 */
            getSpinData(index) {
                index = index % this.listData.length;
                return this.listData[index >= 0 ? index : index + this.listData.length];
            },

            /* 获取选中值 */
            getPickValue(move) {
                let index = Math.round(-move / 34);
                let pickValue = this.getSpinData(index);
                this.$emit('input', pickValue);
            },

            //重置轮盘至初始值
            reset() {
                Object.assign(this.$data, this.$options.data());
                this.init(false);
            }
        },

        watch: {

        },

        beforeDestroy() {
            this.$el.removeEventListener('touchstart', this.itemTouchStart);
            this.$el.removeEventListener('touchmove', this.itemTouchMove);
            this.$el.removeEventListener('touchend', this.itemTouchEnd);

            this.$el.removeEventListener('mousedown', this.itemMouseDown);
            this.$el.removeEventListener('mouseout', this.itemMouseOut);
        }
    }
</script>
<style scoped="scoped">

    html {
        font-family: PingFang SC, Helvetica Neue, Helvetica, STHeitiSC-Light, Arial, sans-serif;
        line-height: 1.8
    }

    .pd-select-item {
        overflow: hidden;
        text-align: center;
        height: 100px;
        position: absolute;
        width: 24px;
        background: #fff;
        z-index: 5;
        background-color: transparent;
    }

    .pd-select-list, .pd-select-wheel {
        position: absolute;
        left: 0;
        right: 0;
        top: 30px
    }

    .pd-select-list-item, .pd-select-wheel-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 34px;
        font-size: 20px;
        color: #333
    }

    .pd-select-list-item.hidden, .pd-select-wheel-item.hidden {
        visibility: hidden;
        opacity: 0
    }

    .pd-select-list {
        overflow: hidden;
        z-index: 4
    }

    .pd-select-wheel {
        z-index: 3;
        transform-style: preserve-3d;
        height: 34px
    }

    .pd-select-wheel-item {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        width: 100%;
        color: #a8a8a8
    }

    .pd-select-ul {
        position: relative
    }

    .pd-select-line:after, .pd-select-line:before {
        position: absolute;
        top: 0;
        content: "";
        display: table;
        background: #fff;
        width: 100%;
        height: 2px;
        transform: scaleY(.5);
        transform-origin: 0 0
    }

    .pd-select-list {
        height: 34px;
        transform: translateZ(110px)
    }
</style>