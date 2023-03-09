import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { LoginService } from 'src/app/services/login.service';

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
  @Input('atribPP') atribPP: PeriodoPracticas;
  @Input('mode') mode: string;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private logsv: LoginService,
    private alrtCtrl: AlertController,
    navParams: NavParams
  ) {
    this.practica = navParams.get('practicas de empresa')
  }
  ngOnInit() {
    if (this.mode == "create") {
      this.practica = "Crear practica"
      const btnelem = document.getElementById('btnDelete') as HTMLElement;
      btnelem.style.display = 'none';
      this.formPractica = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
        id_empresa: ['', [Validators.required, Validators.required]],
        id_alumno: ['', [Validators.required, Validators.required]],
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
    } else if (this.mode == "edit") {
      this.practica = "Editar practica"
      this.formPractica = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
        id_empresa: [this.atribPP.id_empresa?.nombre, [Validators.required, Validators.required]],
        id_alumno: [this.atribPP.id_alumno?.nombre, [Validators.required, Validators.required]],
        tiempo_inicio: [this.atribPP.tiempo_inicio],
        tiempo_final: [this.atribPP.tiempo_final],
        estado: [this.atribPP.estado],
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

  onDateChange(event: any) {
    let newDate = new Date(event.detail.value);
    let formattedDate = newDate.toISOString();
  }

  onItemClick(item: any) {
    let selectedItem = this.listEmp.find(i => i.nombre === item.name);
  }

  submitForm() {
    //metodo A para pasar el tipo de fecha a otro
    const a = new Date(this.formPractica.get('tiempo_inicio')?.value)
    const t_inicio = a.toISOString();
    const b = new Date(this.formPractica.get('tiempo_final')?.value)
    const t_final = b.toISOString();
    //let b: string = JSON.stringify(this.formPractica.get('tiempo_final')?.value)
    //const t_fi = b.split("+");
    //b = t_fi[0].substring(1) + ".000Z"
    //mostrar un loading....
    if (this.mode == "create") {
      try {
        this.apiS.addPractica({
          id_empresa: { id: this.formPractica.get('id_empresa')?.value },
          id_centro: { id:  this.logsv.user.id},
          id_alumno: { id: this.formPractica.get('id_alumno')?.value },
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
    } else {
      try {
        this.apiS.updatePractica({
          id: this.atribPP.id,
          id_empresa: { id: this.formPractica.get('id_empresa')?.value },
          id_centro: { id: this.logsv.user.id },
          id_alumno: { id: this.formPractica.get('id_alumno')?.value },
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

  onDelete(){
    console.log(this.atribPP.id);
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
            this.apiS.deletePP(this.atribPP.id).subscribe((respuesta) => {
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
