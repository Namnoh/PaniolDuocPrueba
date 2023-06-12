import { Reservas } from '$db/collections';
import { PageServerLoad } from './$types';
import { get } from 'svelte/store';
import { user } from '../../stores';
import { findResByUser, updateRes, registerResWithoutId, delRes } from '../../resBackendUtils';
import { addProduct } from '../../prodBackendUtils';
import { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async function () {
	let User = get(user);

	if (User?.type == 'Pañolero') {
		const projection = { _id: 0 };
		const res = await Reservas.find({}).project(projection).toArray();
		let serializedRes;
		if (res.length == 0) {
			serializedRes = null;
		} else {
			serializedRes = res.map((item) =>
				JSON.parse(
					JSON.stringify(item, (key, value) => (key === '__id' ? value.toString(value) : value))
				)
			);
		}
		// console.log(serializedRes);
		return {
			reservas: serializedRes
		};
	} else {
		const res = await findResByUser(Reservas, User!);
		// console.log(res);
		if (res != null) {
			return { reservas: res };
		} else {
			return { reservas: null };
		}
	}
};

export const actions: Actions = {
	delete: async ({ url }) => {
		const id = parseInt(url.searchParams.get('id')!);
		if (!id) {
			return fail(400);
		}
		const del = await delRes(id);
		throw redirect(303, '/historial');
	},
	cancelar: async ({ url }) => {
		const id = parseInt(url.searchParams.get('id')!);
		if (!id) {
			return fail(400);
		}
		const projection = { _id: 0 };
		let res = await Reservas.find({ id: id }).project(projection).toArray();
		res[0].state = 'Cancelado';
		res = res[0];
		const filter = await { id: id };
		const resToInsert = await registerResWithoutId(res);
		const resultOfInsert = await updateRes(filter, resToInsert);
		// console.log(resultOfInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			// console.log("MODIFICADO EXITOSAMENTE");
			addProduct(res.items);
			throw redirect(303, '/historial');
		} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
			// console.log("NO SE HA MODIFICADO NADA");
			return fail(503);
		} else {
			// console.log("ERROR BACKEND");
			return fail(503);
		}
	},
	confirm: async ({ url }) => {
		const id = parseInt(url.searchParams.get('id')!);
		if (!id) {
			return fail(400);
		}
		const projection = { _id: 0 };
		let res = await Reservas.find({ id: id }).project(projection).toArray();
		res[0].state = 'Devuelto';
		res = res[0];
		const filter = await { id: id };
		const resToInsert = await registerResWithoutId(res);
		const resultOfInsert = await updateRes(filter, resToInsert);
		// console.log(resultOfInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			// console.log("MODIFICADO EXITOSAMENTE");
			addProduct(res.items);
			throw redirect(303, '/historial');
		} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
			// console.log("NO SE HA MODIFICADO NADA");
			return fail(503);
		} else {
			// console.log("ERROR BACKEND");
			return fail(503);
		}
	}
	// actualizar: async ({
	// 	request
	// }: RequestEvent): Promise<registerFormData | ActionFailure<registerFormData> | Redirect> => {
	// 	const registrarFormData = await request.formData();
	// 	const name = registrarFormData.get('name') ?? productAllData.name;
	// 	const stock = registrarFormData.get('stock') ?? productAllData.stock;
	// 	const categoria = registrarFormData.get('categoria') ?? productAllData.categoria;
	// 	let imgUrl = registrarFormData.get('imgUrl') ?? productAllData.imgUrl;
	// 	imgUrl = registrarFormData.get('imgUrl') == '' ? productAllData.imgUrl : imgUrl;
	// 	const descripcion = registrarFormData.get('descripcion') ?? productAllData.descripcion;

	// 	let RegistrarResponse: registerFormData = {
	// 		nameUsed: false,
	// 		error: false,
	// 		success: false,
	// 		message: '',
	// 		id: productAllData.id,
	// 		name,
	// 		stock,
	// 		categoria,
	// 		imgUrl,
	// 		descripcion
	// 	};

	// 	const collection = await Productos;
	// 	let nameList: String[];

	// 	try {
	// 		if (RegistrarResponse.name != productAllData.name) {
	// 			nameList = await returnNamesList(collection);
	// 			if (nameList.includes(name.toString())) {
	// 				RegistrarResponse.imgUrl = '';
	// 				RegistrarResponse.error = true;
	// 				RegistrarResponse.nameUsed = true;
	// 				RegistrarResponse.message = '¡Este nombre de producto ya está en uso!';
	// 				return fail(400, RegistrarResponse);
	// 			}
	// 		}
	// 	} catch (error: any) {
	// 		RegistrarResponse.imgUrl = '';
	// 		RegistrarResponse.error = true;
	// 		RegistrarResponse.message =
	// 			'¡Error intentando mandar el formulario! Intente de nuevo en unos minutos!';
	// 		return fail(500, RegistrarResponse);
	// 	}

	// 	const filter = await { id: RegistrarResponse.id };
	// 	const prodToInsert = await registerFormToProdWithoutId(RegistrarResponse);
	// 	const resultOfInsert = await updateProd(filter, prodToInsert);
	// 	// console.log(resultOfInsert.modifiedCount);
	// 	if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
	// 		throw redirect(303, `/productos/${productAllData.id}`);
	// 	} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
	// 		RegistrarResponse.imgUrl = '';
	// 		RegistrarResponse.error = true;
	// 		RegistrarResponse.message =
	// 			'¡Error al actualizar el producto! No se han ingresado nuevos datos.';
	// 		return fail(503, RegistrarResponse);
	// 	} else {
	// 		RegistrarResponse.imgUrl = '';
	// 		RegistrarResponse.error = true;
	// 		RegistrarResponse.message = '¡Error al actualizar el producto! Intente más tarde.';
	// 		return fail(503, RegistrarResponse);
	// 	}
	// }
};
