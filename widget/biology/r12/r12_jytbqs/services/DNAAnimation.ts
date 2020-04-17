/**
 * DNA 链动画类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/19 16:30
 */
import {default as Konva, Layer} from 'konva';
import {Constant} from '../Constant';
import {MRNAAnimation} from './MRNAAnimation';


export class DNAAnimation {

    layer: Layer;

    /*5个dna链上的图*/
    dna1: Konva.Image;
    dna2: Konva.Image;
    dna3: Konva.Image;
    dna4: Konva.Image;
    dna5: Konva.Image;

    /*5个mRNA链上的图 与dna一一对应*/
    mRna1: Konva.Image;
    mRna2: Konva.Image;
    mRna3: Konva.Image;
    mRna4: Konva.Image;
    mRna5: Konva.Image;

    //mRNA 未转录时占位符
    mRNAPoint: Konva.Image;

    //dna链可移动图的初始位置
    dna3Position: any;
    dna4Position: any;
    dna5Position: any;

    //mRNA链可移动图的初始位置
    mRna2Position: any;
    mRna3Position: any;
    mRna4Position: any;
    mRna5Position: any;

    //mRNA未转录时占位符初始位置
    mRnaPointPosition: any;

    //未转录时mRNA的组
    uncompletemRnaGroup: Konva.Group;
    //转录完成后的mRNA组
    completemRnaGroup: Konva.Group;

    //未转录时mRNA灰色灰色链条
    mRNAUncompleteChain: Konva.Image;

    //是否转录成功
    successed  = false;
    //当前DNA链状态
    currentStatus = 'uncomplete';

    //mRNA链对应dna状态的数据数组
    mRNAData: any = [];

    //用户拖拽mRNA 字母产生的临时序列
    userData: any = [];

    //DNA链动画组
    tweenArray: any = [];
    //mRNA动画对象
    mRNAAnimation: MRNAAnimation;

    //是否正在一键转录
    isRunAutoTranslate = false;

    //定义一个变量统计是否手动转录完
    manualTranscription = 0;

    //定义一个变量用于记录需要转录总数
    totalTranscription = 1;

    // 定义一个变量由于存储转录是否完成
    outoTranslate = false;

    constructor(layer: Layer) {
        this.layer = layer;
    }

    hideUncompleteChain() {
        //恢复初始状态
        if ( this.currentStatus === 'uncomplete') {
            this.layer.findOne('#dnaUncompleteChain').hide();

            this.dna1 = this.layer.findOne('#dnaChain1');
            this.dna2 = this.layer.findOne('#dnaChain2');
            this.dna3 = this.layer.findOne('#dnaChain3');
            this.dna4 = this.layer.findOne('#dnaChain4');
            this.dna5 = this.layer.findOne('#dnaChain5');

            this.mRna1 = this.layer.findOne('#mRnaChain1');
            this.mRna2 = this.layer.findOne('#mRnaChain2');
            this.mRna3 = this.layer.findOne('#mRnaChain3');
            this.mRna4 = this.layer.findOne('#mRnaChain4');
            this.mRna5 = this.layer.findOne('#mRnaChain5');

            this.mRNAPoint = this.layer.findOne('#mRNAPoint');

            this.uncompletemRnaGroup = this.layer.findOne('#mRnaGroupUncomplete');
            this.completemRnaGroup = this.layer.findOne('#mRnaGroupComplete');
            this.mRNAUncompleteChain = this.layer.findOne('#mRNAUncompleteChain');


            //dna链的第3，4，5部分会发生平移，所以每次隐藏时复位3，4，5的位置
            this.dna3Position = this.dna3.position();
            this.dna4Position = this.dna4.position();
            this.dna5Position = this.dna5.position();

            this.mRna2Position = this.mRna2.position();
            this.mRna3Position = this.mRna3.position();
            this.mRna4Position = this.mRna4.position();
            this.mRna5Position = this.mRna5.position();

            this.mRNAUncompleteChain.show();

            this.mRnaPointPosition = this.mRNAPoint.position();

            this.mRNAAnimation = new MRNAAnimation(this.layer);
            //this.uncompletemRnaGroup
        }
        this.tweenArray = [];
        this.mRNAAnimation.tweenArray = [];

    }


    /**
     * 当点击正常时需要处理的动画
     */
    completeAnimation() {
        console.log('complete');
        this.totalTranscription = 18;
        this.hideUncompleteChain();
        switch (this.currentStatus) {
            case 'uncomplete':
                this.dna1.show();
                this.dna2.show();
                this.dna3.show();
                this.dna4.show();
                this.dna5.show();
                break;
            case 'complete':
                //do nothing
                break;
            case 'miss1':

                const tween3 = new Konva.Tween({ node: this.dna3, duration: 1, x: this.dna3.x() + 29 });
                const tween4 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x() + 29 });
                const tween5 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() + 29 , onFinish: () => {
                    this.dna2.show();
                }});

                tween3.play();
                tween4.play();
                //防止不同图片之间移动产生间隙
                setTimeout(() => {
                    tween5.play();
                }, 16);

                this.tweenArray.push(tween3);
                this.tweenArray.push(tween4);
                this.tweenArray.push(tween5);

                break;
            case 'miss2':
                const tween4Miss2 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x() + 29 + 28});
                const tween5Miss2 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() + 29 + 28 , onFinish: () => {
                    this.dna2.show();
                    this.dna3.show();
                }});
                tween5Miss2.play();
                tween4Miss2.play();

                this.tweenArray.push(tween4Miss2);
                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() + 29 + 28 + 30, onFinish: () => {
                    this.dna2.show();
                    this.dna3.show();
                    this.dna4.show();
                }});
                tween5Miss3.play();

                this.tweenArray.push(tween5Miss3);
                break;
        }
        if (this.successed) {
            //mRNA动画
            this.mRNAAnimation.completeAnimation(this.currentStatus);
        }
        this.currentStatus = 'complete';
        this.showmRNA();

        this.layer.draw();
    }


    /**
     * 当点击缺失1时需要处理的动画
     */
    miss1Animation() {
        console.log('miss1');
        this.totalTranscription = 17;
        this.hideUncompleteChain();
        switch (this.currentStatus) {
            case 'uncomplete':
                this.dna1.show();
                this.dna3.show();
                this.dna4.show();
                this.dna5.show();

                this.dna3.move({x: -29 , y: 0});
                this.dna4.move({x: -29 , y: 0});
                this.dna5.move({x: -29 , y: 0});

                break;
            case 'complete':
                this.dna2.hide();

                const tween3 = new Konva.Tween({ node: this.dna3, duration: 1, x: this.dna3.x() - 29 });
                const tween4 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x() - 29 });
                const tween5 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() - 29 });

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
                const tween4Miss2 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x() + 28 });
                const tween5Miss2 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() + 28 , onFinish: () => {
                    this.dna3.move({x: -29 , y: 0});
                    this.dna3.show();
                }});

                tween4Miss2.play();
                tween5Miss2.play();

                this.tweenArray.push(tween4Miss2);
                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() + 28 + 30 , onFinish: () => {
                    this.dna3.move({x: -29 , y: 0});
                    this.dna4.move({x: -29 , y: 0});
                    this.dna3.show();
                    this.dna4.show();

                }});
                tween5Miss3.play();
                this.tweenArray.push(tween5Miss3);
                break;
        }
        //如果是已经翻译过一次则直接显示mRNA转录后的链,动画与dna链同步
        if (this.successed) {
            //mRNA动画
            this.mRNAAnimation.miss1Animation(this.currentStatus);
        }
        this.currentStatus = 'miss1';
        this.showmRNA();
        this.layer.draw();
    }

    /**
     * 当点击缺失2时需要处理的动画
     */
    miss2Animation() {
        console.log('miss2');
        this.totalTranscription = 16;
        this.hideUncompleteChain();
        switch (this.currentStatus) {
            case 'uncomplete':
                this.dna1.show();
                //this.dna2.show();
                //this.dna3.show();
                this.dna4.show();
                this.dna5.show();

                this.dna4.move({x: -29 - 28 , y: 0});
                this.dna5.move({x: -29 - 28 , y: 0});
                break;
            case 'complete':
                this.dna2.hide();
                this.dna3.hide();
                this.dna3.position(this.dna3Position);

                const tween4 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x() - 29 - 28 });
                const tween5 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() - 29 - 28 });
                tween5.play();
                setTimeout(() => {
                    tween4.play();
                }, 16);

                this.tweenArray.push(tween4);
                this.tweenArray.push(tween5);


                break;
            case 'miss1':
                this.dna3.hide();
                this.dna3.position(this.dna3Position);

                const tween4Miss1 = new Konva.Tween({ node: this.dna4, duration: 1, x: this.dna4.x()  - 28 });
                const tween5Miss1 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x()  - 28 });
                tween5Miss1.play();
                tween4Miss1.play();

                this.tweenArray.push(tween5Miss1);
                this.tweenArray.push(tween4Miss1);
                break;
            case 'miss2':
                break;
            case 'miss3':
                const tween5Miss3 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x()  + 30 , onFinish: () => {

                    this.dna4.move({x: -29 - 28, y: 0});
                    this.dna4.show();

                }});
                tween5Miss3.play();

                this.tweenArray.push(tween5Miss3);
                break;
        }
        if (this.successed) {
            //mRNA动画
            this.mRNAAnimation.miss2Animation(this.currentStatus);
        }

        this.currentStatus = 'miss2';
        this.showmRNA();
        this.layer.draw();

    }


    /**
     * 当点击缺失3时需要处理的动画
     */
    miss3Animation() {
        console.log('miss3');
        this.totalTranscription = 15;
        this.hideUncompleteChain();
        switch (this.currentStatus) {
            case 'uncomplete':
                this.dna1.show();
                //this.dna2.show();
                //this.dna3.show();
                //this.dna4.show();
                this.dna5.show();

                this.dna5.move({x: -29 - 28 - 30 , y: 0});
                break;
            case 'complete':
                this.dna2.hide();
                this.dna3.hide();
                this.dna4.hide();
                const tween5 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x() - 29 - 28 - 30 });
                tween5.play();

                this.tweenArray.push(tween5);
                break;
            case 'miss1':
                this.dna3.hide();
                this.dna4.hide();

                this.dna3.position(this.dna3Position);
                this.dna4.position(this.dna4Position);

                const tween5Miss1 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x()  - 28 - 30});
                tween5Miss1.play();

                this.tweenArray.push(tween5Miss1);
                break;
            case 'miss2':
                this.dna4.hide();
                this.dna4.position(this.dna4Position);

                const tween5Miss2 = new Konva.Tween({ node: this.dna5, duration: 1, x: this.dna5.x()  - 30});
                tween5Miss2.play();

                this.tweenArray.push(tween5Miss2);
                break;
            case 'miss3':
                break;
        }
        if (this.successed) {
            //mRNA动画
            this.mRNAAnimation.miss3Animation(this.currentStatus);
        }
        this.currentStatus = 'miss3';
        this.showmRNA();
        this.layer.draw();


    }

    /**
     * 重置DNA方法
     */
    toUncomplete() {
        if (this.currentStatus === 'uncomplete') {
            return;
        }
        this.dna1.hide();
        this.dna2.hide();
        this.dna3.hide();
        this.dna4.hide();
        this.dna5.hide();

        //暂停所有动画
        for (let i = 0 ; i < this.tweenArray.length ; i++ ) {
            this.tweenArray[i].pause();
        }

        for (let i = 0 ; i < this.mRNAAnimation.tweenArray.length ; i++ ) {
            this.mRNAAnimation.tweenArray[i].pause();
        }

        //图片复位
        this.dna3.position(this.dna3Position);
        this.dna4.position(this.dna4Position);
        this.dna5.position(this.dna5Position);

        this.layer.findOne('#dnaUncompleteChain').show();
        this.mRNAUncompleteChain.show();

        this.currentStatus = 'uncomplete';
        this.successed = false;

        this.showmRNA();
    }


    /**
     * 当mRNA未翻译时不需要过度动画，
     * 直接显示mRNA图片再指定位置
     */
    showmRNA() {

        /* 当肽链未翻译时，不需要显示mRNA的动画效果链  */
        if ( this.successed === false) {
            this.mRna1.show();
            this.mRna2.show();
            this.mRna3.show();
            this.mRna4.show();
            this.mRna5.show();

            this.mRna3.position(this.mRna3Position);
            this.mRna4.position(this.mRna4Position);
            this.mRna5.position(this.mRna5Position);
        }

        //复位占位图
        //console.log('复位');
        this.mRNAPoint.position(this.mRnaPointPosition);
        this.mRNAPoint.show();


        //计算裁剪宽度
        let width = Constant.mRNA1Img.width + Constant.mRNA5Img.width;


        switch (this.currentStatus) {
            case 'uncomplete':
                this.mRNAData = [];
                if ( this.successed === false) {
                    this.mRna1.hide();
                    this.mRna2.hide();
                    this.mRna3.hide();
                    this.mRna4.hide();
                    this.mRna5.hide();
                }

                width += Constant.mRNA2Img.width + Constant.mRNA3Img.width + Constant.mRNA4Img.width;
                break;
            case 'complete':
                this.mRNAData = ['A', 'U' , 'G', 'C', 'A', 'C', 'U', 'G', 'G', 'C', 'G', 'U', 'U', 'G', 'C', 'C', 'C', 'U'];
                width += Constant.mRNA2Img.width + Constant.mRNA3Img.width + Constant.mRNA4Img.width;
                break;
            case 'miss1':
                this.mRNAData = ['A', 'U', 'G',  'A', 'C',   'U', 'G', 'G', 'C', 'G', 'U', 'U', 'G', 'C', 'C', 'C', 'U'];

                if ( this.successed === false) {
                    this.mRna2.hide();
                    this.mRna3.move({x: -27, y: 0});
                    this.mRna4.move({x: -27, y: 0});
                    this.mRna5.move({x: -27, y: 0});
                }
                width += Constant.mRNA3Img.width + Constant.mRNA4Img.width;

                break;
            case 'miss2':
                this.mRNAData = ['A', 'U', 'G', 'C', 'U', 'G', 'G', 'C', 'G', 'U', 'U', 'G', 'C', 'C' , 'C', 'U'];
                if ( this.successed === false) {
                    this.mRna2.hide();
                    this.mRna3.hide();
                    this.mRna4.move({x: -27 * 2, y: 0});
                    this.mRna5.move({x: -27 * 2, y: 0});
                }
                width +=  Constant.mRNA4Img.width;
                break;
            case 'miss3':

                this.mRNAData = ['A', 'U', 'G', 'U', 'G', 'G', 'C', 'G', 'U', 'U', 'G', 'C', 'C', 'C' , 'U' ];
                if ( this.successed === false) {
                    this.mRna2.hide();
                    this.mRna3.hide();
                    this.mRna4.hide();
                    this.mRna5.move({x: -27 * 3, y: 0});
                }
                break;
        }

        //裁剪到指定宽度
        this.uncompletemRnaGroup.clip({
            x: Constant.mRNA1Img.x,
            y: Constant.mRNA1Img.y,
            width : width ,
            height : Constant.mRNA1Img.height * 1.2
        });


        /** 如果已经拼成功一次则直接显示mRNA **/
        if (this.successed) {

            this.completemRnaGroup.clip({
                x: Constant.mRNA1Img.x,
                y: Constant.mRNA1Img.y,
                width : width * 1.2,
                height : Constant.mRNA1Img.height
            });

        } else {
            this.completemRnaGroup.clip({
                x: Constant.mRNA1Img.x,
                y: Constant.mRNA1Img.y,
                width : 0.1,
                height : Constant.mRNA1Img.height * 1.2
            });
            this.userData = [];
        }
    }


    /**
     * 监测拖拽的字母是否正确并且再指定的识别区域
     * @param x
     * @param y
     * @param letter
     */
    hitmRNA(x: any, y: any, letter: any) {

        //如果占位符不存在则不需要识别
        if ( !this.mRNAPoint) {
            return;
        }

        const uncompleteChain = this.layer.findOne('#dnaUncompleteChain');

        //计算识别区域
        const xMin = uncompleteChain.x()  ;
        const xMax = uncompleteChain.x() + uncompleteChain.width()  ;
        const range = 40;

        const yMin = uncompleteChain.y();
        const yMax = uncompleteChain.y() + uncompleteChain.height();

        console.log( 'x:' + x + ',y:' + y );
        console.log( 'xMin:' + (xMin - range) + ',xMax:' + (xMax + range) );
        console.log( 'yMin:' + (yMin - range) + ',yMax:' + (yMax + range) );

        this.layer.findOne('#redArrow1').hide();
        this.layer.findOne('#redArrow1').draw();

        if ( (x >= xMin - range && x <= xMax + range) && (y >= yMin - range || y <= yMax + range)) {
            //判断拖入字母是否正确
            if (this.mRNAData[ this.userData.length ] !== letter) {
                return;
            }
            document.getElementById('ico' + letter).style.display = 'none';
            //动态裁剪mRNA可视区域
            console.log(xMax + '--' + Constant.mRNA1Img.x);
            this.movePointer(letter);

            if ( this.currentStatus !== 'uncomplete') {
                (window as any).viewHandler.viewModel.$data.disabled = true;
            }
            this.manualTranscription += 1;
            console.log('ok', this.manualTranscription);
            if (this.manualTranscription === this.totalTranscription) {
                (window as any).viewHandler.viewModel.$data.translateDisabled = false;
                (window as any).viewHandler.viewModel.$data.autoTranslateDisabled = true;


                if (this.manualTranscription === 15) {
                    // 缺失3转录
                    this.layer.findOne('#redArrow5').show();
                    this.layer.findOne('#redArrow5').draw();
                } else if (this.manualTranscription === 16) {
                    // 缺失2转录
                    this.layer.findOne('#redArrow4').show();
                    this.layer.findOne('#redArrow4').draw();
                } else if (this.manualTranscription === 17) {
                    // 缺失1转录
                    this.layer.findOne('#redArrow3').show();
                    this.layer.findOne('#redArrow3').draw();
                } else if (this.manualTranscription === 18) {
                    // 正常转录
                    this.layer.findOne('#redArrow2').show();
                    this.layer.findOne('#redArrow2').draw();
                }

                this.outoTranslate = true;
            }
        }
    }

    /**
     * 移动占位符到下一个字母位置
     * @param {string} letter
     */
    movePointer(letter: string) {
        if ( !letter) {
            return;
        }
        this.completemRnaGroup.clip({
            x: Constant.mRNA1Img.x,
            y: Constant.mRNA1Img.y,
            width : this.mRNAPoint.x() + this.mRNAPoint.width()  - Constant.mRNA1Img.x ,
            height : Constant.mRNA1Img.height
        });

        this.mRNAPoint.move({x : 29 , y : 0});

        this.userData.push(letter);

        if (this.userData.length === this.mRNAData.length) {
            this.mRNAPoint.hide();
            this.mRNAUncompleteChain.hide();
        }

        this.layer.draw();
    }


    compareArray( ar1: any , ar2: any ) {
        if ( ar1.length === 0  || ar2.length === 0 || ar1.length !== ar2.length)    {
           return false;
        }
        for ( let i = 0; i < ar1.length; i++ ) {
            if ( ar1[i] !== ar2[i]) {
                return false;
            }
        }

        return true;

    }

    /**
     * 判断用户拖拽转录是否正确
     * @returns {boolean}
     */
    compareUserData() {
        return this.compareArray(this.userData, this.mRNAData);
    }


    /**
     * 自动转译
     */
    autoTranslate() {
        console.log('自动转译');
        if ( !this.mRNAPoint || this.successed || this.currentStatus === 'uncomplete' || this.isRunAutoTranslate === true) {
            return;
        }
        this.isRunAutoTranslate = true;

        let i = this.userData.length;
        const timer = setInterval(() => {


            if ( this.mRNAData.length === 0 || this.mRNAData.length < i) {
                clearInterval(timer);
                this.isRunAutoTranslate = false;
                (window as any).viewHandler.viewModel.$data.translateDisabled = false;

                console.log('this.userData.length', this.userData.length);
                this.outoTranslate = true;

                if (this.userData.length === 15) {
                    // 缺失3转录
                    this.layer.findOne('#redArrow5').show();
                    this.layer.findOne('#redArrow5').draw();
                } else if (this.userData.length === 16) {
                    // 缺失2转录
                    this.layer.findOne('#redArrow4').show();
                    this.layer.findOne('#redArrow4').draw();
                } else if (this.userData.length === 17) {
                    // 缺失1转录
                    this.layer.findOne('#redArrow3').show();
                    this.layer.findOne('#redArrow3').draw();
                } else if ((this.userData.length === 18)) {
                    // 正常转录
                    console.log('执行');
                    this.layer.findOne('#redArrow2').show();
                    this.layer.findOne('#redArrow2').draw();
                }
                return;
            }

            this.movePointer(this.mRNAData[i]);
            i++;
            console.log(i + '--' + this.mRNAData[i], this.userData.length);
        }, 100 );
    }

    /**
     * 隐藏箭头
     */
    hideArrow() {
        this.layer.findOne('#redArrow2').hide();
        this.layer.findOne('#redArrow3').hide();
        this.layer.findOne('#redArrow4').hide();
        this.layer.findOne('#redArrow5').hide();

        this.layer.findOne('#redArrow2').draw();
        this.layer.findOne('#redArrow3').draw();
        this.layer.findOne('#redArrow4').draw();
        this.layer.findOne('#redArrow5').draw();
    }
}
