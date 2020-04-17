<template>
    <canvas id="renderCanvas" touch-action="none" width="1920" height="1080" tabindex="1" ref="renderCanvas"></canvas>
</template>

<script>
    import UiBtn from '@/components/UI/uiBtn';
    export default {
        data(){
            return {
                canvas: null,
                scene: null,
                engine: null,
                camera: null,
                sceneChecked: null,
            };
        },
        components:{
          UiBtn,
        },
        methods: {
            resetApp(){
                console.log('reset');
            },
            init(){
                this.canvas = this.$refs.renderCanvas;
                this.createScene();
                this.update(this.engine, this.scene);
                this.resize(this.engine);
            },
            createScene() {
                var thiz = this;
                thiz.engine = new BABYLON.Engine(this.canvas, true);
                thiz.engine.enableOfflineSupport = false;
                thiz.scene = new BABYLON.Scene(thiz.engine);
                var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), thiz.scene);
                thiz.camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), thiz.scene);
                thiz.camera.attachControl(thiz.canvas, true);
                var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, thiz.scene);
                box1.position.x = -20;
                var box2 = BABYLON.Mesh.CreateBox("Box2", 10.0, thiz.scene);


                var materialBox = new BABYLON.StandardMaterial("texture1", thiz.scene);
                materialBox.diffuseColor = new BABYLON.Color3(0, 1, 0);//Green
                var materialBox2 = new BABYLON.StandardMaterial("texture2", thiz.scene);

                //Applying materials
                box1.material = materialBox;
                box2.material = materialBox2;

                //Positioning box
                box2.position.x = 20;

                // Creation of a basic animation with box 1
                //----------------------------------------

                //Create a scaling animation at 30 FPS
                var animationBox = new BABYLON.Animation("tutoAnimation", "scaling.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                var animationBox2 = new BABYLON.Animation("tutoAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                var animationBox3 = new BABYLON.Animation("tutoAnimation", "scaling.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
                //Here we have chosen a loop mode, but you can change to :
                //  Use previous values and increment it (BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE)
                //  Restart from initial value (BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE)
                //  Keep the final value (BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT)

                // Animation keys
                var keys = [];
                //At the animation key 0, the value of scaling is "1"
                keys.push({
                    frame: 0,
                    value: 1
                });

                //At the animation key 20, the value of scaling is "0.2"
                keys.push({
                    frame: 20,
                    value: 0.2
                });

                //At the animation key 100, the value of scaling is "1"
                keys.push({
                    frame: 30,
                    value: 0.5
                });
                keys.push({
                    frame: 100,
                    value: 1
                });
                //Adding keys to the animation object
                animationBox.setKeys(keys);
                animationBox2.setKeys(keys);
                animationBox3.setKeys(keys);

                box1.animations.push(animationBox);
                box1.animations.push(animationBox2);
                box1.animations.push(animationBox3);

                //Finally, launch animations on box1, from key 0 to key 100 with loop activated
                thiz.scene.beginAnimation(box1, 0, 100, true);

                // Creation of a manual animation with box 2
                //------------------------------------------
                thiz.scene.registerBeforeRender(function () {
                    //The color is defined at run time with random()
                    box2.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());

                });


            },
            resize(engine){
                window.addEventListener('resize', function() {
                    engine.resize();
                });
            },
            update(engine, scene){
                engine.runRenderLoop( () => {
                    scene.render();
                    if (scene.useDelayedTextureLoading) {
                        var waiting = scene.getWaitingItemsCount();
//                        if (waiting <= 0) {
//                            document.getElementById("notSupported").className = "hidden";
//                        }
                    }else if (!this.sceneChecked) {
                        var remaining = scene.getWaitingItemsCount();
                        if (remaining === 0) {
                            this.sceneChecked = true;
//                            document.getElementById("notSupported").className = "hidden";
                        }
                    }
                });
            }
        },
        mounted(){
            if (!BABYLON.Engine.isSupported()) {

            } else {
                this.init();
            }

        },
    }
</script>

<style>




</style>
