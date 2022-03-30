import Router from '@koa/router';
import MemoService from 'services/MemoService';
import Container from 'typedi';
import convertParamQuery from 'middleware/convertParamQuery';
import validateUser from 'middleware/validateUser';

const router = new Router();
const memoService = Container.get(MemoService);

router.get('/api/memo', convertParamQuery, async (ctx) => {
	const page = ctx.request.query.page;

	const result = await memoService.getList(page);
	ctx.status = 200;
	ctx.body = { result };
});

router.post('/api/memo', validateUser, async (ctx) => {
	const accountId = ctx.state.user;
	const { body } = ctx.request.body;
	const result = await memoService.insert(accountId, body);
	ctx.status = 200;
	ctx.body = { result };
});

router.get('/api/memo/:memoId', convertParamQuery, async (ctx) => {
	const { memoId } = ctx.request.params;
	const result = await memoService.getDetail(memoId);
	ctx.status = 200;
	ctx.body = { result };
});

router.put('/api/memo/:memoId', validateUser, convertParamQuery, async (ctx) => {
	const accountId = ctx.state.user;
	const { body } = ctx.request.body;
	const { memoId } = ctx.request.params;
	const result = await memoService.updateBody(memoId, accountId, body);
	ctx.status = 200;
	ctx.body = { result };
});

router.delete('/api/memo/:memoId', validateUser, convertParamQuery, async (ctx) => {
	const accountId = ctx.state.user;
	const { memoId } = ctx.request.params;
	await memoService.delete(memoId, accountId);
	ctx.status = 204;
});

export default router;
