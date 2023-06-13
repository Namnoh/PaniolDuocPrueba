import type { ObjectId } from 'mongodb';

export interface Reserva {
	_id: ObjectId | string;
	id: number;
	dateReserva: Date;
	dateDevolucion: Date;
	items : []
	user : []
    state: string;
}

export interface ReservaWithoutId extends Omit<Reserva, '_id'> {};