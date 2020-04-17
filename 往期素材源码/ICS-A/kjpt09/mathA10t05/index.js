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
    var scale = 1,isMob = /iPad|Android/g.test(navigator.userAgent),bodyWidth,bodyHeight;
    function init_(){
        bodyWidth = $(window).width();
        bodyHeight = $(window).height();
        scale=bodyWidth/1920;
        if(1200*scale>bodyHeight){
            scale=bodyHeight/1200;
            $('#app').width(1920).css("zoom",scale);
        }else{
            $('#app').height(1200).css("zoom",scale);
        }
    }
    init_();
    window.onresize=function(){
        init_();
    }

    var WebGLCanvas = document.getElementById("WebGLCanvas");
    var canvasWidth = WebGLCanvas.clientWidth;
    var canvasHeight = WebGLCanvas.clientHeight;
    var canvasRect = WebGLCanvas.getBoundingClientRect();

    var slider1=$('#slider1')[0];
    var slider2=$('#slider2')[0];

    slider1V = -0.1;  
    slider2V = -150;

    var fudge = new Array();

    function solveQuadratic(a,b,c) {
        var solns = new Array();
        solns[0] = (-b+Math.sqrt(b*b - 4*a*c))/(2*a);
        solns[1] = (-b - Math.sqrt(b*b - 4*a*c))/(2*a); 
        return solns;
    }

    /////////////////////////////////////////////////
    //
    // Scene
    //
    //////////////////////////////////////////////////

    var scene = new THREE.Scene();
    scene.position.z=300;

    /////////////////////////////////////////////////
    //
    // Camera
    //
    //////////////////////////////////////////////////

    // Parameters: fov (deg), aspect, near, far
    camera = new THREE.PerspectiveCamera( 40, canvasWidth/canvasHeight, 1, 50000 );
    camera.position.set( 1145, 910, 530);
    camera.up = new THREE.Vector3( 0, 0, 1 );
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    /////////////////////////////////////////////////
    //
    // Renderer
    //
    //////////////////////////////////////////////////
    var canWebgl=(function(){
        try {
            var canvas = document.createElement( 'canvas' ); return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
        } catch ( e ) {
            return false;
        }
    })();
    var renderer = null;
    if(false){
        renderer = new THREE.WebGLRenderer({antialias:true,alpha:true});
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }else{
        renderer = new THREE.CanvasRenderer({alpha:true});
    }
    renderer.setClearColor( 0xffffff, 1.0 );
    renderer.setSize(canvasWidth, canvasHeight);
    WebGLCanvas.appendChild(renderer.domElement);

    /////////////////////////////////
    //
    // Controls 
    //
    /////////////////////////////////

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enableRotate =true;

    //////////////////////////
    //
    // Double cone
    //
    //////////////////////////
    coneMaterial = new THREE.MeshLambertMaterial( { color: 0x979797, transparent:true, opacity: 0.6 ,overdraw:0.5,side:THREE.BackSide} )
    lowerGeom = new THREE.CylinderGeometry(0, 600*Math.tan(30/180*Math.PI), 600, 36, 3, false) ;
    var meshLowerCone = new THREE.Mesh( lowerGeom, coneMaterial ) ;
    meshLowerCone.position.set(0.0, 0.0, -300); 
    point = new THREE.Vector3(0.0, 0.0, 300.0)
    lowerGeom.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI/2 ) );
    meshLowerCone.lookAt( point );
    scene.add( meshLowerCone );

    var vertices=[];
    vertices.push(new THREE.Vector3(0,0,100),new THREE.Vector3(0,0,-700));
    var lineZ=createLineMesh(vertices,'#000',3,2);
    textl1=createText('l1',0,50,100,'#000',25)
    scene.add(lineZ,textl1);

    vertices=[];
    vertices.push(new THREE.Vector3(0,-100*Math.tan(30/180*Math.PI),100),new THREE.Vector3(0,600*Math.tan(30/180*Math.PI),-600));
    var lineL=createLineMesh(vertices,'#000',3,2);
    textl2=createText('l2',0,-100*Math.tan(30/180*Math.PI),100,'#000',25)
    scene.add(lineL,textl2);

    var vertices=[];
    for(t=0;t<=30;t+=2) {
        ts=t*Math.PI/180;
        vertices.push(new THREE.Vector3( 0 ,20*Math.cos(ts) , 20*Math.sin(ts) ));
    }   
    lineα=createLineMesh(vertices,'#000',3,2)
    lineα.rotation.x=-Math.PI/2
    textα=createText('α',0,42,-48,'#000',25)
    scene.add(textα,lineα) 

    var materialP = new THREE.MeshBasicMaterial({color:'#000',overdraw:0.5});
    var O = new THREE.SphereGeometry(2,6,6);
    meshO = new THREE.Mesh(O,materialP);
    textO=createText('O',0,55,-5,'#000',25)
    scene.add(meshO,textO);

    
    /////////////////////////////////////////////////
    //
    // Light source
    //
    //////////////////////////////////////////////////

    var pointLight1 = new THREE.PointLight(0xFFFFFF);
    pointLight1.position.x = 0;
    pointLight1.position.y = 0;
    pointLight1.position.z = 2300;
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight(0xFFFFFF);
    pointLight2.position.x = 0;
    pointLight2.position.y = 0;
    pointLight2.position.z = -2300;
    scene.add(pointLight2);

    var pointLight1 = new THREE.PointLight(0xFFFFFF);
    pointLight1.position.x = 0;
    pointLight1.position.y = 2300;
    pointLight1.position.z = -300;
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight(0xFFFFFF);
    pointLight2.position.x = 0;
    pointLight2.position.y = -2300;
    pointLight2.position.z = -300;
    scene.add(pointLight2);

    //////////////////////////////////////////////////
    //
    // Top and bottom cone circles
    //
    ///////////////////////////////////////////////////

    var radius   = 600*Math.tan(30/180*Math.PI),
        segments = 36,
        circMat = new THREE.LineBasicMaterial( { linewidth:2,color: 0xbbbbbb} ),
        dashMaterial = new THREE.LineDashedMaterial( {linewidth:2, color: 0xbbbbbb, dashSize: 0.5, gapSize: 0.5} ),
        topBottCircGeom = new THREE.CircleGeometry( radius, segments );


    topBottCircGeom.vertices.shift();  
    topBottCircGeom.computeLineDistances();

    var circBott = new THREE.Line( topBottCircGeom, circMat);
    circBott.position.set( 0, 0, -600);
    scene.add( circBott ) ;

    ///////////////////////////////////
    //
    // Plane
    //
    ///////////////////////////////////

    var xMax = 300, yMax = 400;
    var XYsquareMesh = new THREE.Group(); 
    XYsquareGeometry = new THREE.PlaneGeometry(xMax*2,yMax*2);
    squareMaterial = new THREE.MeshPhongMaterial({color:0x000000, transparent:true, opacity:0.3, side:THREE.DoubleSide ,overdraw:0.5});
    XYsquareMesh1 = new THREE.Mesh(XYsquareGeometry,squareMaterial);
    textπ=createText('π',200,400,0,'#000',25)
    XYsquareMesh.add(XYsquareMesh1,textπ); 
    XYsquareMesh.position.set(0.0, 0, slider2V); 
    scene.add(XYsquareMesh)

    

    //////////////////////////
    //
    // Conics vbles
    //
    //////////////////////////

    var ellipseMat = new THREE.LineBasicMaterial({ linewidth:3, color:0xD0011B });
    var ellipseVec = new THREE.Geometry();

    //////////////////////////
    //
    // Draw conics
    //
    //////////////////////////
    function createLineMesh(vertices, color, style,size) {
        var lineMesh = null, geometryLine = new THREE.Geometry();
        if (!color) {
            color = '#000';
        }
        if(style==2) {
            geometryLine.vertices = vertices;
            geometryLine.computeLineDistances();
            lineMesh = new THREE.Line(geometryLine, new THREE.LineDashedMaterial({
                color: color,
                opacity: 0.8,
                dashSize: 1,
                gapSize: 1,
                linewidth:size
            }));
        }else if( style == 3){
            geometryLine.vertices = vertices;
            lineMesh = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: color,linewidth:size}));
        }
        return lineMesh;
    }
    function createText(texts,x,y,z,color,size){
        var SpriteText2D = THREE_Text.SpriteText2D;
        var textAlign = THREE_Text.textAlign;
        var textStyle = {align: textAlign.center, font: size+'px "Cambria Math"', fillStyle: color, antialias: true};
        var text = new SpriteText2D(texts, textStyle);
        text.rotation = camera.rotation;
        text.position.set(x,y,z);
        return text;
    }
    var q, s, a, b, c, C, E, A, cx, cy, rX, rY,meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG;
    function drawConics() {
        if(slider2V==0){
            slider2V=0.00001;
        }
        if(typeof ellipse != 'undefined'){
            scene.remove(ellipse,meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG);
        }

        /////////////////////////////////////////////////
        //
        // Credit to Lodewijk Bogaards for several of these variables
        //
        /////////////////////////////////////////////////
        
        ar=60/180*Math.PI;
        q = slider1V*Math.PI/3*2;
        if(Math.abs(slider1V)==0.5){
            q=q>0?q-0.001:q+0.001;
        }
        b = slider2V; 
        C = Math.sin(q)*Math.sin(q)*Math.cos(ar)*Math.cos(ar)-Math.cos(q)*Math.cos(q)*Math.sin(ar)*Math.sin(ar);
        A = -b*b*Math.cos(q)*Math.cos(q)*Math.cos(ar)*Math.cos(ar)/C;
        cy = -b*Math.sin(q)*Math.cos(ar)*Math.cos(ar)/C;
        rX = Math.sqrt(Math.abs(A));
        rY = Math.sqrt(Math.abs(A*Math.sin(ar)*Math.sin(ar)/C));
        
        XYsquareMesh.position.set(0.0, 0, b);
        XYsquareMesh.rotation.x = -q;   

        //β
        var vertices=[];
        var v=q/Math.PI*180;
        var xp,zp;
        for(var i=90;i>=Math.abs(v);i--){
            x = 20*Math.cos(Math.PI/180*i);
            z = 20*Math.sin(Math.PI/180*i);
            vertices.push(new THREE.Vector3(x,0,z+b));
            if(i==90-Math.floor((90-Math.abs(v))/2)){
                xp=x;
                zp=z+b;
            }
        }
        Cj=createLineMesh(vertices,'#000',3,1);
        if(v<0){
            Cj.rotation.z=Math.PI/2
            xp=xp+40;
        }else{
            Cj.rotation.z=-Math.PI/2
            xp=-xp+25;
        }
        textβ=createText('β',0,xp,zp+15,'#000',25)
        scene.add(textβ,Cj) 

        /////////////////////////////////////////
        //
        // Ellipse
        //
        /////////////////////////////////////////
        ellipseVec = new THREE.Geometry();
        var result=[];
        var cosq=Math.cos(q);
        var	sinq=Math.sin(q);
        for(t=0;t<=361;t+=2) {
            ts=t*Math.PI/180;
            var sints=Math.sin(ts);
            pY = rY*Math.cos(ts) - cy;
            if(t==0||t==180){
                result.push([rX*sints,pY*cosq,-pY*sinq + b])
            }
            ellipseVec.vertices.push(new THREE.Vector3( 
                rX*sints,  
                pY*cosq, 
                -pY*sinq + b
            ) );
        }   
        var x1=result[0][0],y1=result[0][1],z1=result[0][2];
        var x2=result[1][0],y2=result[1][1],z2=result[1][2];

        if(slider2V==0.00001){
            return;
        }

        //椭圆长轴
        var geometryLine = new THREE.Geometry();
        geometryLine.vertices.push(new THREE.Vector3(x1,y1,z1),new THREE.Vector3(x2,y2,z2))
        lineMeshL = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: '#000',linewidth:2}));
        scene.add(lineMeshL)

        //球
        var u=solveQuadratic(3*Math.pow(y1-y2,2)-Math.pow(z2-z1,2),8*(y1-y2)*(y2*z1-y1*z2),4*Math.pow(y2*z1-y1*z2,2));
        var materialC = new THREE.MeshPhongMaterial({color:'#F67A23',transparent:false,side:THREE.BackSide,opacity:1,overdraw:true});
        var r1=Math.abs(u[0])/2;
        var sphC1 = new THREE.SphereGeometry(r1-0.5,36,18);  
        meshC1 = new THREE.Mesh(sphC1,materialC);
        meshC1.position.z=u[0];

        var r2=Math.abs(u[1])/2;
        var sphC2 = new THREE.SphereGeometry(r2-0.5,36,18);
        meshC2 = new THREE.Mesh(sphC2,materialC);
        meshC2.position.z=u[1];

        //球与平面切点
        var k=(z1-z2)/(y1-y2);
        var P3 = new THREE.SphereGeometry(3,9,9);
        meshP3 = new THREE.Mesh(P3,materialP);
        var P3y=(k*y1+u[0]-z1)/(1/k+k);
        var P3z=(-1/k*P3y+u[0])
        meshP3.position.set(0,P3y,P3z);
        textF=createText('F1',0,P3y+40,P3z-40,'#000',25)
        scene.add(meshP3,textF);

        var P4 = new THREE.SphereGeometry(3,9,9);
        meshP4 = new THREE.Mesh(P4,materialP);
        var P4y=(k*y1+u[1]-z1)/(1/k+k);
        var P4z=(-1/k*P4y+u[1])
        meshP4.position.set(0,P4y,P4z);
        textE=createText('F2',0,P4y+40,P4z-40,'#000',25)
        scene.add(meshP4,textE);

         //小球切线圆环
        var rr,RR;
        var k2=Math.sqrt(3);
        var rry=(k2*y2+u[0]-z2)/(1/k2+k2);
        var rrz=(-1/k2*rry+u[0]);
        rr=Math.abs(rry)-2;
        var vertices=[];
        for(t=0;t<=361;t+=2) {
            ts=t*Math.PI/180;
            vertices.push(new THREE.Vector3( rry*Math.cos(ts) ,rry*Math.sin(ts) , rrz ));
        }   
        linerr=createLineMesh(vertices,'#000',3,2)
        var sphpA = new THREE.SphereGeometry(2,9,9);
        pointA = new THREE.Mesh(sphpA,materialP);
        pointA.position.set(-rry,0,rrz);
        textA=createText('A',-rry,25,rrz-30,'#000',25)
        scene.add(linerr,textA,pointA)

        //大球切线圆环
        var RRy=(k2*y2+u[1]-z2)/(1/k2+k2);
        var RRz=(-1/k2*RRy+u[1]);
        RR=Math.abs(RRy)-2;
        var vertices=[];
        for(t=0;t<=361;t+=2) {
            ts=t*Math.PI/180;
            vertices.push(new THREE.Vector3( RRy*Math.cos(ts) ,RRy*Math.sin(ts) , RRz ));
        }   
        lineRR=createLineMesh(vertices,'#000',3,2)
        var sphpB = new THREE.SphereGeometry(2,9,9);
        pointB = new THREE.Mesh(sphpB,materialP);
        pointB.position.set(-RRy,0,RRz);
        textB=createText('B',-RRy,25,RRz-30,'#000',25)
        scene.add(lineRR,textB,pointB)

        vertices=[];
        vertices.push(new THREE.Vector3(-RRy,0,RRz),new THREE.Vector3(-rry,0,rrz));
        lineAB=createLineMesh(vertices,'#000',3,2);
        scene.add(lineAB)

        var sphpG = new THREE.SphereGeometry(2,9,9);
        pointG = new THREE.Mesh(sphpB,materialP);
        var zG=(y2*z1-y1*z2)/(y2-y1);
        var xG=Math.abs(zG)*Math.tan(30/180*Math.PI);
        pointG.position.set(xG,0,zG);
        textG=createText('G',xG,25,zG-30,'#000',25)
        scene.add(pointG,textG);

        vertices=[];
        vertices.push(new THREE.Vector3(xG,0,zG),new THREE.Vector3(0,P3y,P3z));
        lineCG=createLineMesh(vertices,'#000',3,2);
        scene.add(lineCG)

        vertices=[];
        vertices.push(new THREE.Vector3(xG,0,zG),new THREE.Vector3(0,P4y,P4z));
        lineDG=createLineMesh(vertices,'#000',3,2);
        scene.add(lineDG)


        ellipse = new THREE.Line(ellipseVec, ellipseMat);
        ellipseVec.verticesNeedUpdate = true;
        scene.add(ellipse,meshC1,meshC2);
    }

    drawConics();
    var listener = function() {
      window.requestAnimationFrame(function() {
        drawConics();
      });
    };    
    function animate() {
        controls.update();
        renderer.render( scene, camera );   
        requestAnimationFrame( animate );
    }
    animate();
    //滑条a
    var TX,TY,mX,mY,T,btn;
    function touchStart(e){
        TX=event.touches[0].clientX;
        TY=event.touches[0].clientY;
        T=parseInt($(this).css('bottom'));
        btn = $(e.target)
        $(window).on('touchmove',touchMove);
        $(window).on('touchend',touchEnd);
    }
    function touchMove(e){
        TX2=event.touches[0].clientX;
        TY2=event.touches[0].clientY;
        mX=TX-TX2;
        mY=TY-TY2;
        if(T+mY/scale<-20){
            mY=(-20-T)*scale
        }else if(T+mY/scale>600){
            mY=(600-T)*scale;
        }
        btn.css('bottom',T+mY/scale+'px');
        if(btn.parent().attr('id')=='slider1'){
            slider1V=[(T+mY/scale+20)/620-0.5]
        }else{
            slider2V=[(T+mY/scale+20)/620-1]*600
        }
        // 异步渲染
        setTimeout(listener,1);
    }
    function touchEnd(e){
        $(window).unbind('touchmove');
        $(window).unbind('touchend');
    }
    function mouseDown(e){
        TX=event.clientX;
        TY=event.clientY;
        T=parseInt($(this).css('bottom'));
         btn = $(e.target)
        $(window).on('mousemove',mouseMove);
        $(window).on('mouseup',mouseUp);
    }
    function mouseMove(e){
        TX2=event.clientX;
        TY2=event.clientY;
        mX=TX-TX2;
        mY=TY-TY2;
        if(T+mY/scale<-20){
            mY=(-20-T)*scale
        }else if(T+mY/scale>600){
            mY=(600-T)*scale;
        }
        btn.css('bottom',T+mY/scale+'px');
        if(btn.parent().attr('id')=='slider1'){
            slider1V=[(T+mY/scale+20)/620-0.5]
        }else{
            slider2V=[(T+mY/scale+20)/620-1]*600
        }
        // 异步渲染
        setTimeout(listener,1);
    }
    function mouseUp(e){
        $(window).unbind('mousemove');
        $(window).unbind('mouseup');
    }

    $('.sliderMove').on('touchstart', touchStart );
    $('.sliderMove').on('mousedown', mouseDown );

    function reset() {
        $('#slider1 .sliderMove').css('bottom','228px');
        $('#slider2 .sliderMove').css('bottom','290px');
        slider1V=-0.1;
        slider2V=-150;
        camera.position.set( 1145, 910, 530);
        listener();
    }
    if(isMob){
        $('#reset').on('touchstart',reset);
    }else{
        $('#reset').on('click',reset);
    }
})();




