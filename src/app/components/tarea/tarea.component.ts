import { Component, Input, OnInit } from '@angular/core';
import {  ModalController } from '@ionic/angular';
import { Encargo } from 'src/model/Encargo';
import { TareaEditPage } from 'src/app/pages/tarea-edit/tarea-edit.page';

@Component({
  selector: 'tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss'],
})
export class TareaComponent implements OnInit {
  
  @Input('encargo') encargo:Encargo;
  @Input('edit') edit:boolean;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    this.edit=false;
    
  }

  public async editEncargo(){
    const modal:HTMLIonModalElement = await this.modalCtrl.create({
      component: TareaEditPage,
      componentProps: { myEncargo: this.encargo }
    });

    return await modal.present();
  }

}
