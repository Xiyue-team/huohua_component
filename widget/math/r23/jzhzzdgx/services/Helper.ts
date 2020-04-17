import { ThreeUtil } from '../../../../../src/three/util/ThreeUtil';
export class Helper {
  //创建拖动点的方法
  createDragPoint (x: number, y: number, color?: string) {
    color = !color ?  '#ffffff' : color;
    const scale = 2;
    const point = ThreeUtil.createPoint(5, '#ffffff', x / scale, y / scale, 0.36);
    const smallPoint = ThreeUtil.createPoint(1.5, color, 0 , 0, 1);
    const dragPoint = ThreeUtil.createPoint(10, color, 0 , 0, 0.01);
    point.add(smallPoint);
    point.add(dragPoint);
    return point;
  }

  // 删除线的方法
  removeLine(line: any, scene: any) {
    line.geometry.dispose();
    line.material.dispose();
    scene.remove(line);
  }

  // 获取极大值
  getMaximumValue(whitePoint: any) {
    const maximumValue = [];
    for (let i = 1; i < whitePoint.length - 1; i++) {
      if (whitePoint[i].position.y > whitePoint[i - 1].position.y && whitePoint[i].position.y > whitePoint[i + 1].position.y) {
        maximumValue.push(whitePoint[i].name);
      }
    }
    return maximumValue;
  }

  // 获取极小值
  getMinimumValue(whitePoint: any) {
    const minimumValue = [];
    for (let i = 1; i < whitePoint.length - 1; i++) {
      if (whitePoint[i].position.y < whitePoint[i - 1].position.y && whitePoint[i].position.y < whitePoint[i + 1].position.y) {
        minimumValue.push(whitePoint[i].name);
      }
    }
    return minimumValue;
  }

  // 更新极大值和极小值
  updateMaxMiniumValue(maxValue: any, minValue: any) {
    let textMax = '极大值点: ';
    let textMin = '极小值点: ';

    if (maxValue.length === 0) {
      textMax = '极大值点:  ;  ';
    } else {
      for (let i = 0; i < maxValue.length; i++) {
        if (i === maxValue.length - 1) {
          textMax += maxValue[i] + ';  ';
        } else {
          textMax += maxValue[i] + ',';
        }
      }
    }

    if (minValue.length === 0) {
      textMin = '极小值点:  ;  ';
    } else {
      for (let i = 0; i < minValue.length; i++) {
        if (i === minValue.length - 1) {
          textMin += minValue[i] + '; ';
        } else {
          textMin += minValue[i] + ',';
        }
      }
    }

    return textMax + textMin;
  }

  // 获取最大值
  getMaxValue(whitePoint: any) {
    const maxValueName = [];

    const pointY = [];
    for (let i = 0; i < 7; i++) {
      pointY[i] = {
        'y': whitePoint[i].position.y,
        'name': whitePoint[i].name,
      };
    }
    const maxMinsortObj = pointY.sort(this.compare('y'));

    // 获取最大值 和 最小值 实际请客的
    maxValueName[0] = maxMinsortObj[6].name;
    if (maxMinsortObj[6].y === maxMinsortObj[5].y) {
      maxValueName[1] = maxMinsortObj[5].name;
    }
    if (maxMinsortObj[6].y === maxMinsortObj[4].y) {
      maxValueName[2] = maxMinsortObj[4].name;
    }
    if (maxMinsortObj[6].y === maxMinsortObj[3].y) {
      maxValueName[3] = maxMinsortObj[3].name;
    }
    if (maxMinsortObj[6].y === maxMinsortObj[2].y) {
      maxValueName[4] = maxMinsortObj[2].name;
    }
    if (maxMinsortObj[6].y === maxMinsortObj[1].y) {
      maxValueName[5] = maxMinsortObj[1].name;
    }
    if (maxMinsortObj[6].y === maxMinsortObj[0].y) {
      maxValueName[6] = maxMinsortObj[0].name;
    }

    return maxValueName;
  }

  // 获取最小值
  getMinValue(whitePoint: any) {
    const maxValueName = [];

    const pointY = [];
    for (let i = 0; i < 7; i++) {
      pointY[i] = {
        'y': whitePoint[i].position.y,
        'name': whitePoint[i].name,
      };
    }
    const maxMinsortObj = pointY.sort(this.compare('y'));

    // 获取最大值 和 最小值 实际请客的
    maxValueName[0] = maxMinsortObj[0].name;
    if (maxMinsortObj[0].y === maxMinsortObj[1].y) {
      maxValueName[1] = maxMinsortObj[1].name;
    }
    if (maxMinsortObj[0].y === maxMinsortObj[2].y) {
      maxValueName[2] = maxMinsortObj[2].name;
    }
    if (maxMinsortObj[0].y === maxMinsortObj[3].y) {
      maxValueName[3] = maxMinsortObj[3].name;
    }
    if (maxMinsortObj[0].y === maxMinsortObj[4].y) {
      maxValueName[4] = maxMinsortObj[4].name;
    }
    if (maxMinsortObj[0].y === maxMinsortObj[5].y) {
      maxValueName[5] = maxMinsortObj[5].name;
    }
    if (maxMinsortObj[0].y === maxMinsortObj[6].y) {
      maxValueName[6] = maxMinsortObj[6].name;
    }

    return maxValueName;
  }

  compare(property: any) {
    return function(obj1: any, obj2: any) {
      const value1 = obj1[property];
      const value2 = obj2[property];
      return value1 - value2;     // 升序
    };
  }

  // 更新最大值点
  updateMaxValue(maxValue: any) {
    let textMax = '最大值点: ';
    if (maxValue.length === 7) {
      textMax = '最大值点:  ; ';
    } else {
      for (let i = 0; i < maxValue.length; i++) {
        if (i === maxValue.length - 1) {
          textMax += maxValue[i] + ';';
        } else {
          textMax += maxValue[i] + ',';
        }
      }
    }
    return textMax;
  }

  // 更新最小值点
  updateMinValue(maxValue: any) {
    let textMax = '最小值点: ';
    if (maxValue.length === 7) {
      textMax = '最小值点:  ; ';
    } else {
      for (let i = 0; i < maxValue.length; i++) {
        if (i === maxValue.length - 1) {
          textMax += maxValue[i] + ';';
        } else {
          textMax += maxValue[i] + ',';
        }
      }
    }
    return textMax;
  }
}
