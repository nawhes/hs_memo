import Router from '@koa/router';
import AccountService from 'services/AccountService';
import Container from 'typedi';
import koaPassport from 'koa-passport';
import assembleParameters from 'middleware/assembleParameters';
import validateParameters from 'middleware/validateParameters';
import { Context } from 'koa';

const router = new Router();
const accountService = Container.get(AccountService);

router.post('/api/user/signup', assembleParameters, validateParameters('/api/user/signup'), async (ctx: Context) => {
	const { id, pw } = ctx.state.parameters;
	await accountService.signUp(id, pw);
	ctx.status = 201;
});

router.post('/api/user/signin', koaPassport.authenticate('local'), (ctx) => {
	ctx.status = 200;
});

export default router;
