/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/5/10 14:53
 */
import {LoadingInterface} from './LoadingInterface';
import {CommonLoading} from './CommonLoading';

export class Loading {

    constructor() {

    }

    initLoading(): LoadingInterface {
        return new CommonLoading();
    }
    
}
