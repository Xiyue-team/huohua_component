import commit from './CommonForThree';

export class CreateQiPao {
  obj: any;
  num = 0;
  startPos: any = []; //存放初始位置
  endPos: any = []; //存放结束的位置
  objY: any;
  numb = 0;
  timer: any;

  constructor(pos: Array<number> = [0, 0, 0], w: number, h: number, src: any, name: any, scene: any) {
    this.obj = commit.createImg(pos, w, h, src);
    this.obj.name = name;

    this.obj.material.depthTest = false;
    scene.add(this.obj);
    this.startPos = pos;
    this.endPos = [pos[0], 45, 0];
    this.objY = this.startPos[1];
    this.obj.material.opacity = 0;
  }

  //动画
  qipaoAnimation(scene: any) {
    const thiz = this;

    function ani() {
      thiz.numb += 0.01;
      thiz.obj.material.opacity = thiz.numb;
      thiz.num += Math.random() * 0.1; //调节速度
      thiz.objY += thiz.num;
      thiz.obj.position.set(thiz.startPos[0], thiz.objY, 2);
      if (thiz.objY > 40) {
        thiz.obj.material.opacity = 1;
        scene.remove(thiz.obj); //场景中删除dom
        cancelAnimationFrame(thiz.timer);
        return;
      }
      thiz.timer = requestAnimationFrame(ani);
    }

    ani();
  }

  //场景中加入Dom
  addDom(scene: any) {
    scene.add(this.obj);
  }

  removeDom(scene: any) {
    cancelAnimationFrame(this.timer);
    scene.remove(this.obj);
  }
}
