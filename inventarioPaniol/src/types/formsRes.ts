export interface registerResFormData {
    error:boolean,
    message: string,
    dateReserva: FormDataEntryValue,
    dateDevolucion: FormDataEntryValue,
    estado: FormDataEntryValue,
    // productos: FormDataEntryValue,
    // cantidad: FormDataEntryValue,
    [key:string]: any
}