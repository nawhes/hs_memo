import { Table, Column, PrimaryKey, DataType } from 'sequelize-typescript';
import BaseModel from './BaseModel';

@Table({ tableName: 'session', underscored: true, timestamps: false })
export default class Session extends BaseModel<Session> {
	@PrimaryKey
	@Column({ type: DataType.STRING, allowNull: false })
	id: string;

	@Column({ type: DataType.JSON, allowNull: false })
	session: Record<string, unknown>;

	@Column({ type: DataType.NUMBER, allowNull: false })
	maxAge: number;
}
