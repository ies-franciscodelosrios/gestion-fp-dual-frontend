import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  //tema oscuro o claro
  darkMode: boolean;
  @Input('tarea') tarea:Encargo; 
  public tareas:Array<Tarea>=[]=[];
  public usuarios:Array<Usuario>=[]=[];
  constructor(
    private modalCtrl: ModalController, 
    private apiS: APIService,
    private login: LoginService,
    private router: Router,
    private cdRef: ChangeDetectorRef) {

  }

  ionViewWillEnter() {
    this.login.keepSession();  
    //se obtienen los encargos y se insertan en el array encargos
  }

  ngOnInit() {
    this.loadTareas();
  }

  //Este método carga todas las tareas que ha asignado la empresa a los alumnos
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
  
  //Este método abre un modal que añade tareas
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

  //Este método, al pulsar en la tarea nos abre un modal y podemos modificarla
  public async editTask(tarea:any){
    console.log(tarea)
    const modal = await this.modalCtrl.create({
      component: EditTaskPage,
      componentProps: { encargo : tarea },
    });
    modal.onDidDismiss().then(() => {
      //window.location.reload();
      this.loadTareas();
      //this.cdRef.detectChanges();
    });
    return await modal.present();
  }


  public async editProfile(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
}
