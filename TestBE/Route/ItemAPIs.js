const itemService = require("../Service/ItemService");
var respond = require("../POJO/Return");
const router = require("express").Router();

router.post("/newItem", (req, res) => {
	console.log("/newItem");
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
		var solution = await itemService.add(body);
		console.log("Solution:" + solution);
		if (solution === null) {
			res.end(respond.ITEM_EXIST);
		} else if (solution === -1) {
			res.end("server issue, insert new product progress failed.");
		} else {
			var rsp = respond.success;
			rsp.setData(solution);
			res.end(rsp.toString());
		}
	})
})

router.post("/updateItem", (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO);
		}

		// Call itemService to update product details
		var solution = itemService.alt(body)
		if (solution === null) {
			res.end(respond.ITEM_NOT_FOUND);
		} else if (solution === -1) {
			res.end("server issue, update progress failed.");
		} else {
			var rsp = respond.success;
			rsp.setData(solution);
			res.end(rsp.toString());
		}
	})


})

router.get("/delItem", (req, res) => {
	// Get product ID
	var id = req.query.id;

	// call itemservice to delete target product from system record
	if (itemService.del(id)) {
		res.end(respond.success);
	} else {
		res.end(respond.ITEM_NOT_FOUND);
	}
})

router.get("/search", (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO);
		}

		// Call Itemservice to search matched product
		var list = itemService.search(body)
		var rsp = respond.success;
		rsp.setData(list);
		res.end(rsp.toString());
	})
})

module.exports = router;