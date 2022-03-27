import { Table, Column, Model, PrimaryKey, ForeignKey, DataType } from 'sequelize-typescript';
import Account from './Account.model';
import Memo from './Memo.model';

@Table({ tableName: 'comment', underscored: true })
export default class Comment extends Model {
	@PrimaryKey
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
