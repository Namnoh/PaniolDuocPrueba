import { Reservas } from '$db/collections';
import { PageServerLoad } from './$types';
import { get } from 'svelte/store';
import { user } from '../../stores';
import { findResByUser, updateRes, registerResWithoutId, delRes } from '../../resBackendUtils';
import { addProduct, subStock } from '../../prodBackendUtils';
import { Actions, RequestEvent, ActionFailure, Redirect } from '@sveltejs/kit';
import { fail, redirect } from '@sveltejs/kit';
import { registerResFormData } from '../../types/formsRes';

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
		const projection = { _id: 0 };
		let res = await Reservas.find({ id: id }).project(projection).toArray();
		res = res[0];
		console.log(res.state);
		if (res.state == 'Reservado') {
			addProduct(res.items);
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
		const wasReserved = res[0].state;
		res[0].state = 'Cancelado';
		res = res[0];
		const filter = await { id: id };
		const resToInsert = await registerResWithoutId(res);
		const resultOfInsert = await updateRes(filter, resToInsert);
		// console.log(resultOfInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			// console.log("MODIFICADO EXITOSAMENTE");
			console.log(wasReserved)
			console.log(res);
			if (wasReserved == 'Reservado') {
				const result = await addProduct(res.items);
				if (result?.err != true) {
					throw redirect(303, `/historial`);
				} else {
					return fail(503);
				}
			} else {
				throw redirect(303, '/historial');
			}
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
		const wasReserved = res[0].state;
		res[0].state = 'Devuelto';
		res = res[0];
		const filter = await { id: id };
		const resToInsert = await registerResWithoutId(res);
		const resultOfInsert = await updateRes(filter, resToInsert);
		// console.log(resultOfInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			// console.log("MODIFICADO EXITOSAMENTE");
			console.log(wasReserved);
			console.log(res.state);
			if (wasReserved == 'Reservado') {
				const result = await addProduct(res.items);
				if (result?.err != true) {
					throw redirect(303, `/historial`);
				} else {
					return fail(503);
				}
			} else {
				throw redirect(303, '/historial');
			}
		} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
			// console.log("NO SE HA MODIFICADO NADA");
			return fail(503);
		} else {
			// console.log("ERROR BACKEND");
			return fail(503);
		}
	},
	actualizar: async ({
		request,
		url
	}: RequestEvent): Promise<
		registerResFormData | ActionFailure<registerResFormData> | Redirect
	> => {
		const id = parseInt(url.searchParams.get('id')!);
		if (!id) {
			return fail(400);
		}
		const projection = { _id: 0 };
		let res = await Reservas.find({ id: id }).project(projection).toArray();
		let resAllData = res[0];

		const registrarFormData = await request.formData();
		const dateReserva = registrarFormData.get('dateReserva') ?? resAllData.dateReserva;
		const dateDevolucion = registrarFormData.get('dateDevolucion') ?? resAllData.dateDevolucion;
		const estado = registrarFormData.get('state') ?? resAllData.state;

		let RegistrarResponse: registerResFormData = {
			error: false,
			message: '',
			id: resAllData.id,
			dateReserva,
			dateDevolucion,
			estado
		};

		resAllData.dateReserva = dateReserva;
		resAllData.dateDevolucion = dateDevolucion;
		resAllData.state = estado;

		const collection = await Reservas;

		const filter = await { id: RegistrarResponse.id };
		const prodToInsert = await registerResWithoutId(resAllData);
		const resultOfInsert = await updateRes(filter, prodToInsert);
		// console.log(resultOfInsert.modifiedCount);
		if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount > 0) {
			if (resAllData.state == 'Reservado') {
				const result = await subStock(resAllData.items);
				if (result?.err != true) {
					throw redirect(303, `/historial`);
				} else {
					return fail(503, RegistrarResponse);
				}
			}
			throw redirect(303, `/historial`);
		} else if (resultOfInsert.acknowledged && resultOfInsert.modifiedCount == 0) {
			RegistrarResponse.error = true;
			RegistrarResponse.message =
				'¡Error al actualizar la reserva! No se han ingresado nuevos datos.';
			return fail(503, RegistrarResponse);
		} else {
			RegistrarResponse.error = true;
			RegistrarResponse.message = '¡Error al actualizar el producto! Intente más tarde.';
			return fail(503, RegistrarResponse);
		}
	}
};
