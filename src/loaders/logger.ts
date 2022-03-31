import winston from 'winston';
import { LOG } from 'config';
import path from 'path';

const logDirectory = path.resolve(process.cwd(), 'logs');

const logger = winston.createLogger({
	level: LOG.LEVEL,
	levels: winston.config.npm.levels,
	format: winston.format.combine(
		winston.format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		winston.format.printf((info) => `${info.timestamp} [${info.level}] ${info.message}`),
	),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({ filename: `${logDirectory}/error.log`, level: 'error' }),
		new winston.transports.File({ filename: `${logDirectory}/combined.log` }),
	],
});

export default logger;
