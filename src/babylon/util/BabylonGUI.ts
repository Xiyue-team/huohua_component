import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export class BabylonGUI {
    public model: any;
    public scene: BABYLON.Scene;

    initGUI() {
        const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('UI');
        //创造面片
        const panel = new GUI.StackPanel();
        panel.width = 0.25;
        panel.rotation = 0.2;
        //点击事件
        panel.onPointerClickObservable.add(() => {

        });
        //离开事件
        panel.onPointerOutObservable.add(() => {

        });
        panel.horizontalAlignment =  GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        //按钮1
        const button1 = GUI.Button.CreateSimpleButton('btn1', 'Click Me');
        button1.width = 0.2;
        button1.height = '40px';
        button1.color = 'white';
        button1.cornerRadius = 20;
        button1.background = 'green';
        button1.onPointerUpObservable.add(function() {
            circle.scaleX += 0.1;
        });
        panel.addControl(button1);

        //圆圈
        const circle = new GUI.Ellipse();
        circle.width = '50px';
        circle.color = 'white';
        circle.thickness = 5;
        circle.height = '50px';
        circle.paddingTop = '2px';
        circle.paddingBottom = '2px';
        panel.addControl(circle);

        //按钮2
        const button2 = GUI.Button.CreateSimpleButton('but2', 'Click Me 2');
        button2.width = 0.2;
        button2.height = '40px';
        button2.color = 'white';
        button2.background = 'green';
        button2.onPointerUpObservable.add(function() {
            circle.scaleX -= 0.1;
        });
        panel.addControl(button2);

        advancedTexture.addControl(panel);


        this.createLabel(advancedTexture);
        this.scene.registerBeforeRender(function() {
            panel.rotation += 0.01;
        });

    }

    createLabel(advancedTexture: GUI.AdvancedDynamicTexture ) {
        const label = new GUI.Rectangle();
        label.background = 'black';
        label.height = '30px';
        label.alpha = 0.5;
        label.width = '100px';
        label.cornerRadius = 20;
        label.thickness = 1;
        label.linkOffsetY = 30;
        advancedTexture.addControl(label);
        label.linkWithMesh(this.model);

        const text = new GUI.TextBlock();
        text.text = '105°';
        label.color = 'white';
        label.addControl(text);
    }

    createLine(advancedTexture: GUI.AdvancedDynamicTexture ) {
        const line = new GUI.Line();
        line.width = '20px';
        advancedTexture.addControl(line);

    }

}