let http = require('http'),
    fs = require('fs'),
    cp = require('child_process'),
    url = require("url"),
    path = require("path");

http.createServer(function (req, res) {
    var pathname = __dirname + url.parse(req.url).pathname;  // 对于文件路径统一处理
    if (path.extname(pathname) == "") {
        pathname += "./";  // 欲打开文件的目录
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
                case ".py":
                    res.writeHead(200, { "Content-Type": "text/plain" });
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
// 自动打开默认浏览器
cp.exec('start http://127.0.0.1:8889/');  
