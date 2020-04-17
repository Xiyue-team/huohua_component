<template>
    <div class="UI-slider" :class="type">
      <!--标题  -->
      <h3 v-text="options.title" v-if="options.title"></h3>
      <!--子标题  -->
      <p v-text="options.subTitle" v-if="options.subTitle"></p>
      <!--自定义刻度  -->
      <ul v-if="options.scale" class="scale_ul" :class="{infinity_ul:type === 'infinity'}">
          <li v-for="item in options.scale" v-text="item"></li>
      </ul>
      <vue-slider v-model="val"
                  :min="options.min"
                  :max="options.max"
                  :width="setWidth"
                  :height="setHeight"
                  :direction="options.direction"
                  :dotSize="44"
                  :reverse="options.reverse"
                  :interval="options.interval"
                  :tooltip="tooltip"
                  :formatter="formatter"
                  :data="options.data"
                  :realTime="true"
                  :piecewiseLabel="options.piecewiseLabel"
                  :piecewise="options.piecewise"
                  :piecewiseStyle="piecewiseStyle"
                  :piecewiseActiveStyle='piecewiseActiveStyle'
                  :labelActiveStyle='labelActiveStyle'></vue-slider>

        <dl v-if="type === 'infinity'" class="infinity_dl">
            <dt>+∞</dt><dd></dd><dd></dd><dd></dd>
            <dd></dd>
            <dd></dd>
            <dd></dd>
        </dl>

        <ul class="vertical_ul" v-if="type === 'vertical'">
            <li></li>
            <li></li>
        </ul>
    </div>
</template>

<script>
    import vueSlider from 'vue-slider-component';
    export default{
        props: {
            type:String,
            options:Object,
        },
        components: {vueSlider},
        created(){},
        data(){
            return {
                val:this.options.value || 0,
                piecewiseStyle:{
                    "backgroundColor": "#E6E6E6","visibility": "visible","width": "12px","height": "12px"
                },
                piecewiseActiveStyle:{
                    "backgroundColor": "#5caefd"
                },
                labelActiveStyle:{
                    "color": "#191919"
                }
            };
        },
        computed:{
            setWidth(){
                if(this.options.width){
                    return this.options.width;
                }else if(this.type === 'status'){
                    return 295;
                }else if(this.type === 'infinity'){
                    return 160;
                }else if(this.type === 'vertical'){
                    return 6;
                }else{
                    return 220;
                }
            },
            setHeight(){
                if(this.options.height){
                    return this.options.height;
                }else if(this.type === 'vertical'){
                    return 330
                }else{
                    return 6;
                }
            },
            tooltip(){
                if(this.options.tooltip === false){
                    return this.options.tooltip;
                }else{
                    return 'always';
                }
            },
            formatter(){
                if(this.options.formatter){
                    return this.val+this.options.formatter;
                }
            }
        },
        watch:{
            val(val){
                this.$emit('changeEvent',val)
            }
        },
        methods: {

        },
    };
</script>

<style>
    .UI-slider{
        width: 240px;
        height: 108px;
        position: relative;
        border-radius: 6px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.08);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
    }

    .UI-slider.vertical{
        width: 60px;
        height: 330px;
    }
    .UI-slider h3{
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        color: #4c4c4c;
        padding-top: 14px;
    }
    .UI-slider p{
        text-align: center;
        font-size: 14px;
        line-height: 1.0;
        color: #999999;
        padding-top:10px;
    }
    .UI-slider .vue-slider-component{
        margin: 0 auto;
        padding: 22px 10px!important;
    }
    .UI-slider .vue-slider-component{
        margin-top: 24px;
    }
    .status .vue-slider-component{
        margin-top: 45px;
    }
    .scale .vue-slider-component{
        margin-top: 0;
    }
    .vertical .vue-slider-component{
        margin-top: 0;
    }
    .double .vue-slider-component{
        margin-top: -5px;
    }
    .infinity .vue-slider-component{
        float: left;
        margin-top: 0;
        margin-left: 10px;
    }

    .UI-slider.status{
        width:330px;
        height: 108px;
    }

    .scale_ul{
        overflow: hidden;
        padding: 0 12px;
        margin-top: 10px;
        margin-left: 10px;
    }
    .scale_ul.infinity_ul{
        width:160px;
    }
    .scale_ul li{
        float: left;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.0;
        color: #999999;
    }
    .scale_ul li:last-child{
        float: right;
    }

    .infinity_dl{
        position: relative;
        float: left;
        height: 50px;
        margin-left: -10px;
    }
    .infinity_dl dt{
        position: absolute;
        top:-15px;
        right:0;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.0;
        color: #999999;
    }
    .infinity_dl dd{
        float: left;
        width: 9px;
        height: 6px;
        border-radius: 6px;
        background-color: #f0f0f0;
        margin-right: 4px;
        margin-top: 22px;
    }
    .infinity_dl dd:nth-child(2){
        width: 3px;
        height: 6px;
        border-radius: 0;
        background-color: #4a4a4a;
    }
    .infinity_dl dd:last-child{
        margin-right: 0;
    }
    .vertical_ul{
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height: 100%;
        z-index: 0;
    }
    .vertical_ul li{
        width:12px;
        height: 12px;
        border-radius: 50%;
        background-color:#f0f0f0;
    }
    .vertical_ul li:first-child{
        margin-top: 18px;
        margin-left: 23px;
    }
    .vertical_ul li:last-child{
        margin-top: 269px;
        margin-left: 23px;
    }
    .vertical .vue-slider-component .vue-slider-process{
       display: none;
    }



    /*重置插件样式*/

    .UI-slider .vue-slider-component .vue-slider{
        background-color: #f0f0f0;

    }
    .UI-slider .vue-slider-component .vue-slider-process{
        background-color: #5caefd;
    }
    .UI-slider .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top .vue-slider-tooltip:before{
        display: none;
    }
    .UI-slider .vue-slider-component .vue-slider-tooltip{
        border-radius: 4px;
        background-color: #ffffff;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
        font-size: 14px;
        color: #4c4c4c;
    }
    .UI-slider .vue-slider-component .vue-slider-dot{
        border-radius: 0;
        background:none;
        box-shadow: none;
    }
    .UI-slider .vue-slider-component .vue-slider-dot::before{
        position: absolute;
        width: 24px;
        height: 24px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.24);
        border: solid 0.5px rgba(0, 0, 0, 0.06);
        border-radius: 50%;
        content: "";
        bottom: calc(50% - 12px);
        left: calc(50% - 12px);
    }
    .UI-slider .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-top{
        top:3px;
      width: 40px;
    }

    .UI-slider .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-label,
    .UI-slider .vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-label{
        top:-47px;
        font-size: 16px;
        color: #999;
    }

    .UI-slider .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-item:first-child .vue-slider-piecewise-label,
    .UI-slider .vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-item:first-child .vue-slider-piecewise-label{
        transform: translate(-30%,8px);
    }
    .UI-slider .vue-slider-component.vue-slider-horizontal-reverse .vue-slider-piecewise-item:last-child .vue-slider-piecewise-label,
    .UI-slider .vue-slider-component.vue-slider-horizontal .vue-slider-piecewise-item:last-child .vue-slider-piecewise-label{
        transform: translate(-80%,8px);
    }


    .UI-slider .vue-slider-component.vue-slider-vertical-reverse{
        padding: 22px 10px!important;
    }
    .UI-slider .vue-slider-component.vue-slider-vertical-reverse .vue-slider{
        margin: 0 auto;
    }
    .UI-slider .vue-slider-component.vue-slider-vertical{
        padding: 22px 10px!important;
    }
    .UI-slider .vue-slider-component.vue-slider-vertical .vue-slider{
        margin: 0 auto;
    }
    .UI-slider .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left{
        transform: translate(-70%,-50%);
    }
    .UI-slider .vue-slider-component .vue-slider-tooltip-wrap.vue-slider-tooltip-left .vue-slider-tooltip:before{
        display: none;
    }

</style>
