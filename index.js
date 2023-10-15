const express = require('express')
const socket = require('socket.io')
const {join} = require('node:path')

const app = express();


// //routes
// app.get('/', (req, res) => {
// 	// res.send('Hi it\'s my server');
// 	res.sendFile(join(__dirname, '/public/index.html'))
// })

const server = app.listen(3000, () => {
	console.log('Server running on http://localhost:3000');
})

app.use(express.static('public'))

//Socket SetUp
const io = socket(server);

io.on('connection', (socket) => {
	console.log('a user connected', socket.id)
	socket.on('disconnect', () => {
		console.log('user disconnected')
	})

	socket.on('chat', (data) => {
		console.log('get the message')
		io.sockets.emit('chat', data)
	})

	socket.on('typing', (handle) => {
		socket.broadcast.emit('typing', handle)
	})
})
