var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SimpleKonvaTemplate } from '../../../../../src/template/SimpleKonvaTemplate';
import * as arrow from '../sub_static/arrow.png';
import * as Konva from 'konva';
import { ShiNengConfig } from './ShiNengConfig';
export class TfCanvas extends SimpleKonvaTemplate {
    constructor() {
        super('kCanvas');
        //控制鼠标是否按下或是否触摸
        this.control = false;
        //当前角度
        this.cureentTheta = 0;
        //旋转到的最终角度
        this.theta = 0;
        //实时显示图片宽度
        this.waveImg = document.getElementById('waveImg');
        this.initImage();
    }
    initImage() {
        return __awaiter(this, void 0, void 0, function* () {
            //圆图片
            // this.circleImg = await this.loadImage((circle as any), ShiNengConfig.circleConfig as any);
            // this.staticLayer.add(this.circleImg);
            const rect = new Konva.Rect(ShiNengConfig.circleConfig);
            this.staticLayer.add(rect);
            // 指针图片
            this.arrowImg = yield this.loadImage(arrow, ShiNengConfig.arrowImg);
            this.staticLayer.add(this.arrowImg);
            this.arrowImg.cache();
            this.stage.add(this.staticLayer);
            this.dragImg();
        });
    }
    //拖拽指针图片旋转
    dragImg() {
        //拖拽事件
        this.staticLayer.on('mousedown touchstart', (event) => {
            if (event.target === this.arrowImg || event.target === this.circleImg) {
                this.control = true;
            }
            else {
                this.control = false;
            }
        });
        this.staticLayer.on('mouseup touchend', (event) => {
            this.control = false;
        });
        this.staticLayer.on('mouseleave', (event) => {
            this.control = false;
        });
        let angle = null;
        let disPlayWidth = null;
        this.staticLayer.on('mousemove touchmove', (event) => {
            if (!this.control) {
                return;
            }
            //当前旋转角度
            angle = this.getAngle();
            //两次旋转的角度差(用于模型旋转)
            this.diffAngle = this.theta - this.cureentTheta;
            //前一次旋转角度
            this.cureentTheta = this.theta;
            if (this.getMousePos().x - 120 < 0) {
                this.theta = 360 - (angle / Math.PI * 180);
            }
            else {
                this.theta = angle / Math.PI * 180;
            }
            //180度之前旋转的角度
            this.arrowImg.rotate(this.diffAngle);
            //根据转动角度显示图片宽度
            disPlayWidth = (this.theta / 360) * 157;
            //实时改变图片宽度
            this.waveImg.style.width = disPlayWidth + 'px';
            // 转到一定角度，产生吸附效果
            this.setAdorsption(this.theta, true);
            //根据指针旋转角度旋转模型
            window.viewHandler.model.setModelRotation(-this.diffAngle);
            this.staticLayer.clearBeforeDraw();
            this.staticLayer.batchDraw();
        });
    }
    //获取旋转到的角度
    getAngle() {
        const eP = {
            x: this.getMousePos().x,
            y: this.getMousePos().y
        };
        const a = Math.sqrt(Math.pow(((120 - 120) - (eP.x - 120)), 2) + Math.pow(((90 - 90) - (eP.y - 90)), 2));
        const b = Math.sqrt(Math.pow(((120 - 120) - (eP.x - 120)), 2) + Math.pow(((10 - 90) - (eP.y - 90)), 2));
        const c = 80;
        const angle = Math.acos((a * a + c * c - b * b) / (2 * a * c));
        return angle;
    }
    //获取鼠标当前坐标
    getMousePos() {
        const mousePos = this.stage.getPointerPosition();
        return {
            x: mousePos.x,
            y: mousePos.y
        };
    }
    //根据模型旋转角度旋转指针
    rotNedle(theat) {
        this.diffAngle = theat - this.cureentTheta;
        this.cureentTheta = theat;
        this.arrowImg.rotate(this.diffAngle);
        //转到一定角度，产生吸附效果
        this.setAdorsption(theat, true);
        this.staticLayer.clearBeforeDraw();
        this.staticLayer.batchDraw();
        //根据转动角度显示图片宽度
        const disPlayWidth = (theat / 360) * 157;
        //实时改变图片宽度
        this.waveImg.style.width = disPlayWidth + 'px';
    }
    //特定角度产生吸附
    setAdorsption(angle, flag) {
        if (angle >= 358 || angle <= 2) {
            this.arrowImg.rotation(0);
            this.waveImg.style.width = 0 + 'px';
            window.viewHandler.viewModel.$data.jcgx = !flag;
            window.viewHandler.viewModel.$data.cdgx = flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else if (angle >= 118 && angle <= 122) {
            this.arrowImg.rotation(120);
            this.waveImg.style.width = 120 / 360 * 157 + 'px';
            window.viewHandler.viewModel.$data.jcgx = !flag;
            window.viewHandler.viewModel.$data.cdgx = flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else if (angle >= 238 && angle <= 242) {
            this.arrowImg.rotation(240);
            this.waveImg.style.width = 240 / 360 * 157 + 'px';
            window.viewHandler.viewModel.$data.jcgx = !flag;
            window.viewHandler.viewModel.$data.cdgx = flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else if (angle >= 58 && angle <= 62) {
            this.arrowImg.rotation(60);
            this.waveImg.style.width = 60 / 360 * 157 + 'px';
            window.viewHandler.viewModel.$data.jcgx = flag;
            window.viewHandler.viewModel.$data.cdgx = !flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else if (angle >= 178 && angle <= 182) {
            this.arrowImg.rotation(180);
            this.waveImg.style.width = 180 / 360 * 157 + 'px';
            window.viewHandler.viewModel.$data.jcgx = flag;
            window.viewHandler.viewModel.$data.cdgx = !flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else if (angle >= 298 && angle <= 302) {
            this.arrowImg.rotation(300);
            this.waveImg.style.width = 300 / 360 * 157 + 'px';
            window.viewHandler.viewModel.$data.jcgx = flag;
            window.viewHandler.viewModel.$data.cdgx = !flag;
            window.viewHandler.viewModel.$data.nqgx = !flag;
        }
        else {
            window.viewHandler.viewModel.$data.jcgx = !flag;
            window.viewHandler.viewModel.$data.cdgx = !flag;
            window.viewHandler.viewModel.$data.nqgx = flag;
        }
    }
}
//# sourceMappingURL=TfCanvas.js