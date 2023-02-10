import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginService } from '../../services/login.service';
import { IonModal } from '@ionic/angular';
import { Modulo } from 'src/model/Modulo';

@Component({
  selector: 'app-modulo-edit',
  templateUrl: './modulo-edit.page.html',
  styleUrls: ['./modulo-edit.page.scss'],
})
export class ModuloEditPage implements OnInit {
  @Input('modul') modul:Modulo;
  public todo: FormGroup;
  @ViewChild(IonTitle) public ionTitle: IonTitle;
  @ViewChild(IonModal) modal: IonModal;
  
  constructor(
    private formBuilder:FormBuilder,
    private loginS:LoginService,
    private modalCTRL:ModalController
  ){
  }

  ngOnInit() {
    if(!this.modul){
      console.log("Crear modulo");
    } else{
      this.todo = this.formBuilder.group({
        cod :[this.modul.cod],
        nombreModulo : [this.modul.modNombre],
        idTitulo : [this.modul.idtitul],
      })
    }
  }
  

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  logForm(){
    console.log(this.todo.value);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
}
