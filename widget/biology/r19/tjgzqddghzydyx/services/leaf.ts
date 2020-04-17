import { ThreeBase } from '../../../../../src/three/template/ThreeBase';
import { CreateQiPao } from './CreateQiPao';
import * as qipao from '../sub_static/UI/qipao.png';

/**
 * 叶片动画
 */
export class Leaf extends ThreeBase {
  CreateQiPao: any = [];
  obj: any;
  num: any = 0;
  startPos: any = []; //存放初始位置
  endPos: any = []; //存放结束的位置
  objY: any;
  timeAndrotate: any = [];
  time: any = [];
  rotateDeg: any = [];
  getTime: any;
  one: any;
  jishu: any = 2;
  isMake: any = 0;
  Arr: any = [];
  timers: any = [];
  stopGenerate: boolean;
  multiQiPao: any = [];

  constructor(pos: Array<number> = [0, 0, 2], obj1: any, name: any, scene: any, Arr: any) {
    super();
    this.obj = obj1;
    this.obj.name = name;
    this.obj.position.set(pos[0], pos[1], pos[2]);

    this.one = scene;
    this.Arr = Arr;
    scene.add(this.obj);
    this.startPos = pos;
    this.endPos = [pos[0], 45, 0];
    this.objY = this.startPos[1];
  }


  //remove叶片
  removeLeaf(scene: any) {
    scene.remove(this.obj);
  }

  //叶片初始
  initPos() {
    const deg = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    this.rotateDeg = deg;

    for (let i = 2000; i < 6501;) {
      this.time.push(i);
      i += Math.random() * 1000;
    }
    this.timeAndrotate.push(this.rotateDeg, this.time);
    return this.timeAndrotate;
  }


  //动画
  leafAnimation(num: number) {
    this.getTime = this.initPos();
    const thiz = this;
    setTimeout(() => {
      function ani() {
        
        if (thiz.jishu % 3 === 0) {
          const minX: any = (thiz.startPos[0] - 28 / 2);
          const maxX: any = (thiz.startPos[0] + 12 / 2);
          const minY: any = (thiz.objY + 20);
          const maxY: any = (thiz.objY + 4 / 2);
          const RandonX = parseInt(Math.random() * (maxX - minX + 1) + minX, 10);
          const RandonY = parseInt(Math.random() * (maxY - minY + 1) + minY, 10);

          const qiPao =  new CreateQiPao([RandonX, RandonY, 2], 4, 4, qipao, qipao, thiz.one);
          qiPao.qipaoAnimation(thiz.one);
          thiz.multiQiPao.push(qiPao);
        }
        //旋转
        if (thiz.isMake % 29 === 0) {
          thiz.obj.rotateX(0.0099);
        } else {
          thiz.obj.rotateX(-0.014);
        }
        thiz.isMake += 1;
        thiz.jishu += 0.5;
        thiz.num += Math.random() * 0.01;
        thiz.objY += thiz.num;
        thiz.obj.position.set(thiz.startPos[0], thiz.objY, 5);

        if (thiz.objY > 47) {
          thiz.Arr.push(thiz.obj);
          thiz.timers.forEach((timer: any) => cancelAnimationFrame(timer));

          return;
        }

        if (!thiz.stopGenerate) {
          thiz.timers.push(requestAnimationFrame(ani));
        }
      }

      ani();
    }, this.getTime[1][num]);
  }

  removeQ() {
    this.stopGenerate = true;

    setTimeout(() => {
      while (this.multiQiPao.length) {
        const qiPao = this.multiQiPao.pop();
        qiPao.removeDom(this.one);
      }
    }, 50);
  }
}
