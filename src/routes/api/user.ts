import Router from '@koa/router';
import logger from 'loaders/logger';
import AccountService from 'services/AccountService';
import Container from 'typedi';

const router = new Router();
const accountService = Container.get(AccountService);

//todo
router.post('/api/user/signup', async (ctx) => {
	// await accountService.signUp();
});

//todo
router.post('/api/user/signin', async (ctx) => {
	// await accountService.signIn();
});

export default router;
