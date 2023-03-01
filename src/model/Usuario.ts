import { Rol } from "./Rol";

export interface Usuario {
    id?:string,
    nombre?:string,
    alta?:boolean,
    idRol?:Rol,
    doc?:string,
    password?:string,
    correo?:string
}
