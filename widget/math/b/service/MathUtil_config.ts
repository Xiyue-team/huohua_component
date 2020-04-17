export class MathUtil_config{

    /*
    * 函数中心点X坐标
    * 函数中心点Y坐标
    * 函数区间大小
    * 函数起始点X轴坐标
    * 数据放大倍数
    * */
    private cos_centerX:number=250;
    private cos_centerY:number=250;
    private cos_range:number=20;
    private cos_beginIndex:number=-10;
    private cos_multiple:number=30;

    private sin_centerX:number=250;
    private sin_centerY:number=250;
    private sin_range:number=20;
    private sin_beginIndex:number=-10;
    private sin_multiple:number=30;

    private stroke:string="red";
    private strokeWidth:number=1;
    //对外提供一个修改参数的方法
    setCosSize(centerX:number,centerY:number,range:number,beginIndex:number,multiple:number){
        this.cos_centerX=centerX;
        this.cos_centerY=centerY;
        this.cos_range=range;
        this.cos_beginIndex=beginIndex;
        this.cos_multiple=multiple;
    }

    setSinSize(centerX:number,centerY:number,range:number,beginIndex:number,multiple:number){
        this.sin_centerX=centerX;
        this.sin_centerY=centerY;
        this.sin_range=range;
        this.sin_beginIndex=beginIndex;
        this.sin_multiple=multiple;
    }
    setStyle(stroke:string,strokeWidth:number){
        this.stroke=stroke;
        this.strokeWidth=strokeWidth;

    }
    //对外提供一个获取数据的方法
    getCosSize_cos_centerX(){
        return this.cos_centerX;
    }
    getCosSize_cos_centerY(){
        return this.cos_centerY;
    }
    getCosSize_cos_range(){
        return this.cos_range;
    }
    getCosSize_cos_beginIndex(){
        return this.cos_beginIndex;
    }
    getCosSize_cos_multiple(){
        return this.cos_multiple;
    }


    getSinSize_sin_centerX(){
        return this.sin_centerX;
    }
    getSinSize_sin_centerY(){
        return this.sin_centerY;
    }
    getSinSize_sin_range(){
        return this.sin_range;
    }
    getSinSize_sin_beginIndex(){
        return this.sin_beginIndex;
    }
    getSinSize_sin_multiple() {
        return this.sin_multiple;
    }
    getstroke(){
        return this.stroke;
    }
    getstrokeWidth(){
        return this.strokeWidth;
    }
}