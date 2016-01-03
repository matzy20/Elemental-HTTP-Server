var http = require ('http');
var fs = require ('fs');
var queryString = ('queryString');

var server = http.createServer(function elementsServer (req, res){
  req.setEncoding('utf8');
  req.on('data', function (data){


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


});

server.listen(8080, function (){
  console.log('Server is connected');
});