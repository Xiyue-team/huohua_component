import { Position } from './Position';
/**
 * 点电荷
 */
export class PointCharge {
    private chargeStrength: number; // 电荷强度;
    private position: Position; // 位置
    private polarity: number; // 1: 正 -1:负
    private id: number; // 编号
    constructor(chargeStrength: number, position: Position, polarity?: number, id?: number) {
        this.chargeStrength = chargeStrength;
        this.position = position;
        this.polarity = polarity;
        this.id = id;
    }

    /**
     * 获取电荷极性
     */
    public getPolarity(): number {
        return this.polarity;
    }
    /**
     * 获取电荷位置
     */
    public getPosition(): Position {
        return this.position;
    }

    /**
     * 设置电荷位置
     */
    public setPosition(position: Position): void {
        this.position = position;
    }

    /**
     * 获取电荷量
     */
    public getChargeStrength(): number {
        return this.chargeStrength;
    }

    /**
     * 电荷ID
     */
    public getId(): number {
        return this.id;
    }
}
