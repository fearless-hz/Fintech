const request = require('request'); //'request'라는 라이브러리를 가져올 것.
var parseString = require('xml2js').parseString;    
var xml=undefined;
request('http://www.weather.go.kr/weather/forecast/mid-term-rss3.jsp?stnld=109', function (error, response, body) {
 
  xml = body;
  parseString(xml, function (err, result) {
    console.dir(result.rss.channel[0].item[0].description[0].header[0].wf[0]); //weather 사이트에서 wf 정보만 출력하기
});
});

