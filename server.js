'use strict';

const Koa = require('koa')
const route = require('koa-route')
const staticServe = require('koa-static')
const send = require('koa-send')
const http2 = require('spdy')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const fs = require('fs');

const { getUserByName, getUserById } = require('./db/controller')

const server = new Koa();
const ssl = {
	key: fs.readFileSync('keys/server.key'),
	cert: fs.readFileSync('keys/server.crt')
};

const port = 8080;

server.proxy = true;

server.use(bodyParser());
server.use(session(server));

server.keys = ['foobag'];

passport.use(new LocalStrategy((username, password, next) => {
	getUserByName(username)
		.then(user => {
			user && password === user.password
				? next(null, user)
				: next(null, false)
		})
		.catch(error => next(error))
}));

passport.serializeUser((user, next) => next(null, user.id));

passport.deserializeUser(async function(id, next) {
    try {
        const user = await getUserById(id);
        next(null, user)
    } catch(err) {
        next(err)
    }
});

server.use(passport.initialize());
server.use(passport.session());

server.use(route.post('/login', callback => {
    return passport.authenticate('local', (err, user, info, status) => {
        if (!user) {
            callback.type = 'json';
            callback.body = { success: false };
            callback.status = 401
        } else {
            callback.body = { id: user.id, username: user.username };
            return callback.login(user);
        }
    })(callback)
}));

server.use(route.get('/logout', callback => {
    callback.logout();
    callback.status = 200;
    callback.type = 'json';
    callback.body = { success: true };
}));

server.use(staticServe('public'));

server.use(async function (ctx, next) {
	await send(ctx, 'public/index.html');
	return next()
});

// Run it!
http2.createServer(ssl, server.callback()).listen(port, () => {
	console.log('Hosted on port: ' + port + ' 🙌🏼 ');
});
