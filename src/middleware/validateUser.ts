import ValidationError from 'errors/ValidationError';

export default function validateUser(ctx, next) {
	if (ctx.isAuthenticated()) {
		return next();
	} else {
		throw new ValidationError('Must sign in');
	}
}
