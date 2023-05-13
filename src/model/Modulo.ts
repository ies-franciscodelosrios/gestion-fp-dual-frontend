import { Ra } from "./Ra"
import { Titulo } from "./Titulo"

export interface Modulo{
    id?: number,
    cod_mod_boja?:number,
    nombre?:string,
    id_titulo?:Titulo,
    ra?:Ra[] 
}