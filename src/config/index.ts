import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const env = dotenv.config({
	path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env' : '.env.dev'),
});

if (env.error) {
	throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const PORT = parseInt(process.env.PORT || '7458', 10);

export const DB = {
	HOST: process.env.DB_HOST,
	PORT: process.env.DB_PORT,
	NAME: process.env.DB_NAME,
	USER: process.env.DB_USER,
	PW: process.env.DB_PW,
};

export const LOG = {
	LEVEL: process.env.LOG_LEVEL || 'silly',
};
