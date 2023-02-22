import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewTaskPage } from 'src/app/pages/new-task/new-task.page';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {

  constructor(private modalCtrl: ModalController) {
    
  }

  ngOnInit() {
  }
  
  public async addTask(){
    const modal = await this.modalCtrl.create({
      component: NewTaskPage,
    });
    return await modal.present();
  }

  cerrarSesion(){
    
  }

}
