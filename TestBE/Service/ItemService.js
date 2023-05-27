const productTable = require("../DAO/ProductTable");

function add(product) {
	return new Promise(async (resolve, reject) => {
		// if exist
		await findByName(product.name).then(async (temp) => {
			if (temp !== null) {
				resolve(null);
			} else {
				// generate sql sentence
				var keys = "( ";
				var values = "( ";

				for (var key in product) {
					if (key != Object.keys(product).pop()) {
						keys = keys + key + ", ";
						values = values + "\'" + product[key] + "\'" + ", ";
					} else {
						keys = keys + key + " )";
						values = values + "\'" + product[key] + "\'" + " )";
					}
				}

				// add product to DB
				await productTable.add(keys, values);
				await findByName(product.name).then((result) => {
					if (result === null) {
						resolve(-1);
					} else {
						resolve(result);
					}
				});
			};
		}).catch(e => {
			reject(e);
		});
	});
}

function alt(product) {
	return new Promise(async (resolve, reject) => {
		// if exist
		await findById(product.id).then(async (temp) => {
			if (temp === null) {
				resolve(null);
			} else {
				// Generate sql command
				var statement = '';
				for (var key in product) {
					if (key === 'id') {

					} else if (key != Object.keys(product).pop()) {
						statement = statement + key + "=" + "\"" + product[key] + "\"" + ", ";
					} else {
						statement = statement + key + "=" + "\"" + product[key] + "\"" + "WHERE id = " + product.id;
					}
				}

				// add product to DB
				await productTable.alt(statement);

				await findById(product.id).then((result) => {
					if (result === null) {
						resolve(-1);
					} else {
						resolve(result);
					}
				})
			};
		}).catch(e => {
			reject(e);
		})
	});
}

function del(id) {
	return new Promise(async (resolve, reject) => {
		// if exist
		await findById(id).then(async (temp) => {
			if (temp === null) {
				resolve(null);
			} else {
				await productTable.del(id);
				resolve(temp);
			}
		}).catch(e => {
			reject(e);
		});
	});
}

function search(limitation) {
	return new Promise(async (resolve, reject) => {
		var statement = '';
		for (var key in limitation) {
			switch (key) {
				case 'msg':
					if (limitation.msg === "") {
						break;
					} else {
						statement = statement + "name LIKE \'%" + limitation.msg + "%\' AND ";
						break;
					}
				case 'item_code':
					if (limitation.item_code === "") {
						break;
					} else {
						statement = statement + "item_code LIKE \'%" + limitation.item_code + "%\' AND ";
						break;
					}
				case 'l_price':
					if (limitation.l_price === "") {
						break;
					} else {
						statement = statement + "price>" + limitation.l_price + " AND ";
						break;
					}
				case 'm_price':
					if (limitation.m_price === "") {
						break;
					} else {
						statement = statement + "price<" + limitation.m_price + " AND ";
						break;
					}
				case 's_size':
					if (limitation.s_size === "") {
						break;
					} else {
						statement = statement + "size>" + limitation.s_size + " AND ";
						break;
					}
				case 'b_size':
					if (limitation.b_size === "") {
						break;
					} else {
						statement = statement + "size<" + limitation.b_size + " AND ";
						break;
					}
				case 'color':
					if (limitation.msg === "") {
						break;
					} else {
						statement = statement + "color LINK \'%" + limitation.msg + "%\' AND ";
						break;
					}
			}
		}
		statement = statement.slice(0, -5);
		await productTable.search(statement).then((list) => {
			if (list === null) {
				resolve(null);
			} else {
				resolve(list);
			}
		}).catch(e => {
			reject(e);
		});
	});
}

function findByName(name) {
	return new Promise(async (resolve, reject) => {
		await productTable.findByName(name).then((temp) => {
			if (temp === null) {
				resolve(null);
			} else {
				resolve(temp[0]);
			}
		});
	}).catch(e => {
		reject(e);
	});
}

function findById(id) {
	return new Promise(async (resolve, reject) => {
		await productTable.findById(id).then((temp) => {
			if (temp === null) {
				resolve(null);
			} else {
				resolve(temp[0]);
			}
		});
	}).catch(e => {
		reject(e);
	});
}

module.exports = {
	add: add,
	alt: alt,
	del: del,
	search: search
}