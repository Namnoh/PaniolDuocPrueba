import { PageServerLoad } from './$types';
import { msg, notifications } from './notifications';
import { get } from 'svelte/store';

export const load: PageServerLoad = async function () {
    // msg.set('OLAAA')
    // console.log(get(notifications));

    // const text = 'Se ha iniciado sesión correctamente';
	// return {text};
}