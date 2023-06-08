import type { ObjectId } from 'mongodb';

export interface ProductoReserva {
	_id: ObjectId | string;
	id: number;
	stock: number;
	categoria: string;
	imgUrl: string;
}

export interface ReservaWithoutId extends Omit<ProductoReserva, '_id'> {};

export interface Reserva {
	_id: ObjectId | string;
	id: number;
	fecha_reserva: Date;
	fecha_devolución: Date;
	items : {
		producto : ReservaWithoutId;
	}
    state: boolean;
}