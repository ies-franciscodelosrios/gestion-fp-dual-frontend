import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { Tarea } from 'src/model/Tarea';
import { Usuario } from 'src/model/Usuario';
import { LoginService } from 'src/app/services/login.service';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  public periodos: PeriodoPracticas[] = [];
  
  @Input() encargo:Encargo;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  public formTask: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private login : LoginService
  ) {}

  ngOnInit() {
    const now: Date = new Date();
    const isoDate: string = now.toISOString();
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: [this.encargo.tarea,[Validators.required, Validators.minLength(4)]],
      taskuser: this.encargo.id_periodo,
      taskstatus: this.encargo.estado,
      taskdate: this.encargo.fecha,
      taskcomment: this.encargo.comentario
    });
    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe(periodo => {
      for(let elemento of periodo){
        this.periodos.push(<any>elemento);
       }
    });
    console.log(this.periodos) 
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    console.log(this.formTask.get('taskuser')?.value)
    this.encargo.tarea=this.formTask.get('taskname')?.value;
    this.encargo.estado= this.formTask.get('taskstatus')?.value;
    this.encargo.id_periodo= this.formTask.get('taskuser')?.value;
    this.encargo.fecha= this.formTask.get('taskdate')?.value;

    try {
      this.apiS.updateEncargo({
        id: this.encargo.id,
        tarea: this.encargo.tarea,
        fecha: this.encargo.fecha,
        estado: this.encargo.estado,
        comentario: this.encargo.comentario,
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
    console.log(this.encargo)
    this.closeModal.emit(true)
    this.modalCTRL.dismiss()
  }
  
  delete(){
    this.apiS.deleteEncargo(this.encargo.id).subscribe(d => {
      //la respuesta del servidor
      console.log(d);
      //ocultador loading
    })
    this.modalCTRL.dismiss()
  }
}
