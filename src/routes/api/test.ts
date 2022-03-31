import Router from '@koa/router';
import MemoService from 'services/MemoService';
import Container from 'typedi';
import assembleParameters from 'middleware/assembleParameters';
import { Context } from 'koa';
import AccountService from 'services/AccountService';
import { generateMemo, generateRandom } from 'tools';

const router = new Router();
const accountService = Container.get(AccountService);
const memoService = Container.get(MemoService);

let testCalled = 0;

router.get('/test', assembleParameters, async (ctx: Context) => {
	const { accountCount, memoCount } = ctx.state.parameters;
	const accountArr = new Array(accountCount || 5).fill('tester').map((userId, idx) => userId + String(testCalled + idx));
	testCalled += accountCount || 5;
	const result = await Promise.allSettled(accountArr.map((id) => accountService.signUp(id, 'test')));
	const accountIdArr = result.map((elem) => elem['value']);
	const memoArr = new Array(memoCount || 5).fill('').map(() => generateMemo());
	await Promise.allSettled(memoArr.map((body) => memoService.insert(accountIdArr[generateRandom(accountIdArr.length)], body)));
	ctx.status = 200;
});

export default router;
