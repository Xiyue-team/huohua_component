


/*
* 模型旋转类
* 1.鼠标旋转
* 2.触摸旋转
* 3.弧度角度转换
* */
import {Euler, Event, Quaternion} from 'three';

export class ModelRotateHelper {

  //属性
  //模型
  model: any;
  model2: any;

  //鼠标移动开关
  isDragging = false;
  //触摸移动开关
  isTouching = false;

  //坐标
  previousMousePositionX = 0;
  previousMousePositionY = 0;
  previousTouchPositionX: number;
  previousTouchPositionY: number;

  pageX: number;
  pageY: number;

  //角度
  angleX = 0;
  angleY = 0;

  //累加角度
  addAngleX = 0;
  addAngleY = 0;

  //旋转角度范围
  rangeleAngleX: Array<number>;
  rangeleAngleY: Array<number>;

  enableRotate = true;

  constructor (model: any, rangeAngleX?: Array<number>, rangeAngleY?: Array<number>, model2?: any) {
    this.model = model;
    this.model2 = model2 ? model2 : undefined;
    this.rangeleAngleX = rangeAngleX ? rangeAngleX : undefined;
    this.rangeleAngleY = rangeAngleY ? rangeAngleY : undefined;

  }

  //初始化事件
  public  initEvent () {

    this.mouseEvent();
    this.touchEvent();
  }

  //角度转弧度
  toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }
  //弧度角度
  toDegrees(angle: number) {
    return angle * (180 / Math.PI);
  }

  /* 鼠标事件  */
  public mouseEvent() {
    this.modelMouseOut();
    this.modelMouseDown();
    this.modelMouseUp();
    this.modelMouseMove();
  }

  private modelMouseOut() {

    this.model.on('mouseout', (event: MouseEvent) => {

      this.isDragging = false;
    });
  }

  private modelMouseDown() {

    this.model.on('mousedown', (event: MouseEvent) => {
      this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
      this.previousMousePositionY = (event as any).data.originalEvent.offsetY;
      this.isDragging = true;

    });
  }
  private modelMouseUp() {

    this.model.on('mouseup', (event: MouseEvent) => {
      this.isDragging = false;
    });
  }

  private modelMouseMove() {

    this.model.on('mousemove', (event: MouseEvent) => {
      if (!this.isDragging) {
        return;
      }

      if (!this.enableRotate) {
        return;
      }
      const deltaMove = {
        x: (event as any).data.originalEvent.offsetX - this.previousMousePositionX,
        y: (event as any).data.originalEvent.offsetY - this.previousMousePositionY
      };


      this.angleX = this.toRadians(deltaMove.y * 1);
      this.angleY = this.toRadians(deltaMove.x * 1);


      //累加角度
      this.addAngleX += this.angleX;
      this.addAngleY += this.angleY;


      //限制X轴角度
      if ( !this.restrictMRAngleX()) {

        this.addAngleX -= this.angleX;
        this.angleX = 0;
      }

      //限制Y轴角度
      if (!this.restrictMRAngleY()) {
        this.addAngleY -= this.angleY;
        this.angleY = 0;
      }
      const deltaRotationQuaternion = new Quaternion().setFromEuler(
        new Euler(this.angleX, this.angleY, 0, 'XYZ')
      );

      this.model.quaternion.multiplyQuaternions(deltaRotationQuaternion,
        this.model.quaternion);

      if (this.model2) {
        this.model2.quaternion.multiplyQuaternions(deltaRotationQuaternion,
          this.model2.quaternion);
      }

      this.previousMousePositionX = (event as any).data.originalEvent.offsetX;
      this.previousMousePositionY = (event as any).data.originalEvent.offsetY;

    });
  }


  //触摸事件
  public touchEvent () {
    this.modelTouchStart();
    this.modelTouchEnd();
    this.modelTouchMove();
  }

  private modelTouchStart() {
    this.model.on('touchstart', (event: any) => {

      if ((event as any).data.originalEvent.clientX === undefined) {
        this.previousTouchPositionX = (event as any).data.originalEvent.changedTouches[0].clientX;
        this.previousTouchPositionY = (event as any).data.originalEvent.changedTouches[0].clientY;
      } else {
        this.previousTouchPositionX = (event as any).data.originalEvent.clientX;
        this.previousTouchPositionY = (event as any).data.originalEvent.clientY;
      }
      this.isTouching = true;
    });
  }
  private modelTouchEnd() {
    this.model.on('touchend', (event: any) => {
      this.isTouching = false;
    });

  }

  private modelTouchMove() {

    this.model.on('touchmove', (event: any) => {

      if (!this.isTouching) {
        return;
      }

      if (!this.enableRotate) {
        return;
      }

      if ((event as any).data.originalEvent.clientX === undefined) {
        this.pageX = (event as any).data.originalEvent.changedTouches[0].clientX;
        this.pageY = (event as any).data.originalEvent.changedTouches[0].clientY;
      } else {
        this.pageX = (event as any).data.originalEvent.clientX;
        this.pageY = (event as any).data.originalEvent.clientY;
      }

      const deltaMove = {
        x: this.pageX - this.previousTouchPositionX,
        y: this.pageY - this.previousTouchPositionY
      };

      this.angleX = this.toRadians(deltaMove.y * 1);
      this.angleY = this.toRadians(deltaMove.x * 1);

      //累加角度
      this.addAngleX += this.angleX;
      this.addAngleY += this.angleY;

      //限制X轴角度
      if ( !this.restrictMRAngleX()) {

        this.addAngleX -= this.angleX;
        this.angleX = 0;
      }

      //限制Y轴角度
      if (!this.restrictMRAngleY()) {
        this.addAngleY -= this.angleY;
        this.angleY = 0;
      }
      const deltaRotationQuaternion = new Quaternion().setFromEuler(
        new Euler(this.angleX, this.angleY, 0, 'XYZ')
      );

      this.model.quaternion.multiplyQuaternions(deltaRotationQuaternion,
        this.model.quaternion);

      if (this.model2) {
        this.model2.quaternion.multiplyQuaternions(deltaRotationQuaternion,
          this.model2.quaternion);
      }

      if ((event as any).data.originalEvent.clientX === undefined) {
        this.previousTouchPositionX = (event as any).data.originalEvent.changedTouches[0].clientX;
        this.previousTouchPositionY = (event as any).data.originalEvent.changedTouches[0].clientY;
      } else {
        this.previousTouchPositionX = (event as any).data.originalEvent.clientX;
        this.previousTouchPositionY = (event as any).data.originalEvent.clientY;
      }
    });

  }

  //限制模型旋转X轴角度
  restrictMRAngleX(): boolean {
    //旋转角度范围
    if (!this.rangeleAngleX) {
      return true;
    }

    if (( this.addAngleX > this.rangeleAngleX[0] && this.addAngleX < this.rangeleAngleX[1])) {
      return true;
    }
    return false;
  }

  //限制模型旋转Y轴角度
  restrictMRAngleY(): boolean {
    //旋转角度范围
    if (!this.rangeleAngleY) {
      return true;
    }

    if (( this.addAngleY > this.rangeleAngleY[0] && this.addAngleY < this.rangeleAngleY[1])) {
      return true;
    }
    return false;
  }



  //重置模型位置
  resetModelPosition() {
    this.model.rotation.set(0, 0, 0);
    this.model.updateMatrix();
    this.addAngleX = 0;
    this.addAngleY = 0;
  }
}
