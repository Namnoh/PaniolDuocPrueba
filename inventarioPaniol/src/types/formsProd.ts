export interface registerFormData {
    nameUsed: boolean,
    error:boolean,
    message: string,
    id: number,
    name: FormDataEntryValue,
    stockTotal: FormDataEntryValue,
    stockDisponible: FormDataEntryValue,
    categoria: FormDataEntryValue,
    imgUrl: FormDataEntryValue,
    descripcion: FormDataEntryValue,
    [key:string]: any
}

// export interface loginFormResponse extends Omit<loginFormData, 'password'> {
//     error:boolean,
//     message: string,
// }