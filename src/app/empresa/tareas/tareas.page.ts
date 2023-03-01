import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/model/Tarea';
import { NewTaskPage } from 'src/app/pages/new-task/new-task.page';
import { EditTaskPage } from 'src/app/pages/edit-task/edit-task.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  public tareas:Array<Tarea>=[]=[];
  constructor(private modalCtrl: ModalController, private apiS: APIService) {

  }

  ngOnInit() {
    this.apiS.GetTarea().subscribe( (datos) => {
      for(let elemento of datos){
       this.tareas.push(<any>elemento);
      }
    })
    console.log(this.tareas)
  }
  
  public async addTask(){
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });
    return await modal.present();
  }

  public async editTask(){
    const modal = await this.modalCtrl.create({
      component: EditTaskPage,
    });
    return await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if(!role){
      //actualizar
      this.tareas=this.tareas.map((e)=>{
        if(e.id==data.id){
          return data;
        }else{
          return e;
        }
      })
    }
    console.log(data);
  }

  cerrarSesion(){
    
  }

}
