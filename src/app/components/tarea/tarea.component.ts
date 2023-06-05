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
  //Encargo que tendra los datos de la tarea
  @Input('encargo') encargo:Encargo;
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  //abirira un modal para editar la tarea
  public async editEncargo(){
    const modal:HTMLIonModalElement = await this.modalCtrl.create({
      component: TareaEditPage,
      componentProps: { myEncargo: this.encargo }
    });

    return await modal.present();
  }

}
