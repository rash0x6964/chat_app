// Make a connection
let socket = io("http://localhost:3000");

// Query DOM
let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output"),
  feedback = document.getElementById("feedback"),
	chatTitle = document.getElementById("chatTitle"),
	joinRoom = document.getElementById("joinRoom"),
	leavRoom = document.getElementById("leaveRoom"),
	state_room1 = document.getElementById("state_room1"),
	state_room2 = document.getElementById("state_room2"),
	state_room3 = document.getElementById("state_room3"),
	windowChat = document.getElementById("chat-window"),
	clientID = document.getElementById("clientID"),
	radios = document.querySelectorAll('input[type="radio"]');

joinRoom.addEventListener("click", () => {
	for (let radio of radios) {
		if (radio.checked) {
			socket.emit("joinRoom", radio.value)
			chatTitle.innerHTML = radio.value
			//remove all the msgs
			// while (windowChat.hasChildNodes()) {
			// 	windowChat.removeChild(windowChat.firstChild);
			// }
			if (radio.value == "room1")
				state_room1.innerHTML = "joined"
			else if (radio.value == "room2")
				state_room2.innerHTML = "joined"
			else if (radio.value == "room3")
				state_room3.innerHTML = "joined"
		}
	}
});

leavRoom.addEventListener("click", () => {
	for (let radio of radios) {
		if (radio.checked) {
			socket.emit("leaveRoom", radio.value)
			chatTitle.innerHTML = radio.value
			//remove all the msgs
			// while (windowChat.hasChildNodes()) {
			// 	windowChat.removeChild(windowChat.firstChild);
			// }
			if (radio.value == "room1")
				state_room1.innerHTML = "not joined"
			else if (radio.value == "room2")
				state_room2.innerHTML = "not joined"
			else if (radio.value == "room3")
				state_room3.innerHTML = "not joined"
		}
	}
});

socket.on("connect", function () {
  console.log("Connected");

  let uuid = self.crypto.randomUUID();
	clientID.innerHTML = "Client ID: " + uuid;
  socket.emit("client_ID", uuid);
});

btn.addEventListener("click", (e) => {
  console.log("send msg");
  socket.emit("msgs", {
		msg: message.value,
    room: handle.value,
  });
});

// message.addEventListener("keypress", (e) => {
//   // socket.emit("typing", handle.value);
// });

socket.on("chatToClient", (msg) => {
	// console.log("you got this: ", msg);
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + "SomeONE" + ":</strong> " + msg + "</p>";
});

// socket.on("typing", (handle) => {
//   feedback.innerHTML = "<p><em>" + handle + " is typing a message...</em></p>";
// });


socket.on("joind", (room) => {
	console.log("The room you joined: ", room)
})

socket.on("left", (room) => {
	console.log("The room you left: ", room)
})
