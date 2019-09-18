var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    var parsedUrl = url.parse(request.url);
    if(parsedUrl.pathname == '/listings'){
        response.writeHead(200, {'Content-Type': 'application/json'});
        response.end(listingData,'utf8',call);

    }
    else{
      //404
        response.writeHead(404);
        response.end('Bad gateway error');

    }
};

var call = fs.readFile('listings.json', 'utf8', function(err, data) {

    //Check for errors

    if(err) throw err;


   //Save the sate in the listingData variable already defined
    fs.readFile('./listings.json',(err2, data) => {
      if(err2) throw err2;
      //console.log(data);
        listingData = data;
    })


  //Creates the server
  server =  http.createServer(requestHandler).listen(port);

});
