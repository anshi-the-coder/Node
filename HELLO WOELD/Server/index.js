const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url}New Req received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    // console.log(req.headers);
    // console.log(req);
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;

      case '/search':
const search = myUrl.query.search;
res.end('Here are you results for'+ search);
      default:
        res.end("404 Not Found");
    }
  });
});
myServer.listen(8000, () => console.log("Server Started:"));
