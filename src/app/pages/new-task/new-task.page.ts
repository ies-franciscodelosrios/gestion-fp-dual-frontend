import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Tarea } from 'src/app/model/Tarea';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  public encargo: string = "";
  public formTask: FormGroup;  //importar ReactiveFormModule en module.ts

  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    navParams: NavParams
  ) {
    this.encargo = navParams.get('Encargo')
  }

  ngOnInit() {
    this.formTask = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      taskname: ['', [Validators.required, Validators.minLength(4)]],
      taskstatus: true,
      taskdate: ''
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
      this.apiS.addUsuario({
        taskname: this.formTask.get('taskname')?.value,
        taskstatus: this.formTask.get('taskstatus')?.value,
        taskdate: this.formTask.get('taskdate')?.value,
      }).subscribe(d => {
        //la respuesta del servidor
        console.log(d);
        //ocultador loading
      })
    } catch (error) {
      console.error(error);
      //ocular loading
    }
  }
}
