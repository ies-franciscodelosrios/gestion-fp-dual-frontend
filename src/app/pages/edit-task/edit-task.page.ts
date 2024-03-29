import { Component, Input, OnInit, Output,EventEmitter, ChangeDetectorRef, ViewChild, OnChanges  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonSelect, ModalController, NavParams } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { LoginService } from 'src/app/services/login.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss']
})
export class EditTaskPage implements OnInit,OnChanges {
  public now: Date = new Date();
  public guarDate: string = this.now.toJSON();
  public periodos: PeriodoPracticas[] = [];
  @Input() encargo:Encargo;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('select') select:IonSelect;
  public formTask: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private login : LoginService,
    private ref: ChangeDetectorRef
  ) {
  }

  async ngOnInit() {
    console.log(this.encargo)
    console.log(this.select)
    const dateform = new Date(this.encargo.fecha)
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: [this.encargo.tarea,[Validators.required, Validators.minLength(4)]],
      taskstatus: this.encargo.estado,
      taskdate: dateform.toLocaleString('es-ES', { timeZone: 'UTC' }),
      taskcomment: this.encargo.comentario
    });
    this.periodos = await lastValueFrom(this.apiS.getPeriodobyEmpresa(this.login.user.id));
    this.select.value=this.encargo.id_periodo;
  }

  async ngOnChanges(){
    this.ref.markForCheck();
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    this.encargo.tarea=this.formTask.get('taskname')?.value;
    this.encargo.estado= this.formTask.get('taskstatus')?.value;
    this.encargo.id_periodo= this.select.value;
    this.encargo.fecha= this.formTask.get('taskdate')?.value;

    try {
      this.apiS.updateEncargo({
        id: this.encargo.id,
        tarea: this.encargo.tarea,
        fecha: this.guarDate,
        estado: this.encargo.estado,
        comentario: this.encargo.comentario,
        periodo_practica: {
          id: this.encargo.id_periodo
        }
      }).subscribe(d => {
        //la respuesta del servidor
        
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
    
    this.closeModal.emit(true)
    this.modalCTRL.dismiss()
  }
  
  delete(){
    this.apiS.deleteEncargo(this.encargo.id).subscribe(d => {
      //la respuesta del servidor
      
      //ocultador loading
    })
    this.modalCTRL.dismiss()
  }
}
