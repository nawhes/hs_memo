import DataAccessError from 'errors/DataAccessError';
import Comment from 'models/Comment.model';
import { Service } from 'typedi';

@Service()
export default class CommentService {
	public async insert(accountId: number, memoId: number, body: string): Promise<Comment> {
		try {
			const result = await Comment.create({ accountId, memoId, body }, { raw: true });
			if (!result) throw new DataAccessError('Comment does not saved');
			return result;
		} catch (error) {
			if (typeof error == 'string' || !(error instanceof Error)) throw error;
			if (error.name === 'SequelizeForeignKeyConstraintError') throw new DataAccessError(`Parameters has some problem`);
			console.log(error.name);
			throw error;
		}
	}

	public async update(id: number, accountId: number, memoId: number, body: string): Promise<Comment> {
		const [affectedCount, affectedRow] = await Comment.update(
			{ body },
			{ where: { id, accountId, memoId }, returning: true },
		);
		if (affectedCount === 0) throw new DataAccessError('Comment does not exist');
		return affectedRow[0];
	}

	public async delete(id: number, accountId: number, memoId: number): Promise<void> {
		const result = await Comment.destroy({ where: { id, accountId, memoId } });
		if (result === 0) throw new DataAccessError('Comment does not exist');
	}
}
