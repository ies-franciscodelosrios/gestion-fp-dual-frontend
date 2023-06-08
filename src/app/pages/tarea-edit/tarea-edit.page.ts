import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import {lastValueFrom} from 'rxjs'

@Component({
  selector: 'app-tarea-edit',
  templateUrl: './tarea-edit.page.html',
  styleUrls: ['./tarea-edit.page.scss'],
})

export class TareaEditPage implements OnInit {
  //tarea a modificar
  @Input() myEncargo: Encargo;
  //formulario
  public formEncargo: FormGroup;

  constructor(private modalCTRL: ModalController,
    private formBuilder: FormBuilder,
    private apiS: APIService,
    ) { }
     
  ngOnInit() {
    //se actuliza los input con la data de la tarea
    this.formEncargo = this.formBuilder.group({
      comentario:`${this.myEncargo.comentario}`,
      estado:`${this.myEncargo.estado}`
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  //se guardan los cambios en la tarea
  async submitForm() {
    //obtiene el valor del campo comentario 
      this.myEncargo.comentario=this.formEncargo.get('comentario')?.value;
    //segun el estado de la tarea el icono de ella cambiara
      if(this.formEncargo.get('estado')?.value=="true"){
        this.myEncargo.estado=true;
      }else{
        this.myEncargo.estado=false;
      }
      
      try{
        //actualiza la tarea
        const response = await lastValueFrom(this.apiS.updateEncargo({
          id: this.myEncargo.id,
          tarea:this.myEncargo.tarea,
          comentario: this.myEncargo.comentario,
          estado: this.myEncargo.estado,
          fecha: this.myEncargo.fecha,
          periodo_practica: {
            id:this.myEncargo.id_periodo
          }
        }));
      } catch (error) {
        console.error(error);
      }
      this.modalCTRL.dismiss({
        id: this.myEncargo.id,
        tarea:this.myEncargo.tarea,
        comentario: this.myEncargo.comentario,
        estado: this.myEncargo.estado,
        fecha: this.myEncargo.fecha,
        periodo_practica: {
          id:this.myEncargo.id_periodo
        }
      }, 'submit');
  }

 

}
