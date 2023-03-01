import { Usuario } from "./Usuario"

export interface Rol{
    idRol?:number
    rolNombre?:string
    user?:Usuario[]
}