import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { Tarea } from 'src/model/Tarea';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  public alumnos: Usuario[] = [];

  public formTask: FormGroup;  //importar ReactiveFormModule en module.ts
  @Input() encargo:Tarea;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
  ) {
  }

  ngOnInit() {
    const now: Date = new Date();
    const isoDate: string = now.toISOString();
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: `${this.encargo.tarea, [Validators.required, Validators.minLength(4)]}`,
      taskuser: [this.encargo.periodo_practica?.id_alumno],
      taskstatus: [this.encargo.estado],
      taskdate: [this.encargo.fecha]
    })
    this.apiS.GetUsuarioAlumno().subscribe(rol => {
      this.alumnos = <Usuario[]>rol.user;
      return this.alumnos
    })
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }


  submitForm() {
    this.encargo.tarea=this.formTask.get('taskname')?.value;
    this.encargo.estado= this.formTask.get('taskstatus')?.value;
    this.encargo.periodo_practica= this.formTask.get('1')?.value;
    this.encargo.fecha= this.formTask.get('taskdate')?.value;
    this.encargo.comentario= this.formTask.get('taskcomment')?.value;

    try {
      this.apiS.updateEncargo({
        tarea: this.encargo.tarea,
        estado: this.encargo.estado,
        periodo_practica: {id:1},
        fecha: this.encargo.fecha,
        comentario: this.encargo.comentario
      }).subscribe(d => {
        //la respuesta del servidor
        console.log(d);
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
    this.modalCTRL.dismiss()
    
  }
}
