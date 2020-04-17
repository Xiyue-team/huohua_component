/**
 * 右侧生成的子代 向左拖动保存为亲本类
 */

const interact = require('interactjs');
export class RightInteractDragEvent {
    constructor(id: string) {
      const position = { x: 0, y: 0 };
      interact('#' + id).draggable({
        listeners: {
          start (event: any) {
            event.target.style.zIndex = 10;
          },
          move (event: any) {
            position.x += event.dx;
            position.y += event.dy;

            event.target.style.transform =
              `translate(${position.x}px, ${position.y}px)`;
          },
          end (event: any) {
            position.x = 0;
            position.y = 0;
            event.target.style.transform =
              `translate(${position.x}px, ${position.y}px)`;
            event.target.style.zIndex = 1;
          }
        }
      });
    }
}
