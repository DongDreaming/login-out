const userService = require("../Service/UserService");
var respond = require("../POJO/Return");
const router = require("express").Router();
const bodyParser = require("body-parser");
const jwt = require("../Tools/JwtTool");
const redis = require("../DAO/Redis");

var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

router.post("/register", urlencodedParser, (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', () => {
		body = JSON.parse(body);
		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO.toString());
		}

		// call userservice to add
		var result = userService.add(body)
		if (result === null) {
			res.end(respond.USER_EXIST.toString());
		} else if (result === -1) {
			res.end("server issue, insert progress failed");
		} else {
			var rsp = respond.success;
			rsp.setData(JSON.stringify(result));
			res.end(rsp.toString());
		}
	})
})

router.post("/login", urlencodedParser, (req, res) => {
	// receive data
	var body = '';
	req.on('data', (chunk) => {
		body += chunk;
	})
	req.on('end', () => {
		body = JSON.parse(body);

		// if null
		if (body === null) {
			res.end(respond.MISSING_INFO.toString());
		}

		// call userservice to check if info correct
		var solut = userService.verify(body)
		if (solut.found) {
			if (solut.match) {
				// Create token for user
				var token = jwt.createToken(body.username);

				// Keep token in SQL
				redis.storeToken(body.username, token, jwt.expire, (err) => {
					console.error(err, "token存储失败");
				});

				// Return token to user browser
				var rsp = respond.success;
				rsp.setData(token);
				res.end(rsp.toString());
			} else {
				res.end(respond.WRONG_VERIFY_INFO.toString());
			}
		} else {
			res.end(respond.USER_NOT_FOUND.toString());
		}
	})
})

router.get("/logout", (req, res) => {
	redis.delToken(req.user.username, (err) => {
		console.error(err, "Unable to get current username");
	});
	res.end(respond.success);
})

module.exports = router;