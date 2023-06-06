import type { Collection } from 'mongodb';
import type { User, UserWithoutId } from './types/user';
import type { registerFormData } from './types/forms';
import bcrypt from 'bcrypt';

export const returnAllUsers = async (collection: Collection) => {
	const Users = await collection.find().toArray();
	//console.log("Result",Users);
	return Users;
};

export const returnAllIds = async (collection: Collection) => {
	const projection = { id: 1, _id: 0 };
	const users = await collection.find().project(projection).toArray();
	const idList: number[] = users.map((user) => parseInt(user.id));
	return idList;
};

export const returnEmailsList = async (collection: Collection): Promise<string[]> => {
	const projection = { email: 1, _id: 0 };
	const users = await collection.find().project(projection).toArray();
	const emailList: string[] = users.map((user) => user.email.toString());
	return emailList;
};

export const registerUser = async (collection: Collection, user: UserWithoutId) => {
	const register = await collection.insertOne(user);
	return register;
};

export const bulkAddUsers = async (collection: Collection, users: UserWithoutId[]) => {
	const register = await collection.insertMany(users);
	return register;
};

export const deleteAll = async (collection: Collection) => {
	const deleteMany = await collection.deleteMany();
	return deleteMany;
};

export const findUserById = async (collection: Collection) => {
	const Users = await collection.find().toArray();
	//console.log("Result",Users);
	return Users;
};

export const findUserByEmail = async (collection: Collection, email: string) => {
	const projection = { email: 1, _id: 0, password: 1 };
	const User = await collection.find({ email: email }).project(projection).toArray();
	// console.log('Email Find Result', User[0]);
	return JSON.parse(
		JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
	);
};

export const findUserByEmailAllData = async (collection: Collection, email: string) => {
	const projection = { _id: 0 };
	const User = await collection.find({ email: email }).project(projection).toArray();
	// console.log('Email Find Result', User[0]);
	return JSON.parse(
		JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
	);
};

export const findUserByEmailWithPassword = async (collection: Collection, email: string) => {
	const projection = { email: 1, _id: 0, password: 1};
	const User = await collection.find({ email: email }).project(projection).toArray();
	// console.log('Email Find Result', User[0]);
	if (User[0]!=undefined) {
		return JSON.parse(
			JSON.stringify(User[0], (key, value) => (key === '_id' ? value.toString(value) : value))
		);
	} else {
		return null
	}
};

export const registerFormToUserWithoutId = async (
	form: registerFormData
): Promise<UserWithoutId> => {
	const hashedPassword = await bcrypt.hash(form.password, 12);
	const user = {
		id: form.id,
		name: form.name.toString(),
		email: form.email.toString(),
		password: hashedPassword,
		type: form.type.toString(),
		// Esto sirve si es que debemos agregar más cosas
		// options: {
		// 	layout: 'top',
		// 	carousel: false,
		// 	hero: false,
		// 	message: ''
		// }
	};

	return user;
};