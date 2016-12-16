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
		msg: 'Already exists.',
		submitted: err.opp,
	};
};

const statusCodeResponse = (res, err) => res.status(400).json(makeResponse(false, err));

const notFound = 'Document not found';

const PrettyErrs = {};

PrettyErrs.noDoc = (res) => statusCodeResponse(res, notFound);

PrettyErrs.validationErr = (res, validationErr) => statusCodeResponse(res, err);

PrettyErrs.default = (res, err) => statusCodeResponse(res, err);

/*
* Makes error based on the error message and code of mongoose error
* @param err {mongooseErr} mongoose error Object.
*/ 
PrettyErrs.err = (res, err, doc) => {
	if (err) {
		if (err.name === 'CastError' && err.kind === 'ObjectId') {
			return statusCodeResponse(res, notFound);
		}

		if (err.code === 11000 || 11001 === err.code) {
			const dupErr = duplicationErr(err);
			return statusCodeResponse(res, dupErr);
		}

		if (err.code) {
			return statusCodeResponse(res, defaultErr(err));
		}

		return statusCodeResponse(res, err);
	}

	if (!doc) return statusCodeResponse(res, notFound);

	return true;
}

function handleErr(err) {
	const noPrettyErrs = PrettyErrs.err(this, err, true);
	if (noPrettyErrs === true) return this.json(makeResponse(false, err.message));

	return noPrettyErrs;
	
}

PrettyErrs.catch = handleErr;

export default PrettyErrs;