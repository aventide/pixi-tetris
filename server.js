var http = require('http');
var fs = require('fs');
var path = require('path');

//404 response
function send404response(res){
    res.writeHead(404, {"Content-type": "text/plain"});
    res.write("404: Page not found, bitches!");
    res.end();
}

function onRequest(req, res){
    
//    if(req.url === '/favicon.ico'){
//        req.writeHead(200, {'Content-Type': 'image/x-icon'});
//        req.end();
//        console.log("GET " + req.url);
//        return;
//    }

    
    if(req.method == 'GET' && req.url.startsWith('/')){
        
        var filePath = req.url;
        
        if(filePath == '/'){
            filePath = '/index.html';
        }
        
        filePath = __dirname+filePath;
        var extname = path.extname(filePath);
        var contentType = 'text/html';
        
        switch (extname) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
                
        }
        
        res.writeHead(200, {"Content-type": contentType});
        fs.createReadStream(filePath).pipe(res);
        console.log("GET " + req.url);
    }
    else{
        send404response(res);
    }
}

http.createServer(onRequest).listen(8888);
console.log("Server started successfully.");