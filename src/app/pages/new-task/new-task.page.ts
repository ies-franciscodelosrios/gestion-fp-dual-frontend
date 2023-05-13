import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, ModalController, NavParams } from '@ionic/angular';
import { Tarea } from 'src/model/Tarea';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { LoginService } from 'src/app/services/login.service';
import { lastValueFrom } from 'rxjs';
import { Encargo } from 'src/model/Encargo';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  public now: Date = new Date();
  public guarDate: string = this.now.toJSON();
  public isoDate: string = this.now.toLocaleString('es-ES', { timeZone: 'UTC' });
  public periodos: PeriodoPracticas[] = [];
  public encargo: Encargo;
  public formTask: FormGroup;  //importar ReactiveFormModule en module.ts
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('select') select:IonSelect;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private login : LoginService,
    private apiS: APIService,
    private ref: ChangeDetectorRef,
    navParams: NavParams
  ) {
  }

  async ngOnInit() {
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: ['', [Validators.required, Validators.minLength(4)]],
      taskstatus: true,
      taskdate: this.isoDate
    })
    this.encargo = {
      id: 0,
      id_periodo: 0,
      tarea: '',
      fecha: '',
      estado: false,
      comentario: ''
    };
    this.periodos = await lastValueFrom(this.apiS.getPeriodobyEmpresa(this.login.user.id));
  }

  async ngOnChanges(){
    this.ref.markForCheck();
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    //mostrar un loading....
    this.encargo.id_periodo= this.select.value;
    console.log()
    try {
      this.apiS.addTarea({
        tarea: this.formTask.get('taskname')?.value,
        estado: this.formTask.get('taskstatus')?.value,
        fecha: this.guarDate,
        comentario: '',
        periodo_practica: {
          id: this.encargo.id_periodo
        }
        
      }).subscribe(d => {
        //la respuesta del servidor
        console.log(d);
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
    this.closeModal.emit(true)
    this.modalCTRL.dismiss()
  }
}
