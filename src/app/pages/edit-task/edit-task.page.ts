import { Component, Input, OnInit } from '@angular/core';
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
  public alumnos: Usuario[] = [];
  public encargos: PeriodoPracticas[] = [];
  
  @Input() encargo:Encargo;
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
      taskuser: '',
      taskstatus: this.encargo.estado,
      taskdate: this.encargo.fecha,
      taskcomment: this.encargo.comentario
    })
    //console.log(this.encargo)
    /*this.apiS.getUsuarioAlumno().subscribe(rol => {
      this.alumnos = <Usuario[]>rol.user;
      return this.alumnos
    })*/

    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe(periodo => {
      for(let elemento of periodo){
        this.encargos.push(<any>elemento);
       }
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    this.encargo.tarea=this.formTask.get('taskname')?.value;
    this.encargo.estado= this.formTask.get('taskstatus')?.value;
    this.encargo.id_periodo= 4;
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
    this.modalCTRL.dismiss()
    
  }
 
}
