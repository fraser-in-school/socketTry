const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io-client');


const {log} = console


class ClientClass{

    /*构造器*/
    constructor(port = 133){
        let self = this;    //保留对象的上下文
        this.username = 'client';   //用户名默认为client
        this.socket = new io('http://localhost:' + port); //默认端口为133
    }

    /*显示的设置用户名*/
    login(username){
        this.username = username;
        //this.socket.emit('login', this);
    }

    /*server和单个client通信使用username作为事件名*/
    sendMessage(topic = this.username, message){
        this.socket.emit(topic, message); //发送消息
    }

    /*显式的去监听，开始的想法，但其实好像这样的做法不是很好*/
    reciver(topic = this.username){
        this.socket.on(topic, (msg) => {
            log('message: ' + msg);
        })
    }
}

/*使用命令行参数来获得用户名*/
let arguements = process.argv.splice(2);

let client = new ClientClass();

client.login(arguements[0]);    //参数绑定为用户名
client.sendMessage(undefined,'this is client')

/*使用控制台来发送消息*/
let readline = require('readline');
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

rl.on('line', function (msg) {
    client.sendMessage(undefined, msg)
})

/*监听默认的端口*/
client.reciver()
