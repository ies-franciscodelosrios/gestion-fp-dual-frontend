import { Rol } from "./Rol";

export interface Usuario {
    id?:string,
    nombre?:string,
    alta?:boolean,
    rol?:Rol,
    documentos?:string,
    password?:string,
    correo?:string
}
