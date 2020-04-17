//贝塞尔曲线的参数配置文件
export class CurveConfig {

    static line1Config = {
        x1: 1 * 10,
        y1: 0.5 * 10,
        z1: 0,
        x2: Math.sqrt(2) / 2 * 10,
        y2: 0,
        z2: 0,
        x3: 0.5 * 10,
        y3: -0.25 * 10,
        z3: 0,
        x4: 0,
        y4: -0.5 * 10,
        z4: 0,
    };

    static line2Config = {
        x1: 2 * 10,
        y1: 0.5 * 10,
        z1: 0,
        x2: (Math.sqrt(2) / 2 + 1) * 10,
        y2: 0,
        z2: 0,
        x3: 3 / 2 * 10,
        y3: -0.25 * 10,
        z3: 0,
        x4: 1 * 10,
        y4: -0.5 * 10,
        z4: 0,
    };

    static line3Config = {
        x1: 3 * 10,
        y1: 0.5 * 10,
        z1: 0,
        x2: (Math.sqrt(2) / 2 + 2) * 10,
        y2: 0,
        z2: 0,
        x3: 5 / 2 * 10,
        y3: -0.25 * 10,
        z3: 0,
        x4: 2 * 10,
        y4: -0.5 * 10,
        z4: 0,
    };

    static line4Config = {
        x1: 0,
        y1: 5,
        z1: 0,
        x2: -10,
        y2: -18,
        z2: 0,
        x3: -22,
        y3: 0,
        z3: 0,
        x4: -30,
        y4: 35,
        z4: 0,
    };

}

//点的配置文件
export class PointConfig {
    static blueColor = '#0199ff';
    static whitePoint = '#ffffff';
}
