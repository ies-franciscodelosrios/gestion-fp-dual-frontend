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
  
  @Input() encargo:Encargo;
  public formTask: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
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
    console.log(this.encargo)
    this.apiS.getUsuarioAlumno().subscribe(rol => {
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
    this.encargo.id_periodo= 1;
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
