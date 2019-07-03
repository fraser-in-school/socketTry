let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http)
let _dirname = '/Study/ProfessionalCourse/NodejsProject'
let readline = require('readline');
let rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

app.get('/', function(req, res){
    res.send('<h1>Hello, World</h1>');
});

app.get('/index', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    //console.log(socket)
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('chat', function(msg){
        console.log('message: ' + msg);
        //io.emit('from server', msg)
    });

    //socket.broadcast.emit('hi');
    //io.emit('from server', 'nihao')
    rl.on('line', (mes) => {
        io.emit('from server', mes);
        //socket.broadcast.emit('hi');
    });

});

http.listen(133, function(){
    console.log('listening on *:133');
});


