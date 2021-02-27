//Express 프레임워크 사용 : node.js 용 가장 인기있는 웹 어플리케이션 프레임워크. 
const express = require('express');
const request = require('request');
const jwt = require('jsonwebtoken');
var auth = require('./lib/auth');
const path=require('path');
const app = express();
var moment = require('moment');
//json타입에 데이터 전송을 허용
app.use(express.json());
//form 타입 데이터 전송 허용
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));//express.static이라는 정적 파일의 위치(=public)을 외부에서 쉽게 접근가능하게 공유하는 것

var companyId = "M202111578";

//뷰파일이 있는 디렉토리를 설정함.
app.set('views', __dirname + '/views');
//뷰엔진으로 ejs를 사용한다.
app.set('view engine', 'ejs');

//connection.end();
app.get('/', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
  res.send('Hello World');
})
app.get('/signup', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('signup');
  })
app.get('/login', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('login');
  })
app.get('/main', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('main');
  })
app.get('/balance', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('balance');
  })
app.get('/transactionList', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('transactionList');
  })

app.get('/qrcode', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('qrcode');
  })

app.get('/qrreader', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('qrreader');
  })

app.get('/withdraw', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('withdraw');
  })

app.get('/transfer', function (req, res) { //일명 라우팅. 원하는 페이지에 res로 정보 출력.
    res.render('transfer');
  })  

app.get('/authTest',auth, function(req,res){//미들웨어이므로 가운데 auth 적어줌
    res.send('정상적으로 로그인하셨다면 해당 화면이 보입니다.');
})
app.get('/authResult',function(req,res){
    var authCode = req.query.code; //데이터를 query라는 메서드로 받아옴. 그 중 code를 받아옴.
    var option = {
        method : "POST",
        url : "https://testapi.openbanking.or.kr/oauth/2.0/token",
        header : {
            'Content-Type' : 'application/x-www-form-urlencoded'
        },
        form : {
            code : authCode,
            client_id:"c1f03cf5-575c-4eca-a45d-6def791ea8d6",
            client_secret:"6b502558-663f-4c9c-988a-39dc4124219b",
            redirect_uri:"http://localhost:3000/authResult",
            grant_type :"authorization_code"  
        }
    }
    request(option, function(err, response, body){ //body에 담겨있음.
        if(err){
            console.error(err);
            throw err;
        }
        else {
            var accessRequestResult = JSON.parse(body); //JSON 타입으로 오는데 Parsing이 필요함. 오브젝트화!
            console.log(accessRequestResult);
            res.render('resultChild',{data : accessRequestResult});
        }
    })
})

app.get('/user', function (req, res) {
    //DB에서 데이터 가져오기
    connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  
        console.log(results);
        res.send(results) //JSON 형식으로 받아옴.
      });
    
  })
app.post('/signup',function(req,res){
    var userName = req.body.userName; //KEY 이름으로 OBJECT를 보내므로 맞춰줘야 함.
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    var userAccessToken = req.body.userAccessToken;
    var userRefreshToken = req.body.userRefreshToken;
    var userSeqNo = req.body.userSeqNo;

    console.log(userName,userEmail,userPassword);

    var sql = "INSERT INTO user (name, email,password, accesstoken, refreshtoken, userseqno) VALUES (?,?,?,?,?,?)";
    connection.query(sql,[userName,userEmail,userPassword,userAccessToken,userRefreshToken,userSeqNo], function (err, results) {//순서대로 윗 줄의 물음표에 들어감    
  
      if(err){
          console.error(err);
          throw err;

      }
      else{
          res.json(1);
      }
      });
})

app.post('/login',function(req,res){
    var userEmail = req.body.userEmail;
    var userPassword = req.body.userPassword;
    console.log(userEmail, userPassword)
    var sql = "SELECT * FROM user WHERE email = ?";
    connection.query(sql, [userEmail], function(err, result){
        if(err){
            console.error(err);
            res.json(0);
            throw err;
        }
        else {
            console.log(result);
            if(result.length == 0){
                res.json(3)
            }
            else {
                var dbPassword = result[0].password; //입력 pw와 DB pw 비교
                if(dbPassword == userPassword){ //맞으면 토큰 발급
                    var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%" //우리가 만든 토큰키
                    jwt.sign(
                      {
                          userId : result[0].id,
                          userEmail : result[0].email
                      },
                      tokenKey,
                      {
                          expiresIn : '10d',
                          issuer : 'fintech.admin',
                          subject : 'user.login.info'
                      },
                      function(err, token){
                          console.log('로그인 성공', token)
                          res.json(token)
                      }
                    )            
                }
                else {
                    res.json(2);
                }
            }
        }
    })
})

app.post('/list',auth, function(req,res){ //허가된 사용자만 데이터 요청하게 함.
    var user = req.decoded;
    console.log(user);
    var sql = "SELECT * FROM user WHERE id = ?";
    connection.query(sql,[user.userId], function(err, result){
        if(err) throw err;
        else {
            var dbUserData = result[0];
            console.log(dbUserData);
            var option = {
                method : "GET",
                url :  "https://testapi.openbanking.or.kr/v2.0/user/me",
                headers : {
                    Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzcwMTk2Iiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MjE5OTI2NTEsImp0aSI6IjI0NTIxYjRmLWE2ZmEtNDFkYi05MmY0LWI4NDU3NDgwNDVmOSJ9.SBPyutNiAwlu9qutjxsRQD9C1vL3tDOqFELz4gyZWx4'
                },
                qs : {
                    user_seq_no : "1100770196"
                }
            }
            request(option, function(err, response, body){ //body에 담겨있음.
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var listRequestResult = JSON.parse(body); //JSON 타입으로 오는데 Parsing이 필요함. 오브젝트화!
                    console.log(listRequestResult);
                    res.json(listRequestResult);
                }
            })
        }
    })
})

app.post('/balance',auth,function(req,res){
    //사용자 정보 조회
    //사용자 정보를 바탕으로 request(잔액조회 api) 요청 작성하기
    var user = req.decoded;
    var finusernum = req.body.fin_use_num;
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "M202111578U" + countnum; // 내 걸로 바꿔야 함.
    var transdtime = moment(new Date()).format('YYYYMMDDhhmmss');
    var sql = "SELECT * FROM user WHERE id = ?";
    connection.query(sql,[user.userId], function(err, result){
        if(err) throw err;
        else {
            var dbUserData = result[0];
            console.log(dbUserData);
            var option = {
                method : "GET",
                url :  "https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num",
                headers : {
                    Authorization : 'Bearer '+dbUserData.accesstoken
                },
                qs : {
                    
                    bank_tran_id : transId,
                    fintech_use_num : finusernum,
                    tran_dtime : transdtime
                }
            }
            request(option, function(err, response, body){ //body에 담겨있음.
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var balanceRequestResult = JSON.parse(body); //JSON 타입으로 오는데 Parsing이 필요함. 오브젝트화!
                    console.log(balanceRequestResult);
                    res.json(balanceRequestResult);
                }
            })
        }
    })
})

app.post('/transactionList',auth,function(req,res){
    //사용자 정보 조회
    //사용자 정보를 바탕으로 request(잔액조회 api) 요청 작성하기
    var user = req.decoded;
    var finusernum = req.body.fin_use_num;
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "M202111578U" + countnum; // 내 걸로 바꿔야 함.
    var transdtime = moment(new Date()).format('YYYYMMDDhhmmss');
    var sql = "SELECT * FROM user WHERE id = ?";
    connection.query(sql,[user.userId], function(err, result){
        if(err) throw err;
        else {
            var dbUserData = result[0];
            console.log(dbUserData);
            var option = {
                method : "GET",
                url :  "https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num",
                headers : {
                    Authorization : 'Bearer '+dbUserData.accesstoken
                },
                qs : {
                    
                    bank_tran_id : transId,
                    fintech_use_num : finusernum,
                    inquiry_type : 'A',
                    inquiry_base : 'D',
                    from_date : '20210225',
                    to_date : '20210225',
                    sort_order: "D",
                    tran_dtime : transdtime
                }
            }
            request(option, function(err, response, body){ //body에 담겨있음.
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var transRequestResult = JSON.parse(body); //JSON 타입으로 오는데 Parsing이 필요함. 오브젝트화!
                    console.log(transRequestResult);
                    res.json(transRequestResult);
                }
            })
        }
    })
})
app.post('/withdraw',auth,function(req,res){ //실제로는 출금내역이 transactionList에 반영되어야 함!
    console.log(req.body);
    var user = req.decoded;
    var finusernum = req.body.fin_use_num;
    var countnum = Math.floor(Math.random() * 1000000000) + 1;
    var transId = "M202111578U" + countnum; // 내 걸로 바꿔야 함.
    var transdtime = moment(new Date()).format('YYYYMMDDhhmmss');
    var sql = "SELECT * FROM user WHERE id = ?";
    connection.query(sql,[user.userId], function(err, result){
        if(err) throw err;
        
        else {
            var dbUserData = result[0];
            console.log(dbUserData);
            
            var option = {
                method : "POST",
                url :  "https://testapi.openbanking.or.kr/v2.0/transfer/withdraw/fin_num",
                headers : {
                    Authorization : 'Bearer '+ dbUserData.accesstoken ,
                    
                    'Content-Type' : 'application/json; charset=UTF-8'
                },
                //data: JSON.stringify
                
                json : ( {
                    bank_tran_id : transId,
                    cntr_account_type : "N",
                    cntr_account_num : "100000000001",
                    dps_print_content: "쇼핑몰환불",
                    fintech_use_num : finusernum,
                    tran_amt: req.body.amount,
                    tran_dtime: transdtime,
                    req_client_name: "홍길동",
                    req_client_num: "HONGGILDONG1234",
                    req_client_fintech_use_num: "120211157888932123379666",
                    transfer_purpose: "ST",
                    recv_client_name: "최현지",
                    recv_client_bank_code: "097",
                    recv_client_account_num: "300000000001",
                    sort_order: "D"
                    
                })
            }
            request(option, function(err, response, body){ //body에 담겨있음.
                if(err){
                    console.error(err);
                    throw err;
                }
                else {
                    var withdrawRequestResult = body; //JSON 형식으로 보내줬으므로 parsing이 필요없음!!
                    //console.log(withdrawRequestResult);
                    if(withdrawRequestResult.rsp_code=="A0000"){
                        var countnum2 = Math.floor(Math.random() * 1000000000) + 1;
                        var transId2 = companyId + countnum2;  
                        var transdtime2 = moment(new Date()).format('YYYYMMDDhhmmss');
                        var option = {
                            method : "POST",
                            url :  "https://testapi.openbanking.or.kr/v2.0/transfer/deposit/fin_num",
                            headers : {
                            Authorization : 'Bearer '+'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJNMjAyMTExNTc4Iiwic2NvcGUiOlsib29iIl0sImlzcyI6Imh0dHBzOi8vd3d3Lm9wZW5iYW5raW5nLm9yLmtyIiwiZXhwIjoxNjIyMDgzNjkxLCJqdGkiOiJlZjA2MWIyZC0xZTNjLTQ1YzctYjg3YS1jYWIyODgxYzZiODEifQ.exChHjG89WcO-GNWytBLyXBL1pakUmbQXjZjKJfoeeAa',
                            
                             },
                //data: JSON.stringify              
                            json : {

                                "cntr_account_type": "N",
                                "cntr_account_num": "200000000001",
                                "wd_pass_phrase": "NONE",
                                "wd_print_content": "환불금액",
                                "name_check_option":"on",
                                "tran_dtime": transdtime2,
                                "req_cnt":1,
                                "req_list":[{
                                    "tran_no":"1",
                                    "bank_tran_id": transId2,
                                    "fintech_use_num": req.body.to_fin_use_num,
                                    "print_content":"쇼핑몰환불",
                                    "tran_amt":req.body.amount,
                                    "req_client_name":"최현지",
                                    "req_client_fintech_use_num": req.body.fin_use_num,
                                    "req_client_num":"HONGGILDONG1234",
                                    "transfer_purpose":"ST",
                                    
                            
                    
                }]
                            }
                        }
                        request(option, function (error, response, body) {
                            console.log(body);
                            res.json(body)});

                    }
                   
                   // res.json(withdrawRequestResult);
                    
                    
            }
        })
    }
    })
})

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', //매우 위험! 원래는 계정 따로 생성해야 함.
  password : 'apentk5198*',
  database : 'fintech'
});
 
connection.connect();
 
app.listen(3000)