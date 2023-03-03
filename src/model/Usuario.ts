import { Rol } from "./Rol";

export interface Usuario {
    id?:number,
    nombre?:string,
    alta?:boolean,
    rol?:Rol,
    doc?:string,
    password?:string,
    correo?:string
}
