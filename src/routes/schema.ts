import Joi from 'joi';

export default {
	'GET/api/memo': Joi.object({
		page: Joi.number().min(1).default(1),
	}),
	'GET/api/memo/:memoId': Joi.object({
		memoId: Joi.number(),
	}),
	'POST/api/memo': Joi.object({
		body: Joi.string(),
	}),
	'PUT/api/memo/:memoId': Joi.object({
		memoId: Joi.number(),
		body: Joi.string(),
	}),
	'DELETE/api/memo/:memoId': Joi.object({
		memoId: Joi.number(),
	}),
	'POST/api/memo/:memoId/comment': Joi.object({
		body: Joi.string(),
		memoId: Joi.number(),
	}),
	'PUT/api/memo/:memoId/comment/:commentId': Joi.object({
		memoId: Joi.number(),
		commentId: Joi.number(),
		body: Joi.string(),
	}),
	'DELETE/api/memo/:memoId/comment/:commentId': Joi.object({
		memoId: Joi.number(),
		commentId: Joi.number(),
	}),
	'POST/api/user/signup': Joi.object({
		id: Joi.string().pattern(/^[a-z]{1}[a-z0-9_-]{3,20}$/),
		pw: Joi.string().pattern(/^[a-zA-Z0-9]{2,14}$/),
	}),
};
