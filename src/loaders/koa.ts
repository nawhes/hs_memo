import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import koaPassport from 'koa-passport';
import { PRIVATE } from 'config';
import koaLogger from './koaLogger';
import koaErrorHandler from './koaErrorHandler';
// import PostgresSessionStore from './PostgresSessionStore';

import passport from './passport';

import memoRouter from '../routes/api/memo';
import userRouter from '../routes/api/user';
import testRouter from '../routes/api/test';

const koa = new Koa({ proxy: true, keys: [PRIVATE] });

// koa.use(session({ key: 'sess', maxAge: 86400000, httpOnly: false, secure: false, store: new PostgresSessionStore() }, koa));
koa.use(session({ key: 'sess', maxAge: 86400000, httpOnly: false, secure: false }, koa));

koa.use(bodyParser());

passport();
koa.use(koaPassport.initialize());
koa.use(koaPassport.session());

koa.use(koaErrorHandler);

koa.use(koaLogger);

koa.use(memoRouter.routes());
koa.use(userRouter.routes());
koa.use(testRouter.routes());

export default koa;
