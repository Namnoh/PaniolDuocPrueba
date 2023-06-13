import { writable, get } from 'svelte/store';
import type { Writable } from "svelte/store";

type Notification = string;

export const notifications = writable<Notification[]>([]);

export function toast(message: string) {
	notifications.update((state) => [message, ...state]);
	setTimeout(removeToast, 10000);
    // console.log(get(notifications));
}

export const msg:Writable<string | undefined> = writable('OLA');

export function autoToast(message: string) {
	notifications.update((state) => [message, ...state]);
	setTimeout(removeToast, 5000);
    console.log(get(notifications));
}

function removeToast() {
	notifications.update((state) => {
		return [...state.slice(0, state.length - 1)];
	});
    // console.log(get(notifications));
}