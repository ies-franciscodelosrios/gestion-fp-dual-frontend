import { Ce } from "./Ce"
import { Modulo } from "./Modulo"

export interface Ra{
    id?:number,
    modulo?:Modulo,
    resultado?:string,
    ce?: Ce[],
}