import { Table, Column, Model, PrimaryKey, ForeignKey, DataType, AutoIncrement } from 'sequelize-typescript';
import { Service } from 'typedi';
import Account from './Account.model';
import BaseModel from './BaseModel';
import Memo from './Memo.model';

@Service()
@Table({ tableName: 'comment', underscored: true })
export default class Comment extends BaseModel<Comment> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@ForeignKey(() => Account)
	@Column
	userid: number;

	@ForeignKey(() => Memo)
	@Column
	memoid: number;

	@Column(DataType.TEXT)
	body: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@Column(DataType.DATE)
	updatedAt?: any;
}
