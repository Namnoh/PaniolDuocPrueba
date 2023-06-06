export interface registerFormData {
    emailUsed: boolean,
    error:boolean,
    message: string,
    id: number
    name: FormDataEntryValue,
    stock: FormDataEntryValue,
    categoria: FormDataEntryValue,
    imgUrl: FormDataEntryValue,
    descripcion: FormDataEntryValue
    [key:string]: any
}

// export interface loginFormResponse extends Omit<loginFormData, 'password'> {
//     error:boolean,
//     message: string,
// }