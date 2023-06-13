import { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
const text = 'Se ha iniciado sesión correctamente';
	return {text};
}