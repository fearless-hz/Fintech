function aFunc() {
    setTimeout(function () {
        console.log('a');
    },1700)//1.7초 뒤 a 출력
}

function bFunc() {
    setTimeout(function () {
        console.log('b');
    },1000)//1초 뒤 b 출력
}

function cFunc() {
    setTimeout(function () {
        console.log('c');
    },500)//0.5초 뒤 c 출력
}

aFunc();
bFunc();
cFunc();
