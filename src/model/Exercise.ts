/**
 * 数学习题类
 *@since 2.0
 *@author zhiguo
 *@Date 2018/6/11 16:19
 *
 */
export class Exercise {

    //题干
    question: Questions;

    //解析
    analyticArray: Array<Analytic>;


}


/**
 * 习题问题对象
 */
export class Questions {

    //标题
    title: string;

    //封面图
    coverImage: string;

}

export class Analytic {
    title: string;

    stepArray: Array<Step>;
}

/**
 * 解析步骤
 */
export class Step {

    //封面图
    coverImage: string;

    call: Function;

}


