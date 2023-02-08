import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
    console.log("Esto añade una tarea en el futuro");
    
    /*
    const modal = await this.modalCtrl.create(

    )
    */
  }

}
