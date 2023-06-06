import { start_mongo } from '$db/mongo';
import { Usuarios } from '$db/collections';
import { findUserByEmail, findUserByEmailAllData } from './backendUtils';
import {SECRET_INGREDIENT} from '$env/static/private';
import jwt from 'jsonwebtoken';


await start_mongo()
	.then(() => {
		console.log('Mongo Iniciado');
	})
	.catch((e) => {
		console.error(e);
	});

export async function handle({ event, resolve }) {
	const authToken = event.cookies.get('authToken');
	try {
		if (!authToken) event.locals.authedUser = undefined;

		const claims = jwt.verify(authToken, SECRET_INGREDIENT);
		if (!claims) event.locals.authedUser = undefined;

		if (authToken && claims) {
			const collection = await Usuarios;
			const fullUser = await findUserByEmailAllData(collection, claims.authedUser.email);
			const { password, ...userMinusPassword } = fullUser;
			event.locals.authedUser = userMinusPassword;
		}
	} finally {
		const response = await resolve(event);
		return response;
	}
}
