import { Mesh, Node, Scene, Vector3 } from '@babylonjs/core/Legacy/legacy';
import * as GUI from '@babylonjs/gui';
import { LabelUtils } from '../../../../babylon/GUI/LabelUtils';


/**
 * 标签系统
 */
export class LabelSystem extends Mesh {
    isMob: any = /iPad|iPhone|Android/g.test(navigator.userAgent);
    tiptext: GUI.TextBlock; //提示文本
    label: GUI.Rectangle; //提示框
    dot: GUI.Control; //标注点UI
    private advancedTexture: GUI.AdvancedDynamicTexture;
    Container3d = document.getElementById('Container3d');

    constructor(name: string, advancedTexture: GUI.AdvancedDynamicTexture, scene: Scene,
        parent?: Node, source?: Mesh, doNotCloneChildren?: boolean, clonePhysicsImpostor?: boolean) {
        super(name, scene, parent, source, doNotCloneChildren, clonePhysicsImpostor);
        this.advancedTexture = advancedTexture;
    }

    init(dot: string): LabelSystem {
        const ImageLabelOption = { height: '20px', width: '20px', color: '#FFFFFF' };
        if (this.isMob && !(window as any)['env'].browserInfo.isSmallDevice) {
            ImageLabelOption.height = ImageLabelOption.width = '40px';
        }
        this.dot = LabelUtils.CreateImageLabel(this.advancedTexture, this, dot, ImageLabelOption);
        return this;
    }

    setPos(pos: Vector3): LabelSystem {
        this.position = pos;
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
    createLabel(linkOffsetX: number, linkOffsetY: number): LabelSystem {
        this.label = new GUI.Rectangle('label');
        this.label.alpha = 1;
        this.label.cornerRadius = 0;
        this.label.thickness = 0;
        this.label.linkOffsetY = linkOffsetY;
        this.label.linkOffsetX = linkOffsetX;
        this.label.adaptWidthToChildren = true;
        this.label.adaptHeightToChildren = true;
        this.advancedTexture.addControl(this.label);
        this.label.linkWithMesh(this);
        this.tiptext = new GUI.TextBlock();
        this.tiptext.text = this.name;
        this.resize();
        window.addEventListener('resize', () => {
            this.resize();
        });
        this.tiptext.color = '#222222';
        this.tiptext.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.tiptext.textHorizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
        this.label.addControl(this.tiptext);
        return this;
    }

    resize() {
        this.Container3d = document.getElementById('Container3d');
        if (this.isMob) {
            this.tiptext.width = '140px';
            this.tiptext.height = '60px';
            this.dot.height = this.dot.width = '40px';
        } else {
            if ((this.Container3d.clientHeight > 600 && this.Container3d.clientHeight < 800) ||
                (this.Container3d.clientWidth > 949 && this.Container3d.clientWidth < 1500)) {
                this.tiptext.width = '70px';
                this.tiptext.height = '30px';
                this.tiptext.fontSize = '16px';
                this.dot.height = this.dot.width = '18px';
            } else if ((this.Container3d.clientHeight > 449 && this.Container3d.clientHeight < 599) ||
                (this.Container3d.clientWidth > 699 && this.Container3d.clientWidth < 949)) {
                this.tiptext.width = '70px';
                this.tiptext.height = '30px';
                this.tiptext.fontSize = '12px';
                this.dot.height = this.dot.width = '16px';
            } else if (this.Container3d.clientHeight <= 449 || this.Container3d.clientWidth <= 699) {
                this.tiptext.width = '70px';
                this.tiptext.height = '30px';
                this.tiptext.fontSize = '8px';
                this.dot.height = this.dot.width = '12px';
            }
        }
    }

    /**
     *  设置可见性
     * @param isVisible
     */
    setLabelVisible(isVisible: boolean): LabelSystem {
        this.dot.isVisible = this.label.isVisible = isVisible;
        return this;
    }

}
