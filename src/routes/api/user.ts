import Router from '@koa/router';
import logger from 'loaders/logger';
import AccountService from 'services/AccountService';
import Container from 'typedi';
import koaPassport from 'koa-passport';

const router = new Router();
const accountService = Container.get(AccountService);

router.post('/api/user/signup', async (ctx) => {
	const { id, pw } = ctx.request.body;
	await accountService.signUp(id, pw);
	ctx.status = 201;
});

router.post('/api/user/signin', koaPassport.authenticate('local'), (ctx) => {
	ctx.status = 200;
});

export default router;
