/**
 * 加载框接口类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/10 14:58
 */
export interface LoadingInterface {


    /**
     *显示等待框
     */
    show(): void;

    /**
     * 隐藏等待框
     */
    hide(): void;

    /**
     * 初始化等待框
     * (需要做防重复初始化判断)
     */
    init(): void;

    /**
     * 销毁等待框
     */
    destory(): void;

    /**
     * 是否已经显示
     * @returns {boolean}
     */
    isShown(): boolean;
}
