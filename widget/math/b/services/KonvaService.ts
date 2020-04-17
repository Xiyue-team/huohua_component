/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/3/16 16:03
 */
import * as Konva from "konva";
import {KonvaConfig} from "./KonvaConfig";
import {StageConfig} from "konva";

export class KonvaService{

/*
    init(){

        let stageConfig:StageConfig = {
            container:'container',
            width:KonvaConfig.config_stage.width(),
            height: KonvaConfig.config_stage.height()
        } ;
        //创建画布
        var stage =  new Konva.Stage(stageConfig);

        //创建层
        var layer = new Konva.Layer();

        //题目 方向角
        var lefttext = new Konva.Text({
            x: config_lefttext.x,
            y: config_lefttext.y,
            text: config_lefttext.text,
            fontSize: config_lefttext.fontSize,
            fontFamily: config_lefttext.fontFamily,
            fill: config_lefttext.fill
        });
        layer.add(lefttext);

// 角度
        var leftangle = new Konva.Text({
            x: config_leftangle.x,
            y: config_leftangle.y,
            text: config_leftangle.text,
            fontSize: config_leftangle.fontSize,
            fontFamily: config_leftangle.fontFamily,
            fill: config_leftangle.fill
        });
        layer.add(leftangle);

//坐标系横轴
        var xline = new Konva.Line({
            points:[config_xline.x1,config_xline.y1,config_xline.x2,config_xline.y2],
            stroke: config_xline.stroke,
            strokeWidth: config_xline.strokeWidth
        });
        layer.add(xline);

//坐标系纵轴
        var yline = new Konva.Line({
            points:[config_yline.x1,config_yline.y1,config_yline.x2,config_yline.y2],
            stroke: config_xline.stroke,
            strokeWidth: config_xline.strokeWidth
        });
        layer.add(yline);

//坐标系上面的字
//东
        var centertext_east = new Konva.Text({
            x: config_east.x,
            y: config_east.y,
            text: config_east.text,
            fontSize: config_east.fontSize,
            fontFamily: config_east.fontFamily,
            fill: config_east.fill
        });
        layer.add(centertext_east);
//南
        var centertext_south = new Konva.Text({
            x: config_south.x,
            y: config_south.y,
            text: config_south.text,
            fontSize: config_south.fontSize,
            fontFamily: config_south.fontFamily,
            fill: config_south.fill
        });
        layer.add(centertext_south);
//西
        var centertext_west = new Konva.Text({
            x: config_west.x,
            y: config_west.y,
            text: config_west.text,
            fontSize: config_west.fontSize,
            fontFamily: config_west.fontFamily,
            fill: config_west.fill
        });
        layer.add(centertext_west);
//北
        var centertext_north = new Konva.Text({
            x: config_north.x,
            y: config_north.y,
            text: config_north.text,
            fontSize: config_north.fontSize,
            fontFamily: config_north.fontFamily,
            fill: config_north.fill
        });
        layer.add(centertext_north);

//目标线
        var arrow = new Konva.Arrow({
            x:config_arrow.x,
            y:config_arrow.y,
            points: [config_arrow.x1,config_arrow.y1, config_arrow.x2,config_arrow.y2],
            pointerLength: config_arrow.pointerLength,
            pointerWidth : config_arrow.pointerWidth,
            fill: config_arrow.fill,
            stroke: config_arrow.stroke,
            strokeWidth: config_arrow.strokeWidth
        });
        layer.add(arrow);

//目标线上的圈
        var imageObj = new Image();
        imageObj.onload = function() {

        };
        imageObj.src = 'image/yoda.png';
        var yoda = new Konva.Image({
            x: config_yoda.x,
            y: config_yoda.y,
            width:config_yoda.width,
            height:config_yoda.height,
            image: imageObj,
            draggable: true,
            dragBoundFunc: trajectory
        });
        layer.add(yoda);

//鼠标移动到目标线圈上样式变成小手
        yoda.on('mouseover', function() {
            document.body.style.cursor = 'pointer';
        });
//鼠标离开目标线圈时样式还原
        yoda.on('mouseout', function() {
            document.body.style.cursor = 'default';
        });
        yoda.moveToTop();

// 小圈移动的轨迹
        var circle = new Konva.Circle({
            x: 511,
            y: 292,
            radius: 147,
            stroke: 'black',
            strokeWidth: 1
        });
        layer.add(circle);

//给小球绑定移动的事件
        yoda.on('dragmove',function () {
            arrow.offsetX(arrow_rotate.offsetX);
            arrow.offsetY(arrow_rotate.offsetY);
            arrow.x(arrow_rotate.offsetX);
            arrow.y(arrow_rotate.offsetY);
            arrow.rotate(10);
        });




        stage.add(layer);
    }
*/

}