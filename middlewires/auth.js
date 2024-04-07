const jwt = require("jsonwebtoken");

const config = process.env;

verifyToken = (req, res, next) => {
  let token = extractToken(req);

  if (!token) {
    return res.send({
    success: false, error: "No token provided!", body: null 
    });
  }

  jwt.verify(token, 'JWT_SECRET', (err, decoded) => {
    if (err) {
      return res.send({
        success:false, error: "Unauthorized!", body: null
      });
    }
    console.log(decoded); // Log the decoded token
    req.user_id = decoded.id;
    next();
  });
};


function extractToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }

  
  const authJwt = {
    verifyToken: verifyToken,
  };

module.exports = authJwt;