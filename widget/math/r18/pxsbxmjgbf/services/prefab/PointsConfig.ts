/**
 *平行四边形的配置点类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/11/26 14:14
 *
 */

export class PointsConfig {

    static points1(blockSize: number): Array<number> {
        const points = new Array<number>();
        points.push( 4  * blockSize, 0);
        points.push( 0             , 7 * blockSize);
        points.push( 12 * blockSize, 7 * blockSize);
        points.push( 16 * blockSize, 0);
        return points;
    }

    static points2(blockSize: number): Array<number> {
        const points = new Array<number>();
        points.push( 3  * blockSize, 0);
        points.push( 0             , 3 * blockSize);
        points.push( 11 * blockSize, 3 * blockSize);
        points.push( 14 * blockSize, 0);
        return points;
    }

    static points3(blockSize: number): Array<number> {
        const points = new Array<number>();
        points.push( 0             , 0);
        points.push( 9  * blockSize, 10 * blockSize);
        points.push( 12 * blockSize, 10 * blockSize);
        points.push( 3  * blockSize, 0);
        return points;
    }

    static points4(blockSize: number): Array<number> {
        const points = new Array<number>();
        points.push( 8  * blockSize, 0);
        points.push(              0, 7 * blockSize);
        points.push( 12 * blockSize, 7 * blockSize);
        points.push( 20  * blockSize, 0);
        return points;
    }
}
