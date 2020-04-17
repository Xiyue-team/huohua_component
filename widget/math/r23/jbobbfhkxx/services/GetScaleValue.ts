
export class GetScaleValue {
  width = window.innerWidth;
  height = window.innerHeight;

  getScale() {
    const scaleValue = (this.width / this.height < 16 / 9 ? this.height / 675 : this.width / 1200) - 0.2;
    let scale = scaleValue;
    if (window.env.browserInfo.os.indexOf('Mac') !== -1) {
      scale -= 0.25;

    }
    return scale;
  }

}
