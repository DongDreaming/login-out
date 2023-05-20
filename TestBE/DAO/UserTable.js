const mysql = require("mysql");
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: '2cloud'
})

function connectionTest() {
	pool.getConnection((err) => {
		if (err) {
			console.error('Error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	connection.release();
}

function add(keys, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);
				var msg = 'INSERT INTO user ' + keys + 'VALUES' + values;

				connection.query(msg, (err, results, fields) => {
					if (err) {
						reject(console.error(err.message));
					} else {
						// get inserted id
						console.log('Todo Id:' + results.insertId);
						resolve(results);
					}

					connection.release();
				});
			}
		});
	})
}

function findByName(username) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function (err, connection) {
			if (err) {
				reject(err.message);
			} else {
				console.log('connected as id ' + connection.threadId);
				var statement = 'SELECT * FROM user WHERE username=' + "\"" + username + "\"" + " LIMIT 1";

				connection.query(statement, (err, result, fields) => {
					if (err) {
						reject(err.message);
					} else {
						if (result.length === 0) {
							reject(null);
						} else {
							resolve(result[0]);
						}
					}
					connection.release();
				})

			}
		});
	})
}


module.exports = {
	add: add,
	findByName: findByName,
}