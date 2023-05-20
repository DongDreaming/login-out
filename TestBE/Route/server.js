// Code documents
const express = require("express");
const app = express();
const jwt = require("../Tools/JwtTool");

const userRouter = require("./UserAPIs");
const productRouter = require("./ItemAPIs");
var respond = require("../POJO/Return");
const redis = require("../DAO/Redis");

// Server Info
const hostname = "127.0.0.1";
const port = 3000;

async function start() {
	// cross regin
	app.all("*", (req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "content-type");
		res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
		if (req.method.toLowerCase() == 'options')
			res.send(200);
		else
			next();
	});

	// public APIs
	const list = ['/user/register', '/user/login'];

	app.use((req, res, next) => {
		if (!list.includes(req.url)) {
			const token = req.headers.authorization?.split(" ")[1];
			jwt.verifyToken(token).then((data) => {
				if (data.username === null) {
					console.log("unable to get username from token")
					res.end("server crashed");
				} else if (redis.verify(data.username, token)) {
					req.username = data.username;
					next();
				} else {
					res.end(respond.WRONG_VERIFY_INFO.toString());
				}
			}).catch(e => {
				res.end(respond.WRONG_VERIFY_INFO.toString());
			})
		} else {
			next();
		}
	})

	// APIs
	app.use("/user", userRouter);
	app.use("/product", productRouter);

	// init server
	app.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});
}

exports.start = start;