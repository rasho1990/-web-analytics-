class HttpError extends Error {
	constructor(message, errorCode) {
		super(message); // Adds "message" property to this class
		this.code = errorCode;
	}
}

module.exports = HttpError;
