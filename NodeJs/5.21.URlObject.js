var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log(q.host); //returns 'localhost:8080'
console.log(q.pathname); //returns '/default.htm'
console.log(q.search); //returns '?year=2017&month=february'

var qdata = q.query; //returns an object: { year: 2017, month: 'february' }
console.log(qdata.month); //returns 'february'


var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
    // Parse the URL to extract information
    var q = url.parse(req.url, true);

    // Construct the file path by prepending a dot (.) to the pathname
    var filename = "." + q.pathname;

    // Read the contents of the specified file asynchronously
    fs.readFile(filename, function (err, data) {
        if (err) {
            // If the file is not found, respond with a 404 status code
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }

        // If the file is found, respond with a 200 status code
        res.writeHead(200, { 'Content-Type': 'text/html' });
        
        // Write the file content to the response
        res.write(data);
        
        // End the response
        return res.end();
    });
}).listen(8080);

console.log('Server running at http://localhost:8080/');
