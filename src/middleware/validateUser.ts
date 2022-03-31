import ValidationError from 'errors/ValidationError';
import { Context, Next } from 'koa';

export default function validateUser(ctx: Context, next: Next) {
	if (ctx.isAuthenticated()) {
		return next();
	}
	throw new ValidationError('Must sign in');
}
