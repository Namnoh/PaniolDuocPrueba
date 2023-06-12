import { writable, get } from 'svelte/store';
import type { Writable } from "svelte/store";

type Notification = string;

export const notifications = writable<Notification[]>([]);
export const msg:Writable<string | undefined> = writable(undefined);

export function toast(message: string) {
	notifications.update((state) => [message, ...state]);
	setTimeout(removeToast, 10000);
    console.log(get(notifications));
}

function removeToast() {
	notifications.update((state) => {
		return [...state.slice(0, state.length - 1)];
	});
	msg.set(undefined)
    console.log(get(notifications));
}