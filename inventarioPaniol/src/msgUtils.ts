import { msgNoti } from './stores';

export const changeMsg = async (type: string, msg: string) => {
	// console.log(`[BACK]VALORES: ${type} | MSG: ${msg}`);
	msgNoti.set([type, msg]);
    // msgNoti.subscribe(value => console.log(value))
};