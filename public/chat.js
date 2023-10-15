// Make a connection
let socket = io('http://localhost:3000')

// Query DOM
let message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback')


btn.addEventListener('click', (e) => {
	console.log('send msg')
	socket.emit('chat', {
		handle: handle.value,
		message: message.value
	})
})

message.addEventListener('keypress', (e) => {
	socket.emit('typing', handle.value)
})

socket.on('chat', (data) => {
	feedback.innerHTML = ''
	output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + '</p>'
})

socket.on('typing', (handle) => {
	feedback.innerHTML = '<p><em>' + handle + ' is typing a message...</em></p>'
})

