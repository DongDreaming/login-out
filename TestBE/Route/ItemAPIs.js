const itemService = require("../Service/ItemService");
var respond = require("../POJO/Return");
const router = require("express").Router();

router.post("/newItem", async (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', async () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO);
		}

		// Call itemservice to add product
		await itemService.add(body).then((solution) => {
			if (solution === null) {
				res.end(respond.ITEM_EXIST.toString());
			} else if (solution === -1) {
				res.end("server issue, insert new product progress failed.");
			} else {
				var rsp = respond.success;
				rsp.setData(JSON.stringify(solution));
				res.write(rsp.toString());
				res.end();
			}
		}).catch(e => {
			console.error(e);
		});
	});
})

router.post("/updateItem", (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', async () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO.toString());
		}

		// Call itemService to update product details
		itemService.alt(body).then((solution) => {
			if (solution === null) {
				res.end(respond.ITEM_NOT_FOUND.toString());
			} else if (solution === -1) {
				res.end("server issue, update progress failed.");
			} else {
				var rsp = respond.success;
				rsp.setData(JSON.stringify(solution));
				res.end(rsp.toString());
			}
		});
	});
})

router.get("/delItem", (req, res) => {
	// Get product ID
	var id = req.query.id;

	// call itemservice to delete target product from system record
	itemService.del(id).then((solution) => {
		if (solution === null) {
			res.end(respond.ITEM_NOT_FOUND.toString());
		} else {
			res.end(respond.success.toString());
		}
	}).catch(e => {
		console.error(e);
	});
})

router.get("/search", (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', async () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO.toString());
		}

		// Call Itemservice to search matched product
		itemService.search(body).then((list) => {
			var rsp = respond.success;
			rsp.setData(JSON.stringify(list));
			res.end(rsp.toString());
		}).catch(e => {
			console.error(e);
		});
	});
})

module.exports = router;