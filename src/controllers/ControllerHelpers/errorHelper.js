/*
* Makes skeleton based on success, and adds the error (content).
* @param success {boolean} if requested action was succes or not.
* @param content {enum} enum containing the information requested. 
*/ 
export function makeResponse(success, content) {
  if (success) return { success: true, content: content  };

  return { success: false, err: content }
}

/*
* Creates default error message based on given err.
* @param err {errObj} Error object. 
*/ 
const defaultErr = (err) => {
	return {
		msg: err.errmsg,
		submitted: err.opp,
	};
}

/*
* Creates a duplication error message based on given err.
* @param err {errObj} Error object. 
*/ 
const duplicationErr = (err) => {
	return {
		msg: 'Already exists.',
		submitted: err.opp,
	};
};

/*
* Sends response and adds 400 status.
* @param res {Express response obj} Express response object.
* @param err {errObj} Error object. 
*/ 
const statusCodeResponse = (res, err) => res.status(400).json(makeResponse(false, err));

const notFound = 'Document not found';

const PrettyErrs = {};

PrettyErrs.noDoc = (res) => statusCodeResponse(res, notFound);

PrettyErrs.validationErr = (res, validationErr) => statusCodeResponse(res, err);

PrettyErrs.default = (res, err) => statusCodeResponse(res, err);

/*
* Makes error based on the error message and code of mongoose error, if no mongoose
* error is found, returns err.message.
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

		return statusCodeResponse(res, err.message);
	}

	if (!doc) return statusCodeResponse(res, notFound);

	return true;
}

/*
* This function is used to catch errors on promises, calls PrettyErrs.err to check for known errs.
* {this} is bound to { Express response object }
* @param err {err} error Object.
*/ 
function handleErr(err) {
	const noPrettyErrs = PrettyErrs.err(this, err, true);

	if (noPrettyErrs === true) return this.json(makeResponse(false, err.message));

	return noPrettyErrs;
	
}

PrettyErrs.catch = handleErr;

export default PrettyErrs;