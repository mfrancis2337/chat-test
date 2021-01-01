//Created by M. Francis, 2020

//Potentially add cool features like bots?
//that would take up space server-end though ._.
//example bot: https://github.com/oliver-ni/poketwo

var socket = io();
var username = "Unnamed user " + Math.floor(Math.random() * 1000);
var userid = "";
var totalUsers = 1;
var selectedColor = 0;
const commandKeyWords = [
	//there's not a lot of commands right now, but that may change
	"help",
	"userid",
	"color",
	"clear"
];

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

//This is run when the client is connected to the server
socket.on("connect", () => {
	console.log("Connected");
});
//This is run when the client is disconnected from the server
socket.on("disconnect", () => {
	console.log("Disconnected");
	let message = document.createElement("p");
	message.style.fontWeight = 600;
	message.style.color = "var(--informative)";
	message.innerText = "Oops! You're not connected to the server. This might mean the server is down (or maybe you're offline).";
	document.querySelector("main").appendChild(message);
	document.querySelector("textarea").blur();
	document.querySelector("textarea").disabled = true;
});

//The server sends this information when the user enters a username
socket.on("info", (data) => {
	//Get total users and update information
	totalUsers = data.totalusers;
	document.getElementById("users").innerText = totalUsers;
	document.getElementById("the-s").innerText = (totalUsers > 1) ? "" : "s";
	//Unpack other information
	userid = data.userid;
});

//When the server sends a message sent by another user
socket.on("newmessage", (data) => {
	//Put message on screen
	let chatItem = document.createElement("p");
	let cUsername = document.createElement("span");
	cUsername.innerText = data.user + ": ";
	cUsername.style.color = "var(--color-" + data.color + ")";
	chatItem.appendChild(cUsername);
	let cMessage = document.createElement("span");
	cMessage.innerText = data.message;
	chatItem.appendChild(cMessage);
	document.querySelector("main").appendChild(chatItem);
	//Put links on the screen
	if(data.links.length > 0){
		let chatLinks = document.createElement("p");
		chatLinks.style.fontStyle = "italic";
		chatLinks.style.color = "var(--informative)";
		chatLinks.innerText = "Found these links in the above message: ";
		for(let i = 0; i < data.links.length; i++){
			if(i > 0) chatLinks.innerHTML += ", ";
			let anchorTag = document.createElement("a");
			anchorTag.href = data.links[i];
			anchorTag.innerText = data.lings[i];
			chatLinks.appendChild(anchorTag);
		}
		document.querySelector("main").appendChild(chatLinks);
	}
	document.querySelector("main").scrollIntoView(false);
});

//This is sent by the server when a new user joins (or connects)
socket.on("newuser", (data) => {
	//Put message on screen
	let chatItem = document.createElement("p");
	chatItem.style.fontWeight = 600;
	chatItem.innerText = data.user + " " + data.message;
	document.querySelector("main").appendChild(chatItem);
	//Update user counter
	totalUsers++;
	document.getElementById("users").innerText = totalUsers;
	document.getElementById("the-s").innerText = (totalUsers > 1) ? "s" : "";
});

//This is sent by the server when a user disconnects or leaves
socket.on("leaveuser", (data) => {
	//Put message on screen
	let chatItem = document.createElement("p");
	chatItem.style.fontWeight = 600;
	chatItem.innerText = data.user + " " + data.message;
	document.querySelector("main").appendChild(chatItem);
	//Update user counter
	totalUsers--;
	document.getElementById("users").innerText = totalUsers;
	document.getElementById("the-s").innerText = (totalUsers > 1) ? "s" : "";
});

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Takes what is currently entered in the chatbox and runs some tests on it. Then, it sends it to
 * the server so everyone else can see it.
 * @param {Event} e The triggering event
 */
function chat(e){
	//Prevent page reload
	e.preventDefault();
	//Get message and make sure it is long enough (don't send empty message)
	let textarea = document.querySelector("textarea");
	let value = textarea.value;
	if(value.length < 1) return;
	//Reset value
	textarea.value = "";
	//Search for command syntax
	if(value.charAt(0) === "/"){
		//Take apart command
		let command = value.substr(1, value.indexOf(" ") - 1);
		//Look for specific keywords that don't require a second parameter
		if(value.indexOf("/help") == 0) command = "help";
		if(value.indexOf("/userid") == 0) command = "userid";
		if(value.indexOf("/clear") == 0) command = "clear";
		//Command syntax
		if(commandKeyWords.indexOf(command) !== -1){
			switch(command){
				case "help":
					//List all available options
					//Create list element
					let list = document.createElement("ul");
					list.style.fontStyle = "italic";
					list.style.color = "var(--informative)";
					//Create list items
					let lItem1 = document.createElement("li");
					lItem1.innerText = "/help - shows all commands";
					list.appendChild(lItem1);
					let lItem2 = document.createElement("li");
					lItem2.innerText = "/userid - reveals your user id the server is using (to you only)";
					list.appendChild(lItem2);
					let lItem3 = document.createElement("li");
					lItem3.innerText = "/color number - changes the color of your username (must have a number 0-8)";
					list.appendChild(lItem3);
					let lItem4 = document.createElement("li");
					lItem4.innerText = "/clear - clears everything currently in the chat";
					list.appendChild(lItem4);
					//Append things to page
					document.querySelector("main").appendChild(list);
					document.querySelector("main").scrollIntoView(false);
					return;
				case "userid":
					//Put userid in chat (only visible to client)
					let messageUserID = document.createElement("p");
					messageUserID.style.fontStyle = "italic";
					messageUserID.style.color = "var(--informative)";
					messageUserID.innerText = "User id: " + userid;
					document.querySelector("main").appendChild(messageUserID);
					document.querySelector("main").scrollIntoView(false);
					return;
				case "color":
					//Change color used
					let split = value.split(" ");
					if(split[1] >= 0 && split[1] <= 8){
						selectedColor = split[1];
						let messageColorSuccess = document.createElement("p");
						messageColorSuccess.style.fontStyle = "italic";
						messageColorSuccess.style.color = "var(--informative)";
						messageColorSuccess.innerText = "Color changed successfully";
						document.querySelector("main").appendChild(messageColorSuccess);
						document.querySelector("main").scrollIntoView(false);
					} else {
						let messageColorFail = document.createElement("p");
						messageColorFail.style.fontStyle = "italic";
						messageColorFail.style.color = "var(--informative)";
						messageColorFail.innerText = "Invalid command syntax";
						document.querySelector("main").appendChild(messageColorFail);
						document.querySelector("main").scrollIntoView(false);
					}
					return;
				case "clear":
					//Clear everything in the chat
					document.querySelector("main").innerHTML = "";
					return;
				default:
					//Anything else
					let message = document.createElement("p");
					message.style.fontStyle = "italic";
					message.style.color = "var(--informative)";
					message.innerText = "Invalid command syntax";
					document.querySelector("main").appendChild(message);
					document.querySelector("main").scrollIntoView(false);
					return;
			}
		}
	} else if(value.indexOf("\\/") == 0){
		//Commands can be prevented by putting a backslash at the beginning of the message
		value = value.replace("\\/", "/");
	}
	//Find emojis
	for(let [key, val] of emojis.entries()){
		//At some point there may be a way to stop 
		value = value.replaceAll(key, val);
	}
	//Send message
	socket.emit("message", {user: username, message: value, color: selectedColor, links: []});
	//Put message on screen
	let chatItem = document.createElement("p");
	let cUsername = document.createElement("span");
	cUsername.innerText = username + ": ";
	cUsername.style.color = "var(--color-" + selectedColor + ")";
	chatItem.appendChild(cUsername);
	let cMessage = document.createElement("span");
	cMessage.innerText = value;
	chatItem.appendChild(cMessage);
	document.querySelector("main").appendChild(chatItem);
	document.querySelector("main").scrollIntoView(false);
}

/**
 * Sets the username and sends information to the server about the user joining. Then removes the
 * blur overlay.
 * @param {Event} e The triggering event
 */
function choosename(e){
	//Prevent page reload
	e.preventDefault();
	//Set username
	username = document.getElementById("username").value;
	socket.emit("join", username);
	//Fade out overlay
	document.querySelector(".bluroverlay").style.animation = "fadeOut 1s ease-in-out forwards";
	document.querySelector(".menus").style.animation = "fadeOut 1s ease-in-out forwards";
	document.querySelector("textarea").focus();
	setTimeout(() => {
		document.querySelector(".bluroverlay").style.display = "none";
		document.querySelector(".menus").style.display = "none";
	}, 1000);
}

///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * A function that runs when the client's internet cuts out (aka they go offline)
 */
function offline(){
	let message = document.createElement("p");
	message.style.fontWeight = 600;
	message.style.color = "var(--informative)";
	message.innerText = "Oops! You're offline. Please wait for your internet to come back before trying again.";
	document.querySelector("main").appendChild(message);
	document.querySelector("textarea").blur();
	document.querySelector("textarea").disabled = true;
}
/**
 * A function that runs when the client's internet returns (aka they go online)
 */
function online(){
	let message = document.createElement("p");
	message.style.fontWeight = 600;
	message.style.color = "var(--informative)";
	message.innerText = "You're back online. You may resume whatever it is you were doing.";
	document.querySelector("main").appendChild(message);
	document.querySelector("textarea").focus();
	document.querySelector("textarea").disabled = false;
}