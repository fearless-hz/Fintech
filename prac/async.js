var fs = require('fs'); //파일 내부 라이브러리 가져오는 것.
console.log('첫번째 기능입니다.');

fs.readFile('example/test.txt','utf8',function(err,result){ //이름이 없는 익명함수->콜백함수:파일을 읽어온 다음에 수행하는 함수
    if (err){
        console.error(err);
        throw err;
    }
    else {
        console.error("두번째 기능인데 파일을 읽어오느라 시간이 조금 걸려요.");
        console.log(result);
    }
});

console.log("마지막 기능입니다."); //얘가 두번째 기능보다 먼저 실행됨.(비동기)