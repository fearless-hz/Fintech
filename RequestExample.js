const request = require('request'); //'request'라는 라이브러리를 가져올 것.
var parseString = require('xml2js').parseString;    
var xml=undefined;
request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
 
  xml = body;
  parseString(xml, function (err, result) {
    console.dir(result.rss.channel);
});
});

