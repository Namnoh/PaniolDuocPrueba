import { MongoClient } from 'mongodb';
import {SECRET_MONGO_URL} from '$env/static/private';

const client = new MongoClient(SECRET_MONGO_URL);

export function start_mongo() {
    console.log("Inicializando Mongo...");
    return client.connect();
}

export default client.db();