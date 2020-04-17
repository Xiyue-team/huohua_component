<template>
    <div ref="wrap"
         :class="['uiSlider',isBox, flowDirection,  { 'ui-has-piecewise': piecewiseLabel,'noBlueProcess':noBlueProcess?noBlueProcess:noBlue }]"
         :style="wrapStyles"
         @click="wrapClick">
        <!--标题-->
        <h3 v-text="title" v-if="title" class="ui-title"></h3>
        <!--副标题-->
        <p v-text="subTitle" v-if="subTitle" class="ui-subTitle"></p>
        <!--滑条上的文字-->
        <ul v-if="label"
            :style="{width:infinity?'53%':'',marginLeft:dotSize/2+'px'}"
            class="ui-label">
            <li v-for="la in label" v-text="la" :style="{width:100/label.length+'%'}"></li>
        </ul>
        <!--滑块-->
        <div ref="elem" aria-hidden="true"
             class="vue-slider"
             :style="[elemStyles,infinityStyle]">
            <!--双向-->
            <template v-if="valueIsArray">
                <div ref="dot0"
                     :class="[tooltipStatus, 'ui-dot']"
                     :style="[dotStyles]"
                     @mousedown="moveStart(0)"
                     @touchstart="moveStart(0)">
                    <span v-text="dotTxt && dotTxt[0]" class="dotTxt"></span>
                    <!--tip-->
                    <span :class="['ui-toolTip-' + tooltipDirection[0], 'ui-toolTip-wrap']">
            {{ formatter ? formatting(val[0]) : val[0] }}
          </span>
                </div>
                <div ref="dot1"
                     :class="[tooltipStatus, 'ui-dot']"
                     :style="[dotStyles]"
                     @mousedown="moveStart(1)"
                     @touchstart="moveStart(1)"
                >
                    <span v-text="dotTxt && dotTxt[1]" class="dotTxt"></span>
                    <!--tip-->
                    <span :class="['ui-toolTip-' + tooltipDirection[1], 'ui-toolTip-wrap']">
            {{ formatter ? formatting(val[1]) : val[1] }}
					</span>
                </div>
            </template>
            <!--单向-->
            <template v-else>
                <div ref="dot"
                     :class="[tooltipStatus, 'ui-dot']"
                     :style="[dotStyles]"
                     @mousedown="moveStart"
                     @touchstart="moveStart"
                >
                    <span v-text="dotTxt" class="dotTxt"></span>
                    <!--tip-->
                    <span :class="['ui-toolTip-' + tooltipDirection, 'ui-toolTip-wrap']">
            {{ formatter ? formatting(val) : val }}
					</span>
                </div>
            </template>
            <!--滑条及滑条上的圆点、文字-->
            <ul class="ui-piecewise">
                <li v-for="(obj, index) in piecewiseDotWrap"
                    class="ui-piecewise-item"
                    :style="[piecewiseDotStyle, obj.style]"
                    :key="index">
                    <!--滑条上的圆-->
                    <span v-if="piecewise"
                          class="ui-piecewise-dot"
                          :class="{piecewiseActiveStyle:obj.inRange}"></span>
                    <!--滑条上方的文字-->
                    <span v-if="piecewiseLabel"
                          class="ui-piecewise-label"
                          :class="{labelActiveStyle:obj.inRange}">
							{{ obj.label }}
						</span>
                </li>
            </ul>
            <!--蓝色滑条-->
            <div ref="process" class="vue-slider-process"></div>
        </div>
        <!--无穷大样式-->
        <div v-if="infinity" class="ui-infinity" :style="{height:processHeight+'px'}">
            <span></span><span></span> <span></span>
            <span></span><span></span>
            <small>+∞</small>
        </div>
        <input v-if="!valueIsArray && !data" class="vue-slider-sr-only" type="range" v-model="val" :min="min" :max="max" />
    </div>
</template>
<script>
    export default {
        data () {
            return {
                flag: false,
                noBlue: false,
                size: 0,
                currentValue: 0,
                currentSlider: 0
            }
        },
        props: {
            //是否有外框
            box:{type: Boolean,default: true},
            //外框宽度
            boxWidth: {type: [Number, String],default: 240},
            //外框高度
            boxHeight: {type: [Number, String],default: 108},
            //是否有标题,且标题内容是
            title:{type:[Boolean, String],default:''},
            //副标题
            subTitle:{type:[Boolean, String],default:false},
            //滑条的宽度
            processWidth: {type: [Number, String],default: 'auto'},
            //滑条的高度
            processHeight: {type: [Number, String],default: 6},
            data: {type: Array,default: null},
            //滑块上显示的文字
            label: {type: Array,default: null},
            //定义按钮的大小
            dotSize: {type: Number,default:44},
            //按钮上的文字
            dotTxt: {type: [String,Array],default: null},
            //最小值
            min: {type: Number,default: 0},
            //最大值
            max: {type: Number,default: 100},
            //间隔
            interval: {type: Number,default: 1},
            //是否显示无限大
            infinity: {type: Boolean,default: false},
            piecewise: {type: Boolean,default: false},
            piecewiseLabel: {type: Boolean,default: false},
            //是否显示蓝色滑条
            noBlueProcess: {type: Boolean,default: false},
            //是否显示提示内容
            tooltip: {type: [String, Boolean],default: 'always'},
            //滑块方向
            direction: {type: String,default: 'horizontal'},
            //是否反向
            reverse: {type: Boolean,default: false},
            //双向滑块是否可超出某一个左右
            beyondCircle: {type: Boolean,default: true},
            //速度
            speed: {type: Number,default: 0.5},
            //是否实时获取位置
            realTime: {type: Boolean,default: false},
            //数值
            value: {type: [String, Number, Array],default: 0},
            //提示方向
            tooltipDir: [Array, String],
            //提示内容
            formatter: [String, Function],
            piecewiseActiveStyle: Object,
            labelActiveStyle: Object
        },
        computed: {
            //判断是否有外框
            isBox(){
                return this.box?'ui-box':'';
            },
            /*
             * 判断是否为无穷大滑块
             * */
            infinityStyle(){
                if(this.infinity){
                    return {
                        float:'left',
                        width:'64%',
                    }
                }
            },
            /*
             * 根据方向和是否反向增加class
             * this.direction 方向
             * this.reverse 是否反向
             * */
            flowDirection () {
                return `vue-slider-${this.direction + (this.reverse ? '-reverse' : '')}`
            },
            /*
             * 判断提示方向
             * 未设置值时，默认，垂直滑块在左，水平滑块在上
             * 判断设置的方向是否未数组，是，判断数据是否为数组，是则直接返回数组方向，否则返回第二个
             * 非数组，判断数据是否为数组，是则返回组合后的方向，否则直接返回
             * */
            tooltipDirection () {
                let dir = this.tooltipDir || (this.direction === 'vertical' ? 'left' : 'top')
                if (Array.isArray(dir)) {
                    return this.valueIsArray ? dir : dir[1]
                }
                else {
                    return this.valueIsArray ? [dir, dir] : dir
                }
            },
            /*
             * 判断提示的出现
             * 当为hover并且开始滑动时添加显示class
             * 否则判断是否显示提示，是则添加显示class
             * */
            tooltipStatus () {
                return this.tooltip === 'hover' && this.flag ? 'vue-slider-always' : this.tooltip ? `vue-slider-${this.tooltip}` : ''
            },

            /*
             * 数据是否为数组
             * */
            valueIsArray () {
                return Array.isArray(this.value)
            },
            /*
             * 判断数据是否为数组，
             * 是则返回两个按钮的dom
             * 否则返回单个按钮的dom
             * */
            slider () {
                return this.valueIsArray ? [this.$refs.dot0, this.$refs.dot1] : this.$refs.dot
            },
            /*
             * 获取最小值
             * */
            minimum () {
                return this.data ? 0 : this.min
            },
            /*
             * 获取最大值
             * */
            maximum () {
                return this.data ? (this.data.length - 1) : this.max
            },
            /*
             * 数据的设置和获取
             * */
            val: {
                get () {
                    if(this.data){
                        if(this.valueIsArray){
                            return [this.data[this.currentValue[0]], this.data[this.currentValue[1]]]
                        }else{
                            return this.data[this.currentValue]
                        }
                    }else{
                        return this.currentValue
                    }
                },
                set (val) {
                    if (this.data) {
                        if (this.valueIsArray) {
                            let index0 = this.data.indexOf(val[0])
                            let index1 = this.data.indexOf(val[1])
                            if (index0 > -1 && index1 > -1) {
                                this.currentValue = [index0, index1]
                            }
                        }
                        else {
                            let index = this.data.indexOf(val)
                            if (index > -1) {
                                this.currentValue = index
                            }
                        }
                    }else {
                        this.currentValue = val
                    }
                }
            },
            /*
             * 获取当前索引
             * */
            currentIndex () {
                if (this.valueIsArray) {
                    return this.data ? this.currentValue : [
                        (this.currentValue[0] - this.minimum) / this.spacing,
                        (this.currentValue[1] - this.minimum) / this.spacing
                    ]
                }
                else {
                    return (this.currentValue - this.minimum) / this.spacing
                }
            },
            indexRange () {
                if (this.valueIsArray) {
                    return this.currentIndex
                }else {
                    return [0, this.currentIndex]
                }
            },

            multiple () {
                let decimals = `${this.interval}`.split('.')[1]
                return decimals ? Math.pow(10, decimals.length) : 1
            },
            /*
             * 获取间距，传data的一次移动一格
             * */
            spacing () {
                return this.data ? 1 : this.interval
            },
            /*
             * 获取总长度
             * */
            total () {
                if (this.data) {
                    return this.data.length - 1
                }else if (~~((this.maximum - this.minimum) * this.multiple) % (this.interval * this.multiple) !== 0) {
                    console.error('[Vue-slider warn]: Prop[interval] is illegal, Please make sure that the interval can be divisible')
                }
                return (this.maximum - this.minimum) / this.interval
            },
            /*
             * 获取滑条长度与总长度的比例
             * */
            gap () {
                return this.size / this.total
            },
            /*
             * 获取当前位置
             * */
            position () {
                if(this.valueIsArray){
                    return [(this.currentValue[0] - this.minimum) / this.spacing * this.gap,
                        (this.currentValue[1] - this.minimum) / this.spacing * this.gap]
                }else{
                    return ((this.currentValue - this.minimum) / this.spacing * this.gap)
                }
            },
            limit () {
                return this.valueIsArray ? [[0, this.position[1]], [this.position[0], this.size]] : [0, this.size]
            },
            valueLimit () {
                return this.valueIsArray ? [[this.minimum, this.currentValue[1]], [this.currentValue[0], this.maximum]] : [this.minimum, this.maximum]
            },
            /*
             * 样式
             * */
            wrapStyles () {
                return {
                    width: typeof this.boxWidth === 'number' ? `${this.boxWidth}px` : this.boxWidth,
                    height: typeof this.boxHeight === 'number' ? `${this.boxHeight}px` : this.boxHeight,
                    padding: this.direction === 'vertical'?`${this.dotSize / 2}px ${this.dotSize / 2+5}px`:(this.piecewiseLabel?`0 ${this.dotSize / 2+10}px`:`0 ${this.dotSize / 2}px`)
                }
            },

            elemStyles () {
                return this.direction === 'vertical' ? {
                    width: `${this.processWidth}px`,
                    height: '100%'
                } : (!this.title?{
                    height: `${this.processHeight}px`,
                    marginTop:'70px'
                }:{
                    height: `${this.processHeight}px`,
                    marginTop:'50px'
                })
            },
            dotStyles () {
                return this.direction === 'vertical' ? {
                    width: `${this.dotSize}px`,
                    height: `${this.dotSize}px`,
                    left: `${(-(this.dotSize - this.processWidth) / 2)}px`
                } : {
                    width: `${this.dotSize}px`,
                    height: `${this.dotSize}px`,
                    top: `${(-(this.dotSize - this.processHeight) / 2)}px`
                }
            },
            piecewiseDotStyle () {
                return this.direction === 'vertical' ? {
                    width: `${this.processWidth*2}px`,
                    height: `${this.processWidth*2}px`
                } : {
                    width: `${this.processHeight*2}px`,
                    height: `${this.processHeight*2}px`
                }
            },
            /*
             * 分段函数
             * 判断滑条上是否同时有圆和文字
             * */
            piecewiseDotWrap () {
                if (!this.piecewise && !this.piecewiseLabel) {
                    return false
                }
                let arr = [];
                for (let i = 0; i <= this.total; i++) {
                    let style = this.direction === 'vertical' ? {
                        bottom: `${this.gap * i - this.processWidth / 2}px`,
                        left: 0
                    } : {
                        left: `${this.gap * i - this.processHeight}px`,
                        top:'-3px'
                    }
                    let index = this.reverse ? (this.total - i) : i
                    let label = this.data ? this.data[index] : (this.spacing * index) + this.min;
                    arr.push({
                        style,
                        label: this.formatter ? this.formatting(label) : label,
                        inRange: this.val === label
                    })
                }
                return arr
            }
        },
        /*
         * 传进来的参数改变时
         * */
        watch: {
            value (val) {
                this.setValue(val, true)
            },
            max (val) {
                let resetVal = this.limitValue(this.val)
                resetVal !== false && this.setValue(resetVal)
                this.refresh()
            },
            min (val) {
                let resetVal = this.limitValue(this.val)
                resetVal !== false && this.setValue(resetVal)
                this.refresh()
            },

        },
        methods: {
            /*
             * 绑定事件
             * */
            bindEvents () {
                document.addEventListener('touchmove', this.moving, {passive: false})
                document.addEventListener('touchend', this.moveEnd, {passive: false})
                document.addEventListener('mousemove', this.moving)
                document.addEventListener('mouseup', this.moveEnd)
                document.addEventListener('mouseleave', this.moveEnd)

                window.addEventListener('resize', this.refresh)
            },
            /*
             * 取消事件绑定
             * */
            unbindEvents () {
                window.removeEventListener('resize', this.refresh)

                document.removeEventListener('touchmove', this.moving)
                document.removeEventListener('touchend', this.moveEnd)
                document.removeEventListener('mousemove', this.moving)
                document.removeEventListener('mouseup', this.moveEnd)
                document.removeEventListener('mouseleave', this.moveEnd)
            },
            /*
             * 更新提示的内容
             * */
            formatting (value) {
                if(typeof this.formatter === 'string'){
                    return this.formatter.replace(/\{value\}/, value);
                }else{
                    return this.formatter(value);
                }
            },
            /*
             * 获取位置
             * */
            getPos (e) {
                this.realTime && this.getStaticData();
                if(this.direction === 'vertical'){
                    if(this.reverse){
                        return (e.pageY - this.offset)
                    }else{
                        return (this.size - (e.pageY - this.offset))
                    }
                }else{
                    if(this.reverse){
                        return (this.size - (e.clientX - this.offset))
                    }else{
                        return (e.clientX - this.offset)
                    }
                }
            },
            /*
             * 点击最大的div，判断是否可点击
             * 如果是多个的时候，点击判断是否大于两个滑块之间
             * 两个滑块不能点击，否则拿起的会触发点击事件
             * */
            wrapClick (e) {
                let pos = this.getPos(e);
                if (this.valueIsArray) {
                    this.currentSlider = pos > ((this.position[1] - this.position[0]) / 2 + this.position[0]) ? 1 : 0
                }else{
                    this.setValueOnPos(pos)
                }

            },
            /*
             * 按下开始滑动
             * */
            moveStart (index) {
                if (this.valueIsArray) {
                    this.currentSlider = index
                }
                this.flag = true;
                //外暴露
                this.$emit('drag-start', this)
            },
            /*
             * 滑动时
             * 获取并设置
             * */
            moving (e) {
                if (!this.flag) return false;
                e.preventDefault()
                if (e.targetTouches && e.targetTouches[0]) e = e.targetTouches[0]
                this.setValueOnPos(this.getPos(e), true)
            },
            /*
             * 滑动结束
             * */
            moveEnd (e) {
                if (this.flag) {
                    //外暴露
                    this.$emit('drag-end', this)
                }else {
                    return false
                }
                this.flag = false
                this.setPosition()
            },
            /*
             * 设置数据
             * */
            setValueOnPos (pos, isDrag) {
                let range = this.valueIsArray ? this.limit[this.currentSlider] : this.limit;
                let valueRange = this.valueIsArray ? this.valueLimit[this.currentSlider] : this.valueLimit;
                if(this.valueIsArray && this.beyondCircle){
                    if(pos>=0 && pos<= this.$refs.elem.offsetWidth){
                        this.setTransform(pos)
                        let v = (Math.round(pos / this.gap) * (this.spacing * this.multiple) + (this.minimum * this.multiple)) / this.multiple
                        this.setCurrentValue(v, isDrag)
                        if (pos < range[0]) {
                            this.noBlue = true
                        }else if(pos>range[1]) {
                            this.noBlue = true
                        }else{
                            this.noBlue = false
                        }
                    }
                }else{
                    if (pos >= range[0] && pos <= range[1]) {
                        this.setTransform(pos)
                        let v = (Math.round(pos / this.gap) * (this.spacing * this.multiple) + (this.minimum * this.multiple)) / this.multiple
                        this.setCurrentValue(v, isDrag)
                    }else if (pos < range[0]) {
                        this.setTransform(range[0])
                        this.setCurrentValue(valueRange[0],isDrag)
                    }else {
                        this.setTransform(range[1])
                        this.setCurrentValue(valueRange[1],isDrag)
                    }
                }
            },
            /*
             * 判断是否改变
             * */
            isDiff (a, b) {
                if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
                    return true
                }
                else if (Array.isArray(a) && a.length === b.length) {
                    return a.some((v, i) => v !== b[i])
                }
                return a !== b
            },
            setCurrentValue (val, bool) {
                if (val < this.minimum || val > this.maximum) return false
                if (this.valueIsArray) {
                    if (this.isDiff(this.currentValue[this.currentSlider], val)) {
                        this.currentValue.splice(this.currentSlider, 1, val);
                        this.syncValue()
                    }
                }else if (this.isDiff(this.currentValue, val)) {
                    this.currentValue = val
                    this.syncValue()
                }
                bool || this.setPosition()
            },
            setValue (val, noCb, speed) {
                if (this.isDiff(this.val, val)) {
                    let resetVal = this.limitValue(val)
                    if (resetVal !== false) {
                        this.val = this.valueIsArray ? resetVal.concat() : resetVal
                    }
                    else {
                        this.val = this.valueIsArray ? val.concat() : val
                    }
                    this.syncValue(noCb)
                }

                this.$nextTick(() => this.setPosition(speed))
            },
            setPosition (speed) {
                this.flag || this.setTransitionTime(speed === undefined ? this.speed : speed)
                if (this.valueIsArray) {
                    this.currentSlider = 0
                    this.setTransform(this.position[this.currentSlider])
                    this.currentSlider = 1
                    this.setTransform(this.position[this.currentSlider])
                }else {
                    this.setTransform(this.position)
                }
                this.flag || this.setTransitionTime(0)
            },
            /*
             * 设置滑块位置
             *
             * */
            setTransform (val) {
                let value;
                if(this.direction === 'vertical'){
                    value = ((this.dotSize / 2) - val) * (this.reverse ? -1 : 1)
                }else{
                    value = (val - (this.dotSize / 2)) * (this.reverse ? -1 : 1)
                }
                let translateValue = this.direction === 'vertical' ? `translateY(${value}px)` : `translateX(${value}px)`
                let processSize = `${this.currentSlider === 0 ? this.position[1] - val : val - this.position[0]}px`
                let processPos = `${this.currentSlider === 0 ? val : this.position[0]}px`
                if (this.valueIsArray) {
                    this.slider[this.currentSlider].style.transform = translateValue
                    this.slider[this.currentSlider].style.WebkitTransform = translateValue
                    this.slider[this.currentSlider].style.msTransform = translateValue
                    if (this.direction === 'vertical') {
                        this.$refs.process.style.height = processSize
                        this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = processPos
                    }else {
                        this.$refs.process.style.width = processSize
                        this.$refs.process.style[this.reverse ? 'right' : 'left'] = processPos
                    }
                }else {
                    this.slider.style.transform = translateValue
                    this.slider.style.WebkitTransform = translateValue
                    this.slider.style.msTransform = translateValue
                    if (this.direction === 'vertical') {
                        this.$refs.process.style.height = `${val}px`
                        this.$refs.process.style[this.reverse ? 'top' : 'bottom'] = 0
                    }
                    else {
                        this.$refs.process.style.width = `${val}px`
                        this.$refs.process.style[this.reverse ? 'right' : 'left'] = 0
                    }
                }
            },

            /*
             * 设置速度
             * */
            setTransitionTime (time) {
                time || this.$refs.process.offsetWidth
                if (this.valueIsArray) {
                    for (let i = 0; i < this.slider.length; i++) {
                        this.slider[i].style.transitionDuration = `${time}s`
                        this.slider[i].style.WebkitTransitionDuration = `${time}s`
                    }
                    this.$refs.process.style.transitionDuration = `${time}s`
                    this.$refs.process.style.WebkitTransitionDuration = `${time}s`
                }
                else {
                    this.slider.style.transitionDuration = `${time}s`
                    this.slider.style.WebkitTransitionDuration = `${time}s`
                    this.$refs.process.style.transitionDuration = `${time}s`
                    this.$refs.process.style.WebkitTransitionDuration = `${time}s`
                }
            },
            limitValue (val) {
                if (this.data) {
                    return val
                }

                let bool = false
                if (this.valueIsArray) {
                    val = val.map((v) => {
                        if (v < this.min) {
                            bool = true
                            return this.min
                        }
                        else if (v > this.max) {
                            bool = true
                            return this.max
                        }
                        return v
                    })
                }
                else if (val > this.max) {
                    bool = true
                    val = this.max
                }
                else if (val < this.min) {
                    bool = true
                    val = this.min
                }
                return bool && val
            },

            /*
             * 返回数值
             * */
            syncValue (noCb) {
                noCb || this.$emit('callback', this.val)
                this.$emit('input', this.valueIsArray ? this.val.concat() : this.val)
            },
            /*
             * 判断dom是否存在
             * 根据滑块方向获取滑块宽度或者高度--size
             * 垂直滑块，获取页面元素上边与页面顶部的距离加上滚动的距离--offset
             * 水平滑块，获取页面元素左侧与页面左侧的距离--offset
             * */
            getStaticData () {
                if (this.$refs.elem) {
                    this.size = this.direction === 'vertical' ? this.$refs.elem.offsetHeight : this.$refs.elem.offsetWidth
                    this.offset = this.direction === 'vertical' ? (this.$refs.elem.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop) : this.$refs.elem.getBoundingClientRect().left
                }
            },
            /*
             * 主动刷新重新获取数据，并设置位置
             * */
            refresh () {
                if (this.$refs.elem) {
                    this.getStaticData()
                    this.setPosition()
                }
            }
        },
        /*
         * 数据更新后，获取滑块初始距离
         * 设置初始数值
         * 绑定事件
         * */
        mounted () {
            if (typeof window === 'undefined' || typeof document === 'undefined') return
            this.$nextTick(() => {
                this.getStaticData()
                this.setValue(this.value, true, 0)
                this.bindEvents()
            })
        },
        /*
         * 实例销毁时取消事件监听
         * */
        beforeDestroy () {
            this.unbindEvents()
        }
    }
</script>

<style>
    .uiSlider {
        position: relative;
        box-sizing: border-box;
        user-select: none;
    }
    .uiSlider.ui-box{
        /*border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border: solid 0.5px rgba(0, 0, 0, 0.06);*/
    }
    .uiSlider .ui-title{
        font-size: 16px;
        font-weight: 500;
        line-height: 1.0;
        color: #4c4c4c;
        padding-top: 14px;
        text-align: center;
    }
    .uiSlider .ui-subTitle{
        position: absolute;
        top:45px;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.0;
        text-align: center;
        color: #999999;
        left:0;
        text-align: center;
        width: 100%;
    }
    .uiSlider.ui-has-piecewise {
        margin-bottom: 15px;
    }
    .uiSlider .vue-slider {
        position: relative;
        display: block;
        border-radius: 15px;
        background-color: #f0f0f0;
    }
    .uiSlider .vue-slider::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
    .uiSlider.vue-slider-vertical .vue-slider::after{
        content: '';
        position: absolute;
        left: -3px;
        top: -3px;
        background-color: #E6E6E6;
        border-radius: 50%;
        width:12px;
        height:12px;
    }
    .uiSlider.vue-slider-vertical .vue-slider::before{
        content: '';
        position: absolute;
        left: -3px;
        bottom: -3px;
        background-color: #E6E6E6;
        border-radius: 50%;
        width:12px;
        height:12px;
    }
    .uiSlider .vue-slider-process {
        position: absolute;
        border-radius: 15px;
        background-color: #5caefd;
        transition: all 0s;
        z-index: 1;
    }
    .uiSlider.vue-slider-horizontal .vue-slider-process {
        width: 0;
        height: 100%;
        top: 0;
        left: 0;
        will-change: width;
    }
    .uiSlider.vue-slider-vertical .vue-slider-process {
        width: 100%;
        height: 0;
        bottom: 0;
        left: 0;
        will-change: height;
    }
    .uiSlider.vue-slider-horizontal-reverse .vue-slider-process {
        width: 0;
        height: 100%;
        top: 0;
        right: 0;
    }
    .uiSlider.vue-slider-vertical-reverse .vue-slider-process {
        width: 100%;
        height: 0;
        top: 0;
        left: 0;
    }
    .uiSlider .ui-dot {
        position: absolute;
        text-align: center;
        transition: all 0s;
        will-change: transform;
        cursor: pointer;
        z-index: 3;
    }
    .uiSlider .ui-dot .dotTxt{
        display: inline-block;
        width: 24px;
        height: 24px;
        background-color: #ffffff;
        border-radius: 50%;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
        margin-top: 10px;
        font-size: 14px;
        color: #4D4D4D;
        text-align: center;
        line-height: 24px;
    }
    .uiSlider.vue-slider-horizontal .ui-dot {
        left: 0;
    }
    .uiSlider.vue-slider-vertical .ui-dot {
        bottom: 0;
    }
    .uiSlider.vue-slider-horizontal-reverse .ui-dot {
        right: 0;
    }
    .uiSlider.vue-slider-vertical-reverse .ui-dot {
        top: 0;
    }
    .uiSlider .ui-toolTip-wrap {
        display: none;
        position: absolute;
        z-index: 9;
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
        min-width:40px;
        text-align: center;
        font-size: 14px;
        height: 24px;
        color: #4c4c4c;
        line-height: 24px;
        white-space: nowrap;
        word-break: break-all;
    }

    .uiSlider .ui-toolTip-wrap.ui-toolTip-top {
        top:0;
        left: 50%;
        transform: translate(-50%, -100%);
    }
    .uiSlider .ui-toolTip-wrap.ui-toolTip-bottom {
        bottom: -9px;
        left: 50%;
        transform: translate(-50%, 100%);
    }
    .uiSlider .ui-toolTip-wrap.ui-toolTip-left {
        top: 50%;
        left: 0;
        transform: translate(-100%, -50%);
    }
    .uiSlider .ui-toolTip-wrap.ui-toolTip-right {
        top: 50%;
        right: -9px;
        transform: translate(100%, -50%);
    }
    .uiSlider .ui-dot.vue-slider-hover:hover .ui-toolTip-wrap {
        display: block;
    }
    .uiSlider .ui-dot.vue-slider-always .ui-toolTip-wrap {
        display: block!important;
    }
    .uiSlider .ui-label{
        position: absolute;
        left:0;
        right:0;
        top:45px;
        width:85%;
        margin: 0 auto;
        display: table;
    }
    .uiSlider .ui-label li{
        font-size: 14px;
        font-weight: 500;
        line-height: 1.0;
        color: #999999;
        display: table-cell;
        text-align: center;
    }
    .uiSlider .ui-label li:first-child{
        text-align: left;
    }
    .uiSlider .ui-label li:last-child{
        text-align: right;
    }
    .uiSlider .ui-piecewise {
        position: absolute;
        width: 100%;
        padding: 0;
        margin: 0;
        left: 0;
        top: 0;
        height: 100%;
        list-style: none;
    }
    .uiSlider .ui-piecewise-item {
        position: absolute;
        width: 8px;
        height: 8px;
    }
    .uiSlider .ui-piecewise-dot {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        transition: all .3s;
    }
    /*.uiSlider .ui-piecewise-item:first-child .ui-piecewise-dot,*/
    /*.uiSlider .ui-piecewise-item:last-child .ui-piecewise-dot {*/
    /*visibility: hidden;*/
    /*}*/
    .uiSlider.vue-slider-horizontal .ui-piecewise-label,
    .uiSlider.vue-slider-horizontal-reverse .ui-piecewise-label {
        position: absolute;
        display: inline-block;
        top: -40px;
        left: 50%;
        white-space: nowrap;
        transform: translate(-50%, 8px);
        visibility: visible;
        font-size: 16px;
        line-height: 1.0;
        color: #999999;
    }
    .uiSlider.vue-slider-horizontal .ui-piecewise-label.labelActiveStyle,
    .uiSlider.vue-slider-horizontal-reverse .ui-piecewise-label.labelActiveStyle{
        color: #191919;
    }
    .uiSlider.vue-slider-vertical .ui-piecewise-label,
    .uiSlider.vue-slider-vertical-reverse .ui-piecewise-label {
        position: absolute;
        display: inline-block;
        top: 50%;
        left: 100%;
        white-space: nowrap;
        transform: translate(8px, -50%);
        visibility: visible;
        font-size: 16px;
        line-height: 1.0;
        color: #999999;
    }
    .uiSlider.vue-slider-vertical .ui-piecewise-label.labelActiveStyle,
    .uiSlider.vue-slider-vertical-reverse .ui-piecewise-label.labelActiveStyle{
        color: #191919;
    }
    .uiSlider .vue-slider-sr-only {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        width: 1px;
        overflow: hidden;
        position: absolute !important;
    }
    .uiSlider .ui-infinity{
        position: relative;
        float: left;
        margin-top: 50px;
        width: 34%;
    }
    .uiSlider .ui-infinity small{
        position: absolute;
        right:0;
        top:-36px;
        font-size: 14px;
        line-height: 1.0;
        color: #999999;
        text-align: center;
        vertical-align: top;
    }
    .uiSlider .ui-infinity span{
        display: block;
        float: left;
        width: 9px;
        height: 6px;
        border-radius: 6px;
        margin-left: 4px;
        background-color: #f0f0f0;
    }
    .noBlueProcess .vue-slider-process{
        background-color: transparent;
    }
</style>
