import { writable } from "svelte/store";
import type { User,UserWithoutPassword } from "./types/user";
import type { Writable } from "svelte/store";


export const showModal = writable(false);

export const authToken:Writable<string|undefined> = writable(undefined);

export const user:Writable<UserWithoutPassword|undefined> = writable(undefined);