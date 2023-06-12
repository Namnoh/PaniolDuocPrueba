import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { redirect, error } from '@sveltejs/kit';
import type { loginFormResponse } from '../../types/forms';
import { findUserByEmailWithPassword, findUserByEmailAllData } from '../../backendUtils';
import { Usuarios } from '$db/collections';
import { SECRET_INGREDIENT } from '$env/static/private';
import brcyptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { changeMsg } from '../../msgUtils';
import { user } from '../../stores';

export async function load({ cookies }) {
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
		if (userAttemptingLogin == null) {
			loginResponse.error = true;
			loginResponse.message = '¡El correo ingresado no existe!';
			changeMsg('invalid', 'El correo electrónico es inválido');
			return loginResponse;
		}
		const authAttempt = await brcyptjs.compare(password, userAttemptingLogin.password);

		if (!authAttempt) {
			loginResponse.error = true;
			loginResponse.message = '¡Email o contraseña incorrectos!';
			changeMsg('invalid', 'Contraseña o Email Incorrectos');
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

			let userId: number | undefined = 0;
			user.subscribe((val) => (userId = val?.id));

			const collection = await Usuarios;
			const fullUser = await findUserByEmailAllData(collection, email);			

			// console.log("1. " + userId + " 2. " + fullUser.id)
			if (fullUser.id != userId) {
				// console.log("LAS PERSONAS SON DIFERENTES")
				const { password, ...userMinusPassword } = fullUser;
				const newUser = userMinusPassword;
				user.set(newUser);
			} else {
				// console.log("LAS PERSONAS SON IGUALES")
			}
			changeMsg('success', 'Se ha iniciado sesión exitosamente');
			throw redirect(302, '/');
		}
		return loginResponse;
	}
};
