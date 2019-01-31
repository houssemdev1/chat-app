var express = require("express")
var mongoose = require("mongoose")
var bodyParser = require("body-parser")
//const path = require('path');
var app = express()
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    next();
  });
var http = require("http").Server(app)
var io = require("socket.io")(http)
var conString = "mongodb://localhost:27017/chat";
const userSchema = require('../server/models/user');
/*app.use(express.static(__dirname, 'ChatAngular6'));

app.get('*', (req, res) => {     res.sendFile(path.join(__dirname, '/src/app/app.component.html'));
 });*/


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))



var Chats = mongoose.model("Chats", {
  user: String,
  chat: String,
  ladate: String,
})

mongoose.connect(conString, (err) => {
  console.log("Database connection")
})


app.get("/chats", (req, res) => {
  Chats.find({}, (error, chats) => {
    res.send(chats)
  })
})


//ajout utilisateur
app.post('/userRegister', (req, res) => {
    console.log("ajout");
    {
        var user = new userSchema(req.body);
        user.save();
        res.status(200).json("Success register");
    };
    (error) => {
        res.sendStatus(500)
        console.error(error)
    }
});
//s'identifier
app.post('/veriflogin', async (req, res) => {
    const result = await userSchema.findOne({
        userEmail: req.body.userEmail
    });
    if (!result) {
        res.send({
            msg: 'not exist'
        });

    }
    res.send({  messg: 'exist',result});


});

//get user by email
app.get('/uerbyid/:id', async (req, res) => {
    console.log(req.params.id)
        const result = await userSchema.findById(
           req.params.id
        );
      
        res.send({ result });
    
    
    });
    //get user by email
app.get('/allusers', async (req, res) => {
  
        const result = await userSchema.find();
      
        res.send({ result });
        console.log(result)
    
    });
    io.on("connection", (socket) => {
        console.log("Socket is connected...")
      
        socket.on('message', function () {
      
          /*io.in().emit('new message', {
            message: chat,
      
          });*/
      
          console.log('new message in socket')
        })
  app.post("/chats", (req, res) => {
    {
      console.log(' invoc post method')
      console.log('req==>', req.body)
      var chat = new Chats(req.body)
      chat.save()
      res.sendStatus(200)
      //Emit the event
      io.emit("chat")
      res.send(chat);
    }(error) => {
      res.sendStatus(500)
      console.error(error)
    }
  })

  socket.on('join', function(data2){
    //joining
    //socket.join(data2);
    io.emit('broadcast', {user:data2.user, message:': has joined this room chat.'}); // emit an event to all connected sockets
   //socket.broadcast.to(data2).emit('new user joined', {user:data2.user, message:'has joined this room chat.'});
    console.log(data2.user + ' : joined the chat ');


  });

  /*socket.on('userjoin', function (dataUser) {

    io.in(dataUser).emit('userjoin', {
      name: dataUser.user
    });
    console.log("new user join...", dataUser.user)
  })*/

})

app.listen(8010, () => {
  console.log(" I am listening on 8010")


})
