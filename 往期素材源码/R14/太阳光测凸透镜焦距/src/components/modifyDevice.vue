<template>
    <div>
        <div class="landscape-tip" v-if="!isLandscape">
            <div class="landscape-content"> <img src="static/img/tip.png" alt="">
                <p>请将屏幕自动旋转功能打开并横屏使用</p>
            </div>
        </div>
        <transition name="fade">
            <div class="mobile-tip" v-show="hiddenMobTip"> 建议您在电脑或平板上打开，以获取最佳的演示效果 </div>
        </transition>
    </div>
</template>
<script>
import Bus from '@/assets/js/Bus.js'
export default {
    data() {
        return {
            isLandscape: true,
            hiddenMobTip: false
        }
    },
    mounted() {
        let thiz = this;
        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            let mql = window.matchMedia('(orientation: portrait)');

            let onMatchMeidaChange = function(mql) {
                clearTimeout(thiz.tipTimer);
                if (mql.matches) {
                    // 竖屏
                    thiz.isLandscape = false
                } else {
                      Bus.$emit('canvasX')
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
    }
}

</script>
<style scoped>
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

</style>
