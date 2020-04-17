import {RswzConfig} from './RswzConfig';
import * as Konva from 'konva';
import * as tuboshu from '../sub_static/tuboshu.png';
import * as xiaotuzi from '../sub_static/xiaobaitu.png';
import * as xiaohuli from '../sub_static/xiaohuli.png';
import * as xiaosongshu from '../sub_static/xiaosongshu.png';
import * as xiaowugui from '../sub_static/xiaowugui.png';
import * as xiaokonglong from '../sub_static/xiaokonglong.png';
import * as xiaociwei from '../sub_static/xiaociwei.png';
import * as xiaoshizi from '../sub_static/xiaoshizi.png';
import * as xiaohouzi from '../sub_static/xiaohouzi.png';
import * as muban from '../sub_static/muban.png';
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';

export class RswzCanvas extends SimpleKonvaTemplate {

    config: RswzConfig;

    selectGroup: Konva.Group;

    // 图片地址数组
    imageSrcArray = [tuboshu, xiaotuzi, xiaohuli, xiaosongshu, xiaowugui, xiaokonglong, xiaociwei, xiaoshizi, xiaohouzi];
    // 加载完成的konva图片数组
    konvaImageArray = new Array<Konva.Image>();
    // 图片位置数组
    imagePositionArray: Array<Map<string, number>>;

    constructor() {
        super('container');
        this.config = new RswzConfig();
        this.init();
    }

    private async init() {
        await this.initMuban();

        this.initSelectGroup();
        this.initImagePositionArray();
        await this.initAnimalImage();

        this.initClickEvent();

        this.setStagePos();

        this.stage.draw();
    }

    private async initMuban() {
        //木板1
        const mbImageUp = await this.loadImage((muban as any), this.config.mbImageUp as any);
        this.staticLayer.add(mbImageUp);

        //木板2
        const mbImageMiddle = await this.loadImage((muban as any), this.config.mbImageMiddle as any);
        this.staticLayer.add(mbImageMiddle);

        //木板3
        const mbImageDown = await this.loadImage((muban as any), this.config.mbImageDown as any);
        this.staticLayer.add(mbImageDown);
    }

    private initSelectGroup() {
        this.selectGroup = new Konva.Group({
            visible: false,
        });
        this.staticLayer.add(this.selectGroup);

        this.writeText();
        this.drawRect();
    }

    //点击动物出现边框
    private drawRect() {
        const djk = new Konva.Rect(this.config.selectRect);
        this.selectGroup.add(djk);
    }

    //边框旁的文字
    private writeText() {
        const selectTextTop = new Konva.Text(this.config.selectTextTop);
        this.selectGroup.add(selectTextTop);

        const selectTextLeft = new Konva.Text(this.config.selectTextLeft);
        this.selectGroup.add(selectTextLeft);

        const selectTextBottom = new Konva.Text(this.config.selectTextBottom);
        this.selectGroup.add(selectTextBottom);

        const selectTextRight = new Konva.Text(this.config.selectTextRight);
        this.selectGroup.add(selectTextRight);
    }

    // 初始化小动物图片位置
    private initImagePositionArray() {
        const startX = 112;
        const startY = 40;
        const marginX = 277;
        const marginY = 181;

        const pos1 = new Map().set('x', startX).set('y', startY);
        const pos2 = new Map().set('x', startX + marginX).set('y', startY);
        const pos3 = new Map().set('x', startX + marginX * 2).set('y', startY);
        const pos4 = new Map().set('x', startX).set('y', startY + marginY);
        const pos5 = new Map().set('x', startX + marginX).set('y', startY + marginY);
        const pos6 = new Map().set('x', startX + marginX * 2).set('y', startY + marginY);
        const pos7 = new Map().set('x', startX).set('y', startY + marginY * 2);
        const pos8 = new Map().set('x', startX + marginX).set('y', startY + marginY * 2);
        const pos9 = new Map().set('x', startX + marginX * 2).set('y', startY + marginY * 2);

        this.imagePositionArray = new Array<Map<string, number>>();
        this.imagePositionArray.push(pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9);
    }

    // 初始化小动物图片
    private async initAnimalImage() {
        for (let index = 0; index < this.imageSrcArray.length; index++) {
            const src = this.imageSrcArray[index];
            const image = await this.loadImage(src as any, this.config.animalImage as any);
            this.setAnimalImagePos(image, index);

            this.staticLayer.add(image);

            this.konvaImageArray.push(image);
        }
    }

    private setAnimalImagePos(image: Konva.Image, index: number) {
        image.x(this.imagePositionArray[index].get('x'));
        image.y(this.imagePositionArray[index].get('y'));
    }

    //点击小动物出现边框
    private async initClickEvent() {
        for (let index = 0; index < this.konvaImageArray.length; index++) {
            const image = this.konvaImageArray[index];
            image.on('click tap' , () => {
                this.selectGroup.x(image.x());
                this.selectGroup.y(image.y());
                this.selectGroup.visible(true);
                this.staticLayer.draw();
            });

            image.on('mouseenter', () => {
                this.stage.container().style.cursor = 'pointer';
            });

            image.on('mouseleave', () => {
                this.stage.container().style.cursor = 'default';
            });
        }
    }

    private resetKonvaImageArrayPos() {
        const tempArray = this.shuffle(this.imagePositionArray);
        this.imagePositionArray = tempArray;
        for (let index = 0; index < this.konvaImageArray.length; index++) {
            const image = this.konvaImageArray[index];
            this.setAnimalImagePos(image, index);
        }
    }

    private shuffle(array: Array<any>) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    private setStagePos() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = width / height > 16 / 9 ? height / 675 : width / 1200;

        this.stage.width((this.config.stageWidth) * scale);
        this.stage.height((this.config.stageHeight) * scale);

        this.stage.scaleX(scale);
        this.stage.scaleY(scale);

        // 使canvas居中
        const left = (width - this.stage.width()) / 2 + 'px';
        const top = (height - this.stage.height()) / 2 + 'px';
        const container = document.getElementById('container').children[0];
        (container as any).style.top = top;
        (container as any).style.left = left;
        (container as any).style.position = left;
    }

    // 重置
    reset() {
        this.resetKonvaImageArrayPos();
        this.selectGroup.visible(false);

        this.stage.draw();
    }

    resize() {
        this.setStagePos();

        this.stage.draw();
    }
}
