import { AbstractMesh, Vector3, LinesMesh, FloatArray, VertexBuffer } from '@babylonjs/core/Legacy/legacy';
import { GeoUtils } from '../../../../babylon/Geography/GeoUtils';
import { AdvancedDynamicTexture, Control, Rectangle } from '@babylonjs/gui';
import { FastCreater } from '../../../../babylon/GUI/FastCreater';

export class Utils {

    static GetPosArray(apost: Vector3, bpost: Vector3, r: number, offset: Vector3 = Vector3.Zero()): Vector3[] {
        const apos = GeoUtils.CartesianToGeographic(apost);
        const bpos = GeoUtils.CartesianToGeographic(bpost);
        apos.z = bpos.z = r;
        const temp = apos.subtract(bpos).scale(1 / 180);
        const vertices = [];
        for (let i = 0; i < 180; i++) {
            const GeographicPos = bpos.add(temp.scale(i));
            vertices.push(GeoUtils.GeographicToCartesian(GeographicPos.x, GeographicPos.y).scale(GeographicPos.z).add(offset));
        }
        vertices.push(GeoUtils.GeographicToCartesian(apos.x, apos.y).scale(apos.z).add(offset));
        return vertices;
    }

    /**
     * 排序位置
     * @param poses 
     * @param temp 
     */
    static SortPos(poses: Vector3[], temp: Vector3): Vector3 {
        for (let i = 0; i < poses.length; i++) {
            const dis1 = Vector3.Distance(temp, poses[i]);
            if (dis1 <= 0.1) {
                return poses[i];
            }
        }
        return Vector3.Zero();
    }

    /**
     * 设置UI可见性
     * @param control 
     * @param data 
     */
    static SetGUIVisible(control: Control[], data: boolean) {
        for (let i = 0; i < control.length; i++) {
            control[i].isVisible = data;
        }
    }

    /**
     * 设置模型可见性
     * @param line 
     * @param data 
     */
    static SetMeshVisible(line: AbstractMesh[], data: boolean) {
        for (let i = 0; i < line.length; i++) {
            line[i].isVisible = data;
        }
    }

    /**
     * 设置模型是否可拾取
     * @param line 
     * @param data 
     */
    static SetMeshPickable(line: AbstractMesh[], data: boolean) {
        for (let i = 0; i < line.length; i++) {
            line[i].isPickable = data;
        }
    }

    /**
     * 更新模型顶点
     * @param line 
     * @param data 
     */
    static UpdateMeshVertData(line: LinesMesh, data: FloatArray) {
        line.updateVerticesData(VertexBuffer.PositionKind, data);
        line.enableEdgesRendering();
    }

    /**
     * 创建标签
     * @param advancedTexture 
     * @param mesh 
     * @param text 
     * @param options 
     */
    static CreateLabel(advancedTexture: AdvancedDynamicTexture, mesh: AbstractMesh, text: string,
        options: {
            height: number; width: number; color: string;
            fontSize: string | number; fontFamily: string; fontStyle: string
        }): Rectangle {
        const label = new Rectangle(text);
        label.alpha = 1;
        label.height = options.height + 'px';
        label.background = '#66ccff';
        label.cornerRadius = 5;
        label.hoverCursor = 'pointer';
        label.isPointerBlocker = true;
        label.thickness = 0;
        label.width = options.width + 'px';
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);
        const text1 = FastCreater.TextBlock(text, {
            color: options.color,
            fontSize: options.fontSize, fontFamily: options.fontFamily, fontStyle: options.fontStyle
        },
            Control.HORIZONTAL_ALIGNMENT_CENTER, Control.VERTICAL_ALIGNMENT_CENTER);
        label.addControl(text1);
        return label;
    }

    /**
     * 创建时间标签
     * @param advancedTexture 
     * @param mesh 
     * @param text 
     * @param options 
     */
    static CreateTimerLabel(advancedTexture: AdvancedDynamicTexture, mesh: AbstractMesh, text: string,
        options: {
            height: number; width: number; color: string;
            fontSize: string | number; fontFamily: string; fontStyle: string
        }): Rectangle {
        const label = new Rectangle(text);
        label.alpha = 1;
        label.height = options.height + 'px';
        label.background = '#FFC000';
        label.cornerRadius = 5;
        label.thickness = 0;
        label.width = options.width + 'px';
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);
        label.linkOffsetY = -30;
        const text1 = FastCreater.TextBlock(text, {
            color: options.color,
            fontSize: options.fontSize,
            fontFamily: options.fontFamily,
            fontStyle: options.fontStyle
        },
            Control.HORIZONTAL_ALIGNMENT_CENTER, Control.VERTICAL_ALIGNMENT_CENTER);
        label.addControl(text1);
        return label;
    }


    /**
     * 创建按钮
     * @param advancedTexture 
     * @param mesh 
     * @param text 
     * @param options 
     */
    static CreateGoneLabel(advancedTexture: AdvancedDynamicTexture, mesh: AbstractMesh, text: string,
        options: { height: number; width: number; color: string;
            fontSize: string | number; fontFamily: string; fontStyle: string }): Rectangle {
        const label = new Rectangle(text);
        label.alpha = 1;
        label.height = options.height + 'px';
        label.background = '#FFC000';
        label.cornerRadius = 5;
        label.hoverCursor = 'pointer';
        label.isPointerBlocker = true;
        label.thickness = 0;
        label.width = options.width + 'px';
        advancedTexture.addControl(label);
        label.linkWithMesh(mesh);
        const text1 = FastCreater.TextBlock(text, {
            color: options.color,
            fontSize: options.fontSize,
            fontFamily: options.fontFamily,
            fontStyle: options.fontStyle
        }, Control.HORIZONTAL_ALIGNMENT_CENTER, Control.VERTICAL_ALIGNMENT_CENTER);
        label.addControl(text1);
        return label;
    }
}
