var http = require ('http');
var fs = require ('fs');
var querystring = require('querystring');

var server = http.createServer(function elementsServer (req, res){
  req.setEncoding('utf8');

  var bodyData = {};
  req.on('data', function (data){

    //Deserialize a query string to an object
    bodyData = querystring.parse(data);
    console.log(data);

  });

  //no arguments passed through for 'end'
  req.on('end', function (){

    switch (req.method.toUpperCase()){

      case 'GET':
        getRequests(req.url);
      break;

      case 'POST':
        postRequests(req.url);
      break;
    }
  });

  function getRequests (filename){
    var root = 'public/';
    var path = 'public/' + filename + '.html';

    if (filename === '/'){
      root += 'index.html';
    } else {
        return fs.readFile(path, function (err, data){
          if (err){
            res.statusCode = 404;
            res.statusMessage = 'File not found';
            fs.readFile('public/404.html', function (err, _404){
              res.end(_404);
            });
          } else {
            res.end(data);
            }
        });
      }
  }

  function postRequests (){

    var elementName;
    var elementSymbol;
    var elementAtomicNumber;
    var elementDescription;
    var filename = bodyData.elementName + '.html';
    var filePath = 'public/';
    var htmlString =

    '<!DOCTYPE html>' + '\n' +
    '<html lang="en">' + '\n' +
    '<head>' + '\n' +
      '<meta charset="UTF-8">' + '\n' +
      '<title>The Elements - ' + bodyData.elementName +'</title>' + '\n' +
      '<link rel="stylesheet" href="css/styles.css">' + '\n' +
    '</head>' + '\n' +
    '<body>' + '\n' +
      '<h1>' + bodyData.elementName + '</h1>' + '\n' +
      '<h2>' + bodyData.elementSymbol + '</h2>'+ '\n' +
      '<h3>' + bodyData.elementAtomicNumber + '</h3>' + '\n' +
      '<p>' + bodyData.elementDescription + '</p>' + '\n' +
      '<p><a href="/">back</a></p>' + '\n' +
    '</body>' + '\n' +
    '</html>';
    //readDir returns an ARRAY of html file names
    fs.readdir(filePath, function (err, data) {
      //good habit to console status of err
      if (err){
        console.log(err);
        /*unable to create or find path, something wrong with server,
        so very bad*/
        res.statusCode = 500;
        res.statusMessage = "Something went very wrong";
        //use return to be explicit
        return fs.readFile('public.404.html', function (err, _404){
           return res.end(_404);
        });
      } else {
        if (data.indexOf(filename) === -1){
          return fs.writeFile(filePath + filename, htmlString, function (err){
            console.log(htmlString);
            res.statusCode = 200;
            res.contentType = 'application/json';
            //method converts a JavaScript value to a JSON string
            res.contentBody = JSON.stringify({
              "success" : true
            });
            res.end();
          });
        }
      }
    });
  }


});

server.listen(8080, function (){
  console.log('Server is connected');
});