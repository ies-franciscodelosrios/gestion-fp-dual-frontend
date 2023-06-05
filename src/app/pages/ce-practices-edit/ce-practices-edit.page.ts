import { Component, Input, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, AlertController, ModalController, NavParams } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { LoginService } from 'src/app/services/login.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-ce-practices-edit',
  templateUrl: './ce-practices-edit.page.html',
  styleUrls: ['./ce-practices-edit.page.scss'],
})
export class CePracticesEditPage implements OnInit, OnChanges {
  public practica: string = "";
  public formPractica: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule
  public valor: string;
  public listAlu: Usuario[] = [];
  public listEmp: Usuario[] = [];
  @Input() atribPP: PeriodoPracticas;
  @Input('mode') mode: string;
  @ViewChild('inputElement', { static: true }) inputElement: ElementRef;
  @ViewChild('selectBusiness') selectBusiness: IonSelect;
  @ViewChild('selectAlumn') selectAlumn: IonSelect;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private logsv: LoginService,
    private alrtCtrl: AlertController,
    navParams: NavParams,
    private ref: ChangeDetectorRef
  ) {
    this.practica = navParams.get('practicas de empresa')
  }
  ngOnInit() {
    this.load();
  }

  public async load() {
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
      try {
        this.apiS.getUsuarioEmpresa().subscribe(rol => {
          this.listEmp = <Usuario[]>rol.user;
          return this.listEmp;
        })
        this.apiS.getUsuarioAlumno().subscribe(rol => {
          this.listAlu = <Usuario[]>rol.user;
          return this.listAlu;
        })
      } catch (error) {
      }

    } else if (this.mode == "edit") {
      console.log(this.atribPP)
      this.practica = "Editar practica"
      this.formPractica = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
        id_empresa: [this.atribPP.id_empresa?.nombre, [Validators.required, Validators.required]],
        id_alumno: [this.atribPP.id_alumno?.nombre, [Validators.required, Validators.required]],
        tiempo_inicio: [this.atribPP.tiempo_inicio, [Validators.required, Validators.required]],
        tiempo_final: [this.atribPP.tiempo_final, [Validators.required, Validators.required]],
        estado: [this.atribPP.estado],
      })
      try {
        this.apiS.getUsuarioEmpresa().subscribe(rol => {
          this.listEmp = <Usuario[]>rol.user;
          this.selectBusiness.value = this.atribPP.id_empresa?.id;
          return this.listEmp
        })
        this.apiS.getUsuarioAlumno().subscribe(rol => {
          this.listAlu = <Usuario[]>rol.user;
          this.selectAlumn.value = this.atribPP.id_alumno?.id;
          return this.listAlu
        })
      } catch (error) {
      }
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

  async ngOnChanges() {
    this.ref.markForCheck();
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
    } else {
      this.atribPP.id_alumno = this.selectAlumn.value;
      this.atribPP.id_empresa = this.selectAlumn.value;
      try {
        this.apiS.updatePractica({
          id: this.atribPP.id,
          id_centro: { id: this.logsv.user.id },
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

  onDelete() {
    this.alrtCtrl.create({
      header: '¿Estás seguro?',
      message: '¿Realmente quieres eliminar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          handler: () => {
            this.apiS.deletePP(this.atribPP.id).subscribe((respuesta) => {
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

