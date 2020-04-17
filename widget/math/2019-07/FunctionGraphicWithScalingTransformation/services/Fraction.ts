import { Vector2 } from '@babylonjs/core/Legacy/legacy';

export class Fraction {

    gcd(a: number, b: number): number { //欧几里德算法
        return b === 0 ? a : this.gcd(b, a % b);
    }
    appointment(a: number, b: number): Vector2 { // 约分操作
        if (a === 0 || b === 1) {
            return new Vector2(a, b); // 如果分子是0或分母是1就不用约分了
        }
        const e = this.gcd(a, b);
        a /= e;
        b /= e;
        return new Vector2(a, b);
    }
}
