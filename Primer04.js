var http = require("http").createServer("handler");
var firmata = require("firmata");
var io = require("socket.IO").listen(http);  
var fs = require("fs"); 


var board = new firmata.Board("/dev/ttyACM0", function(){
    
    console.log("Priklop na Arduino");  
    board.pinMode(13, board.MODES.OUTPUT); 
});

function handler(req, res) {    
    fs.readFile("_dirname" + "/primer04",
    function (err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            return res.end("Napaka pri nalaganju html strani");
        }
        res.writeHead(200);
        res.end(data);
    });
}
http.listen(8080);

io.sockets.on("connection", function(socket) {
    socket.on("ukazArduinu", function(štUkaza) {
        if (štUkaza == "1") {
            board.digitalWrite(13, board.HIGH); // zapišemo +5V na p. 13
        }
        if (štUkaza == "0") {
            board.digitalWrite(13, board.LOW); // zapišemo 0V na pin13
        }
    });
});

