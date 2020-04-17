
 

/** 硬件信息 */
export class HardwareInfo {

    /** 显存 */
    vram:  number;
    /* 显卡型号 */
    vmodel:  string;
    /* 显卡厂商 */
    vendor:  string;
    /** 独立gpu*/
    discreteGpu:  boolean;
    /** 显卡数量*/
    graphicsCount:  number;

    /** cpu线程数 */
    cores:  number;
    /** cpu型号 */
    brand:  string;
    /** 频率 */
    speed:  number;
    /** 最大频率 */
    speedmax:  number;

    /** 内存 单位mb */
    memTotal:  number;
    memUsed:  number;
    memFree:  number;

}

export class MobileHardwareInfo {
    cpu: string;
    OS:  string;
    OSVersion: string;
    totalMemory: number;
    availMemory: number;
}
