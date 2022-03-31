import koaPassport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import AccountService from 'services/AccountService';
import Container from 'typedi';

export default () => {
	koaPassport.serializeUser((user, done) => {
		done(null, user['id']);
	});
	koaPassport.deserializeUser((user: any, done) => {
		done(null, user);
	});

	koaPassport.use(
		new LocalStrategy(
			{
				usernameField: 'id',
				passwordField: 'pw',
				session: true,
				passReqToCallback: false,
			},
			async (id, pw, done) => {
				try {
					const accountService = Container.get(AccountService);
					const user = await accountService.signIn(id, pw);
					done(null, user);
				} catch (error) {
					done(error);
				}
			},
		),
	);
};
