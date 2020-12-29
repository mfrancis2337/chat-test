//Created by M. Francis, 2020
//Shoutout to a tutorial that helped me through some of this

var port = process.env.PORT || 8080;

//Set up server
var express = require("express");               //Import express js
var app = express();                            //Express function
var server = require("http").createServer(app); //Web server
var io = require("socket.io")(server);          //Socket.io

var users = new Map();
var totalUsers = 0;
//Various messages to concatenate to the end of a join message
const joinMessages = [
	"just joined.",
	"joined the party.",
	"is here.",
	"has been summoned!",
	"appeared.",
	"just landed.",
	"just connected.",
	"arrived. Hope they brought pizza!"
];
//Various messages to concatenate to the end of a leave message
const leaveMessages = [
	"had to go. Bye!",
	"just left.",
	"had to leave.",
	"decided it was time to leave, for they had seen enough.",
	"said goodbye.",
	"just disconnected.",
	"left and took the pizza with them."
];

app.use(express.static(__dirname + '/public'));

server.listen(port, () => {
	console.log("Listening on port " + port);
});

io.on("connection", (socket) => {
	//Send information to the user
	socket.emit("info", {totalusers: totalUsers, userid: socket.id});

	socket.on("message", (data) => {
		//New chat message
		socket.broadcast.emit("newmessage", {user: data.user, message: data.message, color: data.color, links: data.links});
	});

	socket.on("join", (data) => {
		//User join
		totalUsers++;
		socket.emit("info", {totalusers: totalUsers, userid: socket.id});
		users.set(socket.id, data);
		socket.broadcast.emit("newuser", {user: data, message: joinMessages[Math.floor(Math.random() * joinMessages.length)]});
	});

	socket.on("disconnect", () => {
		//User leave
		if(totalUsers > 0) totalUsers--;
		socket.broadcast.emit("leaveuser", {user: users.get(socket.id), message: leaveMessages[Math.floor(Math.random() * leaveMessages.length)]});
		users.delete(socket.id);
	});

});