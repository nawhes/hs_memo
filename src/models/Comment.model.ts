import { Account, Memo } from 'models';
import { Table, Column, PrimaryKey, ForeignKey, DataType, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './BaseModel';

@Table({ tableName: 'comment', underscored: true })
export default class Comment extends BaseModel<Comment> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@ForeignKey(() => Account)
	@Column({ type: DataType.INTEGER, allowNull: false })
	accountId: number;

	@ForeignKey(() => Memo)
	@Column({ type: DataType.INTEGER, allowNull: false })
	memoId: number;

	@Column({ type: DataType.TEXT, allowNull: false })
	body: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@Column(DataType.DATE)
	updatedAt?: any;
}
