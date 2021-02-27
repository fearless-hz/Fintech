var http = require("http");

console.log("server start");
http.createServer(function (req, res) { //request와 response를 파라미터로 받아 서버 생성.
	var body = "hello Server";
	res.setHeader('Content-Type', 'text/html; charset=utf-8');
	res.end("<html><h1>안녕하세요. 반갑습니다.<h1><html>"); //웹으로 구현하려면 html 써줘야 함.
}).listen(3000); //3000번 포트에서 듣고있다.
