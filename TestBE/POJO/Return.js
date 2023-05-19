class Return {
	constructor(code, msg, data) {
		this.code = code;
		this.msg = msg;
		this.data = data;
	}

	setCode(code) { this.code = code; }
	setMsg(msg) { this.msg = msg; }
	setData(data) { this.data = data; }
	getCode() { return this.code; }
	getMsg() { return this.msg; }
	getData() { return this.data };
	toString() { return ('code: ' + this.code + ' msg: ' + this.msg + ' data: ' + this.data) }
}

module.exports = {
	// Success
	success: new Return(200, "Success", null),
	//  Error Code
	MISSING_INFO: new Return(1001, "Missing info", null),
	WRONG_VERIFY_INFO: new Return(1002, "Wrong verify info", null),
	USER_EXIST: new Return(1003, "User exist", null),
	USER_NOT_FOUND: new Return(1004, "User not found", null),
	ITEM_EXIST: new Return(1005, "Item exist", null),
	ITEM_NOT_FOUND: new Return(1006, "Item not found", null),
	KEY_EXPIRED: new Return(1007, "Authentication expired", null),
}