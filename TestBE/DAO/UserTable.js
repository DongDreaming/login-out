const mysql = require("mysql");
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: '2cloud'
})

function connectionTest() {
	connection.connect((err) => {
		if (err) {
			console.error('Error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	connection.end();
}

function addUser(keys, values) {
	return new Promise((resolve, reject) => {
		connection.connect((err) => {
			if (err) {
				console.error('Error connecting: ' + err.stack);
				return;
			}
			console.log('connected as id ' + connection.threadId);
		});

		var msg = 'INSERT INTO user ' + keys + 'VALUES' + values;

		connection.query(msg, (err, results, fields) => {
			if (err) {
				reject(console.error(err.message));
			}
			// get inserted id
			console.log('Todo Id:' + results.insertId);
			resolve(results);
		});

		connection.end();
	})
}

function findByName(username) {
	connection.connect((err) => {
		if (err) {
			console.error('Error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	var statement = 'SELECT * FROM user WHERE username=' + "\"" + username + "\"" + " LIMIT 1";

	connection.query(statement, (err, result, fields) => {
		if (err) {
			console.log(err.message);
		} else {
			return result;
		}
	})
	connection.end();
}


module.exports = {
	addUser: addUser,
	findByName: findByName,
}