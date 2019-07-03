const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io-client');


const {log} = console


class ClientClass{
    constructor(port = 133){
        let self = this;
        this.username = 'client';
        this.socket = new io('http://localhost:' + port);
    }

    login(username){
        this.username = username;
        //this.socket.emit('login', this);
    }
    sendMessage(topic = 'chat', message){
        this.socket.emit(topic, message);
    }

    reciver(topic = this.username){
        this.socket.on(topic, (msg) => {
            log('message: ' + msg);
        })
    }
}


let arguements = process.argv.splice(2);
let client = new ClientClass();
client.login(arguements[0]);
client.sendMessage(undefined,'this is client')

let readline = require('readline');
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

rl.on('line', function (msg) {
    client.sendMessage(arguements[0], msg)
})

client.reciver()
