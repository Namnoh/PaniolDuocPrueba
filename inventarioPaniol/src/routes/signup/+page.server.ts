import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import type { registerFormData } from '../../types/forms';
import {
	registerUser,
	registerFormToUserWithoutId,
	returnEmailsList,
	returnAllIds
} from '../../backendUtils';
import { checkPassword } from '../../passwordCheck';
import { Usuarios } from '$db/collections';

export const actions: Actions = {
	signup: async ({
		request
	}: RequestEvent): Promise<registerFormData | ActionFailure<registerFormData> | Redirect> => {
		const signupFormData = await request.formData();
		const name = signupFormData.get('name') ?? '';
		const email = signupFormData.get('email')?.toString() ?? '';
		const password = signupFormData.get('password') ?? '';
		const password2 = signupFormData.get('password2') ?? '';

		let SignUpResponse: registerFormData = {
			emailUsed: false,
			weakPassword: false,
			error: false,
			success: false,
			message: '',
			passwordUnequal: false,
			id: 0,
			name,
			email,
			password,
			password2: '',
			type: ''
		};

		const collection = await Usuarios;

		let emailList: String[];

		try {
			emailList = await returnEmailsList(collection);
			if (emailList.includes(email.toString())) {
				SignUpResponse.error = true;
				SignUpResponse.emailUsed = true;
				SignUpResponse.message = '¡Este email ya está en uso!';
				return fail(400, SignUpResponse);
			}
		} catch (error: any) {
			SignUpResponse.error = true;
			SignUpResponse.message =
				'¡Error intentando mandar el formulario! Intente de nuevo en unos minutos!';
			return fail(500, SignUpResponse);
		}

		try {
			const ParteEmail = email.split('@');
			const domainAlum = 'duocuc.cl';
			const domainProf = 'profesor.duoc.cl';
			const domainAdmin = 'duoc.cl';
			const Pilin = ParteEmail[1];

			if (Pilin !== domainAlum && Pilin !== domainProf && Pilin != domainAdmin) {
				SignUpResponse.error = true;
				SignUpResponse.message =
					'El Email ingresado no contiene los dominios de la Institución.' + ',' + Pilin;
				return fail(400, SignUpResponse);
			}
			if (Pilin == domainAlum) {
				SignUpResponse.type = 'Alumno';
			}
			if (Pilin == domainProf) {
				SignUpResponse.type = 'Profesor';
			}
			if (Pilin == domainAdmin) {
				SignUpResponse.type = 'Administrador';
			}
		} catch (error: any) {
			SignUpResponse.error = true;
			SignUpResponse.message =
				'¡Error intentando mandar el formulario! Intente de nuevo en unos minutos.';
			return fail(500, SignUpResponse);
		}
		const isPassStrong = checkPassword(password.toString());

		if (!isPassStrong) {
			SignUpResponse.weakPassword = true;
			SignUpResponse.error = true;
			SignUpResponse.message = '¡La contraseña no cumple con los requisitos!';
			return fail(400, SignUpResponse);
		}

		if (password != password2) {
			SignUpResponse.passwordUnequal = true;
			SignUpResponse.error = true;
			SignUpResponse.message = '¡Las contraseñas no son iguales!';
			return fail(400, SignUpResponse);
		}
		
		let idList;
		try {
			const characters = '0123456789';
			idList = await returnAllIds(collection);
			while (true) {
				let id = '';
				for (let i = 0; i < 6; i++) {
					const randomIndex = Math.floor(Math.random()*characters.length);
					id += characters.charAt(randomIndex);
				}
				if (!idList.includes(Number(id))) {
					SignUpResponse.id = Number(id);
					break;
				}
			}
		}catch (error: any) {
			SignUpResponse.error = true;
			SignUpResponse.message =
				'Error al crear el ID del usuario.';
			console.log(error)
			return fail(500, SignUpResponse);
		}

		SignUpResponse.password = password;
		const userToInsert = await registerFormToUserWithoutId(SignUpResponse);
		const resultOfInsert = await registerUser(collection, userToInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.insertedId) {
			
			throw redirect(303, '/');
		}

		SignUpResponse.password = '';
		SignUpResponse.error = true;
		SignUpResponse.message = '¡Error al registrar al usuario!';
		return fail(503, SignUpResponse);
	}
};
