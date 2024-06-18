export interface AuthLoginModel {
    accessToken?: string
}

export interface AuthLoginBodyModel {
    email: string,
    password: string
}

export interface AuthRegisterBodyModel {
    name: string,
    email: string,
    password: string
}