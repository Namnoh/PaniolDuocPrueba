export interface registerFormData {
    error:boolean,
    message: string,
    date: FormDataEntryValue,
    hour: FormDataEntryValue,
    estado: FormDataEntryValue,
    // productos: FormDataEntryValue,
    // cantidad: FormDataEntryValue,
    [key:string]: any
}