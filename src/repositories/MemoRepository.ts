import BaseRepository from './BaseRepository';
import Memo from 'models/Memo.model';
import { Service } from 'typedi';

@Service()
export default class MemoRepository extends BaseRepository<Memo> {
	constructor() {
		super(Memo);
	}

	//todo
	public async insert(data: Memo) {}

	//todo
	public async update() {}

	//todo
	public async delete(id: any) {}

	//todo
	public async findAll();
	public async findAll(page: number);
	public async findAll(page?: number) {}
}
