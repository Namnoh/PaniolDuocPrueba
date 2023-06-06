export interface registerFormData {
    weakPassword:boolean,
    emailUsed: boolean,
    error:boolean,
    message: string,
    passwordUnequal: boolean;
    id: number
    name: FormDataEntryValue,
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    password2: FormDataEntryValue
    type: string
    [key:string]: any
}

export interface loginFormData {
    email: FormDataEntryValue,
    password: FormDataEntryValue,
    [key:string]: any
}

export interface loginFormResponse extends Omit<loginFormData, 'password'> {
    error:boolean,
    message: string,
}