import * as Konva from 'konva';

export class Util {
  createText(text: string, fontSize: number, config: any) {

    const textGroup = new Konva.Group(config);

    for (let index = 0, jk = text.length; index < jk; index++) {
      if (/^[a-zA-Z]+$/.test(text[index])) {
        const wenzi = this.createNewRomanText({
          x: this.getTextX(textGroup),
          text: text[index],
          fontSize: fontSize
        });
        textGroup.add(wenzi);
      } else if ( text[index].replace(/[^0-9]/ig, '')) {

        const wenzi = this.createNumberText({
          x: this.getTextX(textGroup),
          text: text[index],
          fontSize: fontSize
        });
        textGroup.add(wenzi);

      } else {
        const wenzi = this.createPlainText({
          x: this.getTextX(textGroup),
          text: text[index],
          fontSize: fontSize
        });
        textGroup.add(wenzi);
      }
    }

    return textGroup;
  }

  // 计算文字的x坐标
  private getTextX(textGroup: any) {
    let textX = 0;
    if (!textGroup.getChildren()[0]) {
      textX = 0;
    } else {
      for (let i = 0; i < textGroup.getChildren().length; i++) {
        textX += textGroup.getChildren()[i].width();
      }
    }
    return textX;
  }

  private createPlainText(config: any) {
    const text = new Konva.Text({
      x: !config.x ? 0 : config.x,
      y: 0,
      text: !config.text ? '' : config.text,
      fontSize: !config.fontSize ? 16 : config.fontSize,
      fill: '#ffffff',
    });

    return text;
  }

  private createNewRomanText(config: any) {
    const text = new Konva.Text({
      x: !config.x ? 0 : config.x,
      y: 0,
      text: !config.text ? '' : config.text,
      fontSize: !config.fontSize ? 16 : config.fontSize,
      fill: '#ffffff',
      fontFamily: 'Times New Roman',
      fontStyle: 'italic',
    });

    return text;
  }

  private createNumberText(config: any) {
    const text = new Konva.Text({
      x: !config.x ? 0 : config.x,
      y: (!config.fontSize ? 16 : config.fontSize) * 0.5,
      text: !config.text ? '' : config.text,
      fontSize: (!config.fontSize ? 16 : config.fontSize) * 0.7,
      fill: '#ffffff',
    });

    return text;
  }
}
