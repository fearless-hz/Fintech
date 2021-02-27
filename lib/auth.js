const jwt = require("jsonwebtoken");
var tokenKey = "f@i#n%tne#ckfhlafkd0102test!@#%";
//f@i#n%tne#ckfhlafkd0102test!@#%
//미들웨어 : 사용자 검증하는 역할
const authMiddleware = (req, res, next) => {
  const token = req.headers["ourtoken"] || req.query.token;
  console.error(token);
  if (!token) {
    return res.status(403).json({
      server: "우리서버",
      success: false,
      message: "not logged in",
    });
  }

  //Promise : 비동기로 인해 순서대로 처리하기 위해 사용. 
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, tokenKey, (err, decoded) => { //tokenKey로 검수
      if (err) reject(err);
      resolve(decoded);
    });
  });

  const onError = (error) => {
    console.log(error);
    res.status(403).json({
      server: "우리서버",
      success: false,
      message: error.message,
    });
  };

  p.then((decoded) => {
    req.decoded = decoded;
    next();
  }).catch(onError);
};

module.exports = authMiddleware;
