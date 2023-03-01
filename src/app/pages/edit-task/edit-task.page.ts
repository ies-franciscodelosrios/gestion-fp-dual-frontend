import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Tarea } from 'src/model/Tarea';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  public alumnos: Usuario[] = [];
  public encargo: string = "";
  public formTask: FormGroup;  //importar ReactiveFormModule en module.ts
  @Input('data') data:Tarea;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.encargo = navParams.get('Encargo')
  }

  ngOnInit() {
    const now: Date = new Date();
    const isoDate: string = now.toISOString();
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: [this.data.tarea, [Validators.required, Validators.minLength(4)]],
      taskuser: [this.data.periodo_practica?.idAlumno],
      taskstatus: [this.data.estado],
      taskdate: [this.data.fecha]
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
    let pepra = document.getElementById("Encargo");

    console.log(this.formTask.get('taskname')?.value);
    //mostrar un loading....

    try {
      this.apiS.addTarea({
        tarea: this.formTask.get('taskname')?.value,
        estado: this.formTask.get('taskstatus')?.value,
        periodo_practica: {id:1},
        fecha: this.formTask.get('taskdate')?.value,
        comentario: ''
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
