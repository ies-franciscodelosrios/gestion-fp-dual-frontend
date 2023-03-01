import { Usuario } from "./Usuario";

export interface PeriodoPracticas {
    id?:string,
    idCentro?:Usuario,
    idEmpresa?:Usuario,
    idAlumno?:Usuario,
    tInicio?: Date,
    tFin?:Date,
    estado?:boolean
}