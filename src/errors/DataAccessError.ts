import { BaseError } from './BaseError';

export class DataAccessError extends BaseError {
	constructor(message: string) {
		super(message);
		this.status = 500;
	}
}
