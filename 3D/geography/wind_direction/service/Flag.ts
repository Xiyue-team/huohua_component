import {Vector3, MeshPhongMaterial, MeshBasicMaterial, Texture} from "three";
import * as THREE from 'three';
/**
 * Created by baozhiguo on 2018/3/28.
 */
export class Flag {
    DAMPING = 0.03;
    DRAG = 1 - this.DAMPING;
    MASS = .1;
    restDistance = 20;

    xSegs = 15; // ratio is 2:3
    ySegs = 10; //

    clothFunction = this.plane(this.restDistance * this.xSegs, this.restDistance * this.ySegs);

    cloth = new Cloth(this.xSegs, this.ySegs,this.clothFunction);

    GRAVITY = 981 * 1.4;
    gravity = new Vector3(0, -this.GRAVITY, 0).multiplyScalar(this.MASS);

    TIMESTEP = 18 / 1000;
    TIMESTEP_SQ = this.TIMESTEP * this.TIMESTEP;

    pins:any = [];

    wind:any = true;
    windStrength = 5;
    windForce = new Vector3(10, 10, 10);

    ballPosition = new Vector3(0, -45, 0);
    ballSize = 60; //40

    tmpForce = new Vector3();

    lastTime:any;

    plane(width:any, height:any) {

        return (u:any, v:any) =>{
            var x = u * width; //(u-0.5)
            var y = v * height;
            var z = 0;

            return new Vector3(x, y, z);
        };
    }

    /*
     Particle(x, y, z, mass) {
     this.position = clothFunction(x, y); // position
     this.previous = clothFunction(x, y); // previous
     this.original = clothFunction(x, y);
     this.a = new THREE.Vector3(0, 0, 0); // acceleration
     this.mass = mass;
     this.invMass = 1 / mass;
     this.tmp = new THREE.Vector3();
     this.tmp2 = new THREE.Vector3();
     }

     // Force -> Acceleration
     Particle.prototype.addForce = function(force) {
     this.a.add(
     this.tmp2.copy(force).multiplyScalar(this.invMass)
     );
     };

     // Performs verlet integration
     Particle.prototype.integrate = function(timesq) {
     var newPos = this.tmp.subVectors(this.position, this.previous);
     newPos.multiplyScalar(DRAG).add(this.position);
     newPos.add(this.a.multiplyScalar(timesq));

     this.tmp = this.previous;
     this.previous = this.position;
     this.position = newPos;

     this.a.set(0, 0, 0);
     }*/

    diff = new Vector3();

    satisifyConstrains(p1:any, p2:any, distance:any) {
        this.diff.subVectors(p2.position, p1.position);
        var currentDist = this.diff.length();
        if (currentDist == 0) return; // prevents division by 0
        var correction = this.diff.multiplyScalar(1 - distance / currentDist);
        var correctionHalf = correction.multiplyScalar(0.5);
        p1.position.add(correctionHalf);
        p2.position.sub(correctionHalf);

        // float difference = (restingDistance - d) / d
        // im1 = 1 / p1.mass // inverse mass quantities
        // im2 = 1 / p2.mass
        // p1.position += delta * (im1 / (im1 + im2)) * stiffness * difference

    }

    /*function Cloth(w, h) {
     w = w || 10;
     h = h || 10;
     this.w = w;
     this.h = h;

     var particles = [];
     var constrains = [];

     var u, v;

     // Create particles
     for(v = 0; v <= h; v++) {
     for(u = 0; u <= w; u++) {
     particles.push(
     new Particle(u / w, v / h, 0, MASS)
     );
     }
     }

     // Structural

     for(v = 0; v < h; v++) {
     for(u = 0; u < w; u++) {

     constrains.push([
     particles[index(u, v)],
     particles[index(u, v + 1)],
     restDistance
     ]);

     constrains.push([
     particles[index(u, v)],
     particles[index(u + 1, v)],
     restDistance
     ]);

     }
     }

     for(u = w, v = 0; v < h; v++) {
     constrains.push([
     particles[index(u, v)],
     particles[index(u, v + 1)],
     restDistance

     ]);
     }

     for(v = h, u = 0; u < w; u++) {
     constrains.push([
     particles[index(u, v)],
     particles[index(u + 1, v)],
     restDistance
     ]);
     }

     // While many system uses shear and bend springs,
     // the relax constrains model seem to be just fine
     // using structural springs.
     // Shear
     var diagonalDist = Math.sqrt(restDistance * restDistance * 2);

     for(v = 0; v < h; v++) {
     for(u = 0; u < w; u++) {

     constrains.push([
     particles[index(u, v)],
     particles[index(u + 1, v + 1)],
     diagonalDist
     ]);

     constrains.push([
     particles[index(u + 1, v)],
     particles[index(u, v + 1)],
     diagonalDist
     ]);

     }
     }

     // // Bend

     var wlen = restDistance * 2;
     var hlen = restDistance * 2;
     diagonalDist = Math.sqrt(wlen * wlen + hlen * hlen);

     for (v=0;v<h-1;v++) {
     for (u=0;u<w-1;u++) {
     constrains.push([
     particles[index(u, v)],
     particles[index(u+2, v)],
     wlen
     ]);

     constrains.push([
     particles[index(u, v)],
     particles[index(u, v+2)],
     hlen
     ]);

     constrains.push([
     particles[index(u, v)],
     particles[index(u+2, v+2)],
     diagonalDist
     ]);

     constrains.push([
     particles[index(u, v+2)],
     particles[index(u+2, v+2)],
     wlen
     ]);

     constrains.push([
     particles[index(u+2, v+2)],
     particles[index(u+2, v+2)],
     hlen
     ]);

     constrains.push([
     particles[index(u+2, v)],
     particles[index(u, v+2)],
     diagonalDist
     ]);
     }
     }

     this.particles = particles;
     this.constrains = constrains;

     function index(u, v) {
     return u + v * (w + 1);
     }

     this.index = index;

     }*/

    simulate(time:any) {
        if (!this.lastTime) {
            this.lastTime = time;
            return;
        }

        var i, il, particles, particle, pt, constrains, constrain;

        // Aerodynamics forces
        let wind = true;
        if (wind) {
            var face, faces = this.clothGeometry.faces,
                normal;

            particles = this.cloth.particles;

            for (i = 0, il = faces.length; i < il; i++) {
                face = faces[i];
                normal = face.normal;

                this.tmpForce.copy(normal).normalize().multiplyScalar(normal.dot(this.windForce));
                particles[face.a].addForce(this.tmpForce);
                particles[face.b].addForce(this.tmpForce);
                particles[face.c].addForce(this.tmpForce);
            }
        }

        for (particles = this.cloth.particles, i = 0, il = particles.length; i < il; i++) {
            particle = particles[i];
            //console.log(particle)
            particle.addForce(this.gravity);
            //
             var x = particle.position.x, y = particle.position.y, z = particle.position.z, t=Date.now() / 1000;
             this.windForce.set(Math.sin(x*y*t), Math.cos(z*t), Math.sin(Math.cos(5*x*y*z))).multiplyScalar(100);
             particle.addForce(this.windForce);
            particle.integrate(this.TIMESTEP_SQ);
        }

        // Start Constrains

       /* constrains = this.cloth.constraints, il = constrains.length;
        for (i = 0; i < il; i++) {
            var constrain = constrains[i];
            //console.log(constrain);
            this.satisifyConstrains(constrain[0], constrain[1], constrain[2]);
        }*/

        // Ball Constrains

         this.ballPosition.z = -Math.sin(Date.now() / 300) * 90; //+ 40;
         this.ballPosition.x = Math.cos(Date.now() / 200) * 70

         /*if(sphere.visible)
         for(particles = cloth.particles, i = 0, il = particles.length; i < il; i++) {
         particle = particles[i];
         pos = particle.position;
         diff.subVectors(pos, ballPosition);
         if(diff.length() < ballSize) {
         // collided
         diff.normalize().multiplyScalar(ballSize);
         pos.copy(ballPosition).add(diff);
         }
         } */

        // Pin Constrains

         for (i = 0, il = this.pins.length; i < il; i++) {
            var xy = this.pins[i];
            var p = particles[xy];
            p.position.copy(p.original);
            p.previous.copy(p.original);
        }

    }

    /* pins = [];
     for(var j = 0; j <= cloth.h; j++)
     pins.push(cloth.index(0, j));*/

    //container;
    //camera, scene, renderer;

    clothGeometry:any;
    sphere:any;
    object:any;
    arrow:any;


//			animate();

    /*loadFlag():Promise<Texture>{
        return new Promise<Texture>((resolve,reject)=>{
              new THREE.TextureLoader().load('static/flag.jpg',(clothTexture:Texture)=>{
                  resolve(clothTexture);
              });
        });
    }*/

    async init(scene:any,camera:any,renderer:any,group:any) {
        /*scene.fog = new THREE.Fog(0x000000, 500, 10000);

        camera.position.y = 50;
        camera.position.z = 1500;*/

        // lights
/*
        var light, materials;

        scene.add(new THREE.AmbientLight(0x666666));

        light = new THREE.DirectionalLight(0xffffff, 1.75);
        light.position.set(50, 200, 100);
        light.position.multiplyScalar(1.3);
        scene.add(light);

        light = new THREE.DirectionalLight(0xffffff, 0.35);
        light.position.set(0, -1, 0);

        scene.add(light);*/

        // cloth material

        //var clothTexture = new THREE.TextureLoader().load('static/flag.jpg');
      /*  var clothTexture = await this.loadFlag();
        clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
        clothTexture.anisotropy = 16;

        var materials = [
            new MeshPhongMaterial({
                alphaTest: 0.5,
                color: 0xffffff,
                specular: 0x030303,
                emissive: 0x111111,
                shininess: 10,
                map: clothTexture,
                side: THREE.DoubleSide
            }),
            new MeshBasicMaterial({
                color: 0xff0000,
                wireframe: true,
                transparent: true,
                opacity: 0.9
            })
        ];
*/
        // cloth geometry

        this.clothGeometry = new THREE.ParametricGeometry(this.clothFunction, this.cloth.w, this.cloth.h);
        this.clothGeometry.dynamic = true;
        this.clothGeometry.computeFaceNormals();

       /* var uniforms = {
            texture: {
                type: "t",
                value: 0,
                texture: clothTexture
            }
        };*/
        var vertexShader = ([
            "varying vec2 vUV;",

            "void main() {",

            "vUV = 0.75 * uv;",

            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",

            "gl_Position = projectionMatrix * mvPosition;",

            "}"
        ]).join();
        var fragmentShader = ([
            "uniform sampler2D texture;",
            "varying vec2 vUV;",

            "vec4 pack_depth( const in float depth ) {",

            "const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );",
            "const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );",
            "vec4 res = fract( depth * bit_shift );",
            "res -= res.xxyz * bit_mask;",
            "return res;",

            "}",

            "void main() {",

            "vec4 pixel = texture2D( texture, vUV );",

            "if ( pixel.a < 0.5 ) discard;",

            "gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );",

            "}"
        ]).join();

        // cloth mesh

     /*   this.object = new THREE.Mesh(this.clothGeometry, materials[0]);
        //旗子
        this.object.position.set(40, 30, -50);
        this.object.scale.set(0.1,0.1,0.1)
        this.object.rotation.y+=0.5*Math.PI;
        //				object.castShadow = true;
        //				object.receiveShadow = true;
        //scene.add(this.object);

        this.object.customDepthMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader
        });*/

        // sphere


        // arrow
        this.arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 50, 0xff0000);
        this.arrow.position.set(-200, 0, -200);

        // poles

        var poleGeo = new THREE.BoxGeometry(5, 100, 5);
        var poleMat = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0x111111,
            shininess: 100,
            //					perPixel: true
        });

        //旗杆
        var mesh = new THREE.Mesh(poleGeo, poleMat);
        mesh.position.y = 25; //-250
        mesh.position.x = 40;
        mesh.position.z = -50;
        mesh.scale.set(0.2,0.5,0.2);
        //				mesh.receiveShadow = true;
        //				mesh.castShadow = true;
        group.add(mesh);
        scene.add(group);

        //旗杆底座
        var gg = new THREE.CubeGeometry(5, 5, 5);
        var mesh = new THREE.Mesh(gg, poleMat);
        mesh.position.y = 0;
        mesh.position.x = 40; //125
        mesh.position.z = -50; //125
        //				mesh.receiveShadow = true;
        //				mesh.castShadow = true;
        //mesh.scale.set(0.25,0.25,0.25);
        group.add(mesh);
        scene.add(group);

        //renderer.setClearColor(scene.fog.color);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.physicallyBasedShading = true;
        //				renderer.shadowMap.enabled = true;
        this.animation();
        //this.sphere.visible = !true

    }

    animation() {
        if(!this.clothGeometry){
            return;
        }
        var time = Date.now();
        //this.windStrength = Math.cos(time / 7000) * 100 + 200;
        //this.windForce.set(Math.sin(time / 2000), Math.cos(time / 3000), Math.sin(time / 1000)).normalize().multiplyScalar(this.windStrength);
       if(this.arrow){
           this.arrow.setLength(this.windStrength);
           this.arrow.setDirection(this.windForce);
       }

        this.simulate(time);

        var timer = Date.now() * 0.0002;
        var p = this.cloth.particles;
        for (var i = 0, il = p.length; i < il; i++) {
            this.clothGeometry.vertices[i].copy(p[i].position);
        }

        this.clothGeometry.computeFaceNormals();
        this.clothGeometry.computeVertexNormals();
        this.clothGeometry.normalsNeedUpdate = true;
        this.clothGeometry.verticesNeedUpdate = true;

        //sphere.position.copy(ballPosition);
        //camera.lookAt(scene.position);
    }
}

export class Particle{
    position:any;
    previous:any;
    original:any;
    a:any;
    mass:any;
    invMass:any;
    tmp:any;
    tmp2:any;
    DAMPING = 0.03;
    DRAG = 1 - this.DAMPING;


    constructor( x:any, y:any, z:any, mass:any,clothFunction?:any ) {
        this.position = clothFunction( x, y ); // position
        this.previous = clothFunction( x, y ); // previous
        this.original = clothFunction( x, y );
        this.a = new Vector3( 0, 0, 0 ); // acceleration
        this.mass = mass;
        this.invMass = 1 / mass;
        this.tmp = new Vector3();
        this.tmp2 = new Vector3();

    }

// Force -> Acceleration

    addForce( force :any) {

        this.a.add(
            this.tmp2.copy(force).multiplyScalar(this.invMass)
        );
    }
    integrate( timesq :any) {

        var newPos = this.tmp.subVectors( this.position, this.previous );
        newPos.multiplyScalar( this.DRAG ).add( this.position );
        newPos.add( this.a.multiplyScalar( timesq ) );

        this.tmp = this.previous;
        this.previous = this.position;
        this.position = newPos;

        this.a.set( 0, 0, 0 );

    };

};

export class Cloth{
    DAMPING = 0.03;
    DRAG = 1 - this.DAMPING;
    MASS = 0.1;
    w:any;
    h:any;
    particles:any = [];
    constraints:any = [];
    constructor( w:any, h:any,clothFunction:any ) {

        w = w || 10;
        h = h || 10;


        this.w = w;
        this.h = h;
        var u, v;

        // Create particles
        for (v = 0; v <= h; v++) {

            for (u = 0; u <= w; u++) {

                this.particles.push(
                    new Particle(u / w, v / h, 0, this.MASS,clothFunction)
                );

            }

        }

        // Structural
        var constraints = [];
        for (v = 0; v < h; v++) {

            for (u = 0; u < w; u++) {

                constraints.push([
                    this.particles[this.index(u, v)],
                    this.particles[this.index(u, v + 1)],
                    //restDistance
                ]);

                constraints.push([
                    this.particles[this.index(u, v)],
                    this.particles[this.index(u + 1, v)],
                    //restDistance
                ])

            }

        }

        for (u = w, v = 0; v < h; v++) {

            constraints.push([
                this.particles[this.index(u, v)],
                this.particles[this.index(u, v + 1)],
                //restDistance

            ]);

        }

        for (v = h, u = 0; u < w; u++) {

            constraints.push([
                this.particles[this.index(u, v)],
                this.particles[this.index(u + 1, v)],
                //restDistance
            ]);

        }
        this.particles = this.particles;
        this.constraints = constraints;

        //this.index = index;
    }
    index( u:any, v:any ) {

        return u + v * ( this.w + 1 );

    }


}


