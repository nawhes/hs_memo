import BaseError from './BaseError';

export default class DataAccessError extends BaseError {
	constructor(message: string) {
		super(message);
		this.status = 401;
	}
}
