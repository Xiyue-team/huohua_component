/**
 * 左侧父本拖拽 松手回到原位
 * @type {{init}}
 */
const interact = require('interactjs');

export class LeftInteractDragEvent {
    el: any;
    START_X: any;
    START_Y: any;

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
