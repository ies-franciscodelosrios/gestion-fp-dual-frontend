import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController, NavParams } from '@ionic/angular';
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

  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.title = navParams.get('titulo')
  }

  ngOnInit() {
    this.formTitulo = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      titulo: ['', [Validators.required, Validators.minLength(2)]],
    })
  }


  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  submitForm() {
    console.log(this.formTitulo.get('titulo')?.value);
    //mostrar un loading....
    try {
      this.apiS.addTitulo({ nombre: this.formTitulo.get('titulo')?.value }).subscribe(d => {
        //la respuesta del servidor
        console.log(d);
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
  }

  /*onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }*/
}
