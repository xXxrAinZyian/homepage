var http = require('http'), // 引入需要的模块
    fs = require('fs'),//引入文件读取模块
    cp = require('child_process'),  // 可自动打开浏览器模块
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;  // 对于文件路径统一处理
    if (path.extname(pathname) == "") {
        pathname += "/html/";  // 欲打开文件的目录
    }
    if (pathname.charAt(pathname.length - 1) == "/") {
        pathname += "index.html";  // 默认打开的文件
    }
    fs.exists(pathname, function (exists) {
        if (exists) {
            switch (path.extname(pathname)) { // 不同文件返回不同类型
                case ".html":
                    res.writeHead(200, { "Content-Type": "text/html" });
                    break;
                case ".js":
                    res.writeHead(200, { "Content-Type": "text/javascript" });
                    break;
                case ".css":
                    res.writeHead(200, { "Content-Type": "text/css" });
                    break;
                case ".gif":
                    res.writeHead(200, { "Content-Type": "image/gif" });
                    break;
                case ".jpg":
                    res.writeHead(200, { "Content-Type": "image/jpeg" });
                    break;
                case ".png":
                    res.writeHead(200, { "Content-Type": "image/png" });
                    break;
                default:
                    res.writeHead(200, { "Content-Type": "application/octet-stream" });
            }
            fs.readFile(pathname, function (err, data) {
                console.log((new Date()).toLocaleString() + " " + pathname);
                res.end(data);
            });
        } else {  // 找不到目录 时的处理
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>404 Not Found</h1>");
        }
    });

}).listen(8889, "127.0.0.1");  // 监听端口

console.log("Server running at http://127.0.0.1:8889/");
cp.exec('start http://127.0.0.1:8889/');  // 自动打开默认浏览器
