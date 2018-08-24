'use strict'

module.exports = (file, pattern) => {
	pattern = pattern || /\/favicon\.png$/;

	return (req, res, next) => {
		if (pattern.test(req.url))
			res.sendFile(file);
		else next();
	};
};
