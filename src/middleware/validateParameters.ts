import ValidationError from 'errors/ValidationError';
import { Context, Next } from 'koa';
import schema from 'routes/schema';

export default function validateParameters(path: string) {
	return (ctx: Context, next: Next) => {
		const target = schema[ctx.request.method + path];
		if (target === undefined) throw new Error('Schema does not defined');
		const { error, value } = target.validate(ctx.state.parameters);
		if (error) throw new ValidationError('Parameter Error');
		return next();
	};
}
