import jwt from 'jsonwebtoken';

export default function(req, res, next) {
	const token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (!token) return res.status(403).send({
		success: false, 
		message: 'No token provided.'
	});

	jwt.verify(token, process.env.SECRET, function(err, decoded) {
		if (err) return res.status(403).json({ success: false, content: 'Failed to authenticate JWT.' });

		req.decoded = decoded;
		next();
	});
}