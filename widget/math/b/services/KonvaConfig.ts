/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/16 16:04
 */
export class  KonvaConfig{
// 创建画布
    static config_stage = {
        width: ():number=>{
            return window.innerWidth as number;
        },
        height:():number=>{
            return window.innerHeight as number;
        }
    };

// 方向角
    static config_lefttext = {
        x: 24,
        y: 24,
        text: '方向角',
        fontSize: 24,
        fontFamily: 'PingFangSC-Medium',
        fill: 'black',
    };

// 角度
    static config_leftangle = {
        x: 24,
        y: 78,
        text: '北偏东',
        fontSize: 20,
        fontFamily: 'PingFangSC-Medium',
        fill: '#3494E9',
    };

//坐标系横轴
    static config_xline = {
        x1: 325,
        y1: 292,
        x2: 325+375,
        y2: 292,
        stroke: 'black',
        strokeWidth:4
    };

//坐标系纵轴
    static config_yline = {
        x1: 511,
        y1: 104,
        x2: 511,
        y2: 104+376,
        stroke: 'black',
        strokeWidth:4
    };

// 坐标系上的文字
//东
    static config_east = {
        x: 712,
        y: 279,
        text: '东',
        fontSize: 18,
        fontFamily: 'PingFangSC-Medium',
        fill: '#000000'
    };
//南
    static config_south = {
        x: 503,
        y: 491,
        text: '南',
        fontSize: 18,
        fontFamily: 'PingFangSC-Medium',
        fill: '#000000'
    };
//西
    static config_west = {
        x: 295,
        y: 279,
        text: '西',
        fontSize: 18,
        fontFamily: 'PingFangSC-Medium',
        fill: '#000000'
    };
//北
    static config_north:object = {
        x: 504,
        y: 68,
        text: '北',
        fontSize: 18,
        fontFamily: 'PingFangSC-Medium',
        fill: '#000000'
    };

//目标线
    static config_arrow:object = {
        x:0,
        y:0,
        x1: 513,
        y1: 152+140,
        x2: 513+125,
        y2: 152,
        pointerLength: 10,
        pointerWidth : 10,
        fill: '#EF5E65',
        stroke: '#EF5E65',
        strokeWidth: 4
    };

//目标线上的小球
    static config_yoda = {
        x: 602,
        y: 176,
        width:15,
        height:15
    };

// 小球移动的轨迹
    static trajectory = (pos:any)=> {
        let x = 511;
        let y = 292;
        let outerradius = 140;
        let scale = outerradius / Math.sqrt(Math.pow(pos.x - x, 2)
            + Math.pow(pos.y - y, 2)
        );
        //arrow_circle_x = Math.round((pos.x - x) * scale + x);
        //arrow_circle_y = Math.round((pos.y - y) * scale + y);
        return {
            y: Math.round((pos.y - y) * scale + y),
            x: Math.round((pos.x - x) * scale + x)
        };
    };

// 目标线旋转的轨迹
    static arrow_rotate = {
        offsetX : 511,
        offsetY : 292,
    }



}