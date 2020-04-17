import * as THREE from 'three';
import {MathHelper} from '../../../../../src/util/MathHelper';

export class CalcIntersection {
    //计算椭圆交点的方法
    //通过斜率 delta 判断直线与椭圆的交点的个数与位置并返回一个坐标
     getEllipseIntersections (angle: number, intercept: number, slope: number, x: number) {
        const slope1 = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, angle)));

        const a = 11 + (36 * Math.pow(slope1, 2));

        const b = 72 * slope1 * intercept;

        const c = 36 * Math.pow(intercept, 2) - 396;

        const delta = MathHelper.getDeltaNumber(a, b, c);
        let opacity1: number;
        let opacity2: number;
        let result = {
            x1: 0,
            x2: 0
        };
        let y1: number;
        let y2: number;
        let result1: any;
        //K存在的情况 判断Δ
        if (slope) {
            if (delta > 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = (slope1 * result.x1 + intercept);
                y2 = (slope1 * result.x2 + intercept);
                if (new THREE.Vector3(result.x1, y1, 0).distanceTo(new THREE.Vector3(result.x2, y2, 0)) < 1) {
                    this.setText('存在', 'Δ = 0', '相切', '一个');
                    result.x1 = (result.x1 + result.x2) / 2;
                    y1 = ((slope1 * result.x1 + intercept) + (slope1 * result.x2 + intercept)) / 2;
                    opacity1 = 1;
                    opacity2 = 0;
                } else {
                    this.setText('存在', 'Δ > 0', '相交', '两个');
                    result.x1 = result.x1;
                    result.x2 = result.x2;
                    y1 = (slope1 * result.x1 + intercept);
                    y2 = (slope1 * result.x2 + intercept);
                    opacity1 = 1;
                    opacity2 = 1;
                }
            } else if (delta === 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = (slope1 * result.x1 + intercept);
                y2 = (slope1 * result.x2 + intercept);
                result.x1 = result.x1;
                result.x2 = result.x2;
                opacity1 = 1;
                opacity2 = 1;
                this.setText('存在', 'Δ = 0', '相切', '一个');
            } else {
                this.setText('存在', 'Δ < 0', '相离', '零个');
                result.x1 = 0;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 0;
                opacity2 = 0;
            }
        } else {
            if (x < 60.5 && x > 59.5) {
                this.setText('不存在', 'Δ不存在', '相切', '一个');
                result.x1 = 6;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 1;
                opacity2 = 0;
            } else if (x < -59.5 && x > - 60.5) {
                this.setText('不存在', 'Δ不存在', '相切', '一个');
                result.x1 = -6;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 1;
                opacity2 = 0;
            } else if (x >= -60 && x <= 60) {
                this.setText('不存在', 'Δ不存在', '相交', '两个');
                result.x1 = x / 10;
                result.x2 = x / 10;
                y1 = Math.sqrt(11 - (11 * Math.pow(x / 10, 2)) / 36);
                y2 = -Math.sqrt(11 - (11 * Math.pow(x / 10, 2)) / 36);
                opacity1 = 1;
                opacity2 = 1;
            } else {
                this.setText('不存在', 'Δ不存在', '相离', '零个');
                result.x1 = 0;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 0;
                opacity2 = 0;
            }
        }
        result1 = {
            x1: result.x1,
            y1: y1,
            x2: result.x2,
            y2: y2,
            opacity1: opacity1,
            opacity2: opacity2
        };
        return result1;
    }

    //计算直线与圆的交点的方法
    //通过斜率和delta 判断交点的个数 通过联立方程获得交点坐标
    getSphereIntersections(angle: number, intercept: number, slope: number, x: number) {
        const slope1 = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, angle)));

        const a = (1 + Math.pow(slope1, 2));

        const b = 2 * slope1 * intercept;

        const c = Math.pow(intercept, 2) - 9;

        const delta = MathHelper.getDeltaNumber(a, b, c);
        let opacity1: number;
        let opacity2: number;
        let result = {
            x1: 0,
            x2: 0
        };
        let y1: number;
        let y2: number;
        let result1: any;

        //当斜率存在时 判断delta 从而得出交点
        if (slope) {
            if (delta > 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = slope1 * result.x1 + intercept;
                y2 = slope1 * result.x2 + intercept;
                //因为精度的问题,delta很难等于0 所以需要在这里进行判断
                if (new THREE.Vector3(result.x1, y1, 0).distanceTo(new THREE.Vector3(result.x2, y2, 0)) < 1) {
                    this.setText('存在', 'Δ = 0', '相切', '一个');
                    result.x1 = (result.x1 + result.x2) / 2;
                    y1 = ((slope1 * result.x1 + intercept) + (slope1 * result.x2 + intercept)) / 2;
                    opacity1 = 1;
                    opacity2 = 0;
                } else {
                    this.setText('存在', 'Δ > 0', '相交', '两个');
                    opacity1 = 1;
                    opacity2 = 1;
                }
            } else if ( delta === 0) {
                opacity1 = 1;
                opacity2 = 0;
                y1 = 0;
                y2 = 0;
                result = MathHelper.getFunctionResult(a, b, c);
            } else {
                y1 = 0;
                y2 = 0;
                result = MathHelper.getFunctionResult(a, b, c);
                opacity1 = 0;
                opacity2 = 0;
                this.setText('存在', 'Δ < 0', '相离', '零个');
            }
        } else {
            if (x < 29.5 && x > -29.5) {
                result.x1 = x / 10;
                result.x2 = x / 10;
                y1 = Math.sqrt(9 - Math.pow(result.x1, 2));
                y2 = -Math.sqrt(9 - Math.pow(result.x1, 2));
                opacity1 = 1;
                opacity2 = 1;
                this.setText('不存在', 'Δ > 0', '相交', '两个');
            } else if (x <= 30.5 && x >= 29.5) {
                result.x1 = 3;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 1;
                opacity2 = 0;
                this.setText('不存在', 'Δ = 0', '相切', '一个');
            } else if (x <= -29.5 && x >= -30.5) {
                result.x1 = -3;
                result.x2 = 0;
                y1 = 0;
                y2 = 0;
                opacity1 = 1;
                opacity2 = 0;
                this.setText('不存在', 'Δ = 0', '相切', '一个');
            } else {
                this.setText('不存在', 'Δ < 0', '相离', '零个');
                y1 = 0;
                y2 = 0;
                opacity1 = 0;
                opacity2 = 0;
            }
        }

        result1 = {
            x1: result.x1,
            y1: y1,
            x2: result.x2,
            y2: y2,
            opacity1: opacity1,
            opacity2: opacity2
        };
        return result1;
    }

    //计算直线与双曲线的交点的方法
    getHyperbolaIntersections(angle: number, intercept: number, slope: number, x: number) {
        const slope1 = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, angle)));

        const a = 16 - (9 * Math.pow(slope1, 2));

        const b = -18 * slope1 * intercept;

        const c = -9 * Math.pow(intercept, 2) - 144;


        const delta = MathHelper.getDeltaNumber(a, b, c);
        let opacity1 = 0;
        let opacity2 = 0;
        let result = {
            x1: 0,
            x2: 0
        };
        let y1 = 0;
        let y2 = 0;
        let result1: any;
        if (slope) {
            if ((slope1 > 1.32 && slope1 < 1.34) || (slope1 > -1.34 && slope1 < -1.32)) {
                if (intercept === 0) {
                    this.setText('存在', 'Δ不存在', '相离', '零个');
                } else {
                    //有一个交点
                    this.setText('存在', 'Δ不存在', '相交', '一个');
                    result = MathHelper.getFunctionResult(a, b, c);
                    y1 = slope1 * result.x1 + intercept;
                    y2 = slope1 * result.x2 + intercept;
                    opacity1 = 1;
                    opacity2 = 1;

                }
            } else if (delta > 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = (slope1 * result.x1) + intercept;
                y2 = (slope1 * result.x2) + intercept;
                //因为精度问题Δ很难为0，通过两个交点之间的距离来计算
                if (new THREE.Vector3(result.x1, y1, 0).distanceTo(new THREE.Vector3(result.x2, y2, 0)) < 1) {
                    this.setText('存在', 'Δ = 0', '相切', '一个');
                    opacity1 = 1;
                } else {
                    this.setText('存在', 'Δ > 0', '相交', '两个');
                    opacity1 = 1;
                    opacity2 = 1;
                }
            } else if (delta < 0) {
                this.setText('存在', 'Δ < 0', '相离', '零个');
            } else if (delta === 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = (slope1 * result.x1) + intercept;
                y2 = (slope1 * result.x2) + intercept;
                opacity1 = 1;
                opacity2 = 1;
                this.setText('存在', 'Δ = 0', '相切', '一个');
            }
        } else {
            if (x > -29 && x < 29) {
                //k不存在无交点
                this.setText('不存在', 'Δ不存在', '相离', '零个');
            } else if (x > -30 && x < -29 || x < 30 && x > 29) {
                //k不存在有一个交点
                result.x1 = x / 10;
                y1 = 0;
                opacity1 = 1;
                this.setText('不存在', 'Δ不存在', '相切', '一个');
            } else {
                //k不存在有两个交点
                this.setText('不存在', 'Δ不存在', '相交', '两个');
                result.x1 = x / 10;
                result.x2 = x / 10;
                y1 = Math.sqrt((16 * Math.pow(result.x1, 2) - 144) / 9);
                y2 = -Math.sqrt((16 * Math.pow(result.x2, 2) - 144) / 9);
                opacity1 = 1;
                opacity2 = 1;
            }
        }

        result1 = {
            x1: result.x1,
            y1: y1,
            x2: result.x2,
            y2: y2,
            opacity1: opacity1,
            opacity2: opacity2
        };

        return result1;
    }
    //计算直线与抛物线的交点的方法
    getParabolaIntersections(angle: number, intercept: number, slope: number, x: number) {
        const slope1 = MathHelper.getSlope((MathHelper.getTiltAngle(60 * Math.PI / 180, angle)));

        const a = Math.pow(slope1, 2);

        const b = (2 * slope1 * intercept) - 12;

        const c = Math.pow(intercept, 2);

        const delta = MathHelper.getDeltaNumber(a, b, c);
        let opacity1: number;
        let opacity2: number;
        let result = {
            x1: 0,
            x2: 0
        };
        let y1 = 0;
        let y2 = 0;
        let result1: any;

        if (slope) {
            if (delta > 0 && parseFloat(slope.toFixed(2)) !== 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = slope1 * result.x1 + intercept;
                y2 = slope1 * result.x2 + intercept;
                if (new THREE.Vector3(result.x1, y1, 0).distanceTo(new THREE.Vector3(result.x2, y2, 0)) < 1) {
                    this.setText('存在', 'Δ = 0', '相切', '一个');
                    result.x1 = (result.x1 + result.x2) / 2;
                    y1 = ((slope1 * result.x1 + intercept) + (slope1 * result.x2 + intercept)) / 2;
                    opacity1 = 1;
                    opacity2 = 0;
                } else {
                    opacity1 = 1;
                    opacity2 = 1;
                    this.setText('存在', 'Δ > 0', '相交', '两个');
                }
            } else if (delta === 0 && parseFloat(slope.toFixed(2)) !== 0) {
                result = MathHelper.getFunctionResult(a, b, c);
                y1 = slope1 * result.x1 + intercept;
                y2 = slope1 * result.x2 + intercept;
                opacity1 = 1;
                opacity2 = 0;
                this.setText('存在', 'Δ = 0', '相切', '一个');
            } else if (delta < 0 && parseFloat(slope.toFixed(2)) !== 0) {
                opacity1 = 0;
                opacity2 = 0;
                this.setText('存在', 'Δ < 0', '相离', '零个');
            } else {
                result.x1 = Math.pow(intercept, 2) / 12 ;
                y1 = intercept;
                opacity1 = 1;
                opacity2 = 0;
                this.setText('存在', 'Δ不存在', '相交', '一个');
            }
        } else {
            if (x / 10 > 0) {
                result.x1 = x / 10;
                y1 = Math.sqrt(12 * result.x1);
                result.x2 = x / 10;
                y2 = -Math.sqrt(12 * result.x2);
                opacity1 = 1;
                opacity2 = 1;
            } else if (x === 0) {
                result.x1 = 0;
                y1 = 0;
                opacity1 = 1;
                opacity2 = 0;
            } else {
                opacity1 = 0;
                opacity2 = 0;
            }
        }

        result1 = {
            x1: result.x1,
            y1: y1,
            x2: result.x2,
            y2: y2,
            opacity1: opacity1,
            opacity2: opacity2
        };

        return result1;
    }
    //设置表格文字的方法
    setText(slope: string, deleta: string, position: string, intersection: string) {
        (window as any).viewHandler.viewModel.$data.slope = slope;
        (window as any).viewHandler.viewModel.$data.delta = deleta;
        (window as any).viewHandler.viewModel.$data.position = position;
        (window as any).viewHandler.viewModel.$data.intersection = intersection;
    }

}
