import type { ObjectId } from 'mongodb';

export interface Productos {
	_id: ObjectId | string;
	id: number;
	stockTotal: number;
	stockDisponible: number;
	categoria: string;
	imgUrl: string;
	descripcion: string
}

export interface ProductosWithoutId extends Omit<Productos, '_id'> {};