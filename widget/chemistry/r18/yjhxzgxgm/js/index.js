
const threeModelImage = document.querySelector('.threeModelImage');
const stage1 = document.querySelector('#stage1');
const stage2 = document.querySelector('#stage2');
const stage3 = document.querySelector('#stage3');
const bgImage = document.querySelector('#bgImage');
const title = document.querySelector('.title_induction');

var clickStage1 = function () {
    stage1.src = './stage/stage1/index.html';
    threeModelImage.style.display = 'none';
    stage1.style.display = 'inline-block';
    bgImage.style.zIndex = 99;
    setTimeout(() => {
        bgImage.style.zIndex = -1;
    }, 1000);
}

var clickStage2 = function () {
    stage2.src = './stage/stage2/index.html';
    threeModelImage.style.display = 'none';
    stage2.style.display = 'inline-block';
    bgImage.style.zIndex = 99;
    setTimeout(() => {
        bgImage.style.zIndex = -1;
    }, 1000);
}

var clickStage3 = function () {
    stage3.src = './stage/stage3/index.html';
    threeModelImage.style.display = 'none';
    stage3.style.display = 'inline-block';
    bgImage.style.zIndex = 99;
    setTimeout(() => {
        bgImage.style.zIndex = -1;
    }, 1000);
}

var reset = function () {
    // location.reload();
    stage1.src = '';
    stage2.src = '';
    stage3.src = '';
    threeModelImage.style.display = 'inline-block';
    stage1.style.display = 'none';
    stage2.style.display = 'none';
    stage3.style.display = 'none';
}