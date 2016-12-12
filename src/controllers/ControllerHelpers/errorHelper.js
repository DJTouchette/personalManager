export function makeResponse(success, content) {
  if (success) return { success: true, content: content  };

  return { success: false, err: content }
}

const PrettyErrs = {};

/*
* Makes error based on the error message and code of mongoose error
* @param err {mongooseErr} mongoose error Object.
*/ 
PrettyErrs.err = (err) => {
	if (err.name === 'CastError' && err.kind === 'ObjectId') {
		return PrettyErrs.noDoc();
	}

	if (err.code === 11000 || 11001 === err.code) {
		console.log('heeeeere');
		const duplicationErr = {
			msg: 'Diplicate found.',
			submitted: err.opp,
		};
		return makeResponse(false, duplicationErr)
	}

	const defaultErr = {
		msg: err.errmsg,
		submitted: err.opp,
	}

	return makeResponse(false, defaultErr);
}

PrettyErrs.noDoc = (doc) => {
	const notFound = 'Document not found';

	return makeResponse(true, notFound);
}

export default PrettyErrs;