import { Vector3 } from '@babylonjs/core/Legacy/legacy';

export class Data {

    static massage = [
        {
            pos: [new Vector3(14.567, -4.8, 0), new Vector3(-0.142, 14.372, 0),
            new Vector3(-13.653, -9.074, 0), new Vector3(14.567, -4.8, 0)],
            point: {
                lineNumber: 0,
                triangularNumber: 1,
                angle: '1×180°',
            },
            side: {
                lineNumber: 1,
                triangularNumber: 2,
                angle: '2×180°−180°',
            },
            inner: {
                lineNumber: 3,
                triangularNumber: 3,
                angle: '3×180°−360°',
            }
        },
        {
            pos: [new Vector3(-2.397, 10.5, 0), new Vector3(-15.908, -2.872, 0), new Vector3(0.934, -13.459, 0),
            new Vector3(16.31, 0.75, 0), new Vector3(-2.397, 10.5, 0)],
            point: {
                lineNumber: 1,
                triangularNumber: 2,
                angle: '2×180°',
            },
            side: {
                lineNumber: 2,
                triangularNumber: 3,
                angle: '3×180°−180°',
            },
            inner: {
                lineNumber: 4,
                triangularNumber: 4,
                angle: '4×180°−360°',
            }
        }
        , {
            pos: [new Vector3(-1.218, 13.705, 0), new Vector3(-15.651, 0.561, 0),
            new Vector3(-4.652, -14.074, 0), new Vector3(12.363, -7.348, 0), new Vector3(15.49, 5.106, 0), new Vector3(-1.218, 13.705, 0)],
            point: {
                lineNumber: 2,
                triangularNumber: 3,
                angle: '3×180°',
            },
            side: {
                lineNumber: 3,
                triangularNumber: 4,
                angle: '4×180°−180°',
            },
            inner: {
                lineNumber: 5,
                triangularNumber: 5,
                angle: '5×180°−360°',
            }
        }
        , {
            pos: [new Vector3(-14.216, 4.354, 0), new Vector3(-8.496, -9.82, 0), new Vector3(4.06, -10.731, 0),
            new Vector3(13.542, -6.016, 0), new Vector3(12.722, 7.618, 0), new Vector3(-0.501, 12.527, 0),
            new Vector3(-14.216, 4.354, 0)],
            point: {
                lineNumber: 3,
                triangularNumber: 4,
                angle: '4×180°',
            },
            side: {
                lineNumber: 4,
                triangularNumber: 5,
                angle: '5×180°−180°',
            },
            inner: {
                lineNumber: 6,
                triangularNumber: 6,
                angle: '6×180°−360°',
            }
        }
        , {
            pos: [new Vector3(-5.677, 12.732, 0), new Vector3(-13.345, 3.227, 0), new Vector3(-8.496, -9.82, 0),
            new Vector3(3.804, -11.295, 0),
            new Vector3(13.542, -6.016, 0), new Vector3(14.311, 5.158, 0), new Vector3(6.213, 12.475, 0),
            new Vector3(-5.677, 12.732, 0)],
            point: {
                lineNumber: 4,
                triangularNumber: 5,
                angle: '5×180°',
            },
            side: {
                lineNumber: 5,
                triangularNumber: 6,
                angle: '6×180°−180°',
            },
            inner: {
                lineNumber: 7,
                triangularNumber: 7,
                angle: '7×180°−360°',
            }
        }];
}
