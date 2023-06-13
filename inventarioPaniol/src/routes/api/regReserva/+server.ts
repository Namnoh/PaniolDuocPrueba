import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { Reservas } from '$db/collections';
import {
	findResByIdAllData,
	registerRes,
	registerResWithoutId,
	returnAllIds
} from '../../../resBackendUtils';
import type { ReservaWithoutId } from '../../../types/reservas';
import { subStock } from '../../../prodBackendUtils';
import { msg } from '../../notifications';

type Data = {
	success: boolean;
	errors: string;
	item : string
};

export const POST: RequestHandler = async ({ request }) => {
	// console.log('UTILIZANDO API');
	const datos = await request.json();
	// console.log(datos);

	const items = datos.items;
	const dateReserva = datos.dateReserva;
	const dateDevolucion = datos.dateDevolucion;
	const user = datos.user;

	const data: Data = {
		success: false,
		errors: '',
		item : ''
	};

	let reserva: ReservaWithoutId = {
		id: 0,
		items,
		dateReserva,
		dateDevolucion,
		user,
		state: 'Reservado'
	};

	const collection = await Reservas;

	let idList;
	const characters = '0123456789';
	idList = await returnAllIds(collection);
	while (true) {
		let id = '';
		for (let i = 0; i < 6; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			id += characters.charAt(randomIndex);
		}
		if (!idList.includes(Number(id))) {
			reserva.id = Number(id);
			break;
		}
	}

	const result = await subStock(items);

	if (result?.err == true) {
		data.errors = result.msg;
		data.item = result.item;
		return json(data, { status: 400 });
	} else {
		const prodToInsert = await registerResWithoutId(reserva);
		const resultOfInsert = await registerRes(collection, prodToInsert);
		if (resultOfInsert.acknowledged && resultOfInsert.insertedId) {
			data.success = true;
			return json(data, { status: 200 });
		} else {
			data.errors = 'Error al registrar la reserva';
			return json(data, { status: 400 });
		}
	}
};
