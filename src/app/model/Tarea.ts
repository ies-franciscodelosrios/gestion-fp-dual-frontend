export interface Tarea {
    id?:String | number,
    id_periodo_practica?:String | number,
    titulo:String,
    fecha:String,
    estado:Boolean,
    comentario:String
}