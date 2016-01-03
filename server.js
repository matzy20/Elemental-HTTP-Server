var http = require ('http');
var fs = require ('fs');
var querystring = ('querystring');

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

  function postRequests (filename){

    var elementName;
    var elementSymbol;
    var elementAtomicNumber;
    var elementDescription;

    var path = 'public/' + filename + '.html';
    var htmlString =

    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
      '<meta charset="UTF-8">' +
      '<title>The Elements - ' + elementName +'</title>' +
      '<link rel="stylesheet" href="css/styles.css">' +
    '</head>' +
    '<body>' +
      '<h1>' + elementName + '</h1>' +
      '<h2>' + elementSymbol + '</h2>'+
      '<h3>' + elementAtomicNumber + '</h3>' +
      '<p>' + elementDescription + '</p>' +
      '<p><a href="/">back</a></p>' +
    '</body>' +
    '</html>';

    fs.readDir(path, function (err, data) {
      //good habit to console status of err
      if (err){
        console.log(err);
        res.statusCode = 500;
        res.statusMessage = "Something went very wrong";
        //use return to be explicit
        return fs.readFile('public.404.html', function (err, _404){
           return res.end(_404);
        });
      } else {
        if (data.indexOf(path) === -1){

        }
      }
    });
  }


});

server.listen(8080, function (){
  console.log('Server is connected');
});