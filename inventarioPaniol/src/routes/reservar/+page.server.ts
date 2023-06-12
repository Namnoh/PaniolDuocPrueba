import { Productos } from '$db/collections';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
	const projection = { _id: 0 };
	const prod = await Productos.find({}).project(projection).toArray();
	let serializedProd;
	if (prod.length == 0) {
		serializedProd = null;
	} else {
		serializedProd = prod.map((item) =>
			JSON.parse(
				JSON.stringify(item, (key, value) => (key === '__id' ? value.toString(value) : value))
			)
		);
	}
	return {
		productos: serializedProd
	};
};