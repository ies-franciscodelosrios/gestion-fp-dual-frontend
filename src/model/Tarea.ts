import { PeriodoPracticas } from "src/model/PeriodoPracticas";

export interface Tarea {
    id?:String | number,
    id_periodo:number,
    tarea:String,
    fecha:String,
    estado:Boolean,
    comentario:String
}