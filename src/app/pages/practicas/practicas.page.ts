import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonTitle, ModalController, NavParams, PopoverController } from '@ionic/angular';
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
  public formPractica: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  public valor: string;
  public listAlu: Usuario[] = [];
  public listEmp: Usuario[] = [];

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
      id_empresa: ['', [Validators.required, Validators.minLength(4)]],
      id_alumno: ['', [Validators.required, Validators.minLength(4)]],
      tiempo_inicio: '',
      tiempo_final: '',
      estado: true,
    })
    this.apiS.getUsuarioEmpresa().subscribe(rol => {
      this.listEmp = <Usuario[]>rol.user;
      return this.listEmp
    })
    this.apiS.getUsuarioAlumno().subscribe(rol => {
      this.listAlu = <Usuario[]>rol.user;
      return this.listAlu
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  selecAlum(valors: string) {
    this.valor = valors;
    this.inputElement.nativeElement = valors;
  }
  selecEmp(valors: string) {
    this.valor = valors;
    this.inputElement.nativeElement = valors;
  }

  onDateChange(event:any) {
    let newDate = new Date(event.detail.value);
    let formattedDate = newDate.toISOString();
  }

  onItemClick(item:any) {
    let selectedItem = this.listEmp.find(i => i.nombre === item.name);
  }

  submitForm() {
    //metodo A para pasar el tipo de fecha a otro
    const a = new Date (this.formPractica.get('tiempo_inicio')?.value)
    const t_inicio = a.toISOString();

    const b = new Date (this.formPractica.get('tiempo_final')?.value)
    const t_final = b.toISOString();
    //metodo B
    //let b: string = JSON.stringify(this.formPractica.get('tiempo_final')?.value)
    //const t_fi = b.split("+");
    //b = t_fi[0].substring(1) + ".000Z"
    //mostrar un loading....
      try {
        this.apiS.addPractica({
          id_empresa:{id:this.formPractica.get('id_empresa')?.value}, 
          id_centro:{id:15},
          id_alumno: {id:this.formPractica.get('id_alumno')?.value},
          tiempo_inicio: t_inicio,
          tiempo_final: t_final,
          estado: this.formPractica.get('estado')?.value,
        }).subscribe(d => {
          //la respuesta del servidor
          //ocultador loading
        })
      } catch (error) {
        console.error(error);
        //ocular loading
      }
      this.cancel();
    }
}
