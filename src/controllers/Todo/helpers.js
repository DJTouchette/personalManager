const helpers = {};

function checkForContent(req) {
	req.checkBody('content', 'Content cannot be blank.')
	.notEmpty()
	.isAlpha();
}

function checkForParent(req) {
	req.checkBody('hasParent', 'Must be a boolean.')
	.isBoolean();
}

helpers.checkForContent = checkForContent;
helpers.checkForParent = checkForParent;


export default helpers;