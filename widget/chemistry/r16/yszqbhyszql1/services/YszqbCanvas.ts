
import {SimpleKonvaTemplate} from '../../../../../src/konva/template/SimpleKonvaTemplate';
import * as Konva from 'konva';
import {YszqbConfig} from './YszqbConfig';
import {YszqbConfig2} from './YszqbConfig2';
import * as tableImg from '../sub_static/model/table.png';
import * as zeroImg from '../sub_static/model/zero.png';
import * as oneImg from '../sub_static/model/one.png';
import * as twoImg from '../sub_static/model/two.png';
import * as threeImg from '../sub_static/model/three.png';
import * as fourImg from '../sub_static/model/four.png';
import * as tipsImg from '../sub_static/model/dragTips.png';

export class YszqbCanvas extends SimpleKonvaTemplate {
    config: YszqbConfig;
    config2: YszqbConfig2;
    group1: Konva.Group;
    control: any;
    private tableImage: Konva.Image;
    private zeroImage: Konva.Image;
    private oneImage: Konva.Image;
    private twoImage: Konva.Image;
    private threeImage: Konva.Image;
    private fourImage: Konva.Image;
    private tipsImage: Konva.Image;

    directionExc = 'right';
    constructor() {
        super('3dModel');
        this.config = new YszqbConfig();
        this.config2 = new YszqbConfig2();
        this.group1 = new Konva.Group({visible: true});
        this.initImage();
    }

    async initImage() {
        this.tableImage = await this.loadImage((tableImg as any), this.config.tableImgConfig as any);

        this.zeroImage = await this.loadImage((zeroImg as any), this.config.zeroImgConfig as any);
        this.group1.add(this.zeroImage);
        this.ImageMouseOverEvent(this.zeroImage);

        this.oneImage = await this.loadImage((oneImg as any), this.config.oneImgConfig as any);
        this.group1.add(this.oneImage);

        this.twoImage = await this.loadImage((twoImg as any), this.config.twoImgConfig as any);
        this.group1.add(this.twoImage);

        this.threeImage = await this.loadImage((threeImg as any), this.config.threeImgConfig as any);
        this.group1.add(this.threeImage);

        this.fourImage = await this.loadImage((fourImg as any), this.config.fourImgConfig as any);
        this.group1.add(this.fourImage);

        this.tipsImage = await this.loadImage((tipsImg as any), this.config.tipsImgConfig as any);
        this.group1.add(this.tipsImage);

        this.staticLayer.add(this.tableImage);
        this.staticLayer.add(this.group1);
        this.stage.add(this.staticLayer);
        this.dragRange();
        this.detectHit();
    }

    ImageMouseOverEvent(image: Konva.Image) {
        image.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
        image.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
    }

      //限定图片拖拽范围
      dragRange() {
            if (this.directionExc === 'right') {
              this.zeroImage.dragBoundFunc((pos: any) => {
                const newY = (pos.y < this.config.tableImgConfig.y - (this.config.zeroImgConfig.height / 4) ?
                  this.config.tableImgConfig.y - (this.config.zeroImgConfig.height / 4) : false
                  || pos.y > (this.config.tableImgConfig.y + (this.config.tableImgConfig.height / 6)) ?
                    (this.config.tableImgConfig.y + (this.config.tableImgConfig.height / 6)) : pos.y);

                const newX =  (pos.x < this.config.tableImgConfig.x - (this.config.zeroImgConfig.width / 2) ?
                  this.config.tableImgConfig.x - (this.config.zeroImgConfig.width / 2) : false
                  || pos.x >= (this.config.tableImgConfig.x + this.config.tableImgConfig.width - this.config.zeroImgConfig.width / 2) ?
                    (this.config.tableImgConfig.x + this.config.tableImgConfig.width - this.config.zeroImgConfig.width / 2) : pos.x );
                return {
                  x  :  newX,
                  y  :  newY
                };
              });
            } else {
              this.zeroImage.dragBoundFunc((pos: any) => {
                const newY = (pos.y < this.config2.tableImgConfig.y - (this.config2.zeroImgConfig.height / 4) ?
                  this.config2.tableImgConfig.y - (this.config2.zeroImgConfig.height / 4) : false
                  || pos.y > (this.config2.tableImgConfig.y + (this.config2.tableImgConfig.height / 6)) ?
                    (this.config2.tableImgConfig.y + (this.config2.tableImgConfig.height / 6)) : pos.y);

                const newX =  (pos.x < this.config2.tableImgConfig.x - (this.config2.zeroImgConfig.width / 2) ?
                  this.config2.tableImgConfig.x - (this.config2.zeroImgConfig.width / 2) : false
                  || pos.x >= (this.config2.tableImgConfig.x + this.config2.tableImgConfig.width - this.config2.zeroImgConfig.width / 2) ?
                    (this.config2.tableImgConfig.x + this.config2.tableImgConfig.width - this.config2.zeroImgConfig.width / 2) : pos.x );
                return {
                  x  :  newX,
                  y  :  newY
                };
              });
            }
      }

      //碰撞检测
      detectHit() {
          this.group1.on('dragstart', () => {
                this.control = true;
                this.zeroImage.opacity(1);
                this.oneImage.opacity(0);
                this.twoImage.opacity(0);
                this.threeImage.opacity(0);
                this.fourImage.opacity(0);
                this.tipsImage.opacity(0);
          });

          this.group1.on('dragend', () => {
                this.control = false;
                if (this.zeroImage.x() >= this.oneImage.x() - 20
                  && this.zeroImage.x() < this.oneImage.x() + 20
                  && this.zeroImage.y() >= this.oneImage.y() - 20
                  && this.zeroImage.y() <= (this.oneImage.y() + 20) ) {
                      this.zeroImage.x(this.oneImage.x());
                      this.zeroImage.y(this.oneImage.y());

                  this.zeroImage.opacity(0.01);
                  this.zeroImage.moveToTop();
                  this.oneImage.opacity(1);
                  this.twoImage.opacity(0);
                  this.threeImage.opacity(0);
                  this.fourImage.opacity(0);

                } else if (this.zeroImage.x() >= this.twoImage.x() - 20
                  && this.zeroImage.x() < this.twoImage.x() + 20
                  && this.zeroImage.y() >= this.twoImage.y() - 20
                  && this.zeroImage.y() <= (this.twoImage.y() + 20) ) {
                  this.zeroImage.x(this.twoImage.x());
                  this.zeroImage.y(this.twoImage.y());

                  this.zeroImage.moveToTop();
                  this.zeroImage.opacity(0.01);
                  this.oneImage.opacity(0);
                  this.twoImage.opacity(1);
                  this.threeImage.opacity(0);
                  this.fourImage.opacity(0);

                } else if (this.zeroImage.x() >= this.threeImage.x() - 20
                  && this.zeroImage.x() < this.threeImage.x() + 20
                  && this.zeroImage.y() >= this.threeImage.y() - 20
                  && this.zeroImage.y() <= (this.threeImage.y() + 20) ) {
                  this.zeroImage.x(this.threeImage.x());
                  this.zeroImage.y(this.threeImage.y());

                  this.zeroImage.moveToTop();
                  this.zeroImage.opacity(0.01);
                  this.oneImage.opacity(0);
                  this.twoImage.opacity(0);
                  this.threeImage.opacity(1);
                  this.fourImage.opacity(0);

                } else if (this.zeroImage.x() >= this.fourImage.x() - 20
                  && this.zeroImage.x() < this.fourImage.x() + 20
                  && this.zeroImage.y() >= this.fourImage.y() - 20
                  && this.zeroImage.y() <= (this.fourImage.y() + 20) ) {
                  this.zeroImage.x(this.fourImage.x());
                  this.zeroImage.y(this.fourImage.y());

                  this.zeroImage.moveToTop();
                  this.zeroImage.opacity(0.01);
                  this.oneImage.opacity(0);
                  this.twoImage.opacity(0);
                  this.threeImage.opacity(0);
                  this.fourImage.opacity(1);

                } else {
                  this.zeroImage.opacity(1);
                  this.oneImage.opacity(0);
                  this.twoImage.opacity(0);
                  this.threeImage.opacity(0);
                  this.fourImage.opacity(0);
                  this.tipsImage.opacity(1);
                  if (this.directionExc === 'right') {
                    this.zeroImage.x(this.config.zeroImgConfig.x);
                    this.zeroImage.y(this.config.zeroImgConfig.y);
                  } else {
                    this.zeroImage.x(this.config2.zeroImgConfig.x);
                    this.zeroImage.y(this.config2.zeroImgConfig.y);
                  }
                }
                this.staticLayer.draw();
          });
      }

      //收起解析图片铺满屏幕
      expandImage(leftOrRight: any) {
        this.directionExc = leftOrRight;
        this.zeroImage.opacity(1);
        this.oneImage.opacity(0);
        this.twoImage.opacity(0);
        this.threeImage.opacity(0);
        this.fourImage.opacity(0);
        this.tipsImage.opacity(1);
        if (leftOrRight === 'left') {

          this.setImageXY(this.tableImage, (this.config2.tableImgConfig));
          this.setImageXY(this.zeroImage, (this.config2.zeroImgConfig));
          this.setImageXY(this.oneImage, (this.config2.oneImgConfig));
          this.setImageXY(this.twoImage, (this.config2.twoImgConfig));
          this.setImageXY(this.threeImage, (this.config2.threeImgConfig));
          this.setImageXY(this.fourImage, (this.config2.fourImgConfig));
          this.setImageXY(this.tipsImage, (this.config2.tipsImgConfig));
        } else if (leftOrRight === 'right') {

          this.setImageXY(this.tableImage, (this.config.tableImgConfig));
          this.setImageXY(this.zeroImage, (this.config.zeroImgConfig));
          this.setImageXY(this.oneImage, (this.config.oneImgConfig));
          this.setImageXY(this.twoImage, (this.config.twoImgConfig));
          this.setImageXY(this.threeImage, (this.config.threeImgConfig));
          this.setImageXY(this.fourImage, (this.config.fourImgConfig));
          this.setImageXY(this.tipsImage, (this.config.tipsImgConfig));
        }
          this.staticLayer.draw();
          this.dragRange();
      }

      setImageXY(image: Konva.Image, config: any) {
          image.x(config.x);
          image.y(config.y);
          image.width(config.width);
          image.height(config.height);
      }

      resize() {
        const model = document.getElementById('3dModel');
        const width = model.clientWidth;
        this.stage.width(width);
        this.stage.draw();
      }
}

