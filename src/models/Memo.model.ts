import { Account, Comment } from 'models';
import { Table, Column, PrimaryKey, ForeignKey, DataType, AutoIncrement, HasMany } from 'sequelize-typescript';
import BaseModel from './BaseModel';

@Table({ tableName: 'memo', underscored: true })
export default class Memo extends BaseModel<Memo> {
	@PrimaryKey
	@AutoIncrement
	@Column
	id: number;

	@ForeignKey(() => Account)
	@Column({ type: DataType.INTEGER, allowNull: false })
	accountId: number;

	@Column({ type: DataType.STRING(20), allowNull: false })
	head: string;

	@Column({ type: DataType.TEXT, allowNull: false })
	body: string;

	@Column(DataType.DATE)
	createdAt?: any;

	@Column(DataType.DATE)
	updatedAt?: any;

	@HasMany(() => Comment, { onUpdate: 'CASCADE', onDelete: 'CASCADE' })
	comments: Comment[];
}
