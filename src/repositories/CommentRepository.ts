import BaseRepository from './BaseRepository';
import Comment from 'models/Comment.model';
import { Service } from 'typedi';

@Service()
export default class CommentRepository extends BaseRepository<Comment> {
	constructor() {
		super(Comment);
	}

	//todo
	public async insert(data: Comment) {}

	//todo
	public async update() {}

	//todo
	public async delete(id: any) {}
}
