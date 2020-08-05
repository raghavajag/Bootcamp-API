// @desc  Log Requests to console
const colors = require("colors");
const makeid = () => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
const methodColor = (method) => {
  if (method === "GET") {
    return colors.green(method);
  } else if (method === "POST") {
    return colors.magenta(method);
  } else if (method === "DELETE") {
    return colors.red(method);
  } else {
    return colors.gray(method);
  }
};
const statusColor = (statusCode, statusMessage) => {
  if (statusCode.toString() === "200" || statusCode.toString() === "201") {
    return colors.bold.green(`${statusCode} ${statusMessage}`);
  } else if (statusCode.toString() === "404") {
    return colors.bold.red(`${statusCode} ${statusMessage}`);
  } else if (statusCode.toString() === "304") {
    return colors.bold.cyan(`${statusCode} ${statusMessage}`);
  } else if (statusCode.toString() === "403") {
    return colors.bold.bgRed(`${statusCode} ${statusMessage}`);
  } else {
    return colors.grey(`${statusCode} ${statusMessage}`);
  }
};
const logger = (req, res, next) => {
  req.requestId = makeid();
  const requestId = `[${req.requestId}]`;
  console.log(`${colors.black("                         ")}`);

  console.log(
    `${colors.bold.grey.black(requestId)}  ${methodColor(req.method)} ${
      req.protocol
    }://${req.get("host")}${req.originalUrl}`
  );
  res.on("finish", () => {
    console.info(
      `${statusColor(res.statusCode, res.statusMessage)} ${colors.gray(
        res.get("Content-Length") || 0
      )} ${colors.gray("b sent")}`
    );
    console.log(`${colors.black("                         ")}`);
  });
  next();
};
module.exports = logger;
