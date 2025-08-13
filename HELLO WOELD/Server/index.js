const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}:${req.method} ${req.url}New Req received\n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);
  fs.appendFile("log.txt", log, (err, data) => {
    // console.log(req.headers);
    // console.log(req);
    switch (myUrl.pathname) {
      case "/":
       if(req.method==='GET') res.end('Homepage');
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi, ${username}`);
        break;

      case '/search':
const search = myUrl.query.search;
res.end('Here are you results for'+ search);
      case '/signup':
      if(req.method==='GET') res.end('This is a Signup form')
        else if(req.method=== 'POST'){
      //DB query
      res.end("Success");
      } 
      default:
        res.end("404 Not Found");
    }
  });
});
myServer.listen(8000, () => console.log("Server Started:"));
