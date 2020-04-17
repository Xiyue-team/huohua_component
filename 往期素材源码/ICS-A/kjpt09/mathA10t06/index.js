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

    slider1V = 0.43;
    slider2V = -400;

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

    /////////////////////////////////////////////////
    //
    // Camera
    //
    //////////////////////////////////////////////////

    // Parameters: fov (deg), aspect, near, far
    camera = new THREE.PerspectiveCamera( 40, canvasWidth/canvasHeight, 1, 50000 );
    camera.position.set(1950,-55,670);
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
    if(0){
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

    
    coneMaterial = new THREE.MeshLambertMaterial( { color: 0x979797, transparent:true, opacity: 0.3 ,overdraw:0.5,side:THREE.BackSide} )
    lowerGeom = new THREE.CylinderGeometry(0, 400*Math.tan(30/180*Math.PI), 400, 36, 3, false) ;
    var meshLowerCone = new THREE.Mesh( lowerGeom, coneMaterial ) ;
    meshLowerCone.position.set(0.0, 0.0, -200); 
    point = new THREE.Vector3(0.0, 0.0, 200.0)
    lowerGeom.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI/2 ) );
    meshLowerCone.lookAt( point );
    scene.add( meshLowerCone );

    upGeom = new THREE.CylinderGeometry(400*Math.tan(30/180*Math.PI),0, 400, 36, 3, false) ;
    var meshupCone = new THREE.Mesh( upGeom, coneMaterial ) ;
    meshupCone.position.set(0.0, 0.0, 200); 
    point = new THREE.Vector3(0.0, 0.0, 200.0)
    upGeom.applyMatrix( new THREE.Matrix4().makeRotationX( Math.PI/2 ) );
    meshupCone.lookAt( point );
    scene.add( meshupCone );

    var vertices=[];
    vertices.push(new THREE.Vector3(0,0,400),new THREE.Vector3(0,0,-400));
    var lineZ=createLineMesh(vertices,'#000',2,1);
    scene.add(lineZ);

    var materialP = new THREE.MeshBasicMaterial({color:'#000',overdraw:0.5});
    var O = new THREE.SphereGeometry(2,6,6);
    meshO = new THREE.Mesh(O,materialP);
    textO=createText('O',0,55,-10,'#000',25)
    scene.add(meshO,textO);

    var vertices=[];
    for(t=0;t<=30;t+=2) {
        ts=t*Math.PI/180;
        vertices.push(new THREE.Vector3( 0 ,20*Math.cos(ts) , 20*Math.sin(ts) ));
    }   
    lineα=createLineMesh(vertices,'#000',3,2)
    lineα.rotation.x=-Math.PI/2
    textα=createText('α',0,42,-48,'#000',25)
    scene.add(textα,lineα) 


    /////////////////////////////////////////////////
    //
    // Light source
    //
    //////////////////////////////////////////////////

    var pointLight1 = new THREE.PointLight(0xeeeeee);
    pointLight1.position.x = 0;
    pointLight1.position.y = 0;
    pointLight1.position.z = 2300;
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight(0xeeeeee);
    pointLight2.position.x = 0;
    pointLight2.position.y = 0;
    pointLight2.position.z = -2300;
    scene.add(pointLight2);

    var pointLight1 = new THREE.PointLight(0xFFFFFF);
    pointLight1.position.x = 0;
    pointLight1.position.y = 2300;
    pointLight1.position.z = 0;
    scene.add(pointLight1);

    var pointLight2 = new THREE.PointLight(0xFFFFFF);
    pointLight2.position.x = 0;
    pointLight2.position.y = -2300;
    pointLight2.position.z = 0;
    scene.add(pointLight2);
    //////////////////////////////////////////////////
    //
    // Top and bottom cone circles
    //
    ///////////////////////////////////////////////////

    var radius   = 400*Math.tan(30/180*Math.PI),
        segments = 36,
        circMat = new THREE.LineBasicMaterial( { linewidth:2,color: 0xbbbbbb} ),
        dashMaterial = new THREE.LineDashedMaterial( {linewidth:2, color: 0xbbbbbb, dashSize: 0.5, gapSize: 0.5} ),
        topBottCircGeom = new THREE.CircleGeometry( radius, segments );


    topBottCircGeom.vertices.shift();  
    topBottCircGeom.computeLineDistances();

    var circBott = new THREE.Line( topBottCircGeom, circMat);
    circBott.position.set( 0, 0, -400);
    scene.add( circBott ) ;

    var circTop = new THREE.Line( topBottCircGeom, circMat);
    circTop.position.set( 0, 0, 400);
    scene.add( circTop ) ;

    ///////////////////////////////////
    //
    // Plane
    //
    ///////////////////////////////////

    var xMax = 300, yMax = 1000;
    var XYsquareGeometry = new THREE.Geometry(); 
    XYsquareGeometry = new THREE.PlaneGeometry(xMax*2,yMax*2);
    squareMaterial = new THREE.MeshPhongMaterial({color:0x000000, transparent:true, opacity:0.3, side:THREE.DoubleSide ,overdraw:0.5});
    XYsquareMesh = new THREE.Mesh(XYsquareGeometry,squareMaterial);
    XYsquareMesh.position.set(0.0, 0, slider2V); 
    scene.add(XYsquareMesh); 

    //////////////////////////
    //
    // Conics vbles
    //
    //////////////////////////

    var ellipseMat = new THREE.LineBasicMaterial({ linewidth:2, color:0xD0011B });
    var ellipse = new THREE.Geometry();

    var parabolaMat = new THREE.LineBasicMaterial({ linewidth:2, color:0xD0011B });
    var ellipse1 = new THREE.Geometry();
    var ellipse2 = new THREE.Geometry();
    var ellipse3 = new THREE.Geometry();

    var hyperbola1 = new THREE.Geometry();
    var hyperbola2 = new THREE.Geometry();

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
    var q, s, a, b, c, C, E, A, cx, cy, rX, rY,result=[],meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,x1,x2,z1,z2,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG,linePG;
    function drawConics() {
        if(typeof ellipse != 'undefined'){
            scene.remove(ellipse,meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG,linePG);
        }
        if(typeof ellipse1 != 'undefined'){
            scene.remove(ellipse1,ellipse2,ellipse3,meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG,linePG);
        }
        if(typeof hyperbola1 != 'undefined'){
            scene.remove(hyperbola1,hyperbola2,meshC1,meshC2,meshP1,meshP2,lineMeshL,Cj,textβ,meshP3,meshP4,linerr,lineRR,textC,textD,textF,textE,lineAB,textA,textB,pointA,pointB,pointG,lineCG,lineDG,textG,linePG);
        }
        s1 = slider1V;
        s1Abs = Math.abs(s1);
        ar=60/180*Math.PI;
        q = slider1V*Math.PI;   
        a=0;
        b = slider2V; 
        s = Math.tan(q);   
        c = Math.sqrt( s*s + 1);    
        E = ((2*b*s) + (2*a)) / Math.sqrt((s*s) + 1);
        C = Math.sin(q)*Math.sin(q)*Math.cos(ar)*Math.cos(ar)-Math.cos(q)*Math.cos(q)*Math.sin(ar)*Math.sin(ar);
        A = -b*b*Math.cos(q)*Math.cos(q)*Math.cos(ar)*Math.cos(ar)/C;
        cy = -b*Math.sin(q)*Math.cos(ar)*Math.cos(ar)/C;
        rX = Math.sqrt(Math.abs(A));
        rY = Math.sqrt(Math.abs(A*Math.sin(ar)*Math.sin(ar)/C));
        
        XYsquareMesh.position.set(0.0, 0, b);
        XYsquareMesh.rotation.x = -q;   


        //椭圆
        if(slider1V > -0.5/3*2 && slider1V < 0.5/3*2) {
            ellipseVec = new THREE.Geometry();
            result=[];
            for(t=0;t<=361;t+=2) {
                ts=t*Math.PI/180;
                pY = rY*Math.cos(ts) - cy;
                if(t==0||t==180){
                    result.push([rX*Math.sin(ts),pY*Math.cos(q),-pY*Math.sin(q) + b])
                }
                ellipseVec.vertices.push(new THREE.Vector3( 
                    rX*Math.sin(ts),  
                    pY*Math.cos(q), 
                    -pY*Math.sin(q) + b
                ) );
            }   
            x1=result[0][0],y1=result[0][1],z1=result[0][2];
            x2=result[1][0],y2=result[1][1],z2=result[1][2];

            ellipse = new THREE.Line(ellipseVec, ellipseMat);
            ellipseVec.verticesNeedUpdate = true;
            scene.add(ellipse);
            
        }//抛物线
        else if(slider1V == -0.5/3*2 || slider1V == 0.5/3*2) { 
            ellipseVec = new THREE.Geometry();
            if(slider2V==0){
                if(slider1V == -0.5/3*2){
                    var vertices=[];
                    vertices.push(new THREE.Vector3(0,400*Math.tan(30/180*Math.PI),400),new THREE.Vector3(0,-400*Math.tan(30/180*Math.PI),-400))
                    ellipse=createLineMesh(vertices,'#D0011B',3,2)
                    scene.add(ellipse)
                }else{
                    var vertices=[];
                    vertices.push(new THREE.Vector3(0,400*Math.tan(30/180*Math.PI),-400),new THREE.Vector3(0,-400*Math.tan(30/180*Math.PI),400))
                    ellipse=createLineMesh(vertices,'#D0011B',3,2)
                    scene.add(ellipse)
                }
            }else{
                result=[];
                if(slider1V == 0.5/3*2){
                    ar=-ar;
                }
                for(t=0;t<180;t+=2) {
                    ts=t*Math.PI/180;
                    var ta=1/Math.tan(ts);
                    pY = 2*b*Math.cos(ar)*Math.cos(ar)/Math.sin(ar)*(ta*ta)-b/(2*Math.sin(ar));
                    if(t==90){
                        result.push([0,pY*Math.cos(ar),pY*Math.sin(ar) + b]);
                        result.push([0,pY*Math.cos(ar),pY*Math.sin(ar) + b]);
                    }
                    ellipseVec.vertices.push(new THREE.Vector3( 
                        2*b*Math.cos(ar)*Math.cos(ar)/Math.sin(ar)*ta,  
                        pY*Math.cos(ar), 
                        pY*Math.sin(ar) + b
                    ) );
                }   
                x1=result[0][0],y1=result[0][1],z1=result[0][2];
                x2=result[1][0],y2=result[1][1],z2=result[1][2];

                ellipse = new THREE.Line(ellipseVec, ellipseMat);
                ellipseVec.verticesNeedUpdate = true;
                scene.add(ellipse);
            }

        }//双曲线
        else if(slider1V < -0.5/3*2 && slider1V > -0.5||slider1V > 0.5/3*2 && slider1V < 0.5){        
            ellipseVec1 = new THREE.Geometry();
            ellipseVec2 = new THREE.Geometry();
            ellipseVec3 = new THREE.Geometry();
            result=[];
            for(t=0;t<360;t+=2) {
                if(t==90||t==270){
                    continue;
                }
                ts=t*Math.PI/180;
                pY = rY/Math.cos(ts) - cy;
                if(t==0||t==180){
                    result.push([rX*Math.tan(ts),  
                    pY*Math.cos(q), 
                    -pY*Math.sin(q) + b])
                }
                if(t<90&&t>=0){
                    ellipseVec1.vertices.push(new THREE.Vector3( 
                    rX*Math.tan(ts),  
                    pY*Math.cos(q), 
                    -pY*Math.sin(q) + b
                    ));
                }
                if(t>270){
                    ellipseVec3.vertices.push(new THREE.Vector3( 
                    rX*Math.tan(ts),  
                    pY*Math.cos(q), 
                    -pY*Math.sin(q) + b
                    ));
                }
                if(t>90&&t<270){
                    ellipseVec2.vertices.push(new THREE.Vector3( 
                    rX*Math.tan(ts),  
                    pY*Math.cos(q), 
                    -pY*Math.sin(q) + b
                    ));
                }
            }   
            x1=result[0][0],y1=result[0][1],z1=result[0][2];
            x2=result[1][0],y2=result[1][1],z2=result[1][2];

            ellipse1 = new THREE.Line(ellipseVec1, ellipseMat);
            ellipseVec1.verticesNeedUpdate = true;
            scene.add(ellipse1);
            ellipse2 = new THREE.Line(ellipseVec2, ellipseMat);
            ellipseVec2.verticesNeedUpdate = true;
            scene.add(ellipse2);
            ellipse3 = new THREE.Line(ellipseVec3, ellipseMat);
            ellipseVec3.verticesNeedUpdate = true;
            scene.add(ellipse3);
        }//二直线
        else{
            var vertices=[];
            vertices.push(new THREE.Vector3(400*Math.tan(30/180*Math.PI),0,-400),new THREE.Vector3(-400*Math.tan(30/180*Math.PI),0,400))
            hyperbola1=createLineMesh(vertices,'#D0011B',3,2)
            vertices=[]
            vertices.push(new THREE.Vector3(400*Math.tan(30/180*Math.PI),0,400),new THREE.Vector3(-400*Math.tan(30/180*Math.PI),0,-400))
            hyperbola2=createLineMesh(vertices,'#D0011B',3,2)
            scene.add(hyperbola1,hyperbola2)
        }   
        if(slider1V==-0.5||slider1V==0.5||slider2V==0&&slider1V==-0.5/3*2||slider2V==0&&slider1V==0.5/3*2){
            return;
        }
        //β
        var vertices=[];
        var v=q/Math.PI*180;
        var xp,zp;
        for(var i=90;i>=Math.abs(v);i--){
            x = 15*Math.cos(Math.PI/180*i);
            z = 15*Math.sin(Math.PI/180*i);
            vertices.push(new THREE.Vector3(x,0,z+b));
            if(i==90-Math.floor((90-Math.abs(v))/2)){
                xp=x;
                zp=z+b;
            }
        }
        Cj=createLineMesh(vertices,'#000',3,1);
        if(v<0){
            Cj.rotation.z=Math.PI/2
            xp=xp+35;
        }else{
            Cj.rotation.z=-Math.PI/2
            xp=-xp+25;
        }
        textβ=createText('β',0,xp,zp+10,'#000',25)
        scene.add(textβ,Cj) 

        //球
        if(slider1V==-0.5/3*2||slider1V==0.5/3*2){
            var u=[z1,z2];
        }else{
            var u=solveQuadratic(3*Math.pow(y1-y2,2)-Math.pow(z2-z1,2),8*(y1-y2)*(y2*z1-y1*z2),4*Math.pow(y2*z1-y1*z2,2));
        }
        
        var materialC = new THREE.MeshPhongMaterial({color:'#F67A23',transparent:false,side:THREE.BackSide,opacity:1,overdraw:true});
        var r1=Math.abs(u[0])/2;
        var sphC1 = new THREE.SphereGeometry(r1-0.2,36,18);  
        meshC1 = new THREE.Mesh(sphC1,materialC);
        meshC1.position.z=u[0];

        var r2=Math.abs(u[1])/2;
        var sphC2 = new THREE.SphereGeometry(r2-0.2,36,18);
        meshC2 = new THREE.Mesh(sphC2,materialC);
        meshC2.position.z=u[1];
        scene.add(meshC1,meshC2);

        //球与平面切点
        var k=(z1-z2)/(y1-y2);
        if(slider1V == 0.5/3*2){
            k=-Math.sqrt(3);
        }else if(slider1V == -0.5/3*2){
            k=Math.sqrt(3)
        }
        var P3 = new THREE.SphereGeometry(3,6,6);
        meshP3 = new THREE.Mesh(P3,materialP);
        var P3y=(k*y1+u[0]-z1)/(1/k+k);
        var P3z=(-1/k*P3y+u[0])
        meshP3.position.set(0,P3y,P3z);
        if(slider1V == -0.5/3*2&&slider2V!==0 || slider1V == 0.5/3*2&&slider2V!==0){
            textF=createText('B',0,P3y<0?P3y+20:P3y+60,P3z-15,'#000',25)
            var materialP = new THREE.MeshBasicMaterial({color:'#000',overdraw:0.5});
            var P1 = new THREE.SphereGeometry(3,6,6);
            meshP1 = new THREE.Mesh(P1,materialP);
            meshP1.position.set(x1,y1,z1);
            textD=createText('A',x1,y1<0?y1+20:y1+60,z1-15,'#000',25)
            scene.add(meshP1,textD);
        }else{
            textF=createText('F1',0,P3y,P3z,'#000',25)
        }
        scene.add(meshP3,textF);

        if(slider1V != -0.5/3*2 && slider1V != 0.5/3*2){
            var P4 = new THREE.SphereGeometry(3,6,6);
            meshP4 = new THREE.Mesh(P4,materialP);
            var P4y=(k*y1+u[1]-z1)/(1/k+k);
            var P4z=(-1/k*P4y+u[1])
            meshP4.position.set(0,P4y,P4z);
            textE=createText('F2',0,P4y,P4z,'#000',25)
            scene.add(meshP4,textE);
        }
         //小球切线圆环
        var rr,RR,rry,RRy;
        var k2=Math.sqrt(3);
        if(slider1V > -0.5/3*2 && slider1V < 0.5/3*2) {
            if(b<0){
                rry=(k2*y2+u[0]-z2)/(1/k2+k2);
                RRy=(k2*y2+u[1]-z2)/(1/k2+k2);
            }else{
                rry=(k2*y1+u[0]-z1)/(1/k2+k2);
                RRy=(k2*y1+u[1]-z1)/(1/k2+k2);
            }
        }else if(slider1V == -0.5/3*2 || slider1V == 0.5/3*2){
            if(slider1V == -0.5/3*2){
                k2=-k2
            }
            rry=(k2*y1+u[0]-z1)/(1/k2+k2);
        }else if(slider1V < -0.5/3*2 && slider1V > -0.5||slider1V > 0.5/3*2 && slider1V < 0.5){
            if(b<0){
                rry=(k2*y1+u[0]-z1)/(1/k2+k2);
                RRy=(k2*y1+u[1]-z1)/(1/k2+k2);
            }else{
                rry=(k2*y2+u[0]-z2)/(1/k2+k2);
                RRy=(k2*y2+u[1]-z2)/(1/k2+k2);
            }
        }
        var rrz=(-1/k2*rry+u[0]);
        rr=Math.abs(rry)-2;
        var vertices=[];
        for(t=0;t<=361;t+=2) {
            ts=t*Math.PI/180;
            vertices.push(new THREE.Vector3( rry*Math.cos(ts) ,rry*Math.sin(ts) , rrz ));
        }   
        linerr=createLineMesh(vertices,'#000',3,1)
        scene.add(linerr)

        //大球切线圆环
        if(slider1V == -0.5/3*2 || slider1V == 0.5/3*2){
            return;
        }
        var RRz=(-1/k2*RRy+u[1]);
        RR=Math.abs(RRy)-2;
        var vertices=[];
        for(t=0;t<=361;t+=2) {
            ts=t*Math.PI/180;
            vertices.push(new THREE.Vector3( RRy*Math.cos(ts) ,RRy*Math.sin(ts) , RRz ));
        }   
        lineRR=createLineMesh(vertices,'#000',3,1)
        scene.add(lineRR)


        if(slider1V > -0.5/3*2 && slider1V < 0.5/3*2){
            //椭圆长轴
            var geometryLine = new THREE.Geometry();
            geometryLine.vertices.push(new THREE.Vector3(x1,y1,z1),new THREE.Vector3(x2,y2,z2))
            lineMeshL = new THREE.Line(geometryLine, new THREE.LineBasicMaterial({color: '#000'}));
            scene.add(lineMeshL)

            textF.position.set(0,P3y+20,P3z-20);
            textE.position.set(0,P4y+20,P4z-20);
            var sphpA = new THREE.SphereGeometry(3,6,6);
            pointA = new THREE.Mesh(sphpA,materialP);
            pointA.position.set(-rry,0,rrz);
            textA=createText('A',-rry,25,rrz-30,'#000',25)
            scene.add(textA,pointA)
            var sphpB = new THREE.SphereGeometry(3,6,6);
            pointB = new THREE.Mesh(sphpB,materialP);
            pointB.position.set(-RRy,0,RRz);
            textB=createText('B',-RRy,25,RRz-30,'#000',25)
            scene.add(textB,pointB)

            vertices=[];
            vertices.push(new THREE.Vector3(-RRy,0,RRz),new THREE.Vector3(-rry,0,rrz));
            lineAB=createLineMesh(vertices,'#000',3,2);
            scene.add(lineAB)

            var sphpG = new THREE.SphereGeometry(3,6,6);
            pointG = new THREE.Mesh(sphpB,materialP);
            var zG=(y2*z1-y1*z2)/(y2-y1);
            var xG=Math.abs(zG)*Math.tan(30/180*Math.PI);
            if(slider2V>0){
                xG=-xG
            }
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

            textF.position.set(0,P3y+40,P3z-40);
            textE.position.set(0,P4y+40,P4z-40);
        }else if(slider1V < -0.5/3*2 || slider1V > 0.5/3*2){
            if(slider2V<0){
                if(slider1V<0){
                    textF.position.set(0,P3y+40,P3z-20);
                    textE.position.set(0,P4y+40,P4z);
                }else{
                    textF.position.set(0,P3y,P3z-20);
                    textE.position.set(0,P4y,P4z);
                }
            }else{
                if(slider1V<0){
                    textF.position.set(0,P3y,P3z-20);
                    textE.position.set(0,P4y,P4z);
                }else{
                    textF.position.set(0,P3y+40,P3z-20);
                    textE.position.set(0,P4y+40,P4z);
                }
            }
            var sphpA = new THREE.SphereGeometry(3,6,6);
            pointA = new THREE.Mesh(sphpA,materialP);
            pointA.position.set(-rry,0,rrz);
            textA=createText('Q1',-rry<0?-rry-30:-rry+30,50,rrz-30,'#000',25)
            scene.add(textA,pointA)
            var sphpB = new THREE.SphereGeometry(3,6,6);
            pointB = new THREE.Mesh(sphpB,materialP);
            pointB.position.set(-RRy,0,RRz);
            textB=createText('Q2',-RRy<0?-RRy-30:-RRy+30,50,RRz-30,'#000',25)
            scene.add(textB,pointB)

            vertices=[];
            vertices.push(new THREE.Vector3(-RRy,0,RRz),new THREE.Vector3(-rry,0,rrz));
            lineAB=createLineMesh(vertices,'#000',3,2);
            scene.add(lineAB)

            var sphpG = new THREE.SphereGeometry(3,6,6);
            pointG = new THREE.Mesh(sphpB,materialP);
            var zG=(y2*z1-y1*z2)/(y2-y1);
            var xG=Math.abs(zG)*Math.tan(30/180*Math.PI);
            if(slider2V>0){
                xG=-xG
            }
            pointG.position.set(xG,0,zG);
            textG=createText('P',xG,30,zG-20,'#000',25)
            scene.add(pointG,textG);

            vertices=[];
            vertices.push(new THREE.Vector3(xG,0,zG),new THREE.Vector3(-rry,0,rrz));
            lineCG=createLineMesh(vertices,'#000',3,2);
            scene.add(lineCG)

            vertices=[];
            vertices.push(new THREE.Vector3(xG,0,zG),new THREE.Vector3(0,P3y,P3z));
            lineDG=createLineMesh(vertices,'#000',3,2);
            scene.add(lineDG)

            vertices=[];
            vertices.push(new THREE.Vector3(xG,0,zG),new THREE.Vector3(0,P4y,P4z));
            linePG=createLineMesh(vertices,'#000',3,2);
            scene.add(linePG)
        }
        
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
            slider2V=[(T+mY/scale+20)/620-0.5]*800
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
                mY=(-20-T)*scale;
            }else if(T+mY/scale>600){
                mY=(600-T)*scale;
            }
            btn.css('bottom',T+mY/scale+'px');
            if(btn.parent().attr('id')=='slider1'){
                slider1V=[(T+mY/scale+20)/620-0.5]
            }else{
                slider2V=[(T+mY/scale+20)/620-0.5]*800
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
        $('#slider1 .sliderMove').css('bottom','557px');
        $('#slider2 .sliderMove').css('bottom','-20px');
        slider1V = 0.43;
        slider2V = -400;
        camera.position.set(1950,-55,670);
        listener();
    }
    if(isMob){
        $('#reset').on('touchstart',reset);
    }else{
        $('#reset').on('click',reset);
    }
})();




