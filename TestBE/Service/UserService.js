const UserTable = require('../DAO/UserTable');

async function add(user) {
	// Check if user already exist
	var temp = await findByName(user.username)
	if (!(temp === null)) {
		return null;
	}

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
	var result = await findByName(user.username);
	if (result === null) {
		return -1;
	} else {
		return result;
	}
}

async function findByName(name) {
	return await UserTable.findByName(name);
}

async function verify(body) {
	var solut = { found: false, match: false };
	var result = await findByName(body.username)
	if (result === null) {
		return solut;
	} else if (!(result.password === body.password)) {
		solut.found = true;
		return solut;
	} else {
		solut.found = true;
		solut.match = true;
		return solut;
	}
}

module.exports = {
	add: add,
	findByName: findByName,
	verify: verify
}