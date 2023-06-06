import { Usuarios, Productos } from '$db/collections';
import { PageServerLoad } from './$types';

export const load: PageServerLoad = async function() {
    // let user = {
    //     email: "fa.munoz@duocuc.cl",
    //     username: "Fabi",
    //     password: "fab123",
    //     name:"Fabian"
    // }
    // const save = await Usuarios.insertOne(user)

    // const projection = {email:1,_id:0, username:1, password:1, name:1}
    // const data = await usuarios.find({}).project(projection).toArray();

    const data = await Usuarios.find({}).toArray();
    console.log(data)

    const serializedData = data.map((item) => JSON.parse(JSON.stringify(item, (key,value) => key === '__id'? value.toString(value) : value)))
    
    const projection = {_id:0}
    const prod = await Productos.find({}).project(projection).toArray();
    const serializedProd = prod.map((item) => JSON.parse(JSON.stringify(item, (key,value) => key === '__id'? value.toString(value) : value)))
    console.log(prod)

    return {
        usuarios: serializedData,
        productos: serializedProd
    }
}