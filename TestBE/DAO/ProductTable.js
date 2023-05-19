// const mysql = require("mysql");
// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: '123456',
// 	database: '2cloud'
// })

// function add(keys, values) {
// 	console.log("product table add record to database.");
// 	return new Promise((resolve, reject) => {
// 		connection.connect((err) => {
// 			if (err) {
// 				console.error('Error connecting: ' + err.stack);
// 				return;
// 			}
// 			console.log('connected as id ' + connection.threadId);
// 		})

// 		var cmd = 'INSERT INTO product ' + keys + ' VALUES ' + values;

// 		connection.query(cmd, (err, result, fields) => {
// 			if (err) {
// 				return console.error(err.message);
// 			}
// 			console.log('Todo Id:' + results.insertId)
// 			resolve(null);
// 		})

// 		connection.end();
// 	})
// }

// function alt(id, statement) {
// 	connection.connect((err) => {
// 		if (err) {
// 			console.error('Error connecting: ' + err.stack);
// 			return;
// 		}
// 		console.log('connected as id ' + connection.threadId);
// 	})

// 	const prefix = "UPDATE product SET ";
// 	var cmd = prefix + statement;

// 	connection.query(cmd, (err, result, fields) => {
// 		if (err) {
// 			return console.error(err.message);
// 		}
// 		console.log('Todo Id:' + results.insertId)
// 	})

// 	connection.end();
// }

// function del(id) {
// 	connection.connect((err) => {
// 		if (err) {
// 			console.error('Error connecting: ' + err.stack);
// 			return;
// 		}
// 		console.log('connected as id ' + connection.threadId);
// 	})

// 	var cmd = 'DELETE FROM product WHERE id=' + id;

// 	connection.query(cmd, (err, result, fields) => {
// 		if (err) {
// 			return console.error(err.message);
// 		}
// 		console.log('Todo Id:' + results.insertId)
// 	})

// 	connection.end();
// }

// function findByName(name) {
// 	console.log("product table activated");
// 	connection.connect((err) => {
// 		if (err) {
// 			console.error('Error connecting: ' + err.stack);
// 			return;
// 		} else {
// 			console.log('connected as id ' + connection.threadId);
// 		}
// 	});
// 	console.log("connection established");

// 	var statement = "SELECT * FROM product WHERE name=" + "\"" + name + "\"" + " LIMIT 1";

// 	connection.query(statement, (err, result, fields) => {
// 		if (err) {
// 			console.log(err);
// 			return console.error(err.message);
// 		} else {
// 			console.log(result);
// 			return result;
// 		}
// 	})

// 	connection.end();

// }

// function findById(id) {
// 	return new Promise((resolve, reject) => {
// 		connection.connect((err) => {
// 			if (err) {
// 				console.error('Error connecting: ' + err.stack);
// 				return;
// 			}
// 			console.log('connected as id ' + connection.threadId);
// 		});

// 		var statement = 'SELECT * FROM product WHERE id=' + id + " LIMIT 1";

// 		connection.query(statement, (err, result, fields) => {
// 			if (err) {
// 				return reject(err.message);
// 			} else {
// 				return resolve(result);
// 			}
// 		})

// 		connection.end();
// 	})
// }

// function search(statement) {
// 	return new Promise((resolve, reject) => {
// 		connection.connect((err) => {
// 			if (err) {
// 				console.error('Error connecting: ' + err.stack);
// 				return;
// 			}
// 			console.log('connected as id ' + connection.threadId);
// 		});

// 		const prefix = 'SELECT * FROM product WHERE ';
// 		var cmd = prefix + statement;

// 		connection.query(cmd, (err, result, fields) => {
// 			if (err) {
// 				return reject(err.message);
// 			} else {
// 				return resolve(result);
// 			}
// 		})

// 		connection.end();
// 	})
// }

// module.exports = {
// 	add: add,
// 	alt: alt,
// 	del: del,
// 	findById: findById,
// 	findByName: findByName,
// 	search: search
// }