import type { ObjectId } from 'mongodb';

export interface User {
	_id: ObjectId | string;
	id: number;
	name: string;
	email: string;
	password: string;
	type: string
}
export interface UserWithoutId extends Omit<User, '_id'> {}
export interface UserWithoutPassword extends Omit<User,'password'>{}

// export interface Options {
// 	layout: string;
// 	carousel: boolean;
// 	hero: boolean;
// 	message: string;
// }