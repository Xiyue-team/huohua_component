/**
 *mRNA 动画效果
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/21 19:12
 */
import * as Konva from 'konva';

export class MRNAAnimation {

    layer: any;

    mRna1: Konva.Image;
    mRna2: Konva.Image;
    mRna3: Konva.Image;
    mRna4: Konva.Image;
    mRna5: Konva.Image;

    mRna2Position: any;
    mRna3Position: any;
    mRna4Position: any;
    mRna5Position: any;

    tweenArray: any = [];

    constructor(layer: any) {
        this.layer = layer;

        this.mRna1 = this.layer.findOne('#mRnaChain1');
        this.mRna2 = this.layer.findOne('#mRnaChain2');
        this.mRna3 = this.layer.findOne('#mRnaChain3');
        this.mRna4 = this.layer.findOne('#mRnaChain4');
        this.mRna5 = this.layer.findOne('#mRnaChain5');

        this.mRna2Position = this.mRna2.position();
        this.mRna3Position = this.mRna3.position();
        this.mRna4Position = this.mRna4.position();
        this.mRna5Position = this.mRna5.position();

    }

    completeAnimation(currentStatus: any) {
        console.log('complete');

        switch (currentStatus) {
            case 'uncomplete':
                this.mRna1.show();
                this.mRna2.show();
                this.mRna3.show();
                this.mRna4.show();
                this.mRna5.show();
                break;
            case 'complete':
                break;
            case 'miss1':

                const tween3 = new Konva.Tween({ node: this.mRna3, duration: 1, x: this.mRna3.x() + 27 });
                const tween4 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x() + 27 });
                const tween5 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() + 27 , onFinish: () => {
                        this.mRna2.show();
                    }});

                tween3.play();
                tween4.play();
                setTimeout(() => {
                    tween5.play();
                }, 16);

                this.tweenArray.push(tween3);
                //.tweenArray.push(tween4);
                this.tweenArray.push(tween5);

                break;
            case 'miss2':
                const tween4Miss2 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x() + 27 + 27});
                const tween5Miss2 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() + 27 + 27 , onFinish: () => {
                        this.mRna2.show();
                        this.mRna3.show();
                    }});
                tween5Miss2.play();
                tween4Miss2.play();

                this.tweenArray.push(tween4Miss2);
                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() + 27 + 27 + 27, onFinish: () => {
                        this.mRna2.show();
                        this.mRna3.show();
                        this.mRna4.show();
                    }});
                tween5Miss3.play();

                this.tweenArray.push(tween5Miss3);
                break;
        }
        this.layer.draw();
    }

    miss1Animation(currentStatus: any) {
        console.log('miss1');
        switch (currentStatus) {
            case 'uncomplete':
                this.mRna1.show();
                this.mRna3.show();
                this.mRna4.show();
                this.mRna5.show();

                this.mRna3.move({x: -27 , y: 0});
                this.mRna4.move({x: -27 , y: 0});
                this.mRna5.move({x: -27 , y: 0});

                break;
            case 'complete':
                this.mRna2.hide();

                const tween3 = new Konva.Tween({ node: this.mRna3, duration: 1, x: this.mRna3.x() - 27 });
                const tween4 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x() - 27 });
                const tween5 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() - 27 });

                tween3.play();
                tween4.play();
                tween5.play();

                this.tweenArray.push(tween3);
                this.tweenArray.push(tween4);
                this.tweenArray.push(tween5);
                break;
            case 'miss1':
                break;
            case 'miss2':
                const tween4Miss2 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x() + 27 });
                const tween5Miss2 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() + 27 , onFinish: () => {
                        this.mRna3.move({x: -27 , y: 0});
                        this.mRna3.show();
                    }});

                tween4Miss2.play();
                tween5Miss2.play();

                this.tweenArray.push(tween4Miss2);
                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() + 27 + 27 , onFinish: () => {
                        this.mRna3.move({x: -27 , y: 0});
                        this.mRna4.move({x: -27 , y: 0});
                        this.mRna3.show();
                        this.mRna4.show();

                    }});
                tween5Miss3.play();
                this.tweenArray.push(tween5Miss3);
                break;
        }

        this.layer.draw();
    }

    miss2Animation(currentStatus: any) {
        console.log('miss2');
        switch (currentStatus) {
            case 'uncomplete':
                this.mRna1.show();
                this.mRna4.show();
                this.mRna5.show();

                this.mRna4.move({x: -27 - 27 , y: 0});
                this.mRna5.move({x: -27 - 27 , y: 0});
                break;
            case 'complete':
                this.mRna2.hide();
                this.mRna3.hide();
                this.mRna3.position(this.mRna3Position);

                const tween4 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x() - 27 - 27 });
                const tween5 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() - 27 - 27 });
                tween5.play();
                setTimeout(() => {
                    tween4.play();
                }, 16);

                this.tweenArray.push(tween4);
                this.tweenArray.push(tween5);


                break;
            case 'miss1':
                this.mRna3.hide();
                this.mRna3.position(this.mRna3Position);

                const tween4Miss1 = new Konva.Tween({ node: this.mRna4, duration: 1, x: this.mRna4.x()  - 27 });
                const tween5Miss1 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x()  - 27 });
                tween5Miss1.play();
                tween4Miss1.play();

                this.tweenArray.push(tween5Miss1);
                this.tweenArray.push(tween4Miss1);
                break;
            case 'miss2':
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x()  + 27 , onFinish: () => {

                        this.mRna4.move({x: -27 - 27, y: 0});
                        this.mRna4.show();

                    }});
                tween5Miss3.play();

                this.tweenArray.push(tween5Miss3);
                break;
        }
        this.layer.draw();
    }

    miss3Animation(currentStatus: any) {
        console.log('miss3');
        switch (currentStatus) {
            case 'uncomplete':
                this.mRna1.show();
                this.mRna5.show();
                this.mRna5.move({x: -27 - 27 - 27 , y: 0});
                break;
            case 'complete':
                this.mRna2.hide();
                this.mRna3.hide();
                this.mRna4.hide();
                const tween5 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x() - 27 - 27 - 27 });
                tween5.play();

                this.tweenArray.push(tween5);
                break;
            case 'miss1':
                this.mRna3.hide();
                this.mRna4.hide();

                this.mRna3.position(this.mRna3Position);
                this.mRna4.position(this.mRna4Position);

                const tween5Miss1 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x()  - 27 - 27});
                tween5Miss1.play();

                this.tweenArray.push(tween5Miss1);
                break;
            case 'miss2':
                this.mRna4.hide();
                this.mRna4.position(this.mRna4Position);

                const tween5Miss2 = new Konva.Tween({ node: this.mRna5, duration: 1, x: this.mRna5.x()  - 27});
                tween5Miss2.play();

                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                break;
        }
        this.layer.draw();
    }

}
