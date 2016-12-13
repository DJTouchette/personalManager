export function makeResponse(success, content) {
  if (success) return { success: true, content: content  };

  return { success: false, err: content }
}

const defaultErr = (err) => {
	return {
		msg: err.errmsg,
		submitted: err.opp,
	};
}

const duplicationErr = (err) => {
	return {
		msg: 'Diplicate found.',
		submitted: err.opp,
	};
};

const statusCodeResponse = (res, err) => {
	return res.status(401).json(makeResponse(false, err));
}

const notFound = 'Document not found';


const PrettyErrs = {};

PrettyErrs.noDoc = (doc) => {
	return makeResponse(true, notFound);
}

PrettyErrs.validationErr = (res, validationErr) => {
	return res.status(401).json(makeResponse(false, err));
};

PrettyErrs.default = (res, err) => {
	return statusCodeResponse(res, err);
}

/*
* Makes error based on the error message and code of mongoose error
* @param err {mongooseErr} mongoose error Object.
*/ 
PrettyErrs.err = (res, err) => {
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		return statusCodeResponse(res, PrettyErrs.noDoc());
	}

	if (err.code === 11000 || 11001 === err.code) {
		return statusCodeResponse(res, duplicationErr(err));
	}

	return statusCodeResponse(res, defaultErr(err));
}

export default PrettyErrs;