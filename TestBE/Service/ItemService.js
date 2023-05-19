const productTable = require("../DAO/Tables");

async function add(product) {
	console.log("/item service add product");
	console.log(product.name);
	// if exist
	var temp = await findByName(product.name, (err) => {
		console.log(err);
	})
	console.log(temp);
	// if (!(temp === null)) {
	// 	return null;
	// }

	// // generate sql sentence
	// var keys = "( ";
	// var values = "( ";

	// for (var key in product) {
	// 	if (key != Object.keys(product).pop()) {
	// 		keys = keys + key + ", ";
	// 		values = values + "\'" + user[key] + "\'" + ", ";
	// 	} else {
	// 		keys = keys + key + " )";
	// 		values = values + "\'" + user[key] + "\'" + " )";
	// 	}
	// }

	// // add product to DB
	// productTable.add(keys, values);

	// var solution = findByName(product.name)
	// if (solution === null) {
	// 	return -1;
	// } else {
	// 	return solution;
	// }

}

async function alt(product) {
	// if exist
	var temp = await findById(product.id);
	if (temp === null) {
		return null;
	}

	// Generate sql command
	var statement = '';
	for (var key in product) {
		if (key === 'id') {

		} else if (key != Object.keys(product).pop()) {
			statement = key + "=" + product[key] + ", ";
		} else {
			statement = key + "=" + product[key] + "WHERE id = " + product.id;
		}
	}

	// add product to DB
	await productTable.altProduct(product.id, statement);

	var solution = await findById(product.id)
	if (solution === null) {
		return -1;
	} else {
		return solution;
	}
}

async function del(id) {
	// if exist
	var temp = findById(product.id);
	if (temp === null) {
		return null;
	}

	await productTable.delProduct(id);
	return true;
}

async function search(limitation) {
	var statement = '';
	for (var key in limitation) {
		switch (key) {
			case 'msg':
				statement = statement + "name LINK \'%" + limitation.msg + "%\' AND";
				break;
			case 'item_code':
				statement = statement + "item_code LIKE \'%" + limitation.item_code + "%\' AND";
				break;
			case 'l_price':
				statement = statement + "price>" + limitation.l_price + " AND";
				break;
			case 'm_price':
				statement = statement + "price<" + limitation.m_price + " AND";
				break;
			case 's_size':
				statement = statement + "size>" + limitation.s_size + " AND";
				break;
			case 'b_size':
				statement = statement + "size<" + limitation.b_size + " AND";
				break;
			case 'color':
				statement = statement + "color LINK \'%" + limitation.msg + "%\'";
				break;
		}
	}

	var list = await productTable.psearch(statement);
	if (list === null) {
		return null;
	} else {
		return list[0];
	}
}

async function findByName(name) {
	console.log("find by name activated");
	await productTable.pfindByName(name).then((temp) => {
		console.log(temp);
		console.log("find by name returning");
		if (temp === null) {
			return null;
		} else {
			return temp;
		}
	});


}

async function findById(id) {
	return await productTable.pfindById(id);
}

module.exports = {
	add: add,
	alt: alt,
	del: del,
	search: search
}