import type { Collection } from 'mongodb';
import type { ReservaWithoutId } from './types/reservas';
import type { registerFormData } from './types/formsProd';
import { Reservas } from '$db/collections';
import { UserWithoutPassword } from './types/user'

export const returnAllIds = async (collection: Collection) => {
	const projection = { id: 1, _id: 0 };
	const reservas = await collection.find().project(projection).toArray();
	const idList: number[] = reservas.map((res) => parseInt(res.id));
	return idList;
};

// export const returnNamesList = async (collection: Collection): Promise<string[]> => {
// 	const projection = { name: 1, _id: 0 };
// 	const reservas = await collection.find().project(projection).toArray();
// 	const nameList: string[] = reservas.map((res) => res.name.toString());
// 	return nameList;
// };

export const findResByIdAllData = async (collection: Collection, id: number) => {
	const projection = { _id: 0 };
	const reservas = await collection.find({ id: id }).project(projection).toArray();
	// console.log('Reservas Find Result', Prod[0]);
	if (reservas[0] != undefined) {
		return JSON.parse(
			JSON.stringify(reservas[0], (key, value) => (key === '_id' ? value.toString(value) : value))
		);
	} else {
		return null
	}
};

export const findResByUser = async (collection: Collection, user: UserWithoutPassword) => {
	const projection = { _id: 0 };
	const reservas: any[] = await collection.find({ user: user }).project(projection).toArray();
	// console.log('Reservas Find Result', reservas);
	if (reservas.length > 0) {
		return JSON.parse(
			JSON.stringify(reservas, (key, value) => (key === '_id' ? value.toString(value) : value))
		);
	} else {
		return null
	}
};

export const registerRes = async (collection: Collection, res: ReservaWithoutId) => {
	const register = await collection.insertOne(res);
	return register;
};

export const registerResWithoutId = async (reserva : ReservaWithoutId): Promise<ReservaWithoutId> => {
	const res = {
		id: reserva.id,
		date: reserva.date,
		hour: reserva.hour,
		items: reserva.items,
		user: reserva.user,
        state: reserva.state,
	};

	return res;
};

export const delRes = async (id: number) => {
	const del = await Reservas.deleteOne({id : id});
	return true;
}

export const updateRes = async (filter, res) => {
	res = await { $set: res };
	const result = await Reservas.updateOne(filter, res);
	console.log(`RESULT BACKEND: ${JSON.stringify(result)}`)
	return result;
};