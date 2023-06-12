import { Productos } from '$db/collections';
import { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registerFormData } from '../../types/formsProd';
import { returnNamesList, findProdByIdAllData, registerProd, registerFormToProdWithoutId, returnAllIds } from '../../prodBackendUtils';

export const actions: Actions = {
    addProd: async({
        request
    }: RequestEvent): Promise<registerFormData | ActionFailure<registerFormData> | Redirect> => {
        const registrarFormData = await request.formData();
		const name = registrarFormData.get('name') ?? '';
		const stockTotal = registrarFormData.get('stock') ?? '';
		const stockDisponible = registrarFormData.get('stock') ?? '';
		const categoria = registrarFormData.get('categoria') ?? '';
		const imgUrl = registrarFormData.get('imgUrl') ?? '';
        const descripcion = registrarFormData.get('descripcion') ?? '';

        let RegistrarResponse: registerFormData = {
            nameUsed: false,
			error: false,
			success: false,
			message: '',
			id: 0,
			name,
			stockTotal,
			stockDisponible,
			categoria,
			imgUrl,
			descripcion
        };

        const collection = await Productos;
        let nameList: String[];

		try {
			nameList = await returnNamesList(collection);
			if (nameList.includes(name.toString())) {
				RegistrarResponse.error = true;
				RegistrarResponse.nameUsed = true;
				RegistrarResponse.message = '¡Este nombre de producto ya está en uso!';
				return fail(400, RegistrarResponse);
			}
		} catch (error: any) {
			RegistrarResponse.error = true;
			RegistrarResponse.message =
				'¡Error intentando mandar el formulario! Intente de nuevo en unos minutos!';
			return fail(500, RegistrarResponse);
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
					RegistrarResponse.id = Number(id);
					break;
				}
			}
		}catch (error: any) {
			RegistrarResponse.error = true;
			RegistrarResponse.message =
				'Error al crear el ID del Producto.';
			console.log(error)
			return fail(500, RegistrarResponse);
		}

		const prodToInsert = await registerFormToProdWithoutId(RegistrarResponse);
		const resultOfInsert = await registerProd(collection, prodToInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.insertedId) {
			// console.log(resultOfInsert);
			throw redirect(303, '/productos');
		}

		RegistrarResponse.error = true;
		RegistrarResponse.message = '¡Error al registrar el producto! Intente más tarde';
		return fail(503, RegistrarResponse);
    }
};