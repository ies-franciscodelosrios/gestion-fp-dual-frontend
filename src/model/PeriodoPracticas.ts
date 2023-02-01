import { Usuario } from "./Usuario";

export interface PeriodoPracticas {
    id?:string,
    idEmpresa?:Usuario,
    idALumno?:Usuario,
    tInicio?: Date,
    tFin?:Date,
    estado?:boolean
}