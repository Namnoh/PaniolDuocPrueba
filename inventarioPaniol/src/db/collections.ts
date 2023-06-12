import db from '$db/mongo';

export const Usuarios = db.collection('usuarios');

export const Productos = db.collection('productos');

export const Reservas = db.collection('reservas');