import Router from '@koa/router';
import MemoService from 'services/MemoService';
import Container from 'typedi';
import assembleParameters from 'middleware/assembleParameters';
import validateUser from 'middleware/validateUser';
import CommentService from 'services/CommentService';
import { Context } from 'koa';
import validateParameters from 'middleware/validateParameters';

const router = new Router();
const memoService = Container.get(MemoService);
const commentService = Container.get(CommentService);

router.get('/api/memo', assembleParameters, validateParameters('/api/memo'), async (ctx: Context) => {
	const { page } = ctx.state.parameters;
	const result = await memoService.getList(page);
	ctx.status = 200;
	ctx.body = { result };
});

router.post('/api/memo', validateUser, assembleParameters, validateParameters('/api/memo'), async (ctx: Context) => {
	const accountId = ctx.state.user;
	const { body } = ctx.state.parameters;
	const result = await memoService.insert(accountId, body);
	ctx.status = 200;
	ctx.body = { result };
});

router.get('/api/memo/:memoId', assembleParameters, validateParameters('/api/memo/:memoId'), async (ctx: Context) => {
	const { memoId } = ctx.state.parameters;
	const result = await memoService.getDetail(memoId);
	ctx.status = 200;
	ctx.body = { result };
});

router.put(
	'/api/memo/:memoId',
	validateUser,
	assembleParameters,
	validateParameters('/api/memo/:memoId'),
	async (ctx: Context) => {
		const accountId = ctx.state.user;
		const { body, memoId } = ctx.state.parameters;
		const result = await memoService.updateBody(memoId, accountId, body);
		ctx.status = 200;
		ctx.body = { result };
	},
);

router.delete(
	'/api/memo/:memoId',
	validateUser,
	assembleParameters,
	validateParameters('/api/memo/:memoId'),
	async (ctx: Context) => {
		const accountId = ctx.state.user;
		const { memoId } = ctx.state.parameters;
		await memoService.delete(memoId, accountId);
		ctx.status = 204;
	},
);

router.post(
	'/api/memo/:memoId/comment',
	validateUser,
	assembleParameters,
	validateParameters('/api/memo/:memoId/comment'),
	async (ctx: Context) => {
		const accountId = ctx.state.user;
		const { body, memoId } = ctx.state.parameters;
		const result = await commentService.insert(accountId, memoId, body);
		ctx.status = 200;
		ctx.body = { result };
	},
);

router.put(
	'/api/memo/:memoId/comment/:commentId',
	validateUser,
	assembleParameters,
	validateParameters('/api/memo/:memoId/comment/:commentId'),
	async (ctx: Context) => {
		const accountId = ctx.state.user;
		const { memoId, commentId, body } = ctx.state.parameters;
		const result = await commentService.update(commentId, accountId, memoId, body);
		ctx.status = 200;
		ctx.body = { result };
	},
);

router.delete(
	'/api/memo/:memoId/comment/:commentId',
	validateUser,
	assembleParameters,
	validateParameters('/api/memo/:memoId/comment/:commentId'),
	async (ctx: Context) => {
		const accountId = ctx.state.user;
		const { memoId, commentId } = ctx.state.parameters;
		await commentService.delete(commentId, accountId, memoId);
		ctx.status = 204;
	},
);

export default router;
