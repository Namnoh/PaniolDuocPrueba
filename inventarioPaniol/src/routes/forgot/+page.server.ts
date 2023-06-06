import type { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { Usuarios } from '$db/collections';
import type { forgetFormData } from '../../types/formsForget';
import {
    returnEmailsList
}from '../../backendUtils';
import { fail, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	forget: async ({
		request
	}: RequestEvent): Promise<forgetFormData | ActionFailure<forgetFormData> | Redirect> => {
		const forgetFormData = await request.formData();
		const email = forgetFormData.get('email')?.toString() ?? '';
        let forgetResponse: forgetFormData = {
			email,
            error: false,
            message: '',
		};

        const collection = await Usuarios;

		let emailList: String[];

		try {
			emailList = await returnEmailsList(collection);
			if (!emailList.includes(email.toString())) {
				forgetResponse.error = true;
				forgetResponse.message = '¡Correo No Encontrado!';
				return fail(400, forgetResponse);
			}
		} catch (error: any) {
			forgetResponse.error = true;
			forgetResponse.message =
				'¡Error intentando mandar el correo! Intente de nuevo en unos minutos!';
			return fail(500,forgetResponse);
		}
        
        return forgetResponse;
    }
};