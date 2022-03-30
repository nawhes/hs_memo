import Session from 'models/Session.model';

export default class PostgresSessionStore {
	public async get(key, maxAge, { rolling }) {
		const result = await Session.findByPk(key, { raw: true });
		return result || null;
	}

	public async set(key, session, maxAge, { rolling, changed }) {
		if (changed || rolling) {
			await Session.upsert({ id: key, session, maxAge });
		}
	}

	public async destroy(key) {
		await Session.destroy({ where: { id: key } });
		return;
	}
}
