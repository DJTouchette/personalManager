import jwt from 'jsonwebtoken';

const NO_TOKEN = {
		success: false, 
		message: 'No token provided.'
	};

const FAILED_AUTH = { 
	success: false, 
	content: 'Failed to authenticate JWT.' 
};

export default function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) return res.status(403).send(NO_TOKEN);

	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) return res.status(403).json(FAILED_AUTH);

		req.decoded = decoded;
		next();
	});
}