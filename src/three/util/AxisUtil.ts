const _ = require('lodash');
import * as THREE from 'three';
import {ThreeUtil} from './ThreeUtil';
export class AxisUtil {

    /**
     *  创建坐标轴的方法
     */
    static createAxis (axisOption: AxisOption) {

       const parameterOption = _.assign(new AxisOption(), axisOption);
        this.recalculate(parameterOption);
        let XAxis;
        let YAxis;
        let arrowX;
        let arrowY;
        let i;
        let j = 0;
        let l = 0;
        let k;
        let e = 0;
        let f = 0;
        const group = new THREE.Group();
        //创建坐标轴 有刻度的情况下
        if (parameterOption.isTicks) {
            XAxis = ThreeUtil.createLine(parameterOption.width + parameterOption.XtickDistance,
                parameterOption.strokeWidth, parameterOption.axisColor, parameterOption.axisOpacity);
            YAxis = ThreeUtil.createLine(parameterOption.strokeWidth, parameterOption.height +
                parameterOption.YtickDistance, parameterOption.axisColor, parameterOption.axisOpacity);
            arrowX = ThreeUtil.createTriangle((parameterOption.width / 2) + parameterOption.XtickDistance / 2,
                (parameterOption.arrowHeight / 2), (parameterOption.width / 2) + parameterOption.XtickDistance / 2,
                -(parameterOption.arrowHeight / 2), (parameterOption.width / 2) + parameterOption.XtickDistance / 2
                + parameterOption.arrowWidth, 0 , parameterOption.axisColor, parameterOption.axisOpacity);
            arrowY = ThreeUtil.createTriangle((parameterOption.arrowHeight / 2), (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2, -(parameterOption.arrowHeight / 2), (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2, 0, (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2 + parameterOption.arrowWidth , parameterOption.axisColor, parameterOption.axisOpacity);
            //创建坐标轴上的刻度
            for (i = 0; i < (parameterOption.width / 2 / parameterOption.XtickDistance) + 1; i++) {
                const a = ThreeUtil.createLine(parameterOption.tickWidth,  parameterOption.tickHeight,
                  parameterOption.axisColor, parameterOption.axisOpacity);
                const b = ThreeUtil.createLine(parameterOption.tickWidth,  parameterOption.tickHeight,
                  parameterOption.axisColor, parameterOption.axisOpacity);
                a.position.set(j, parameterOption.tickHeight / 2, 0);
                b.position.set(l, parameterOption.tickHeight / 2, 0);
                group.add(a);
                group.add(b);
                j += parameterOption.XtickDistance;
                l -= parameterOption.XtickDistance;
            }
            for (k = 0; k < (parameterOption.height / 2 / parameterOption.YtickDistance) + 1; k++) {
                const a = ThreeUtil.createLine(parameterOption.tickHeight, parameterOption.tickWidth,
                  parameterOption.axisColor, parameterOption.axisOpacity);
                const b = ThreeUtil.createLine(parameterOption.tickHeight, parameterOption.tickWidth,
                  parameterOption.axisColor, parameterOption.axisOpacity);
                a.position.set(parameterOption.tickHeight / 2, f, 0);
                b.position.set(parameterOption.tickHeight / 2, e, 0);
                group.add(a);
                group.add(b);
                e += parameterOption.YtickDistance;
                f -= parameterOption.YtickDistance;
            }
            group.add(XAxis);
            group.add(YAxis);
            group.add(arrowX);
            group.add(arrowY);
        } else {
            XAxis = ThreeUtil.createLine(parameterOption.width + parameterOption.XtickDistance,
                parameterOption.strokeWidth, parameterOption.axisColor, parameterOption.axisOpacity);
            YAxis = ThreeUtil.createLine(parameterOption.strokeWidth, parameterOption.height +
                parameterOption.YtickDistance, parameterOption.axisColor, parameterOption.axisOpacity);
            arrowX = ThreeUtil.createTriangle((parameterOption.width / 2) + parameterOption.XtickDistance / 2,
                (parameterOption.arrowHeight / 2), (parameterOption.width / 2) + parameterOption.XtickDistance / 2,
                -(parameterOption.arrowHeight / 2), (parameterOption.width / 2) + parameterOption.XtickDistance / 2
                + parameterOption.arrowWidth, 0 , parameterOption.axisColor, parameterOption.axisOpacity);
            arrowY = ThreeUtil.createTriangle((parameterOption.arrowHeight / 2), (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2, -(parameterOption.arrowHeight / 2), (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2, 0, (parameterOption.height / 2)
                + parameterOption.YtickDistance / 2 + parameterOption.arrowWidth , parameterOption.axisColor, parameterOption.axisOpacity);
            group.add(XAxis);
            group.add(YAxis);
            group.add(arrowX);
            group.add(arrowY);
        }
        //创建坐标轴英文文字
        const textX = ThreeUtil.createNewRomanText('x', parameterOption.width / 2 + parameterOption.XTextOffSet, 0, 0,
            parameterOption.fontColor , parameterOption.fontScale);
        const textY = ThreeUtil.createNewRomanText('y', -parameterOption.width / 45,
            parameterOption.height / 2 + parameterOption.YTextOffSet,
            0, parameterOption.fontColor , parameterOption.fontScale);
        const textO = ThreeUtil.createNewRomanText('o', -parameterOption.OTextXOffSet, parameterOption.OTextYOffSet,
            0, parameterOption.fontColor, parameterOption.fontScale + (0.05 * parameterOption.width / 200));
        if (parameterOption.numberDepthTest === true) {
            textX.material.depthTest = parameterOption.numberDepthTest;
            textY.material.depthTest = parameterOption.numberDepthTest;
            textO.material.depthTest = parameterOption.numberDepthTest;
        }
        group.add(textO);
        group.add(textY);
        group.add(textX);

        //如果不要刻度直接结束方法
        if (parameterOption.isTicks === false) {
            return group;
        }

        //创建坐标轴坐标值文字
        if (!parameterOption.AxisXNumArray) {
            let s = parameterOption.XtickDistance;
            let t = -parameterOption.XtickDistance;
            let o = parameterOption.YtickDistance;
            let p = -parameterOption.YtickDistance;
            let index1 = 1;
            let index2 = 1;
            for (let h = 0; h < (parameterOption.width / 2 / parameterOption.XtickDistance); h++) {
                const a = ThreeUtil.createNumber( index1 + parameterOption.unit, s , -parameterOption.XnumYOffSet, 0,
                    parameterOption.fontColor, parameterOption.fontScale);
                const b = ThreeUtil.createNumber('-' + index1 + parameterOption.unit, t, -parameterOption.XnumYOffSet, 0,
                    parameterOption.fontColor, parameterOption.fontScale);
                if (parameterOption.numberDepthTest === true) {
                    a.material.depthTest = parameterOption.numberDepthTest;
                    b.material.depthTest = parameterOption.numberDepthTest;
                }
                group.add(a);
                group.add(b);
                s += parameterOption.XtickDistance;
                t -= parameterOption.XtickDistance;
                index1++;
            }

            for (let h = 0; h < (parameterOption.height / 2 / parameterOption.YtickDistance); h++) {
                const a = ThreeUtil.createNumber( index2 + parameterOption.unit, parameterOption.YnumXOffSet , o
                    + parameterOption.YnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                const b = ThreeUtil.createNumber('-' + index2 + parameterOption.unit, parameterOption.YnumXOffSet,
                    p + parameterOption.YnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                if (parameterOption.numberDepthTest === true) {
                    a.material.depthTest = parameterOption.numberDepthTest;
                    b.material.depthTest = parameterOption.numberDepthTest;
                }
                group.add(a);
                group.add(b);
                o += parameterOption.YtickDistance;
                p -= parameterOption.YtickDistance;
                index2++;
            }
        } else {
            let count = 0 ;
            let s = parameterOption.XtickDistance;
            let t = -parameterOption.XtickDistance;

            for (let h = 0; h < parameterOption.AxisXNumArray.length; h++) {
                if (parameterOption.AxisXNumArray[count] === '') {
                    s += parameterOption.XtickDistance;
                    t -= parameterOption.XtickDistance;
                    count++;
                    continue;
                }
                const a = ThreeUtil.createNumber( parameterOption.AxisXNumArray[count], s + parameterOption.XnumXOffSet ,
                    - parameterOption.XnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                const b = ThreeUtil.createNumber('-' + parameterOption.AxisXNumArray[count], t + parameterOption.XnumXOffSet,
                    - parameterOption.XnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                if (parameterOption.numberDepthTest === true) {
                    a.material.depthTest = parameterOption.numberDepthTest;
                    b.material.depthTest = parameterOption.numberDepthTest;
                }
                group.add(a);
                group.add(b);
                s += parameterOption.XtickDistance;
                t -= parameterOption.XtickDistance;
                count++;
            }

            let count1 = 0;
            let o = parameterOption.YtickDistance;
            let p = -parameterOption.YtickDistance;

            for (let h = 0; h < parameterOption.AxisYNumArray.length; h++) {
                if (parameterOption.AxisYNumArray[count1] === '') {
                    o += parameterOption.YtickDistance;
                    p -= parameterOption.YtickDistance;
                    count1++;
                    continue;
                }
                const a = ThreeUtil.createNumber( parameterOption.AxisYNumArray[count1], parameterOption.YnumXOffSet
                    , o + parameterOption.YnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                const b = ThreeUtil.createNumber('-' + parameterOption.AxisYNumArray[count1], parameterOption.YnumXOffSet,
                    p + parameterOption.YnumYOffSet, 0, parameterOption.fontColor, parameterOption.fontScale);
                if (parameterOption.numberDepthTest === true) {
                    a.material.depthTest = parameterOption.numberDepthTest;
                    b.material.depthTest = parameterOption.numberDepthTest;
                }
                group.add(a);
                group.add(b);
                o += parameterOption.YtickDistance;
                p -= parameterOption.YtickDistance;
                count1++;
            }
        }
        return group;
    }

    static recalculate(axisOption: AxisOption) {
        if (axisOption.width !== 200 || axisOption.height !== 200 || axisOption.strokeWidth !== 0.5) {
            axisOption.strokeWidth = axisOption.strokeWidth === 0.5 ? 0.5 * axisOption.width / 200 : axisOption.strokeWidth;
            axisOption.arrowWidth = axisOption.arrowWidth === 8 ? 8 * axisOption.width / 200 : axisOption.arrowWidth;
            axisOption.arrowHeight = axisOption.arrowHeight === 4 ? 4 * axisOption.width / 200 : axisOption.arrowHeight;
            axisOption.tickWidth = axisOption.tickWidth ?  axisOption.tickWidth : 0.5;
            axisOption.tickHeight = axisOption.tickHeight === 2 ? axisOption.height / 100 : axisOption.tickHeight;
            axisOption.XtickDistance = axisOption.XtickDistance === 10 ? axisOption.width / 20 : axisOption.XtickDistance;
            axisOption.YtickDistance = axisOption.YtickDistance === 10 ? axisOption.width / 20 : axisOption.YtickDistance;
            axisOption.fontScale = axisOption.fontScale === 0.15 ? 0.15 * axisOption.width / 200 : axisOption.fontScale;
            axisOption.XTextOffSet = axisOption.XTextOffSet === 11 ? 11 * axisOption.width / 200 : axisOption.XTextOffSet;
            axisOption.YTextOffSet = axisOption.YTextOffSet === 18 ? 18 * axisOption.height / 200 : axisOption.YTextOffSet;
            axisOption.OTextXOffSet = axisOption.OTextXOffSet === 1.5 ? 1.5 * axisOption.width / 200 : axisOption.OTextXOffSet;
            axisOption.OTextYOffSet = axisOption.OTextYOffSet === 1.5 ? 1.5 * axisOption.width / 200 : axisOption.OTextYOffSet;
            axisOption.YnumXOffSet = axisOption.YnumXOffSet === -5 ? -5 * axisOption.height / 200 : axisOption.YnumXOffSet;
            axisOption.YnumYOffSet = axisOption.YnumYOffSet === 3 ? 3 * axisOption.height / 200 : axisOption.YnumYOffSet;
            axisOption.XnumXOffSet = axisOption.XnumXOffSet === 0 ? 0 * axisOption.height / 200 : axisOption.XnumXOffSet;
            axisOption.XnumYOffSet = axisOption.XnumYOffSet === 0 ? 0 * axisOption.height / 200 : axisOption.XnumYOffSet;
        }

        if (axisOption.AxisXNumArray) {
            axisOption.AxisYNumArray = axisOption.AxisYNumArray ? axisOption.AxisYNumArray : axisOption.AxisXNumArray;
        }
    }

}

/*
 * @param {number} width   坐标轴宽度
 * @param {number} height  坐标轴高度
 * @param {string[]} AxisXNumArray X坐标轴的单位数组，如果没有参数传'' ，传的是正坐标轴的数组如['','2','','','5']
 * @param {string[]} AxisYNumArray y坐标轴的单位数组，如果不传参数默认与X坐标轴相同
 * @param {string} axisColor 坐标轴的颜色，不传默认为黑色
 * @param {number} strokeWidth 坐标轴的粗细
 * @param {number} arrowWidth 箭头宽度
 * @param {number} arrowHeight 箭头高度
 * @param {boolean} isTicks 是否需要刻度  默认为false
 * @param {number} tickWidth 刻度宽度    如果不传值，有默认值
 * @param {number} tickHeight 刻度高度   如果不传值，有默认值
 * @param {number} XtickDistance X轴单位刻度之间的间距   如果不传值，有默认值
 * @param {number} YtickDistance Y轴单位刻度之间的间距  如果不传会默认X与Y相同   如果不传值，有默认值
 * @param {string} fontColor 文字的颜色
 * @param {number} fontScale 文字的缩放倍率
 * @param {string} unit 不传数组情况下坐标轴的单位
 * @param {number} XTextOffSet 设置X文字的偏移量
 * @param {number} YTextOffSet 设置Y文字的偏移量
 * @param {number} OTextXOffSet 设置文字O X方向的偏移量
 * @param {number} OTextYOffSet 设置文字O Y方向的偏移量
 * @param {number} YnumYOffSet 设置文字Y Y方向的偏移量
 * @param {number} YnumXOffSet 设置文字Y X方向的偏移量
 * @param {number} XnumYOffSet 设置文字X Y方向的偏移量
 * @param {number} XnumXOffSet 设置文字X X方向的偏移量
 * @param {boolean} numberDepthTest 是否关闭深度测试
 */

class AxisOption {
    isTicks = false;
    numberDepthTest = false;
    width = 200;
    height = 200;
    AxisXNumArray?: string[];
    AxisYNumArray = this.AxisXNumArray;
    strokeWidth = 0.5 * this.width / 200 ;
    arrowWidth = 8 * this.width / 200;
    arrowHeight = 4 * this.width / 200;
    axisColor = '#000000';
    axisOpacity = 1;
    tickWidth = this.strokeWidth;
    tickHeight = this.height / 100;
    XtickDistance = this.width / 20;
    YtickDistance = this.XtickDistance;
    fontColor = '#000000';
    fontScale = 0.15 * this.width / 200;
    unit = '';
    XTextOffSet = 11 * this.width / 200;
    YTextOffSet = 18 * this.height / 200;
    OTextXOffSet = 3 * this.width / 200;
    OTextYOffSet = 3 * this.width / 200;
    YnumXOffSet = -5 * this.height / 200;
    YnumYOffSet = 3 * this.height / 200;
    XnumXOffSet = 0 * this.height / 200;
    XnumYOffSet = 2 * this.height / 200;
}

