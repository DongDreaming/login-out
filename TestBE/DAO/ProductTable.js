const mysql = require("mysql");
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: '2cloud'
})

function add(keys, values) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);

				var cmd = 'INSERT INTO product ' + keys + ' VALUES ' + values;
				connection.query(cmd, (err, results, fields) => {
					if (err) {
						reject(err);
					} else {
						console.log('Todo Id:' + results.insertId)
						resolve(results);
					}
				});
				connection.release();
			}
		});
	});
}

function alt(statement) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);

				const prefix = "UPDATE product SET ";
				var cmd = prefix + statement;
				console.log(cmd);

				connection.query(cmd, (err, results, fields) => {
					if (err) {
						reject(err);
					} else {
						console.log('Todo Id:' + results.insertId);
						resolve(results);
					}
				});
				connection.release();
			}
		});
	});
}

function del(id) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);

				var cmd = 'DELETE FROM product WHERE id=' + id;

				connection.query(cmd, (err, results, fields) => {
					if (err) {
						reject(err);
					} else {
						console.log('Todo Id:' + results.insertId)
					}

				});
				connection.release();
			}
		});
	});
}

function findByName(name) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);
				var statement = "SELECT * FROM product WHERE name=" + "\"" + name + "\"" + " LIMIT 1";

				connection.query(statement, (err, results, fields) => {
					if (err) {
						reject(err);
					} else {
						if (results.length === 0) {
							resolve(null);
						} else {
							resolve(results);
						}
					}
				});
				connection.release();
			}
		});
	});
}

function findById(id) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);
				var statement = 'SELECT * FROM product WHERE id=' + id + " LIMIT 1";

				connection.query(statement, (err, results, fields) => {
					if (err) {
						reject(err);
					} else {
						if (results.length === 0) {
							resolve(null);
						} else {
							resolve(results);
						}
					}
				});
				connection.release();
			}
		});
	});
}

function search(statement) {
	return new Promise((resolve, reject) => {
		pool.getConnection((err, connection) => {
			if (err) {
				reject(err);
			} else {
				console.log('connected as id ' + connection.threadId);
				const prefix = 'SELECT * FROM product WHERE ';
				var cmd = prefix + statement;

				connection.query(cmd, (err, results, fields) => {
					if (err) {
						reject(err.message);
					} else {
						resolve(results);
					}
				})
				connection.release();
			}
		});
	});
}

module.exports = {
	add: add,
	alt: alt,
	del: del,
	findById: findById,
	findByName: findByName,
	search: search
}