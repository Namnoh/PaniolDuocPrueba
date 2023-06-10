import { Productos } from '$db/collections';
import { PageServerLoad } from './$types';
import {
	delProd,
	findProdByIdAllData,
	returnNamesList,
	updateProd,
	registerFormToProdWithoutId
} from '../../../prodBackendUtils';
import { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registerFormData } from '../../../types/formsProd';

let productAllData;

export const load: PageServerLoad = async function ({ params }) {
	const id = parseInt(params.slug);
	const productData = await findProdByIdAllData(Productos, id);
	productAllData = productData;

	return productData;
};

export const actions: Actions = {
	eliminar: async ({ url }) => {
		const id = parseInt(url.searchParams.get('id')!);
		if (!id) {
			return fail(400);
		}
		const del = await delProd(id);
		throw redirect(303, '/productos');
	},
	actualizar: async ({
		request
	}: RequestEvent): Promise<registerFormData | ActionFailure<registerFormData> | Redirect> => {
		const registrarFormData = await request.formData();
		const name = registrarFormData.get('name') ?? productAllData.name;
		const stock = registrarFormData.get('stock') ?? productAllData.stock;
		const categoria = registrarFormData.get('categoria') ?? productAllData.categoria;
		let imgUrl = registrarFormData.get('imgUrl') ?? productAllData.imgUrl;
		imgUrl = registrarFormData.get('imgUrl') == '' ? productAllData.imgUrl : imgUrl; 
		const descripcion = registrarFormData.get('descripcion') ?? productAllData.descripcion;

		let RegistrarResponse: registerFormData = {
			nameUsed: false,
			error: false,
			success: false,
			message: '',
			id: productAllData.id,
			name,
			stock,
			categoria,
			imgUrl,
			descripcion
		};

		const collection = await Productos;
		let nameList: String[];

		try {
			if (RegistrarResponse.name != productAllData.name) {
				nameList = await returnNamesList(collection);
				if (nameList.includes(name.toString())) {
					RegistrarResponse.imgUrl = '';
					RegistrarResponse.error = true;
					RegistrarResponse.emailUsed = true;
					RegistrarResponse.message = '¡Este nombre de producto ya está en uso!';
					return fail(400, RegistrarResponse);
				}
			}
		} catch (error: any) {
			RegistrarResponse.imgUrl = '';
			RegistrarResponse.error = true;
			RegistrarResponse.message =
				'¡Error intentando mandar el formulario! Intente de nuevo en unos minutos!';
			return fail(500, RegistrarResponse);
		}

		const filter = await { id: RegistrarResponse.id };
		const prodToInsert = await registerFormToProdWithoutId(RegistrarResponse);
		const resultOfInsert = await updateProd(filter, prodToInsert);
		// console.log(resultOfInsert.modifiedCount);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			throw redirect(303, `/productos/${productAllData.id}`);
		} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
			RegistrarResponse.imgUrl = '';
			RegistrarResponse.error = true;
			RegistrarResponse.message = '¡Error al actualizar el producto! No se han ingresado nuevos datos.';
			return fail(503, RegistrarResponse);
		} else {
			RegistrarResponse.imgUrl = '';
			RegistrarResponse.error = true;
			RegistrarResponse.message = '¡Error al actualizar el producto! Intente más tarde.';
			return fail(503, RegistrarResponse);
		}
	}
};
