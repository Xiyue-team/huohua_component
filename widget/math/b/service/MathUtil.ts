//创建舞台
// 建立坐标系
//画cos函数
import * as Konva from "konva";
import {Line} from "konva";
import {MathUtil_config} from "./MathUtil_config";

export class MathUtil{
    private cosLine:Line;
    private sinLine:Line;
    MathUtil_config=new MathUtil_config();

    constructor(){

    }

    //对外提供一个传递参数的方法
    //如果想定义函数尺寸需要调用MathUtil_config对象的setCosSize，setSinSize方法；
    //如果想定义函数样式调用MathUtil_config对象的setStyle方法；
    //cos函数
    //返回一条可用的函数线
    createCosLine(){
        var centerX = this.MathUtil_config.getCosSize_cos_centerX();
        var centerY = this.MathUtil_config.getCosSize_cos_centerY();
        var lineArry = [];

        //区间
        var range = this.MathUtil_config.getCosSize_cos_range();
        //开始x坐标
        var beginIndex = this.MathUtil_config.getCosSize_cos_beginIndex();
        //每次步进距离
        var setp = 0.1;
        //放大倍数
        var multiple = this.MathUtil_config.getCosSize_cos_multiple();

        for(var i = -10;i<=(range+beginIndex);i+=setp){
            var j = Math.cos(i);
            lineArry.push(centerX+i*multiple);
            lineArry.push(centerY-j*multiple);
        }
        console.log(lineArry)
            this.cosLine = new Konva.Line({
            points: lineArry,
            stroke: this.MathUtil_config.getstroke(),
            strokeWidth: this.MathUtil_config.getstrokeWidth(),
            lineCap: 'round',
            lineJoin: 'round',
            tension : 0.5
        });
        return this.cosLine;

    }
    //返回cos函数的坐标数组
    getCosAxis(){
        var centerX = this.MathUtil_config.getCosSize_cos_centerX();
        var centerY = this.MathUtil_config.getCosSize_cos_centerY();
        var lineArry = [];

        //区间
        var range = this.MathUtil_config.getCosSize_cos_range();
        //开始x坐标
        var beginIndex = this.MathUtil_config.getCosSize_cos_beginIndex();
        //每次步进距离
        var setp = 0.1;
        //放大倍数
        var multiple = this.MathUtil_config.getCosSize_cos_multiple();

        for(var i = -10;i<=(range+beginIndex);i+=setp){
            var j = Math.cos(i);
            lineArry.push(centerX+i*multiple);
            lineArry.push(centerY-j*multiple);
        }
        return lineArry;
    }
    //sin函数
    //返回一条可用的函数线
    createSinLine(){
        var centerX = this.MathUtil_config.getSinSize_sin_centerX();
        var centerY = this.MathUtil_config.getSinSize_sin_centerY();
        var lineArry = [];

        //区间
        var range = this.MathUtil_config.getSinSize_sin_range();
        //开始x坐标
        var beginIndex = this.MathUtil_config.getSinSize_sin_beginIndex();
        //每次步进距离
        var setp = 0.1;
        //放大倍数
        var multiple = this.MathUtil_config.getSinSize_sin_multiple();

        for(var i = -10;i<=(range+beginIndex);i+=setp){
            var j = Math.sin(i);
            lineArry.push(centerX+i*multiple);
            lineArry.push(centerY-j*multiple);
        }
        console.log(lineArry)
        this.sinLine = new Konva.Line({
            points: lineArry,
            stroke: this.MathUtil_config.getstroke(),
            strokeWidth: this.MathUtil_config.getstrokeWidth(),
            lineCap: 'round',
            lineJoin: 'round',
            tension : 0.5
        });
        return this.sinLine;

    }
    //返回Sin函数的坐标数组
    getSinAxis(){
        var centerX = this.MathUtil_config.getSinSize_sin_centerX();
        var centerY = this.MathUtil_config.getSinSize_sin_centerY();
        var lineArry = [];

        //区间
        var range = this.MathUtil_config.getSinSize_sin_range();
        //开始x坐标
        var beginIndex = this.MathUtil_config.getSinSize_sin_beginIndex();
        //每次步进距离
        var setp = 0.1;
        //放大倍数
        var multiple = this.MathUtil_config.getSinSize_sin_multiple();

        for(var i = -10;i<=(range+beginIndex);i+=setp){
            var j = Math.sin(i);
            lineArry.push(centerX+i*multiple);
            lineArry.push(centerY-j*multiple);
        }
        return lineArry;
    }

}