var pageStyle = () => {

    var pinchImg = document.getElementById("test");
    Transform(pinchImg);
    var initScale = 1;
    new AlloyFinger(pinchImg, {
        multipointStart: function() {
            initScale = pinchImg.scaleX;
        },
        pinch: function(evt) {
            pinchImg.scaleX = pinchImg.scaleY = initScale * evt.zoom;
        }
    });
    new AlloyFinger(pinchImg, {
        pressMove: function(evt) {
            let w = window.innerWidth;
            let h = window.innerHeight;
            pinchImg.translateX += evt.deltaX;
            pinchImg.translateY += evt.deltaY;
            evt.preventDefault();



        }
    });

}


let adaptive = {
    pageStyle
}
export default adaptive;