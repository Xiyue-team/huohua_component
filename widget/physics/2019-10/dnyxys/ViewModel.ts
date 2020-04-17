import Vue from 'vue';
import Component from 'vue-class-component';
import {ViewController} from '../../../../src/core/ViewController';
import {DnyxysViewHandler} from './services/DnyxysViewHandler';
import {ViewOption} from '../../../../src/core/CoreInterface';
import { Watch } from 'vue-property-decorator';
const viewOptionConfig = require('./meta.json');

@Component
export class ViewModel extends Vue {
    sDis: Boolean = false;
    rDis: Boolean = false;
    kilogram: Number = 10;
    kilograms: any[] = [5, 10];
    kgShow: Boolean = false;
    height: Number = 3;
    options: any[] = [
        {
            value: 5,
            label: 5
        },
        {
            value: 10,
            label: 10
        }
    ];
    records: any[] = [];    // 显示的记录
    tempRecords: any[] = [];    // 所有记录
    temp: any[] = [];       // 显示记录的备份
    positions: any = {
        5: {
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6,
            7: 7,
            8: 8,
            9: 9,
            10: 10
        },
        10: {
            1: 2,
            2: 4,
            3: 6,
            4: 8,
            5: 10,
            6: 12,
            7: 14,
            8: 16,
            9: 18,
            10: 20
        }
    }; // 小球和箱子的位置
    show: Boolean = false;
    sel: any[] = [];    // 选择的记录
    isMobile = window.innerWidth >= 1024 ? false : true;
    title = '动能的影响因素';
    record = '数<br>据<br>记<br>录';
    qualityText = '质量m';
    heightText = '高度h';
    startBtn = '开始演示';
    resetBtn = '重置状态';
    commonWidth = window.innerWidth / 1366 * 940 * 0.9 < 940 ? 940 : window.innerWidth / 1366 * 940 * 0.9;
    timer: any = null;  // 定时器
    created() {
        this.title = window.env.browserInfo.lang.title;
        this.record = window.env.browserInfo.lang.record;
        this.qualityText = window.env.browserInfo.lang.qualityText;
        this.heightText = window.env.browserInfo.lang.heightText;
        this.startBtn = window.env.browserInfo.lang.button.startBtn;
        this.resetBtn = window.env.browserInfo.lang.button.resetBtn;
        const viewOption = new ViewOption();
        viewOption.showMobileExpandIco = viewOptionConfig.config.showMobileExpandIco;
        viewOption.adapterMobilePanel = viewOptionConfig.config.adapterMobilePanel;
        viewOption.mobilePanelAlpha = viewOptionConfig.config.mobilePanelAlpha;
        viewOption.showMobileResetIco = viewOptionConfig.config.showMobileResetIco;
        viewOption.controlPanelAnimationDelay = viewOptionConfig.config.controlPanelAnimationDelay;
        viewOption.showReset = viewOptionConfig.config.showReset;

        ViewController.getInstance(new DnyxysViewHandler(this), viewOption);
        ViewController.getInstance().viewHandler.beforeRenderElement();
        document.body.addEventListener('touchstart', () => {});
    }

    mounted() {
        ViewController.getInstance().hideLoading();
        ViewController.getInstance().domReady();
    }

    /**
     * 开始演示
     */
    start(): void {
        const height: number = Number(this.height);
        const kg: number = Number(this.height);
        const ballDownTime = height * (kg === 5 ? 0.08 : 0.07) + 0.5; // 小球下滑时间
        const toBoxTime = 0.3 - height * (kg === 5 ? 0.01 : 0.02); // 获取小球碰到箱子前运动结束时间
        const endTime = height * (kg === 5 ? 0.8 : 0.7) + 0.5; // 获取小球碰到箱子后运动结束时间
        const time = ballDownTime + toBoxTime + endTime; // 获取运动所需总时间
        this.sDis = true;   // 开始演示不可点击
        this.rDis = true;   // 重置状态不可点击、不可选择高度和重量
        // 运动结束后
        this.timer = setTimeout(() => {
            this.rDis = false;
            // 添加记录
            const record = {
                kg: this.kilogram,
                height: this.height,
                position: this.positions[Number(this.kilogram)][Number(this.height)] // 小球和箱子的位置
            };
            if (this.tempRecords.length === 10) {
                this.tempRecords[9] = record;
            } else {
                this.tempRecords.push(record);
            }
            if (this.records.length < 2) {
                this.records.push(record);
            }
        }, time * 1000);
        (ViewController.getInstance().viewHandler as DnyxysViewHandler).start();
    }

    /**
     * 重置状态
     */
    resetStatus(): void {
        (ViewController.getInstance().viewHandler as DnyxysViewHandler).resetStatus(Boolean(this.sDis));
        this.kgShow = false;
        setTimeout(() => {
            this.sDis = false;  // 开始演示可点击
        }, 100);
    }

    /**
     * 显示或隐藏记录
     */
    showRecord(): void {
        if (!this.show) {
            this.temp = JSON.parse(JSON.stringify(this.records));  // 记录已经显示的记录
            this.records = this.tempRecords;    // 显示所有记录
        } else {
            if (this.sel.length === 1) {    // 选择一条记录
                const first = this.sel[0];
                const temp = this.tempRecords[1];
                this.tempRecords[1] = this.tempRecords[first];
                this.tempRecords[first] = temp;
                this.records = [this.tempRecords[0], this.tempRecords[1]];
                this.temp = JSON.parse(JSON.stringify(this.records));
            } else if (this.sel.length === 2) { // 选择两条记录
                const first = this.sel[0];
                const second = this.sel[1];
                const firstTemp = this.tempRecords[0];
                this.tempRecords[0] = this.tempRecords[first];
                this.tempRecords[first] = firstTemp;
                const secondTemp = this.tempRecords[1];
                this.tempRecords[1] = this.tempRecords[second];
                this.tempRecords[second] = secondTemp;
                this.records = [this.tempRecords[0], this.tempRecords[1]];
                this.temp = JSON.parse(JSON.stringify(this.records));
            } else {    // 未选择记录
                this.records = this.temp;
            }
        }
        this.sel = []; // 清空已选择的记录
        this.show = !this.show;
    }

    /**
     * 选择记录
     * @param index 第几条记录
     */
    choose(index: number): void {
        // 可选择的记录出去前两条，且最多只能选择两条记录
        if (this.show && index > 1) {
            let tIndex = -1;
            this.sel.forEach((s, i) => {
                if (s === index) {
                    tIndex = i;
                }
            });
            if (tIndex > -1) {
                this.sel.splice(tIndex, 1);
            } else {
                if (this.sel.length === 2) {
                    this.sel.shift();
                }
                this.sel.push(index);
            }
        }
    }

    /**
     * 显示选择重量
     */
    showKg(): void {
        if (!this.rDis) {
            this.kgShow = !this.kgShow;
        }
    }

    /**
     * 隐藏选择重量
     */
    hideKg(): void {
        this.kgShow = false;
    }

    /**
     * 选择重量
     * @param kg 
     */
    chooseKg(kg: number) {
        this.kilogram = kg;
    }
    
    /**
     * 监听重量的变化
     * @param kg 
     */
    @Watch('kilogram')
    kilogramChange(kg: Number) {
        (ViewController.getInstance().viewHandler as DnyxysViewHandler).kilogramChange(kg, Boolean(this.sDis));
        setTimeout(() => {
            this.sDis = false;
        }, 100);
    }
    
    /**
     * 监听高度的变化
     * @param height 
     */
    @Watch('height')
    heightChange(height: Number) {
        (ViewController.getInstance().viewHandler as DnyxysViewHandler).heightChange(height, Boolean(this.sDis));
        setTimeout(() => {
            this.sDis = false;
        }, 100);
    }
}
