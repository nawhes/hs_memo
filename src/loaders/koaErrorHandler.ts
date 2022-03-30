import { BaseError } from 'errors/BaseError';
import logger from './logger';

export default async function koaErrorHandler(ctx, next) {
	try {
		await next();
	} catch (error) {
		if (error instanceof BaseError) {
			ctx.status = error.status;
			ctx.body = {
				message: error.message,
			};
		} else {
			ctx.status = 500;
			ctx.body = {
				message: 'Internal Server Error',
			};
			if (typeof error == 'string') logger.warn(error.toString());
			else if (error instanceof Error) logger.warn(error.message);
		}
	}
}
