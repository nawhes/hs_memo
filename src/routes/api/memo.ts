import Router from '@koa/router';
import logger from 'loaders/logger';
import MemoService from 'services/MemoService';
import Container from 'typedi';

const router = new Router();
const memoService = Container.get(MemoService);

router.get('/test', (ctx) => {
	logger.info('HIHI');
});

//todo
router.get('/api/memo', async (ctx) => {
	await memoService.getList();
});

//todo
router.post('/api/memo', async (ctx) => {
	await memoService.insert();
});

//todo
router.get('/api/memo/:memoId', async (ctx) => {
	await memoService.getDetail(1);
});

//todo
router.put('/api/memo/:memoId', async (ctx) => {});

//todo
router.delete('/api/memo/:memoId', async (ctx) => {});

export default router;
