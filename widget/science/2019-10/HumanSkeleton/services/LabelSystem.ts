import { Mesh, Node, Scene, Vector3, TransformNode } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';


/**
 * 标签系统
 */
export class LabelSystem extends Mesh {
    isMob: any = /iPad|iPhone|Android/g.test(navigator.userAgent);
    tip: Mesh;
    line: GUI.MultiLine;
    tiptext: GUI.TextBlock; //提示文本
    label: GUI.Rectangle; //提示框
    dot: GUI.Control; //标注点UI
    edgesWidth: number;
    private advancedTexture: GUI.AdvancedDynamicTexture;

    constructor(name: string, advancedTexture: GUI.AdvancedDynamicTexture, edgesWidth: number, scene: Scene,
        parent?: Node, source?: Mesh, doNotCloneChildren?: boolean, clonePhysicsImpostor?: boolean) {
        super(name, scene, parent, source, doNotCloneChildren, clonePhysicsImpostor);
        this.advancedTexture = advancedTexture;
        this.edgesWidth = edgesWidth;
    }

    init(dot: string): LabelSystem {
        this.tip = new Mesh('t');
        const ImageLabelOption = { height: '10px', width: '10px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '20px';
        }
        this.dot = LabelUtils.CreateImageLabel(this.advancedTexture, this, dot, ImageLabelOption);
        this.dot.zIndex = 999;
        this.line = new GUI.MultiLine();
        this.line.linkOffsetX = '10px';
        this.line.zIndex = -1;

        this.label = new GUI.Rectangle('label');
        this.tiptext = new GUI.TextBlock();
        this.createLabel(this.label, this.tiptext, this.line, this.tip, this);
        return this;
    }

    /**
     *  创建标签
     * @param label
     * @param tiptext 
     * @param line 
     * @param tip 
     * @param tipmesh 
     */
    createLabel(label: GUI.Rectangle, tiptext: GUI.TextBlock, line: GUI.MultiLine, tip: Mesh, tipmesh: Mesh): LabelSystem {
        label.alpha = 1;
        label.cornerRadius = 0;
        label.thickness = 0;
        label.linkOffsetY = '0';
        label.linkOffsetX = '60px';
        label.adaptWidthToChildren = true;
        label.adaptHeightToChildren = true;
        this.advancedTexture.addControl(label);

        label.linkWithMesh(tip);
        tiptext.text = '';
        tiptext.width = '100px';
        tiptext.height = '30px';
        let fontsize = '24px';
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            tiptext.width = '200px';
            tiptext.height = '60px';
            fontsize = '36px';
        }
        tiptext.fontSize = fontsize;
        tiptext.color = '#ffffff';
        tiptext.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        tiptext.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        label.addControl(tiptext);

        line.color = '#ffffff';
        line.width = this.edgesWidth;
        line.lineWidth = this.edgesWidth;
        line.add(tip);
        line.add(tipmesh);
        this.advancedTexture.addControl(line);
        return this;
    }

    /**
     *  设置标注位
     * @param root
     */
    setRootPos(root: Vector3): LabelSystem {
        this.position = root;
        const matrix = this.getWorldMatrix().getTranslation();
        this.label.linkOffsetX = matrix.x > 0 ? '60px' : '-60px';
        return this;
    }

    /**
     *  设置标签位
     * @param root
     */
    setPos(tipPos: Vector3): LabelSystem {
        this.tip.position = tipPos;
        return this;
    }

    /**
     *  设置父组件
     * @param p
     */
    setP(p: TransformNode): LabelSystem {
        this.setParent(p);
        return this;
    }

    /**
     *  设置文本
     * @param txt
     */
    setText(txt: string): LabelSystem {
        this.tiptext.text = txt;
        return this;
    }

    /**
     *  设置可见性
     * @param isVisible
     */
    setLabelVisible(isVisible: boolean): LabelSystem {
        this.dot.isVisible = this.line.isVisible = this.label.isVisible = isVisible;
        return this;
    }

}
