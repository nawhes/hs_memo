import { DataAccessError } from 'errors/DataAccessError';
import logger from 'loaders/logger';
import BaseModel from 'models/BaseModel';

export default abstract class BaseRepository<M extends BaseModel> {
	constructor(protected model: typeof BaseModel) {}

	public async findById(id: number): Promise<BaseModel> {
		const result = await this.model.findOne({ where: { id } });
		if (result) return result;
		throw new DataAccessError(`${id} is invalid.`);
	}

	public test() {
		logger.notice(this.toString());
	}
}
