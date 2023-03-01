import { PeriodoPracticas } from "src/model/PeriodoPracticas";

export interface Tarea {
    id?:String | number,
    periodo_practica?: PeriodoPracticas,
    tarea:String,
    fecha:String,
    estado:Boolean,
    comentario:String
}