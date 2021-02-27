var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', //매우 위험! 원래는 계정 따로 생성해야 함.
  password : 'apentk5198*',
  database : 'fintech'
});
 
connection.connect();
 
connection.query('SELECT * FROM fintech.user', function (error, results, fields) {
  
  console.log(results);
});
 
connection.end();