import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonTitle, ModalController, NavParams } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { APIService } from 'src/app/services/api.service';
import { Titulo } from 'src/model/Titulo';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-titulo-edit',
  templateUrl: './titulo-edit.page.html',
  styleUrls: ['./titulo-edit.page.scss'],
})
export class TituloEditPage implements OnInit {
  public title: string = "";
  public formTitulo: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule

  @Input('atribtitle') atribtitle: Titulo;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private alrtCtrl: AlertController,
  ) {
    
  }
  ngOnInit() {
    const btnelem = document.getElementById('btnDelete') as HTMLElement;
    btnelem.style.display = 'none';
    this.formTitulo = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      titulo: ['', [Validators.required, Validators.minLength(2)]],
    })
  }
  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }
  submitForm() {
    //mostrar un loading....
    try {
      this.apiS.addTitulo({ nombre: this.formTitulo.get('titulo')?.value }).subscribe(d => {
        //la respuesta del servidor

        //ocultador loading
      })
    } catch (error) {
      //ocular loading
    }
    this.cancel();
  }

  onDelete(){
    console.log(this.atribtitle.id);
    this.alrtCtrl.create({
      header: '¿Estás seguro?',
      message:'¿Realmente quieres eliminar?',
      buttons:[
        {
          text: 'Cancelar',
          role:'cancel'
        },{
          text: 'Eliminar',
          handler:() => {
            this.apiS.deleteTitulo(this.atribtitle.id).subscribe((respuesta) => {
              console.log(respuesta);
            });
            this.cancel();
          }
        }
      ]
    }).then(alrtElem => {
      alrtElem.present();
    })  
  }
}
