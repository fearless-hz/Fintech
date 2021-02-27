//Express 프레임워크 사용 : node.js 용 가장 인기있는 웹 어플리케이션 프레임워크. 
const express = require('express');
const path=require('path');
const app = express();
//json타입에 데이터 전송을 허용
app.use(express.json());
//form 타입 데이터 전송 허용
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));//express.static이라는 정적 파일의 위치(=public)을 외부에서 쉽게 접근가능하게 공유하는 것


//뷰파일이 있는 디렉토리를 설정함.
app.set('views', __dirname + '/views');
//뷰엔진으로 ejs를 사용한다.
app.set('view engine', 'ejs');

//connection.end();
app.get('/', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
  res.send('Hello World')
})

app.get('/ejs', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('ejsTest')//view디렉토리 안의 ejsTest 파일 렌더링
  })
app.get('/designtest', function(req,res){
    res.render('designsample');
})
  //FE 데이터 받아오기 위한 라우터 생성
app.post('/userData',function(req,res){
    console.log('사용자의 요청이 발생했습니다.');
    console.log(req.body); //req.body에 데이터가 담겨있음.
    res.send(true);
})

app.get('/user', function (req, res) {
    //DB에서 데이터 가져오기
    connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  
        console.log(results);
        res.send(results) //JSON 형식으로 받아옴.
      });
    
  })

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', //매우 위험! 원래는 계정 따로 생성해야 함.
  password : 'apentk5198*',
  database : 'fintech'
});
 
connection.connect();
app.get('/hello', function (req, res) {
    res.send('만나서 반갑습니다.')
  })


 
app.listen(3000)