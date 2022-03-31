export default abstract class BaseError extends Error {
	public status: number;

	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
		this.status = 500;
	}
}
