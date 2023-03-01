import { Usuario } from "./Usuario";

export interface PeriodoPracticas {
    id?:string,
    idCentro?:Usuario,
    idEmpresa?:Usuario,
    idAlumno?:Usuario,
    tInicio?: Date,
    tFin?:Date,
    estado?:boolean

    id?: string,
    id_centro?: Usuario,
    id_empresa?: Usuario,
    id_alumno?: Usuario,
    tiempo_inicio?: Date,
    tiempo_final?: Date,
    estado?: boolean

}