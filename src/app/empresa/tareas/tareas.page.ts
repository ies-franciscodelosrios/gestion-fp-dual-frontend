import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { ModalController } from '@ionic/angular';
import { Tarea } from 'src/model/Tarea';
import { NewTaskPage } from 'src/app/pages/new-task/new-task.page';
import { EditTaskPage } from 'src/app/pages/edit-task/edit-task.page';
import { Encargo } from 'src/model/Encargo';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  @Input('tarea') tarea:Encargo; 
  public tareas:Array<Tarea>=[]=[];
  public usuarios:Array<Usuario>=[]=[];
  constructor(
    private modalCtrl: ModalController, 
    private apiS: APIService,
    private login: LoginService,
    private router: Router) {

  }

  ngOnInit() {
    this.loadTareas();
  }

  public async loadTareas(){
    await this.login.keepSession();
    this.tareas=[];
    this.usuarios=[];
    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe( tareas => {
      for (let elemento of tareas){
        for(let encargo of elemento.encargo){
          this.usuarios.push(<any>elemento.id_alumno);
          this.tareas.push(<any>encargo);
        }
      }
    })
  }
  
  public async addTask(){
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });
    modal.onDidDismiss().then(() => {
      //window.location.reload();
      this.loadTareas();
    });
    return await modal.present();
  }

  public async editTask(tarea:any){
    const modal = await this.modalCtrl.create({
      component: EditTaskPage,
      componentProps: { encargo : tarea }
    });
    modal.onDidDismiss().then(() => {
      //window.location.reload();
      this.loadTareas();
    });
    return await modal.present();
  }

  cerrarSesion(){
    this.login.logout();
    console.log("Cerrando")
  }

}
