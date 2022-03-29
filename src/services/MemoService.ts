import Memo from 'models/Memo.model';
import { Service } from 'typedi';

@Service()
export default class MemoService {
	constructor(private memo: Memo) {}

	//todo
	public async getList(page?: number) {
		try {
			let result;
			if (page) {
				result = Memo.findAll();
			} else {
				result = Memo.findAll();
			}
		} catch (error) {}
	}

	//todo
	public async insert() {
		try {
			Memo.create();
		} catch (error) {}
	}

	//todo
	public async getDetail(id: number) {
		try {
			const result = Memo.findOne();
		} catch (error) {}
	}

	//todo
	public async updateBody(id: number, body: string) {
		try {
			// const result = Memo.update();
		} catch (error) {}
	}

	//todo
	public async delete(id: number) {
		try {
			// const result = Memo.delete();
		} catch (error) {}
	}
}
