import Vue from 'vue';
import {Watch} from 'vue-property-decorator';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {ModelViewHandler} from './services/ModelViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import {BrowserUtil} from '../../../../src/util/BrowserUtil';
import tipImg1 from './sub_static/UI/image1.png';
import tipImg2 from './sub_static/UI/image2.png';
import tipImg3 from './sub_static/UI/image3.png';
@Component

export class MainVueComponent extends Vue {
    active1 = true;
    active2 = false;
    active3 = false;
    frameNum1 = 0;
    frameNum2 = 0;
    isShow = true;
    redShow = true;
    blueShow = false;
    index3 = 1;
    index4 = 4;
    activeE1 = false;
    activeE2 = false;
    activeE3 = false;
    reactantTip = false;
    productTip = false;
    tipImg = tipImg1;
    //关键帧组件所用到的参数
    animationOption1 = {
        zipUrl: require('./sub_static/UI/img1/animation2.zip'),
        imageNum: 78,
        showSlider: true,
        timeLineLength: 0,
        interval: 110,
        //滑动条上点的位置
        timeLine: [0, 53, 77],
        //滑动条上标签的位置
        label: ['反应物', '过渡态', '生成物'],
        animationName: 'name1',
        width: BrowserUtil.getBrowserInfo().isSmallDevice ? 200 : 505,
        height: BrowserUtil.getBrowserInfo().isSmallDevice ? 38 : 95,
        top: BrowserUtil.getBrowserInfo().isSmallDevice ?  45 : 43,
        left1: BrowserUtil.getBrowserInfo().isSmallDevice ? 13 : 13,
        left2: BrowserUtil.getBrowserInfo().isSmallDevice ? 50 : 50,
        bottom: BrowserUtil.getBrowserInfo().isSmallDevice ? 15 : 50,
        rightPlay: BrowserUtil.getBrowserInfo().isSmallDevice ? -165 : -250,
        bottomPlay: BrowserUtil.getBrowserInfo().isSmallDevice ? -15 : 0,
        image0: require('./sub_static/UI/img1/a_00000.png'),
    };
    //关键帧组件所用到的参数
    animationOption2 = {
        zipUrl: require('./sub_static/UI/img2/animation2.zip'),
        imageNum: 39,
        timeLineLength: 0,
        interval: 110,
        showSlider: true,
        timeLine: [0, 17, 22, 35, 38],
        label: ['反应物', '过渡态1', '中间产物', '过渡态2', '生成物'],
        animationName: 'name2',
        width: BrowserUtil.getBrowserInfo().isSmallDevice ? 200 : 505,
        height: BrowserUtil.getBrowserInfo().isSmallDevice ? 119 : 301,
        top: BrowserUtil.getBrowserInfo().isSmallDevice ?  38 : 33,
        left1: BrowserUtil.getBrowserInfo().isSmallDevice ? 13 : 13,
        left2: BrowserUtil.getBrowserInfo().isSmallDevice ? 50 : 50,
        bottom: BrowserUtil.getBrowserInfo().isSmallDevice ? -2 : 6,
        rightPlay: BrowserUtil.getBrowserInfo().isSmallDevice ? -165 : -250,
        bottomPlay: BrowserUtil.getBrowserInfo().isSmallDevice ? -10 : 15,
        image0: require('./sub_static/UI/img2/b_00000.png'),
    };
    // 判断是否是手机
    isMobile = false;
    // created
    created() {
        const viewOption = new ViewOption();
        viewOption.mobilePanelAlpha = true;
        viewOption.showMobileExpandIco = false;
        ViewController.getInstance(new ModelViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
    }
    // mounted
    mounted() {
        ViewController.getInstance().domReady();
        if (BrowserUtil.getBrowserInfo().isSmallDevice) {
            this.isMobile = true;
        } else {
            this.isMobile = false;
        }
        (this.$refs as any).functionuse1.refresh();
        this.resetPos();
    }
    // 设置能量曲线图的位置
    energyImgBoxPos (left: string, top: string, transform: string) {
        const redCover = document.getElementById('energyImgBox');
        redCover.style.left = left;
        redCover.style.top = top;
        redCover.style.transform = transform;
    }
    // 设置反应区域与滑动条的位置
    setUpEvt (width1: number, height1: number, top1: number, left11: number, left12: number, rightPlay1: number, bottomPlay1: number,
              width2: number, height2: number, top2: number, left21: number, left22: number, rightPlay2: number, bottomPlay2: number) {
        this.animationOption1.width = width1;
        this.animationOption1.height = height1;
        this.animationOption1.top = top1;
        this.animationOption1.left1 = left11;
        this.animationOption1.left2 = left12;
        this.animationOption1.rightPlay = rightPlay1;
        this.animationOption1.bottomPlay = bottomPlay1;
        this.animationOption2.width = width2;
        this.animationOption2.height = height2;
        this.animationOption2.top = top2;
        this.animationOption2.left1 = left21;
        this.animationOption2.left2 = left22;
        this.animationOption2.rightPlay = rightPlay2;
        this.animationOption2.bottomPlay = bottomPlay2;
    }
    // ipad及pc端能量反应区域的位置
    resetPos () {
        if (navigator.userAgent.indexOf('AL10') !== -1) {
            //荣耀10
            this.energyImgBoxPos('45%', '50%', 'translateY(-50%) scale(0.8)');
            this.animationOption1.bottom = -12;
            this.animationOption2.bottom = -18;
            this.setUpEvt (200, 38, 45, 11, 45, -160, -8,
                200, 119, 35, 12, 45, -160, -2);
        } else if (document.documentElement.clientHeight > 335 && document.documentElement.clientHeight < 362) {
            // 小米
            this.energyImgBoxPos('45%', '50%', 'translateY(-50%) scale(0.8)');
            this.animationOption1.bottom = -12;
            this.animationOption2.bottom = -18;
            this.setUpEvt (200, 38, 45, 13, 45, -160, -8,
                200, 119, 35, 13, 45, -160, -2);
        } else if (document.documentElement.clientWidth > 900 && document.documentElement.clientWidth < 1100) {
            //iPad mini4
            this.energyImgBoxPos('41%', '50%', 'translateY(-50%) scale(0.6)');
            this.animationOption1.bottom = 70;
            this.animationOption2.bottom = 45;
            this.setUpEvt (288, 54, 43, 15, 45, -210, -5,
                288, 172, 38, 15, 45, -210, 3);
        } else if (document.documentElement.clientWidth > 1200 && document.documentElement.clientWidth < 1240) {
            // win编辑器
            this.energyImgBoxPos('42%', '50%', 'translateY(-50%) scale(0.7)');
            this.animationOption1.bottom = 70;
            this.animationOption2.bottom = 45;
            this.setUpEvt (288, 54, 45, 15, 45, -210, -5,
                288, 172, 40, 15, 45, -210, 3);
        } else if (document.documentElement.clientWidth > 1250 && document.documentElement.clientWidth < 1300) {
            // 华为M2
            this.energyImgBoxPos('42%', '50%', 'translateY(-50%) scale(0.7)');
            this.animationOption1.bottom = 70;
            this.animationOption2.bottom = 45;
            this.setUpEvt (288, 54, 45, 15, 45, -210, -5,
                288, 172, 40, 15, 45, -210, 3);
        } else if (document.documentElement.clientWidth > 800 && document.documentElement.clientWidth < 860) {
            // 海信E9和华为C5  navigator.userAgent.indexOf('HITV300C') !== -1 || navigator.userAgent.indexOf('MON-W19') !== -1
            this.animationOption1.bottom = 45;
            this.animationOption2.bottom = 28;
            this.setUpEvt (200, 38, 45, 13, 45, -165, -7,
                200, 119, 40, 13, 45, -165, -2);
            this.energyImgBoxPos('53%', '50%', 'translateY(-50%)');
        } else {
            this.energyImgBoxPos('53%', '50%', 'translateY(-50%)');
        }
    }
    getEvent(index: number) {
        if (index === 1) {
            if (this.active1) {
                return;
            }
            this.resetPos();
            (this.$refs as any).functionuse1.refresh();
            (this.$refs as any).functionuse1.reset();
            (this.$refs as any).functionuse2.reset();
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
            this.tipImg = tipImg1;
        } else if (index === 2) {
            if (this.active2) {
                return;
            }
            this.resetPos();
            (this.$refs as any).functionuse2.refresh();
            (this.$refs as any).functionuse1.reset();
            (this.$refs as any).functionuse2.reset();
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(2);
            this.tipImg = tipImg2;
            this.isShow = false;
        } else if (index === 3) {
            if (this.active3) {
                return;
            }
            const redCover = document.getElementById('energyImgBox');
            redCover.style.left = '50%';
            redCover.style.top = '50%';
            redCover.style.transform = 'translate(-50%, -50%)';
            (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(3);
            this.redShow = true;
            this.blueShow = true;
            this.tipImg = tipImg3;
        }
    }
    @Watch('frameNum1')
    onChildChanged1(val: number) {
        if (this.frameNum1 !== 0) {
            this.isShow = false;
        }
        const redCover = document.getElementById('redCover');
        if (this.frameNum1 <= 53) {
            this.activeE1 = false;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                redCover.style.left = 21 + 1.8 * this.frameNum1 + 'px';
            } else {
                redCover.style.left = 45 + 4 * this.frameNum1 + 'px';
            }
        } else if (this.frameNum1 > 53) {
            this.activeE1 = true;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                redCover.style.left = 21 + 1.8 * 53 + 4.8 * (this.frameNum1 - 53) + 'px';
            } else {
                redCover.style.left = 45 + 4 * 53 + 10 * (this.frameNum1 - 53) + 'px';
            }

        }
    }
    @Watch('frameNum2')
    onChildChanged2(val: number) {
        if (this.frameNum2 !== 0) {
            this.isShow = false;
        }
        const blueCover = document.getElementById('blueCover');
        if (this.frameNum2 <= 2) {
            if (this.active3) {
                this.reactantTip = true;
            }
            this.activeE2 = false;
            this.activeE3 = false;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * this.frameNum2 + 'px';
            } else {
                blueCover.style.left = 45 + 8 * this.frameNum2 + 'px';
            }

        } else if (this.frameNum2 > 2 && this.frameNum2 <= 16) {
            this.activeE2 = false;
            this.activeE3 = false;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * (this.frameNum2 - 2) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 2 + 8 * (this.frameNum2 - 2) + 'px';
            }
        } else if (this.frameNum2 > 16 && this.frameNum2 <= 21) {
            this.activeE2 = true;
            this.activeE3 = false;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * 15 + 9.5 * (this.frameNum2 - 17) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 17 + 21 * (this.frameNum2 - 17) + 'px';
            }
        } else if (this.frameNum2 > 21 && this.frameNum2 <= 34) {
            this.activeE2 = true;
            this.activeE3 = false;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * 15 + 9.5 * 5 + 2.4 * (this.frameNum2 - 22) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 17 + 21 * 5 + 5.8 * (this.frameNum2 - 22) + 'px';
            }
        } else if (this.frameNum2 > 34 && this.frameNum2 <= 35) {
            this.activeE2 = true;
            this.activeE3 = true;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * 15 + 9.5 * 5 + 2.4 * 13 + 20 * (this.frameNum2 - 35) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 17 + 21 * 5 + 5.8 * 13 + 56 * (this.frameNum2 - 35) + 'px';
            }
        } else if (this.frameNum2 > 35 && this.frameNum2 <= 38) {
            this.activeE2 = true;
            this.activeE3 = true;
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * 15 + 9.5 * 5 + 2.4 * 13 + 20 + 28 * (this.frameNum2 - 36) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 17 + 21 * 5 + 5.8 * 13 + 56 + 56 * (this.frameNum2 - 36) + 'px';
            }
        } else if (this.frameNum2 > 38) {
            this.activeE2 = true;
            this.activeE3 = true;
            if (this.active3) {
                this.productTip = true;
            }
            if (BrowserUtil.getBrowserInfo().isSmallDevice) {
                blueCover.style.left = 21 + 8 * 2 + 3.3 * 15 + 9.5 * 5 + 2.4 * 13 + 20 + 28 * 3 + 28 * (this.frameNum2 - 38) + 'px';
            } else {
                blueCover.style.left = 45 + 8 * 17 + 21 * 5 + 5.8 * 13 + 56 + 56 * 3 + 56 * (this.frameNum2 - 38) + 'px';
            }
        }
    }
    // 重置
    reset() {
        this.resetPos();
        (ViewController.getInstance().viewHandler as ModelViewHandler).getEvent1(1);
        this.tipImg = tipImg1;
        this.isShow = true;
    }
}

