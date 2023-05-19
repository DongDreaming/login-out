const redis = require('redis');
const client = redis.createClient({
	socket: {
		host: '127.0.0.1',
		port: '6379'
	}
})

client.on('error', (err) => {
	console.log('Redis Client Error', err);
})

// store token to redis
async function storeToken(user, token, expire) {
	await client.connect();
	await client.set(user, token);
	await client.expire(user, expire);
	await client.disconnect();
}

// verify toke from session with redis record
async function verify(user, token) {
	await client.connect();
	if (await client.exists(user)) {
		if (await client.get(user) === token) {
			return true;
		}
	} else {
		return false;
	}
	await client.disconnect();
}

// remove invalid token (log-off)
async function delToken(user) {
	await client.connect();
	await client.del(user);
	await client.disconnect();
}

module.exports = {
	storeToken: storeToken,
	delToken: delToken,
	verify: verify
}