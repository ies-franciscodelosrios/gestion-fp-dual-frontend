import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonTitle, ModalController } from '@ionic/angular';
import { APIService } from 'src/app/services/api.service';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-ce-title-edit',
  templateUrl: './ce-title-edit.page.html',
  styleUrls: ['./ce-title-edit.page.scss'],
})
export class CeTitleEditPage implements OnInit {
  public title: string = "";
  public formTitulo: FormGroup;  //el grupo del formulario reactivo , ojo con importar ReactiveFormModule

  @Input('atribtitle') atribtitle: Titulo;
  constructor(
    private formBuilder: FormBuilder,
    private modalCTRL: ModalController,
    private apiS: APIService,
    private alrtCtrl: AlertController,
  ) {
    
  }
  ngOnInit() {
    const btnelem = document.getElementById('btnDelete') as HTMLElement;
    btnelem.style.display = 'none';
    this.formTitulo = this.formBuilder.group({   //creando los campos que serán controlados y validados por formTitulo
      titulo: ['', [Validators.required, Validators.pattern('\[aA-zZ]{2,7}')]],
    })
  }
  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }
  submitForm() {
    //mostrar un loading....
    try {
      this.apiS.addTitulo({ nombre: this.formTitulo.get('titulo')?.value }).subscribe(d => {
        //la respuesta del servidor

        //ocultador loading
      })
    } catch (error) {
      //ocular loading
    }
    this.cancel();
  }

  onDelete(){
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
            this.apiS.deleteTitulo(this.atribtitle.id).subscribe((respuesta) => {
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
