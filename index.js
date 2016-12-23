const feathers = require('feathers')
const configuration = require('feathers-configuration')
const hooks = require('feathers-hooks')
const rest = require('feathers-rest') // I've disabled this for demonstrational purpose, feel free to enable it
const socketio = require('feathers-socketio')
const auth = require('feathers-authentication')

const app = feathers()

app.configure(configuration())
	.configure(rest()) // I've disabled this for demonstrational purpose, feel free to enable it
	.configure(socketio())
	.configure(hooks())

const authConfig = app.get('auth')

// Auth
app.configure(auth(authConfig))

app.use(function(req, res, next) {
	res.send({
		Now: 'that rest is enabled, it works! But when it\'s not... it doesn\'t :('
	})
})

const port = app.get('port')
const server = app.listen(port)
server.on('listening', () => console.log(`server started on ${app.get('host')}:${port}`))
