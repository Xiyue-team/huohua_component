//fastclick
if ('addEventListener' in document) {
   document.addEventListener('DOMContentLoaded', function() {
      FastClick.attach(document.body);
   }, false);
}
$(function() {
   FastClick.attach(document.body);
});
(function doThree() {
   //判断设备类型进行缩放
   var scale = 1,
      isMob = /iPad|Android/g.test(navigator.userAgent),
      bodyWidth, bodyHeight;

   function init_() {
      bodyWidth = $(window).width();
      bodyHeight = $(window).height();
      scale = bodyWidth / 1920;
      if (1200 * scale > bodyHeight) {
         scale = bodyHeight / 1200;
         $('#app').width(1920).css("zoom", scale);
      } else {
         $('#app').height(1200).css("zoom", scale);
      }
   }
   init_();
   window.onresize = function() {
      init_();
   }

   var WebGLCanvas = document.getElementById("WebGLCanvas");
   var canvasWidth = WebGLCanvas.clientWidth;
   var canvasHeight = WebGLCanvas.clientHeight;
   var canvasRect = WebGLCanvas.getBoundingClientRect();

   var slider1 = $('#slider1')[0];
   var slider2 = $('#slider2')[0];

   slider1V = 0.1;
   slider2V = -5;

   var fudge = new Array();

   // function solveQuadratic(a,b,c) {
   //     var solns = new Array();
   //     solns[0] = (-b+Math.sqrt(b*b - 4*a*c))/(2*a);
   //     solns[1] = (-b - Math.sqrt(b*b - 4*a*c))/(2*a); 
   //     return solns;
   // }

   /////////////////////////////////////////////////
   //
   // Scene
   //
   //////////////////////////////////////////////////

   var scene = new THREE.Scene();

   /////////////////////////////////////////////////
   //
   // Camera
   //
   //////////////////////////////////////////////////

   // Parameters: fov (deg), aspect, near, far
   camera = new THREE.PerspectiveCamera(40, canvasWidth / canvasHeight, 1, 10000);
   camera.position.set(70, 60, 25);
   camera.up = new THREE.Vector3(0, 0, 1);
   camera.lookAt(new THREE.Vector3(0, 0, 0));

   /////////////////////////////////////////////////
   //
   // Renderer
   //
   //////////////////////////////////////////////////
   var canWebgl = (function() {
      try {
         var canvas = document.createElement('canvas');
         return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
         return false;
      }
   })();
   var renderer = null;
   if (canWebgl) {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
   } else {
      renderer = new THREE.CanvasRenderer({ alpha: true });
   }
   renderer.setClearColor(0xffffff, 1.0);
   renderer.setSize(canvasWidth, canvasHeight);
   WebGLCanvas.appendChild(renderer.domElement);


   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.enableDamping = true;
   controls.dampingFactor = 0.25;
   controls.enableZoom = true;
   controls.enableRotate = true;
   controls.enablePan = false;

   /////////////////////////////////////////////////
   //
   // Light source
   //
   //////////////////////////////////////////////////

   var pointLight = new THREE.PointLight(0xFFFFFF);
   pointLight.position.x = 100;
   pointLight.position.y = 50;
   pointLight.position.z = 230;
   // antialiasing not working on iPad...
   pointLight.shadow.mapSize.width = 1024; // default is 512
   pointLight.shadow.mapSize.height = 1024; // default is 512
   scene.add(pointLight);

   /////////////////////////////////
   //
   // Controls 
   //
   /////////////////////////////////

   controls = new THREE.OrbitControls(camera, renderer.domElement);


   //////////////////////////
   //
   // Double cone
   //
   //////////////////////////

   upperGeom = new THREE.CylinderGeometry(0, 15, 15, 40, 5, false);
   coneMaterial = new THREE.MeshPhongMaterial({ color: 0xeeeeee, transparent: true, opacity: 0.3 })
   var meshUppercone = new THREE.Mesh(upperGeom, coneMaterial);
   meshUppercone.position.set(0.0, 0.0, 7.5);
   point = new THREE.Vector3(0.0, 0.0, -20.0)
   upperGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
   meshUppercone.lookAt(point);
   scene.add(meshUppercone);

   lowerGeom = new THREE.CylinderGeometry(0, 15, 15, 40, 5, false);
   var meshLowerCone = new THREE.Mesh(lowerGeom, coneMaterial);
   meshLowerCone.position.set(0.0, 0.0, -7.5);
   point = new THREE.Vector3(0.0, 0.0, 20.0)
   lowerGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
   meshLowerCone.lookAt(point);
   scene.add(meshLowerCone);

   //////////////////////////////////////////////////
   //
   // Top and bottom cone circles
   //
   ///////////////////////////////////////////////////

   var radius = 15,
      segments = 160,
      circMat = new THREE.LineBasicMaterial({ linewidth: 2, color: 0xbbbbbb }),
      dashMaterial = new THREE.LineDashedMaterial({ linewidth: 2, color: 0xbbbbbb, dashSize: 0.5, gapSize: 0.5 }),
      topBottCircGeom = new THREE.CircleGeometry(radius, segments);


   topBottCircGeom.vertices.shift(); // Remove center vertex
   topBottCircGeom.computeLineDistances();
   var circTop = new THREE.Line(topBottCircGeom, circMat);
   circTop.position.set(0, 0, 15);
   scene.add(circTop);

   var circBott = new THREE.Line(topBottCircGeom, circMat);
   circBott.position.set(0, 0, -15);
   scene.add(circBott);



   ///////////////////////////////////
   //
   // Plane
   //
   ///////////////////////////////////

   var xMax = 20,
      yMax = 30;
   var XYsquareGeometry = new THREE.Geometry();
   XYsquareGeometry = new THREE.PlaneGeometry(xMax * 2, yMax * 2);
   squareMaterial = new THREE.MeshBasicMaterial({ color: 0x116ADC, transparent: true, opacity: 0.7, side: THREE.DoubleSide, overdraw: true });
   XYsquareMesh = new THREE.Mesh(XYsquareGeometry, squareMaterial);
   XYsquareMesh.position.set(0.0, 5, slider2V);
   scene.add(XYsquareMesh);

   //////////////////////////
   //
   // Conics vbles
   //
   //////////////////////////

   var ellipseMat = new THREE.LineBasicMaterial({ linewidth: 2, color: 0x000000 });
   var ellipseVec = new THREE.Geometry();

   var parabolaMat = new THREE.LineBasicMaterial({ linewidth: 2, color: 0x000000 });
   var parabolaVec = new THREE.Geometry();

   var hyperbolaMat = new THREE.LineBasicMaterial({ linewidth: 2, color: 0x000000 });
   var hyperbolaVec = new THREE.Geometry();

   //////////////////////////
   //
   // Draw conics
   //
   //////////////////////////

   var q, s, a, b, c, C, E, A, cx, cy, rX, rY;

   function drawConics() {
      if (typeof ellipse != 'undefined') {
         scene.remove(ellipse);
      }
      if (typeof hyperbola1 != 'undefined') {
         scene.remove(hyperbola1);
         scene.remove(hyperbola2);
      }
      if (typeof parabola != 'undefined') {
         scene.remove(parabola);
      }
      if (typeof degParab != 'undefined') {
         scene.remove(degParab);
      }

      /////////////////////////////////////////////////
      //
      // Credit to Lodewijk Bogaards for several of these variables
      //
      /////////////////////////////////////////////////

      s1 = 1 * slider1V;
      s1Abs = Math.abs(s1);
      q = slider1V * Math.PI;
      s = Math.tan(q);
      a = 5;
      b = 1 * slider2V;
      c = Math.sqrt(s * s + 1);
      C = ((s * s) - 1) / ((s * s) + 1);
      E = ((2 * b * s) + (2 * a)) / Math.sqrt((s * s) + 1);
      A = (b * b) - (a * a) - ((E * E) / (4 * C));
      cy = -E / (2 * C) - a;
      rX = Math.sqrt(Math.abs(A));
      rY = Math.sqrt(Math.abs(A / C));

      XYsquareMesh.position.set(0.0, a, b);
      XYsquareMesh.rotation.x = -q;

      if (slider1V > -0.25 && slider1V < 0.25) {

         /////////////////////////////////////////
         //
         // Ellipse
         //
         /////////////////////////////////////////
         ellipseVec = new THREE.Geometry();

         for (t = 0; t <= 2 * Math.PI + 0.05; t += 0.05) {
            pY = rY * Math.cos(t) - cy;
            fudge = (-0.65 * q + 0.11 * q) * a * Math.sin(q) // Fine tuning for extremes of q
            ellipseVec.vertices.push(new THREE.Vector3(
               rX * Math.sin(t),
               pY / c - fudge,
               (-pY * s) / c + b + a * Math.sin(q)
            ));
         }
         ellipse = new THREE.Line(ellipseVec, ellipseMat);
         ellipseVec.verticesNeedUpdate = true;
         scene.add(ellipse);

         // if(rX == 0) {
         //     conType.innerHTML = "Degenerate Ellipse";           
         // } else if(slider1V == 0) {
         //     conType.innerHTML = "Circle";       
         // } else {
         //     conType.innerHTML = "Ellipse";          
         // }

      } else if (slider1V == -0.25 || slider1V == 0.25) {

         /////////////////////////////////////////
         //
         // Parabola
         //
         /////////////////////////////////////////

         if (rX == 0) {
            degParabVec = new THREE.Geometry();
            endY = 10;
            if (q > 0) {
               endZ = -10;
            } else {
               endZ = 10;
            }
            degParabVec.vertices.push(new THREE.Vector3(0, -endY, -endZ));
            degParabVec.vertices.push(new THREE.Vector3(0, endY, endZ));
            degParab = new THREE.Line(degParabVec, parabolaMat);
            scene.add(degParab);
            // conType.innerHTML = "Degenerate Parabola";          
         } else if (slider1V == -5) {
            // conType.innerHTML = "Degenerate Parabola";
         } else {
            parabolaVec = new THREE.Geometry();
            sgnA = a * Math.sign(q);
            for (t = -15; t < 15.4; t += 0.4) {
               parabolaVec.vertices.push(new THREE.Vector3(t, 0, Math.sin(q) * t * t / (sgnA + b) - b / 2));
            }
            parabola = new THREE.Line(parabolaVec, parabolaMat);

            if (slider1V == 0.25) {
               parabola.rotation.x = Math.PI / 4;
               fudge = -0.15 * b; // Why -0.15 works here? Dunno...
               parabola.position.set(0, -fudge + a / 2, b + fudge + a / 2);
            } else {
               parabola.rotation.x = 3 * Math.PI / 4;
               fudge = 0.85 * b; // Why 0.85 works here? Dunno...
               parabola.position.set(0, -fudge + a / 2, b - fudge - a / 2);
            }
            parabolaVec.verticesNeedUpdate = true;
            scene.add(parabola);
            // conType.innerHTML = "Parabola";     
         }
      } else {

         /////////////////////////////////////////
         //
         // Hyperbola
         //
         /////////////////////////////////////////

         var rX2 = rX * rX;
         hyperbolaVec1 = new THREE.Geometry();
         hyperbolaVec2 = new THREE.Geometry();
         for (t = -15; t < 14.9; t += 0.4) {
            if (rX == 0) {
               Y = (1.265 * s1Abs + 0.355 / (Math.sin(4.15 * (s1Abs - 1.75)))) * t;
               // conType.innerHTML = "Degenerate Hyperbola";             
            } else {
               Y = -(rY / rX) * Math.sqrt(t * t + rX2);
               // if(rX<0.1) {
               //     conType.innerHTML = "Degenerate Hyperbola";             
               // } else {
               //     conType.innerHTML = "Hyperbola";                    
               // }
            }
            hyperbolaVec1.vertices.push(new THREE.Vector3(
               t, Y + rY, 0
            ));
            hyperbolaVec2.vertices.push(new THREE.Vector3(
               t, -Y - rY, 0
            ));
         }
         hyperbola1 = new THREE.Line(hyperbolaVec1, hyperbolaMat);
         hyperbola2 = new THREE.Line(hyperbolaVec2, hyperbolaMat);

         g = -a * s / (s - 1) - b / ((s - 1));
         hyperbola1.position.set(0.0, -g, g);
         j = a * s / (s + 1) - (-b) / (s + 1);
         hyperbola2.position.set(0.0, j, j);
         if (q < 0) {
            if (hyperbola1.position.y < 0) {
               h = Math.PI;
            } else {
               h = 0;
            }
            if (hyperbola2.position.y < 0) {
               h = Math.PI;
            } else {
               h = 0;
            }
         } else {
            if (hyperbola1.position.y < 0) {
               h = 0;
            } else {
               h = Math.PI;
            }
            if (hyperbola2.position.y < 0) {
               h = 0;
            } else {
               h = Math.PI;
            }
         }
         rot = h - q;
         hyperbola1.rotation.x = rot;
         hyperbola2.rotation.x = rot;
         scene.add(hyperbola1);
         scene.add(hyperbola2);
      }
   }

   drawConics();

   //////////////////////////
   //
   // Chrome changes value throughout "input", but 
   // only changes value at end of "change".  
   // Of course, IE does not fire on "input". Thus, all this...
   //
   //////////////////////////

   var listener = function() {
      window.requestAnimationFrame(function() {
         drawConics();
      });
   };

   function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
   }

   animate();

   document.addEventListener('touchMove',function(e){
      e.preventDefault();
   })

   //滑条a
   var TX, TY, mX, mY, T, btn;

   function touchStart(e) {
      TX = event.touches[0].clientX;
      TY = event.touches[0].clientY;
      T = parseInt($(this).css('bottom'));
      btn = $(e.target)
      console.log(btn);
      $(window).on('touchmove', touchMove);
      $(window).on('touchend', touchEnd);
   }

   function touchMove(e) {
      TX2 = event.touches[0].clientX;
      TY2 = event.touches[0].clientY;
      mX = TX - TX2;
      mY = TY - TY2;
      if (T + mY / scale < -20) {
         mY = (-20 - T) * scale
      } else if (T + mY / scale > 600) {
         mY = (600 - T) * scale;
      }
      btn.css('bottom', T + mY / scale + 'px');
      if (btn.parent().attr('id') == 'slider1') {
         slider1V = (T + mY / scale + 20) / 620 - 0.5
      } else {
         slider2V = [(T + mY / scale + 20) / 620 - 0.5] * 2 * 15
      }
      // 异步渲染  
      setTimeout(listener, 1);
   }

   function touchEnd(e) {
      $(window).unbind('touchmove');
      $(window).unbind('touchend');
   }

   function mouseDown(e) {
      TX = event.clientX;
      TY = event.clientY;
      touch_flage = true;
      T = parseInt($(this).css('bottom'));
      btn = $(e.target)
      $(window).on('mousemove', mouseMove);
      $(window).on('mouseup', mouseUp);
   }

   function mouseMove(e) {
      TX2 = event.clientX;
      TY2 = event.clientY;
      mX = TX - TX2;
      mY = TY - TY2;
      if (T + mY / scale < -20) {
         mY = (-20 - T) * scale
      } else if (T + mY / scale > 600) {
         mY = (600 - T) * scale;
      }
      btn.css('bottom', T + mY / scale + 'px');
      if (btn.parent().attr('id') == 'slider1') {
         slider1V = (T + mY / scale + 20) / 620 - 0.5
      } else {
         slider2V = [(T + mY / scale + 20) / 620 - 0.5] * 2 * 15
      }
      // 异步渲染
      setTimeout(listener, 1);
   }

   function mouseUp(e) {
      $(window).unbind('mousemove');
      $(window).unbind('mouseup');
   }

   $('.sliderMove').on('touchstart', touchStart);
   $('.sliderMove').on('mousedown', mouseDown);

   function reset() {
      $('#slider1 .sliderMove').css('bottom', '352px');
      $('#slider2 .sliderMove').css('bottom', '166px');
      slider1V = 0.1;
      slider2V = -5;
      listener();
      camera.position.set(70, 60, 25);
   }
   if (isMob) {
      $('#reset').on('touchstart', reset);
   } else {
      $('#reset').on('click', reset);
   }
})();