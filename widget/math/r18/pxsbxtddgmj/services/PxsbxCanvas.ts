import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import * as point1 from '../sub_static/point1.png';
import * as point2 from '../sub_static/point2.png';
import * as point3 from '../sub_static/point3.png';
import * as point4 from '../sub_static/point4.png';
import * as tip1 from '../sub_static/tip1.png';
import * as tip2 from '../sub_static/tip2.png';
import * as tip3 from '../sub_static/tip3.png';
import * as tip4 from '../sub_static/tip4.png';
import { ImageConfig } from './ImageConfig';
import { PointConfig } from './PointConfig';

export class PxsbxCanvas extends SimpleKonvaTemplate {

  Parallelogram: any = [];
  dashLine: any = [];

  //记录拖动点，平行四边形以及虚线移动的距离
  private imgCoordinates: any = [];
  private paramCoordinates: any = [];

  //平行四边形组
  group1 = new Konva.Group({
    draggable: true
  });
  group2 = new Konva.Group({
    draggable: true
  });
  group3 = new Konva.Group({
    draggable: true
  });
  group4 = new Konva.Group({
    draggable: true
  });

  //高虚线组
  group5 = new Konva.Group();
  group6 = new Konva.Group();
  group7 = new Konva.Group();
  group8 = new Konva.Group();

  distance: any = [];
  image: any = [];

  config: any;
  config2: any;

  point: any = [];

  bottomText: Konva.Text;

  width = window.innerWidth;
  height = window.innerHeight;

  firstCoordX = this.width / 15 * 2;
  secondCoordX = this.width / 15 * 9;
  thirdCoordX = this.width / 15 * 7;
  fourthCoordX = this.width / 15 * 7.5;

  constructor() {
    super('3dContainer');
    this.config = new ImageConfig();
    this.config2 = new PointConfig();
    this.initImage();

    this.imgCoordinates[0] = this.config.pointImg1.x;
    this.paramCoordinates[0] = 0;
    this.imgCoordinates[1] = this.config.pointImg2.x;
    this.paramCoordinates[1] = 0;
    this.imgCoordinates[2] = this.config.pointImg3.x;
    this.paramCoordinates[2] = 0;
    this.imgCoordinates[3] = this.config.pointImg4.x;
    this.paramCoordinates[3] = 0;
  }

  async initImage() {
    this.image[0] = await this.loadImage((point1 as any), this.config.pointImg1 as any);
    this.staticLayer.add(this.image[0]);
    this.image[1] = await this.loadImage((point2 as any), this.config.pointImg2 as any);
    this.staticLayer.add(this.image[1]);
    this.image[2] = await this.loadImage((point3 as any), this.config.pointImg3 as any);
    this.staticLayer.add(this.image[2]);
    this.image[3] = await this.loadImage((point4 as any), this.config.pointImg4 as any);
    this.staticLayer.add(this.image[3]);

    this.image[4] = await this.loadImage((tip1 as any), this.config.tipImg1 as any);
    this.group1.add(this.image[4]);
    this.image[5] = await this.loadImage((tip2 as any), this.config.tipImg2 as any);
    this.group2.add(this.image[5]);
    this.image[6] = await this.loadImage((tip3 as any), this.config.tipImg3 as any);
    this.group3.add(this.image[6]);
    this.image[7] = await this.loadImage((tip4 as any), this.config.tipImg4 as any);
    this.group4.add(this.image[7]);

    this.createBoudary();
    this.createParallelogram();
    this.createHighLine();

    for (let i = 0; i < this.image.length; i++) {
        this.image[i].moveToTop();
    }

    setTimeout(() => {
      this.image[4].visible(false);
      this.image[5].visible(false);
      this.image[6].visible(false);
      this.image[7].visible(false);
      this.staticLayer.draw();
    }, 2000);

    this.dragParallelogram();
    this.dragPoint();

    this.stage.add(this.staticLayer);
  }

  //拖动四个平行四边形
  dragParallelogram(): void {
    this.bindDragEventForShape(this.group1, this.group5, this.image[0], this.config.pointImg1, this.point[0], this.config2.point1,
      () => {
        this.image[0].x(this.group1.x() + this.imgCoordinates[0]);
        this.point[0].x(this.group1.x() + this.config2.point1.x);

        if (this.point[0].x() >= (this.width / 2 - this.width / 30) && this.point[0].x() <= (this.width / 2 + this.width / 30)) {

          const diff = this.width / 2 - this.point[0].x();
          this.group1.x(this.group1.x() + diff);
          this.image[0].x(this.image[0].x() + diff);
          this.point[0].x( this.point[0].x() + diff);

        }
      },

      (a: number, b: number) => {

        this.distance[1] = (a - b);
        this.paramCoordinates[0] += this.distance[1];

      });

    this.bindDragEventForShape(this.group2, this.group6, this.image[1], this.config.pointImg2, this.point[1], this.config2.point2,
      () => {
        this.image[1].x(this.group2.x() + this.imgCoordinates[1]);
        this.point[1].x(this.group2.x() + this.config2.point2.x);

        if (this.point[1].x() >= (this.width / 2 - this.width / 30) && this.point[1].x() <= (this.width / 2 + this.width / 30)) {

          const diff = this.width / 2 - this.point[1].x();
          this.group2.x(this.group2.x() + diff);
          this.image[1].x(this.image[1].x() + diff);
          this.point[1].x( this.point[1].x() + diff);

        }
      },
      (a: number, b: number) => {

        this.distance[2] = (a - b);
        this.paramCoordinates[1] += this.distance[2];

      });

    this.bindDragEventForShape(this.group3, this.group7, this.image[2], this.config.pointImg3, this.point[2], this.config2.point3,
      () => {

        this.image[2].x(this.group3.x() + this.imgCoordinates[2]);
        this.point[2].x(this.group3.x() + this.config2.point3.x);

        if (this.point[2].x() >= (this.width / 2 - this.width / 30) && this.point[2].x() <= (this.width / 2 + this.width / 30)) {

          const diff = this.width / 2 - this.point[2].x();
          this.group3.x(this.group3.x() + diff);
          this.image[2].x(this.image[2].x() + diff);
          this.point[2].x( this.point[2].x() + diff);

        }
      },
      (a: number, b: number) => {

        this.distance[4] = (a - b);
        this.paramCoordinates[2] += this.distance[4];



      });

    this.bindDragEventForShape(this.group4, this.group8, this.image[3], this.config.pointImg4, this.point[3], this.config2.point4,
      () => {

        this.image[3].x(this.group4.x() + this.imgCoordinates[3]);
        this.point[3].x(this.group4.x() + this.config2.point4.x);

        if (this.point[3].x() >= (this.width / 2 - this.width / 30) && this.point[3].x() <= (this.width / 2 + this.width / 30)) {

          const diff = this.width / 2 - this.point[3].x();
          this.group4.x(this.group4.x() + diff);
          this.image[3].x(this.image[3].x() + diff);
          this.point[3].x( this.point[3].x() + diff);

        }

      },
      (a: number, b: number) => {

        this.distance[6] = (a - b);
        this.paramCoordinates[3] += this.distance[6];

      });
  }

  //拖动四个拖动点
  dragPoint(): void {
    //第一个拖动点
    this.bindDragEventForImage(this.image[0], this.group1, this.config.pointImg1, this.group5,
      () => {

        this.group1.getChildren()[0].attrs.points[2] = this.image[0].x() + this.config.pointImg1.width / 2 - this.paramCoordinates[0];
        this.group1.getChildren()[0].attrs.points[0] = this.image[0].x() - this.width / 15 +
          this.config.pointImg1.width / 2 - this.paramCoordinates[0];
        this.group5.x(this.group1.getChildren()[0].attrs.points[0] - this.firstCoordX);

      }, (a: number, b: number) => {

        this.distance[0] = (a - b);
        this.imgCoordinates[0] += this.distance[0];

      });

    //第二个拖动点
    this.bindDragEventForImage(this.image[1], this.group2, this.config.pointImg2, this.group6,
      () => {

        this.group2.getChildren()[0].attrs.points[0] = this.image[1].x() + this.config.pointImg2.width / 2 - this.paramCoordinates[1];
        this.group2.getChildren()[0].attrs.points[2] = this.image[1].x() - this.width / 15 +
          this.config.pointImg2.width / 2 - this.paramCoordinates[1];
        this.group6.x(this.group2.getChildren()[0].attrs.points[2] - this.secondCoordX);

      }, (a: number, b: number) => {

        this.distance[3] = (a - b);
        this.imgCoordinates[1] += this.distance[3];
      });

    //第三个拖动点
    this.bindDragEventForImage(this.image[2], this.group3, this.config.pointImg3, this.group7,
      () => {

        this.group3.getChildren()[0].attrs.points[0] = this.image[2].x() + this.config.pointImg3.width / 2 - this.paramCoordinates[2];
        this.group3.getChildren()[0].attrs.points[2] = this.image[2].x() - this.width / 15 +
          this.config.pointImg3.width / 2 - this.paramCoordinates[2];
        this.group7.x(this.group3.getChildren()[0].attrs.points[2] - this.thirdCoordX);

      }, (a: number, b: number) => {

        this.distance[5] = (a - b);
        this.imgCoordinates[2] += this.distance[5];
      });

    //第四个拖动点
    this.bindDragEventForImage(this.image[3], this.group4, this.config.pointImg4, this.group8,
      () => {

        this.group4.getChildren()[0].attrs.points[2] = this.image[3].x() + this.config.pointImg1.width / 2 - this.paramCoordinates[3];
        this.group4.getChildren()[0].attrs.points[0] = this.image[3].x() - this.width / 15 +
          this.config.pointImg4.width / 2 - this.paramCoordinates[3];
        this.group8.x(this.group4.getChildren()[0].attrs.points[0] - this.fourthCoordX);

      }, (a: number, b: number) => {

        this.distance[7] = (a - b);
        this.imgCoordinates[3] += this.distance[7];
      });
  }

  //绘制边界线
  createBoudary(): void {
    const topBoundLine = new Konva.Line({
      points: [0, this.height / 4, this.width, this.height / 4],
      stroke: '#6F6F6F',
      strokeWidth: 2,
    });
    this.staticLayer.add(topBoundLine);

    const bottomBoundLine = new Konva.Line({
      points: [0, this.height / 4 * 3, this.width, this.height / 4 * 3],
      stroke: '#6F6F6F',
      strokeWidth: 2,
    });
    this.staticLayer.add(bottomBoundLine);
    this.staticLayer.draw();
  }

  //绘制平行四边形
  createParallelogram(): void {
    //黄色
    this.Parallelogram[0] = new Konva.Line({
      points: [this.width / 15 * 2, this.height / 4, this.width / 15 * 3, this.height / 4,
        this.width / 15 * 5, this.height / 4 * 3, this.width / 15 * 4, this.height / 4 * 3],
      fill: '#EDD355',
      closed: true,
      name: 'yellowPlane',
      opacity: 0.8
    });

    //红色
    this.Parallelogram[1] = new Konva.Line({
      points: [this.width / 15 * 10, this.height / 4, this.width / 15 * 9, this.height / 4,
        this.width / 15 * 5.5, this.height / 4 * 3, this.width / 15 * 6.5, this.height / 4 * 3],
      fill: '#ED675E',
      closed: true,
      name: 'redPlane',
      opacity: 0.8
    });

    //蓝色
    this.Parallelogram[2] = new Konva.Line({
      points: [this.width / 15 * 8, this.height / 4, this.width / 15 * 7, this.height / 4,
        this.width / 15 * 4.5, this.height / 4 * 3, this.width / 15 * 5.5, this.height / 4 * 3],
      fill: '#42B3FF',
      closed: true,
      name: 'bluePlane',
      opacity: 0.8
    });

    //绿色
    this.Parallelogram[3] = new Konva.Line({
      points: [this.width / 15 * 7.5, this.height / 4, this.width / 15 * 8.5, this.height / 4,
        this.width / 15 * 13, this.height / 4 * 3, this.width / 15 * 12, this.height / 4 * 3],
      fill: '#50E37D',
      closed: true,
      name: 'greenPlane',
      opacity: 0.8
    });

    this.group1.add(this.Parallelogram[0]);
    this.group2.add(this.Parallelogram[1]);
    this.group3.add(this.Parallelogram[2]);
    this.group4.add(this.Parallelogram[3]);

    this.staticLayer.add(this.group1);
    this.staticLayer.add(this.group2);
    this.staticLayer.add(this.group3);
    this.staticLayer.add(this.group4);

    this.point[0] = this.createBottomCenterPoint(this.config2.point1);
    this.point[1] = this.createBottomCenterPoint(this.config2.point2);
    this.point[2] = this.createBottomCenterPoint(this.config2.point3);
    this.point[3] = this.createBottomCenterPoint(this.config2.point4);
    this.staticLayer.draw();
  }

  //绘制底部中心点
  createBottomCenterPoint(configPoint: any): Konva.Circle {
    const point = new Konva.Circle({
      x: configPoint.x,
      y: configPoint.y,
      radius: 0.0001,
      fill: 'red'
    });

    this.staticLayer.add(point);
    return point;
  }

  //绘制虚线高和底
  createHighLine(): void {
    this.dashLine[0] = this.createDashLine(this.width / 15 * 2, this.height / 4, this.width / 15 * 2, this.height / 4 * 3);
    this.dashLine[4] = this.createDashLine(this.width / 15 * 2, this.height / 4 * 3 - 20,
      this.width / 15 * 2 + 20, this.height / 4 * 3 - 20);
    this.dashLine[5] = this.createDashLine(this.width / 15 * 2 + 20, this.height / 4 * 3,
      this.width / 15 * 2 + 20, this.height / 4 * 3 - 20);

    this.dashLine[1] = this.createDashLine(this.width / 15 * 9, this.height / 4, this.width / 15 * 9, this.height / 4 * 3);
    this.dashLine[6] = this.createDashLine(this.width / 15 * 9, this.height / 4 * 3 - 20,
      this.width / 15 * 9 + 20, this.height / 4 * 3 - 20);
    this.dashLine[7] = this.createDashLine(this.width / 15 * 9 + 20, this.height / 4 * 3,
      this.width / 15 * 9 + 20, this.height / 4 * 3 - 20);

    this.dashLine[2] = this.createDashLine(this.width / 15 * 7, this.height / 4, this.width / 15 * 7, this.height / 4 * 3);
    this.dashLine[8] = this.createDashLine(this.width / 15 * 7, this.height / 4 * 3 - 20,
      this.width / 15 * 7 + 20, this.height / 4 * 3 - 20);
    this.dashLine[9] = this.createDashLine(this.width / 15 * 7 + 20, this.height / 4 * 3,
      this.width / 15 * 7 + 20, this.height / 4 * 3 - 20);

    this.dashLine[3] = this.createDashLine(this.width / 15 * 7.5, this.height / 4, this.width / 15 * 7.5, this.height / 4 * 3);
    this.dashLine[10] = this.createDashLine(this.width / 15 * 7.5, this.height / 4 * 3 - 20,
      this.width / 15 * 7.5 + 20, this.height / 4 * 3 - 20);
    this.dashLine[11] = this.createDashLine(this.width / 15 * 7.5 + 20, this.height / 4 * 3,
      this.width / 15 * 7.5 + 20, this.height / 4 * 3 - 20);

    this.group5.add(this.dashLine[0]);
    this.group5.add(this.dashLine[4]);
    this.group5.add(this.dashLine[5]);

    this.group6.add(this.dashLine[1]);
    this.group6.add(this.dashLine[6]);
    this.group6.add(this.dashLine[7]);

    this.group7.add(this.dashLine[2]);
    this.group7.add(this.dashLine[8]);
    this.group7.add(this.dashLine[9]);

    this.group8.add(this.dashLine[3]);
    this.group8.add(this.dashLine[10]);
    this.group8.add(this.dashLine[11]);

    this.group1.add(this.group5);
    this.group2.add(this.group6);
    this.group3.add(this.group7);
    this.group4.add(this.group8);

    this.group5.visible(false);
    this.group6.visible(false);
    this.group7.visible(false);
    this.group8.visible(false);

    const bottomPlane = new Konva.Rect({
      x: this.width / 2 - this.width / 30,
      y: this.height / 4 * 3,
      width: this.width / 15,
      height: 5,
      fill: '#FFFFFF'
    });

    this.bottomText = new Konva.Text({
      x: this.width / 2 - 10,
      y: this.height / 4 * 3 + 10,
      text: '底',
      fontSize: 18,
      fill: '#FFFFFF'
    });

    this.bottomText.visible(false);
    this.staticLayer.add(bottomPlane);
    this.staticLayer.add(this.bottomText);

    this.staticLayer.draw();
  }

  //绘制虚线
  createDashLine(x1: number, y1: number, x2: number, y2: number): Konva.Line {
    const dashLine = new Konva.Line({
      points: [x1, y1, x2, y2],
      stroke: '#FFFFFF',
      strokeWidth: 3,
      dash: [10, 3],
    });
    return dashLine;
  }

  //拖动平行四边形
  bindDragEventForShape(group: Konva.Group, dashLineGroup: Konva.Group, img: Konva.Image, configImg: any, point: any,
                        configPoint: any, callback1: any, callback2: any): void {
    let control: boolean;
    let lastX: number;
    let currtX: number;

    group.on('dragstart', () => {
      control = true;
      lastX = group.x();
    });

    group.on('dragmove', () => {
      if (control) {
        group.dragBoundFunc((pos: any) => {
          const newX = pos.x;
          const newY = 0;
          return {
            x: newX,
            y: newY
          };
        });
        callback1();
        this.staticLayer.draw();
      }
    });

    group.on('dragend', () => {
      control = false;
      currtX = group.x();
      callback2(currtX, lastX);

      if (this.point[0].x() === this.width / 2 && this.point[1].x() === this.width / 2 &&
        this.point[2].x() === this.width / 2 && this.point[3].x() === this.width / 2) {
          this.bottomText.visible(true);
      } else {
          this.bottomText.visible(false);
      }
      this.staticLayer.draw();
    });
  }

  //拖动点
  bindDragEventForImage(img: Konva.Image, group: Konva.Group, configImg: any, dashLineGroup: Konva.Group,
                        callback1: any, callback2: any): void {
    let control: boolean;
    let lastX: number;
    let currtX: number;
    img.on('dragstart', () => {
      control = true;
      lastX = img.x();
    });

    img.on('dragmove', () => {
      if (control) {
        img.dragBoundFunc((pos: any) => {
          const newX = pos.x;
          const newY = this.height / 4 - 14;
          return {
            x: newX,
            y: newY
          };
        });
        callback1();
        this.staticLayer.draw();
      }

    });

    img.on('dragend', () => {
      control = false;
      currtX = img.x();
      callback2(currtX, lastX);
      this.staticLayer.draw();
    });
  }

  reset(): void {

    this.imgCoordinates[0] = this.config.pointImg1.x;
    this.paramCoordinates[0] = 0;
    this.imgCoordinates[1] = this.config.pointImg2.x;
    this.paramCoordinates[1] = 0;
    this.imgCoordinates[2] = this.config.pointImg3.x;
    this.paramCoordinates[2] = 0;
    this.imgCoordinates[3] = this.config.pointImg4.x;
    this.paramCoordinates[3] = 0;

    this.group1.x(0);
    this.group5.x(0);
    this.Parallelogram[0].attrs.points[0] = this.width / 15 * 2;
    this.Parallelogram[0].attrs.points[2] = this.width / 15 * 3;
    this.Parallelogram[0].attrs.points[4] = this.width / 15 * 5;
    this.Parallelogram[0].attrs.points[6] = this.width / 15 * 4;
    this.image[0].x(this.imgCoordinates[0]);

    this.group2.x(0);
    this.group6.x(0);
    this.Parallelogram[1].attrs.points[0] = this.width / 15 * 10;
    this.Parallelogram[1].attrs.points[2] = this.width / 15 * 9;
    this.Parallelogram[1].attrs.points[4] = this.width / 15 * 5.5;
    this.Parallelogram[1].attrs.points[6] = this.width / 15 * 6.5;
    this.image[1].x(this.imgCoordinates[1]);

    this.group3.x(0);
    this.group7.x(0);
    this.Parallelogram[2].attrs.points[0] = this.width / 15 * 8;
    this.Parallelogram[2].attrs.points[2] = this.width / 15 * 7;
    this.Parallelogram[2].attrs.points[4] = this.width / 15 * 4.5;
    this.Parallelogram[2].attrs.points[6] = this.width / 15 * 5.5;
    this.image[2].x(this.imgCoordinates[2]);

    this.group4.x(0);
    this.group8.x(0);
    this.Parallelogram[3].attrs.points[0] = this.width / 15 * 7.5;
    this.Parallelogram[3].attrs.points[2] = this.width / 15 * 8.5;
    this.Parallelogram[3].attrs.points[4] = this.width / 15 * 13;
    this.Parallelogram[3].attrs.points[6] = this.width / 15 * 12;
    this.image[3].x(this.imgCoordinates[3]);

    this.group5.visible(false);
    this.group6.visible(false);
    this.group7.visible(false);
    this.group8.visible(false);

    this.point[0].x(this.width / 15 * 4.5);
    this.point[1].x(this.width / 15 * 6);
    this.point[2].x(this.width / 15 * 5);
    this.point[3].x(this.width / 15 * 12.5);

    this.bottomText.visible(false);
    for (let i = 0; i < this.dashLine.length; i++) {
      this.dashLine[i] = 0;
    }
    this.image[4].visible(true);
    this.image[5].visible(true);
    this.image[6].visible(true);
    this.image[7].visible(true);

    setTimeout(() => {
      this.image[4].visible(false);
      this.image[5].visible(false);
      this.image[6].visible(false);
      this.image[7].visible(false);
      this.staticLayer.draw();
    }, 2000);
    this.staticLayer.draw();
  }

}
