import DataAccessError from 'errors/DataAccessError';
import Comment from 'models/Comment.model';
import Memo from 'models/Memo.model';
import { Service } from 'typedi';

@Service()
export default class MemoService {
	private readonly limit = 30;
	constructor() {}

	public async getList(page: number = 1): Promise<Memo[]> {
		const offset = (page - 1) * this.limit;
		return Memo.findAll({ offset, limit: this.limit });
	}

	public async insert(accountId: number, body: string): Promise<Memo> {
		try {
			const head = body.substring(0, 20);
			const result = await Memo.create({ accountId, head, body }, { raw: true });
			if (!result) throw new DataAccessError('Memo does not saved');
			return result;
		} catch (error) {
			if (typeof error == 'string' || !(error instanceof Error)) throw error;
			if (error.name === 'SequelizeForeignKeyConstraintError') throw new DataAccessError(`${accountId} has some problem`);
			throw error;
		}
	}

	public async getDetail(id: number): Promise<Memo> {
		const result = await Memo.findOne({ where: { id }, include: [Comment] });
		if (!result) throw new DataAccessError('Memo does not exist');
		return result;
	}

	public async updateBody(id: number, accountId: number, body: string): Promise<Memo> {
		const head = body.substring(0, 20);
		const [affectedCount, affectedRow] = await Memo.update({ head, body }, { where: { id, accountId }, returning: true });
		if (affectedCount === 0) throw new DataAccessError('Memo does not exist');
		return affectedRow[0];
	}

	public async delete(id: number, accountId: number): Promise<void> {
		const result = await Memo.destroy({ where: { id, accountId } });
		if (result === 0) throw new DataAccessError('Memo does not exist');
	}
}
