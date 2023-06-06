import { Productos } from '$db/collections';
import { PageServerLoad } from './$types';
import { Actions } from '@sveltejs/kit';
import { delProd, findProdByIdAllData } from '../../../prodBackendUtils';
import { redirect, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async function ({ params }) {
	const id = parseInt(params.slug);
	const productData = await findProdByIdAllData(Productos, id);

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
	}
};
