import Koa from 'koa';
import logger from './logger';
import memoRouter from '../routes/api/memo';
import userRouter from '../routes/api/user';

const koa = new Koa();

koa.use(memoRouter.routes());
koa.use(userRouter.routes());

koa.on('error', (err, ctx) => {
	logger.error(err.message, err);
});

export default koa;
