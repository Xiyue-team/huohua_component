/**
 * 获取狗图片宽度类
 */

export class DogDivWidth {

  // 狗的div宽度
  dogDivWidth = 120;

  // 页面宽度
  pageWidth = window.innerWidth;

  constructor() {
    if (this.pageWidth > 1200 && this.pageWidth < 1300) {
      this.dogDivWidth = 130;
    } else if (this.pageWidth >= 1300 && this.pageWidth < 1400) {
      this.dogDivWidth = 140;
    } else if (this.pageWidth >= 1400  && this.pageWidth < 1500) {
      this.dogDivWidth = 150;
    } else if (this.pageWidth >= 1500  && this.pageWidth < 1600) {
      this.dogDivWidth = 160;
    } else if (this.pageWidth >= 1600  && this.pageWidth < 1700) {
      this.dogDivWidth = 170;
    } else if (this.pageWidth >= 1700  && this.pageWidth < 1800) {
      this.dogDivWidth = 180;
    } else if (this.pageWidth >= 1800  && this.pageWidth < 1900) {
      this.dogDivWidth = 190;
    } else if (this.pageWidth > 1900) {
      this.dogDivWidth = 200;
    }
  }


}
