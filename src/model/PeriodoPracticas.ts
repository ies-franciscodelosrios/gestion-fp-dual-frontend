import { Usuario } from "./Usuario";

export interface PeriodoPracticas {
    id?: number,
    id_centro?: Usuario,
    id_empresa?: Usuario,
    id_alumno?: Usuario,
    tiempo_inicio?: Date,
    tiempo_final?: Date,
    estado?: boolean,
    imagen?:string
}
