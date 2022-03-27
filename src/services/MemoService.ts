import MemoRepository from 'repositories/MemoRepository';
import { Service } from 'typedi';

@Service()
export default class MemoService {
	constructor(private memoRepository: MemoRepository) {}

	//todo
	public async getList();
	public async getList(page: number);
	public async getList(page?: number) {
		let result;
		if (page) {
			result = await this.memoRepository.test();
		} else {
			result = await this.memoRepository.test();
		}
	}

	//todo
	public async insert() {
		// await this.memoRepository.insert()
	}

	//todo
	public async getDetail(id: number) {
		const result = await this.memoRepository.findById(id);
	}

	//todo
	public async updateBody(id: number, body: string) {
		await this.memoRepository.update();
	}

	//todo
	public async delete(id: number) {
		await this.memoRepository.delete(id);
	}
}
