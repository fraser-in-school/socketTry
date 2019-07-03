const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io');

class Server{
    constructor(port=133){
        let getThis = () => this;
        this.http = http;
        this.server = new io(http);
        this.clientArr = [];
        let self = this;
        this.addSocket = function (socket) {
            console.log('a use connected');
            self.clientArr.push(socket);
           console.log(self.clientArr[0])
        }
        //console.log(this.server)
        this.server.on('connection', this.addSocket);
        this.http.listen(133, function(){
            console.log('listening on *:133');
        });
    }

    reciver(topic='chat'){
        //console.log(self.clientArr)
        this.clientArr[0].on(topic, (msg) => {
            log('message: ' + msg);
        })
    }

    sendMessage(topic= 'from server', msg){
        this.server.emit(topic, msg);
    }
}

let readline = require('readline');
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

let server = new Server(133);

rl.on('line', function () {
    server.sendMessage(undefined, 'this is server');
});

