import { Injectable } from '@angular/core';
import { Tarea } from '../model/Tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor() { }
  /*
  public async addTarea(tarea: Tarea): Promise<Tarea>{
    const { id, ...t} = tarea;
    let newTarea = await 
    tarea.id = newTarea.id
    return tarea;
  }

  public removeTarea(id): Promise<void>{
    return id
  }

  public async getTareaByContent(word):Promise<Tarea[]>{
    if(!word) return;
    let tarea:Tarea[] = []
    let r;

    return tarea;
  }

  public async getTareas(refreshing?:boolean):Promise<Tarea[]>{
    return tarea;
  }

  public async getTarea(id):Promise<Tarea>{
    return
  }

  public async updateTarea(tarea):Promise<void>{

  }*/
}
