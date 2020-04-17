import JXG from 'jsxgraph';

/* 
  1. 左侧栏消失和重现的时候会自动适应
  2. 可以自动定位到原点元素（原点一直处于画布的中间位置）
  3. 可以自定义坐标系
  4. 可以自定义导航按钮（放大、缩小）
  5. 可以移除和删除元素
  6. 只显示坐标但是不现实网格
*/
/*
  1. 所有的私有变量和私有函数都以下划线开头，公开属性则正常命名即可
  2. 
*/
export class BoardView {
  private _board : JXG.Board;
  private _showAxis: Boolean;
  private _boundingBox: Array<Number>;
  private _elementID: String;
  private _width: Number;
  private _height: Number;

  constructor(elementID: String, boundingBox: Array<Number>, showAxis: Boolean, width: Number, height: Number) {
    this._width = width;
    this._height = height;
    this._boundingBox = boundingBox;
    this._elementID = elementID;
    this._showAxis = showAxis;
    this._initBoard();
  }

  private _initBoard(): void {
    this._board = JXG.JSXGraph.initBoard(this._elementID, {
      boundingbox: this._boundingBox,
      axis: this._showAxis,
      keepaspectratio: true,
      showCopyright:false,
      showNavigation:false
    });
  }


  reset() : void{

  }


  resize(width: Number, height: Number) : void {
    this._width = width;
    this._height = height;
    // TODO 更新页面大小并且原点位于页面的中心处
    // 重新绘制画板
    this._board.resizeContainer(this._width,this._height);
    
  }


}