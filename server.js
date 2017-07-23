
var statica = require('node-static');
var file = new statica.Server('./build');

require('http').createServer(function (request, response) {
    if (!/\./.test(request.url)) {
        request.url = '/';
    }
    file.serve(request, response);
}).listen(3000);