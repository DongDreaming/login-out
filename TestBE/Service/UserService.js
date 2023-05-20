const UserTable = require('../DAO/UserTable');

function add(user) {
	return new Promise(async (resolve, reject) => {
		// Check if user already exist
		await findByName(user.username).then(async (temp) => {
			if (temp !== null) {
				resolve(null);
			} else {
				// generate SQL command
				var key = "( ";
				var value = "( ";
				for (var keys in user) {
					if (keys != Object.keys(user).pop()) {
						key = key + keys + ", ";
						value = value + "\'" + user[keys] + "\'" + ", ";
					} else {
						key = key + keys + " )";
						value = value + "\'" + user[keys] + "\'" + " )";
					}
				}

				// execute SQL command
				await UserTable.add(key, value);
				await findByName(user.username).then((result) => {
					if (result === null) {
						resolve(-1);
					} else {
						resolve(result);
					}
				}).catch(e => {
					console.error(e);
				})
			}
		}).catch(e => {
			console.error(e);
		});
	});
}

function findByName(name) {
	return new Promise(async (resolve, reject) => {
		await UserTable.findByName(name).then((temp) => {
			resolve(temp);
		}).catch(e => {
			if (e == null) {
				resolve(null);
			} else {
				reject(e);
			}
		});
	});

}

async function verify(body) {
	var solut = { found: false, match: false };
	return new Promise(async (resolve, reject) => {
		await findByName(body.username).then((result) => {
			if (result === null) {
				resolve(solut);
			} else if (!(result.password == body.password)) {
				solut.found = true;
				resolve(solut);
			} else {
				solut.found = true;
				solut.match = true;
				resolve(solut);
			}
		}).catch(e => {
			reject(e);
		})
	});
}

module.exports = {
	add: add,
	findByName: findByName,
	verify: verify
}