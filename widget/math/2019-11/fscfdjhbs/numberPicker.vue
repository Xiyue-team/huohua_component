<template>
    <div class="scroll">
        <swiper style="width: 100%; height: 100%; position: absolute"
                :options="swiperOption"
                v-if="swiperSlides.length>1"
                ref="mySwiper"
        >
            <swiper-slide v-for="(index) in swiperSlides" :key="index">{{index}}
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'numberPicker',
        components: {
            swiper,
            swiperSlide
        },
        props: {
            //转动速度
            speed: {
                default: 800,
                type: Number
            },
            //视图区域显示的数量
            slidesPerView: {
                default: 3,
                type: Number
            },
            //计数器的初始数量
            swiperSlides: {
                default: [],
                type: Array
            },
            //初始显示的数值
            initialSlide: {
              default: 0,
              type: Number
            }
        },
        data () {
            return {
                swiperOption: {
                    initialSlide: this.initialSlide,
                    speed: this.speed,
                    slidesPerView: this.slidesPerView,
                    spaceBetween: 30,
                    watchSlidesProgress : true,
                    centeredSlides : true,
                    //滑动之后回调函数
                    on: {
                        setTranslate: function(){
                            const slides = this.slides;
                            for(let i=0; i< slides.length; i++){
                                const slide = slides[i];
                                const progress = slides[i].progress;
                                //清除样式
                                slide.style.background = '';

                                slide.style.transform = 'scale('+ (1 - Math.abs(progress)/4) +')';
                                slide.style.opacity = (1 - Math.abs(progress)/3);
                            }

                        },
                        setTransition: function(transition) {
                            for (let i = 0; i < this.slides.length; i++) {
                                const slide = this.slides[i];
                                slide.style.transition = transition;
                            }
                        },
                        slideChangeTransitionEnd: function(){
                            console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
                        }
                    }
                },
                // swiperSlides: [11, 12, 13, 14, 15, 16, 17, 18, 19],
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        mounted () {
            //可以使用swiper这个对象去使用swiper官网中的那些方法
            // console.log('this is current swiper instance object', this.swiper);
            // this.swiper.slideTo(0, 0, false);
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    .scroll {
        width: 130%;
        height: 100%;
        position: absolute;
    }

    .swiper-container {
        width: 100%;
        height: auto;
        padding: 0 0;
        margin-left: auto;
        margin-right: auto;
    }
    .swiper-slide {
        text-align: center;
        font-size: 60px;
        height: 60px;

        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        transition-property:all;
    }

</style>
