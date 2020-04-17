/**
 * 遗传图谱生成类
 *
 */
import { jsPlumb } from 'jsplumb';
import { DogDivWidth } from './DogDivWidth';

export class GeneticMap {


  dogWidth = (new DogDivWidth()).dogDivWidth;
  leftNumber = 0;
  topNumber = -1;

  // 狗的代数
  generation = 0;

  // 用于保存每一代狗
  generationDog: any = [];


  constructor() {}

  /**
   * 生成遗传图谱
   * @param leftParent  杂交界面左侧的父本
   */
  createGeneticMap (leftParent: any) {
    const geneticMap = document.querySelector('.geneticMap');

    const singleDog: any = [];

    // 添加子代
    for (let i = 0; i < leftParent.length; i++) {

      // 判断代数是否变换  变换之后 代数加1 top 加1
      if (leftParent[i].generation !== this.generation) {
        this.generation += 1;
        this.topNumber += 1;
        this.leftNumber = 0;
        this.generationDog[this.generation - 1] = [];

        // 创建一个div 用于保存每一代狗  然后将div 左右居中
        singleDog[this.generation - 1] = document.createElement('div');
        singleDog[this.generation - 1].setAttribute('class', 'singleDog');
        singleDog[this.generation - 1].setAttribute('id', 'singleDog' + (this.topNumber + 1));
        singleDog[this.generation - 1].style.top = (this.dogWidth * 2 * this.topNumber + 8 * (this.topNumber)) + 'px';
        geneticMap.appendChild(singleDog[this.generation - 1]);
      }


      singleDog[this.generation - 1].style.width = (this.dogWidth * (this.leftNumber + 1) + 8 * (this.leftNumber)) + 'px';
      singleDog[this.generation - 1].style.height = this.dogWidth + 'px';

      // 添加每一代的狗
      const childDog = this.getParentDog(leftParent[i].name).cloneNode(true);
      (childDog as any).id = singleDog[this.generation - 1].id + '_' + this.leftNumber;
      leftParent[i].idName = singleDog[this.generation - 1].id + '_' + this.leftNumber;
      singleDog[this.generation - 1].appendChild(childDog);
      (childDog as any).style.left = (this.dogWidth * this.leftNumber + 8 * (this.leftNumber)) + 'px';
      (childDog as any).style.top = 0 + 'px';

      this.leftNumber += 1;

      this.generationDog[this.generation - 1].push(leftParent[i]);
    }

    /*
     * 下面添加父本
     * 1 首先判断父本是否是此代已经拥有的
     * 2 已经拥有的不添加 只保留id
     * 3 未拥有的首先添加 再保留id
     */
    setTimeout(() => {
      // 判断 pf pm  是否重复
      let pfid = false;
      let pmid = false;

      // 声明一个数组 保存每一代的父本 母本
      const generationParentDog = [];
      for (let i = 0; i < this.generationDog.length - 1; i++) {
        generationParentDog[i] = [];

        pfid = false;
        pmid = false;

        for (let j = 0; j < this.generationDog[i].length; j++) {
          // 判断是个重复
          if (this.generationDog[i][j].name === this.generationDog[i + 1][0].pfId) {
            pfid = true;
            generationParentDog[i].push(this.generationDog[i][j].idName);
          } else if (this.generationDog[i][j].name === this.generationDog[i + 1][0].pmId) {
            pmid = true;
            generationParentDog[i].push(this.generationDog[i][j].idName);
          }
        }

        // 判断当前代数不重复 添加
        if (!pfid) {
          const pfDog = this.getParentDog(this.generationDog[i + 1][0].pfId).cloneNode(true);
          (pfDog as any).id = singleDog[i].id + '_' + singleDog[i].childNodes.length;
          (pfDog as any).style.left = (singleDog[i].offsetWidth + 8) + 'px';
          (pfDog as any).style.top = 0 + 'px';
          singleDog[i].appendChild(pfDog);
          singleDog[i].style.width = (singleDog[i].offsetWidth + 8 + this.dogWidth) + 'px';
          generationParentDog[i].push((pfDog as any).id);
        }

        if (!pmid) {
          const pmDog = this.getParentDog(this.generationDog[i + 1][0].pmId).cloneNode(true);
          (pmDog as any).id = singleDog[i].id + '_' + singleDog[i].childNodes.length;
          (pmDog as any).style.left = (singleDog[i].offsetWidth + 8) + 'px';
          (pmDog as any).style.top = 0 + 'px';
          singleDog[i].appendChild(pmDog);
          singleDog[i].style.width = (singleDog[i].offsetWidth + 8 + this.dogWidth) + 'px';
          generationParentDog[i].push((pmDog as any).id);
        }
      }

      // 添加线
      this.addLine(generationParentDog, singleDog);
    }, 100);
  }

  // 获取父本狗元素
  getParentDog(id: string) {
    return document.getElementById(id);
  }

  /**
   * @param generationParentDog 父本狗
   * @param singleDog 一代狗们
   * @returns {Promise<void>}
   */
  async addLine(generationParentDog: any, singleDog: any) {
    await this.addParentDogLine(generationParentDog);
    await this.addSingleDogLine(singleDog);
    await this.addParentDogSingleDogLine(generationParentDog, singleDog);
  }

  // 添加父本狗之间的连线
  async addParentDogLine(generationParentDog: any) {
    for (let i = 0; i < generationParentDog.length; i++) {
      const plumbIns = await jsPlumb.getInstance();
      await plumbIns.ready(() => {
        const common = {
          endpoint: 'Dot',
          connector: ['Flowchart'],
          anchor: ['BottomCenter', 'BottomCenter'],
          paintStyle: { stroke: '#6B92F2', strokeWidth: 2 },
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        };

        plumbIns.connect({
          source: generationParentDog[i][0],
          target: generationParentDog[i][1],
        } as any, common);
      });
    }
  }

  // 添加一代狗之间的连线
  async addSingleDogLine(singleDog: any) {
    for (let i = 1; i < singleDog.length; i++) {
      const plumbIns = await jsPlumb.getInstance();
      await plumbIns.ready(() => {
        const common = {
          endpoint: 'Dot',
          connector: ['Flowchart'],
          anchor: ['Top', 'Top'],
          paintStyle: { stroke: '#6B92F2', strokeWidth: 2 },
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        };

        const line = [];
        for (let j = 0; j < singleDog[i].childNodes.length; j++) {
          line[j] = plumbIns.connect({
            source: document.getElementById(singleDog[i].childNodes[0].id),
            target: document.getElementById(singleDog[i].childNodes[j].id),
          } as any, common);
        }
      });
    }
  }

  // 添加父本狗和 子代狗之间的连线
  async addParentDogSingleDogLine(generationParentDog: any, singleDog: any) {
    const point: any = [];
    const point2: any = [];
    const point3: any = [];
    for (let i = 0; i < generationParentDog.length; i++) {
      const plumbIns = await jsPlumb.getInstance();
      await plumbIns.ready(() => {

        let pfIndex = 0;
        let pmIndex = 0;
        // 判断狗div的个数
        let length = 0;
        for (let j = 0; j < singleDog[i].childNodes.length; j++) {
          if (singleDog[i].childNodes[j].tagName.toLowerCase() === 'div') {
            if (singleDog[i].childNodes[j].className.indexOf('dogWH') !== -1) {
              length += 1;
            }
          }

          if (generationParentDog[i][0] === singleDog[i].childNodes[j].id) {
            pfIndex = j + 1;
          }
          if (generationParentDog[i][1] === singleDog[i].childNodes[j].id) {
            pmIndex = j + 1;
          }
        }

        // 判断线的中心点
        let left = (Math.floor((pmIndex - pfIndex) / 2)  + pfIndex) / length;
        if ((pmIndex - pfIndex) % 2 === 0) {
          left = (Math.floor((pmIndex - pfIndex) / 2)  + pfIndex - 0.5) / length;
        }

        point[i] = plumbIns.addEndpoint(singleDog[i].id, {
          anchors: [[left, 1.26, 0, 0]],
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        } as any);

        point2[i] = plumbIns.addEndpoint(singleDog[i + 1].id, {
          anchors: [[0.5, -0.5, 0, 0]],
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        } as any);

        point3[i] = plumbIns.addEndpoint(singleDog[i + 1].id, {
          anchors: [[0.5, -0.26, 0, 0]],
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        } as any);

        plumbIns.connect({
          source: point[i],
          target: point2[i],
          endpoint: 'Dot',
          connector: ['Flowchart', {stub: 0, gap: 0, midpoint: 0}],
          anchor: ['Bottom', 'Top'],
          paintStyle: { stroke: '#6B92F2', strokeWidth: 2 },
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        } as any);

        plumbIns.connect({
          source: point2[i],
          target: point3[i],
          endpoint: 'Dot',
          connector: ['Straight', {stub: 0, gap: -2}],
          anchor: ['Bottom', 'Top'],
          paintStyle: { stroke: '#6B92F2', strokeWidth: 2 },
          endpointStyle: { fill: '', outlineStroke: '', outlineWidth: 2 },
          maxConnections: -1
        } as any);

      });
    }
  }
}

