var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, body) {
  return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="index.html">WEB</a></h1>
      ${list}
      ${body}
    </body>
    </html>
  `;
}

function templateList(filelist) {
  var list = '<ul>';
  for (let i = 0; i < filelist.length; i++){
    list = list+ `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname

  if (pathname === '/') {
    if (queryData.id === undefined) {

      fs.readdir('./data', function (err, filelist) {
        var title = 'Welcome'
        var description = 'Hello, Node.js';
        var list = templateList(filelist)
        var template = templateHTML(title, list,
          `<h2>${title}</h2>${description}`);
        response.writeHead(200);
        response.end(template);
      })
      
    } else {
      fs.readdir('./data', function (err, filelist) {
        fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
          var title = queryData.id
          var list = templateList(filelist)
          var template = templateHTML(title, list,
            `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        })
      })
    }
  } else {
    response.writeHead(404);
    response.end('Not found');
  }

  
  
 
});
app.listen(3000);