/* global THREE:true */
/* global THREE_Text:true */
let vec3 = (x, y, z) => {
    return new THREE.Vector3(x, y, z);
};
let radian = (v) => {
    return v / 180 * Math.PI;
}
let angle = (v) => {
    return v / Math.PI * 180;
}
let resolution = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    if (width < height) {
        [width, height] = [height, width];
    }
    return new THREE.Vector2(width, height);
}
let createLineMesh = (vertices, {
    color = '#000',
    style = 3,
    width = 2,
    opacity = 1
} = {}) => {
    let lineMesh, matLine;
    let geometry = new THREE.LineGeometry();
    geometry.setPositions(vertices);
    if (style === 2) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution(),
            dashed: false,
            dashSize: 5,
            gapSize: 5,
            dashScale: 1
        });
        matLine.defines.USE_DASH = ''
    } else if (style === 3) {
        matLine = new THREE.LineMaterial({
            color: color,
            linewidth: width,
            resolution: resolution(),
            opacity,
            transparent: true
        });
    }
    lineMesh = new THREE.Line2(geometry, matLine);
    // lineMesh.depthTest = false;
    lineMesh.computeLineDistances();
    return lineMesh;
};
let createStraightLine = (arr, {
    style = 3,
    width = 1,
    color = '#000',
    opacity = 1
} = {}) => {
    let vertices = [];
    for (let value of arr) {
        vertices.push(...value);
    }
    let line = createLineMesh(vertices, {color, style, width});
    return line;
}
// 画圆线
let drawCircleLine = (radius, {
    style = 3,
    color = '#000',
    line_width = 2,
    isLay = false,
    position = [0, 0, 0]
} = {}) => {
    let x, y, vertices = [];
    for (let i = 0; i < 361; i += 6) {
        x = radius * Math.cos(radian(i));
        y = radius * Math.sin(radian(i));
        if (isLay) {
            vertices.push(x, 0, y);
        } else {
            vertices.push(x, y, 0);
        }
    }
    let line = createLineMesh(vertices, '#000', style, line_width);
    line.position.set(...position);
    return line;
}
let preloadImage = (path) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => resolve(path);
        image.onerror = reject;
        image.src = path;
    })
}
let createTriangleFace = (vertices, color) => {
    let material = new THREE.MeshBasicMaterial({
        color: color
    });
    let geom = new THREE.Geometry();
    geom.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(2, 1, 0));
    geom.vertices = vertices;
    let mesh = new THREE.Mesh(geom, material);
    return mesh;
};
let createText = (texts, x, y, z, {
    color = '#000',
    size = 48,
    sub = false,
    sqrt = false,
    isItalic = true
} = {}) => {
    let SpriteText2D = THREE_Text.SpriteText2D;
    let textAlign = THREE_Text.textAlign;
    let fontStyle = isItalic ? 'italic ' : '';
    let textStyle = {
        align: textAlign.center,
        font: fontStyle + size + 'px "Times new roman"',
        fillStyle: color,
        antialias: true,
        sub: sub,
        sqrt
    };
    let text = new SpriteText2D(texts, textStyle);
    text.position.set(x * 1.1, y * 1.1 + 12, z * 1.1);
    text.scale.set(0.5, 0.5, 0.5);
    text.material.depthTest = false;
    return text;
};
let axis = null;
let createCircle = (radius, {
    color = '#000',
    start = 0,
    end = Math.PI * 2,
    opacity = 1,
    segments = 36,
    isLay = false,
    position = [0, 0, 0],
    depthTest = false
} = {}) => {
    let CircleM = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity,
        depthTest
    });
    let CircleG = new THREE.CircleGeometry(radius, segments, start, end);
    let Circle = new THREE.Mesh(CircleG, CircleM);
    if (isLay) {
        Circle.rotation.x = -Math.PI / 2;
    }
    Circle.position.set(...position);
    return Circle;
};
let createImg = (vertices, w, h, src) => {
    let PlaneG = new THREE.PlaneGeometry(w, h);
    let PlaneM = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(src),
        transparent: true,
        overdraw: 0.2,
        depthTest: true
    });
    let Plane = new THREE.Mesh(PlaneG, PlaneM);
    Plane.position.set(...vertices);
    return Plane;
};
let createPlane = (w, h, {
    color = '#000',
    opacity = 1,
    isLay = false,
    depthTest = true
} = {}) => {
    let geometry = new THREE.PlaneBufferGeometry(w, h, 4);
    let material = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity,
        depthTest
    });
    let plane = new THREE.Mesh(geometry, material);
    if (isLay) {
        plane.rotation.x = Math.PI / 2;
    }
    return plane;
}
let createStrokeCircle = (radius, color) => {
    let group = new THREE.Group();
    let x, y, vertices = [];
    for (let i = 0; i < 361; i += 6) {
        x = radius * Math.cos(radian(i));
        y = radius * Math.sin(radian(i));
        vertices.push(x, y, 0);
    }
    let line = createLineMesh(vertices, '#000', 3, 1);
    let circle = createCircle([0, 0, -1], radius, color);
    group.add(line, circle);
    return group;
}
let countPos = (radius, angle) => {
    let P = {};
    P.x = radius * Math.cos(radian(angle));
    P.y = radius * Math.sin(radian(angle));
    return P;
}
let createSphere = (radius, {
    phiStart = 0,
    phiLength = Math.PI * 2,
    thetaStart = 0,
    thetaLength = Math.PI,
    color = '#000',
    opacity = 1,
    segments = 36,
    depthTest = true,
    transparent = false
} = {}) => {
    let geometry = new THREE.SphereBufferGeometry(radius, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
    let material = new THREE.MeshBasicMaterial({
        color,
        transparent,
        opacity,
        depthTest
    });
    let sphere = new THREE.Mesh(geometry, material);
    return sphere;
}
let createBox = (width, height, depth, {
    color = '#000',
    opacity = 1,
    segments = 1,
    depthTest = false
} = {}) => {
    let geometry = new THREE.BoxBufferGeometry(width, height, depth);
    let material = new THREE.MeshPhongMaterial({
        color,
        transparent: true,
        opacity,
        depthTest
    });
    let cube = new THREE.Mesh(geometry, material);
    return cube;
}
// 画直角
let drawRightAngle = (length, {
    color = '#000',
    width = 3
} = {}) => {
    let line = createStraightLine([
        [0, 0, length],
        [length, 0, length],
        [length, 0, 0]
    ], 3, 2, '#00B2FF');
    return line;
}
let createAxis = () => {
    axis = new THREE.Group();
    labelAxis(-400, 40, 400);
    drawAxisArrow(vec3(-450, 0, 0), vec3(450, 0, 0), 0x000000, 1);
    drawAxisArrow(vec3(0, -450, 0), vec3(0, 450, 0), 0x000000, 2);
    // scene.add(axis);
};
let labelAxis = (start, stepSize, stop) => {
    let SpriteText2D = THREE_Text.SpriteText2D;
    let textAlign = THREE_Text.textAlign;
    let textStyle = {
        align: textAlign.center,
        font: '18px "Cambria Math"',
        fillStyle: '#000000',
        antialias: true
    };
    let text = {},
        line = null,
        vertices = null;
    // label x axis:
    for (let i = start; i <= stop; i = i + stepSize) {
        if (i === 0) {
            continue;
        }
        text = new SpriteText2D(i / 40, textStyle);
        if (i === 0) {
            text.position.x = i + 10;
        } else {
            text.position.x = i;
        }
        text.position.y = -5;
        axis.add(text);
        vertices = [];
        vertices.push(vec3(i, 0, 0));
        vertices.push(vec3(i, 10, 0));
        let line = createLineMesh(vertices, '#000000', 3, 2);
        axis.add(line);
    }
    // label y axis:
    for (let i = start; i <= stop; i = i + stepSize) {
        if (i === 0) {
            continue;
        }
        text = new SpriteText2D(i / 40, textStyle);
        text.position.x = -15;
        text.position.y = i + 7;
        text.position.z = 0.2;
        axis.add(text);
        vertices = [];
        vertices.push(vec3(0, i, 0));
        vertices.push(vec3(10, i, 0));
        line = createLineMesh(vertices, '#000000', 3, 2);
        axis.add(line);
    }
    axis.add(text);
};
let drawAxisArrow = (origin, dir, color, style) => {
    let geometryLine = new THREE.Geometry();
    let vertices = [];
    vertices.push(origin);
    vertices.push(dir);
    geometryLine.vertices = vertices;
    let line = createLineMesh(geometryLine.vertices, color, 3, 2);
    axis.add(line);
    let text;
    if (style === 1) {
        vertices = [];
        vertices.push(vec3(dir.x - 10, 0, 0));
        vertices.push(vec3(dir.x - 13, 5, 0));
        vertices.push(vec3(dir.x + 5, 0, 0));
        let triangle1 = createTriangleFace(vertices, '#000');
        axis.add(triangle1);
        vertices = [];
        vertices.push(vec3(dir.x - 10, 0, 0));
        vertices.push(vec3(dir.x - 13, -5, 0));
        vertices.push(vec3(dir.x + 5, 0, 0));
        let triangle2 = createTriangleFace(vertices, '#000');
        axis.add(triangle2);
        text = createText('x', dir.x, -5, 0, '#000', 28);
        axis.add(text);
        text = createText('0', -14, -2, 0, '#000', 28);
        axis.add(text);
    } else {
        vertices = [];
        vertices.push(vec3(0, dir.y - 10, 0));
        vertices.push(vec3(5, dir.y - 13, 0));
        vertices.push(vec3(0, dir.y + 5, 0));
        let triangle1 = createTriangleFace(vertices, '#000');
        axis.add(triangle1);
        vertices = [];
        vertices.push(vec3(0, dir.y - 10, 0));
        vertices.push(vec3(-5, dir.y - 13, 0));
        vertices.push(vec3(0, dir.y + 5, 0));
        let triangle2 = createTriangleFace(vertices, '#000');
        axis.add(triangle2);
        text = createText('y', 20, dir.y + 10, 0, '#000', 28)
        axis.add(text);
    }
};
let getLong = (startPos, endPos, group, obj, {
    style = 3,
    line_width = 3,
    color = '#000',
    step = 0.01,
    isShrink = false,
    isReset = false
} = {}) => {
    return new Promise((resolve, reject) => {
        if (isReset) {
            // reject();
            return;
        }
        let line = common.createStraightLine([
            [...startPos],
            [...endPos]
        ], style, line_width, color);
        line.scale.set(0.01, 0.01, 0.01);
        group.add(line);
        let num = isShrink ? 1 : 0;
        obj.timer = null;
        step = isShrink ? -step : step;
        let thiz = this;

        function move() {
            if (thiz.isReset) {
                reject(new Error('err'));
                return;
            }
            num += step;
            line.scale.set(num, num, num);
            line.position.set((1 - num) * startPos[0], (1 - num) * startPos[1], (1 - num) * startPos[2])
            if (num >= 1 && !isShrink) {
                cancelAnimationFrame(obj.timer);
                resolve();
                return;
            } else if (num <= 0 && isShrink) {
                cancelAnimationFrame(obj.timer);
                group.remove(line);
                resolve();
                return;
            }
            obj.timer = requestAnimationFrame(move);
        }
        move();
    })
}
let dashLineBox = (sideLen) => {
    function dashLine(arr1, arr2) {
        let vertices = [];
        vertices.push(...arr1, ...arr2);
        let line = createLineMesh(vertices, '#000', 2, 1);
        return line;
    }
    let group = new THREE.Group();
    group.add(dashLine([-sideLen, -sideLen, sideLen], [sideLen, -sideLen, sideLen]));
    group.add(dashLine([sideLen, -sideLen, -sideLen], [sideLen, -sideLen, sideLen]));
    group.add(dashLine([-sideLen, -sideLen, -sideLen], [sideLen, -sideLen, -sideLen]));
    group.add(dashLine([-sideLen, -sideLen, sideLen], [-sideLen, -sideLen, -sideLen]));
    group.add(dashLine([-sideLen, sideLen, sideLen], [sideLen, sideLen, sideLen]));
    group.add(dashLine([sideLen, sideLen, -sideLen], [sideLen, sideLen, sideLen]));
    group.add(dashLine([-sideLen, sideLen, -sideLen], [sideLen, sideLen, -sideLen]));
    group.add(dashLine([-sideLen, sideLen, sideLen], [-sideLen, sideLen, -sideLen]));
    group.add(dashLine([-sideLen, sideLen, sideLen], [-sideLen, -sideLen, sideLen]));
    group.add(dashLine([sideLen, -sideLen, sideLen], [sideLen, sideLen, sideLen]));
    group.add(dashLine([sideLen, -sideLen, -sideLen], [sideLen, sideLen, -sideLen]));
    group.add(dashLine([-sideLen, -sideLen, -sideLen], [-sideLen, sideLen, -sideLen]));
    return group;
}
let common = {
    vec3,
    createCircle,
    createImg,
    createText,
    createLineMesh,
    createAxis,
    radian,
    angle,
    preloadImage,
    createStraightLine,
    createStrokeCircle,
    countPos,
    createSphere,
    drawCircleLine,
    drawRightAngle,
    getLong,
    createBox,
    dashLineBox,
    createPlane
}
export default common;
