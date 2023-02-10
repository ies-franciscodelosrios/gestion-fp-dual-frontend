import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonTitle, ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginService } from '../../services/login.service';
import { APIService } from 'src/app/services/api.service';


@Component({
  selector: 'app-practicas',
  templateUrl: './practicas.page.html',
  styleUrls: ['./practicas.page.scss'],
})


export class PracticasPage implements OnInit {
  public practica: string = "";
  public selectDate: String;
  public calendarOn: boolean = false;
  public formPractica: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  public valor: string;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.practica = navParams.get('practicas de empresa')
  }

  ngOnInit() {
    this.formPractica = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      empresa: ['', [Validators.required, Validators.minLength(4)]],
      alumno: '',
      fInicio: '',
      fFin: '',
    })
  }


  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  opencalendar() {
    if (this.calendarOn == false) {
      let cale: any = document.getElementById("datetimePicker");
      cale.style = "";
      this.calendarOn = true;
    } else {
      let cale: any = document.getElementById("datetimePicker");
      cale.style = "display:none;";
      this.calendarOn = false;
    }
  }


  selecAlum(valors: string) {
    this.valor = valors;
    this.inputElement.nativeElement = valors;
  }


  submitForm() {
    console.log(this.formPractica.get('nombre')?.value);
    //mostrar un loading....
    try {
      this.apiS.addUsuario({
        nombre: this.formPractica.get('nombre')?.value,
        correo: this.formPractica.get('correo')?.value,
        doc: this.formPractica.get('doc')?.value,
        id_rol: this.formPractica.get('id_rol')?.value,
        alta: this.formPractica.get('alta')?.value,
      }).subscribe(d => {
        //la respuesta del servidor
        console.log(d);
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
  }
}
