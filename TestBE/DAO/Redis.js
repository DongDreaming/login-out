const redis = require('redis');
const client = redis.createClient('6379', '127.0.0.1');

client.on('error', (err) => {
	console.log('Redis Client Error', err);
})

// store token to redis
function storeToken(user, token, expire) {
	client.connect('6379', '127.0.0.1').then(() => {
		client.set(user, token).then((val) => {
			client.expire(user, expire).then((temp) => {
				client.quit();
			});
		});
	}).catch(e => {
		console.error(e);
	});
}

// verify toke from session with redis record
function verify(user, token) {
	return new Promise((resolve, reject) => {
		client.connect('6379', '127.0.0.1').then(() => {
			client.exists(user).then((boo) => {
				if (boo == true) {
					client.get(user).then((temp) => {
						if (temp === token) {
							resolve(true)
						}
						client.quit();
					}).catch(e => {
						reject(e);
					});
				} else {
					resolve(false);
				}
			}).catch(e => {
				reject(e);
			});
		}).catch(e => {
			reject(e);
		});
	});
}

// remove invalid token (log-off)
function delToken(user) {
	client.connect('6379', '127.0.0.1').then(() => {
		client.del(user, (err, val) => {
			if (err) {
				console.error(err);
				return;
			} else {
				console.log(val);
			}
			client.quit();
		})
	})
}

module.exports = {
	storeToken: storeToken,
	delToken: delToken,
	verify: verify
}