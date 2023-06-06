import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import type { loginFormResponse } from '../../types/forms';
import { findUserByEmailWithPassword } from '../../backendUtils'; 
import { Usuarios } from '$db/collections';
import { SECRET_INGREDIENT } from '$env/static/private'; 
import brcyptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 

export async function load({ cookies }){
	const authToken = cookies.get('authToken');
	if (!authToken) return { clearUser: true };
	return { clearUser: false };
}

export const actions: Actions = {
	login: async ({
		cookies,
		request
	}: RequestEvent): Promise<loginFormResponse | ActionFailure<loginFormResponse> | Redirect> => {
		const loginFormData = await request.formData();
		const email = loginFormData.get('email')?.toString() ?? '';
		const password = loginFormData.get('password')?.toString() ?? '';

		let loginResponse = {
			email,
			error: false,
			message: ''
		};

		const collection = await Usuarios;
		const userAttemptingLogin = await findUserByEmailWithPassword(collection, email);
		if (userAttemptingLogin==null) {
			loginResponse.error = true;
			loginResponse.message = '¡El correo ingresado no existe!';
			return loginResponse;
		}
		const authAttempt = await brcyptjs.compare(password, userAttemptingLogin.password);
		
		if (!authAttempt) {
			loginResponse.error = true;
			loginResponse.message = '¡Email o contraseña incorrectos!';
			return loginResponse;
		}

		if (authAttempt) {
			const { password, ...userAttempingLoginMinusPassword } = userAttemptingLogin;
			const authToken = jwt.sign(
				{ authedUser: userAttempingLoginMinusPassword },
				SECRET_INGREDIENT,
				{ expiresIn: '24h' }
			);
			cookies.set('authToken', authToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 24,
				sameSite: 'strict'
			});
			throw redirect(302, '/');
		}
		return loginResponse;
	}
};
