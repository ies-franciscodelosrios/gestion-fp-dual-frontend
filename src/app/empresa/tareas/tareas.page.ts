import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TareaComponent } from '../../components/tarea/tarea.component';

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
      component: TareaComponent,
    });
    return await modal.present();
    
    /*
    const modal = await this.modalCtrl.create(

    )
    */
  }

}
