const jwt = require("jsonwebtoken");
const config = require("../config/base");

const auth = {};

/*
    Create json web token
*/
auth.createUserToken = user => {
  const payload = user.toJSON();
  return jwt.sign(payload, config.USER_SECRET_TOKEN);
};

/*
    Get payload from token
*/
auth.getPayload = bearerToken => {
  let token = bearerToken.split(" ")[1];
  return jwt.decode(token);
};

/*
    Get payload from token
*/
auth.complete0 = number => {
  let complete = "";

  switch (number.length) {
    case 1:
      complete = "0000" + number;
      break;
    case 2:
      complete = "000" + number;
      break;
    case 3:
      complete = "00" + number;
      break;
    case 4:
      complete = "0" + number;
      break;
    case 5:
      complete = number;
      break;
  }

  return complete;
};

module.exports = auth;