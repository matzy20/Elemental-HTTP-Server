var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

//keep in mind http deals with text/strings
//when see <buffer> may need to toString() it
//recommend to always have a on('data') and on('end')
//order doesn't matter as it happens just about same time
var server = http.createServer(function getRequestor (req, res) {
  req.setEncoding('utf8');
  var bodyData = {};
  //need req.on('data', function() still
  req.on('data', function (data){
    //request body for posts are here
    //look into queryString and function from string to object
    bodyData = querystring.parse(data);
    console.log(data);
  });
  //req.on 'end' doesn't take in an argument
  req.on('end', function () {

    switch (req.method.toUpperCase()){

      case 'GET':
      // console.log(req);
        requestHandler(req.url);
        break;

      case 'POST':

        postHandler(req.url);
        break;
    }
  });
  //function requestHandler moved to be in getRequestor scope bc needed req.on('data')
  function requestHandler (file) {
    // console.log(file);
    var filePath = 'public/';

    if (file === '/'){
      filePath += 'index.html';
    } else {
      filePath += file +'.html';
    }
    //'utf8' as a string gets rid of need for toString()
    return fs.readFile(filePath, 'utf8', function (err, data){
      if (err) {
        res.statusCode = 404;
        res.statusMessage = "file not found";
        fs.readFile('public/404.html', 'utf8', function (err, _404) {
          res.end(_404);
        });
      } else{
        res.end(data);
      }
    });
  }

  function  postHandler (){
    //data is the body, so accessing the data is accessing the body

    var filePath = 'public/';
    var elementName;
    var elementSymbol;
    var elementAtomicNumber;
    var elementDescription;


    //use write to create a new html with brackets as its a string!

    fs.readdir(filePath, function (err, data){
      if (err){
        //check status of error
        console.log(err);
        console.log(data);
        res.statusCode = 500;
        res.statusMessage = "file not found";
        return fs.readFile('public/404.html', 'utf8', function (err, _404) {
          return res.end(_404);
        });
      } else {
        var filename = bodyData.elementName + '.html';
        if (data.indexOf(filename) === -1){
          console.log(bodyData);
          var htmlString = '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
              '<meta charset="UTF-8">' +
              '<title>The Elements - Helium</title>' +
              '<link rel="stylesheet" href="css/styles.css">' +
            '</head>' +
            '<body>' +
              'elementName + elementAtomicNumber + elementDescription +' +
              '<p><a href="/">back</a></p>' +
            '</body>' +
            '</html>';
          fs.writeFile(filePath + filename, htmlString, function (err){
            console.log(htmlString);
            res.statusCode = 200;
            res.contentType = 'application/json';
            res.contentBody = JSON.stringify({
              "success": true
            });
            res.end();
          });
        }
      }
    });
  }
});


server.listen(8080, function () {
  console.log('im listening');
});

