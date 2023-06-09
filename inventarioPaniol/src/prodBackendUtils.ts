import type { Collection } from 'mongodb';
import type { ProductosWithoutId } from './types/prod';
import type { registerFormData } from './types/formsProd';
import { Productos } from '$db/collections';

export const returnAllIds = async (collection: Collection) => {
	const projection = { id: 1, _id: 0 };
	const prods = await collection.find().project(projection).toArray();
	const idList: number[] = prods.map((prod) => parseInt(prod.id));
	return idList;
};

export const returnNamesList = async (collection: Collection): Promise<string[]> => {
	const projection = { name: 1, _id: 0 };
	const prods = await collection.find().project(projection).toArray();
	const nameList: string[] = prods.map((prod) => prod.name.toString());
	return nameList;
};

export const findProdByIdAllData = async (collection: Collection, id: number) => {
	const projection = { _id: 0 };
	const Prod = await collection.find({ id: id }).project(projection).toArray();
	// console.log('Prod Find Result', Prod[0]);
	if (Prod[0] != undefined) {
		return JSON.parse(
			JSON.stringify(Prod[0], (key, value) => (key === '_id' ? value.toString(value) : value))
		);
	} else {
		return null
	}
};

export const registerProd = async (collection: Collection, prod: ProductosWithoutId) => {
	const register = await collection.insertOne(prod);
	return register;
};

export const registerFormToProdWithoutId = async (
	form: registerFormData
): Promise<ProductosWithoutId> => {
	const prod = {
		id: form.id,
		name: form.name.toString(),
		stock: parseInt(form.stock.toString()),
		categoria: form.categoria.toString(),
		imgUrl: form.imgUrl.toString(),
        descripcion: form.descripcion.toString(),
	};

	return prod;
};

export const delProd = async (id: number) => {
	const del = await Productos.deleteOne({id : id});
	return true;
}

export const updateProd = async (filter, prod) => {
	prod = await { $set: prod };
	const result = await Productos.updateOne(filter, prod);
	console.log(`RESULT BACKEND: ${JSON.stringify(result)}`)
	return result;
};