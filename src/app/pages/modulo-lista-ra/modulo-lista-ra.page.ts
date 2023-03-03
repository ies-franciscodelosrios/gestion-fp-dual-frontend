import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonTitle, ModalController } from '@ionic/angular';
import { Usuario } from 'src/model/Usuario';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { LoginService } from '../../services/login.service';
import { EmpresaPage } from 'src/app/centroeducativo/empresa/empresa.page';
import { AlumnoPage } from 'src/app/centroeducativo/alumno/alumno.page';

@Component({
  selector: 'app-modulo-lista-ra',
  templateUrl: './modulo-lista-ra.page.html',
  styleUrls: ['./modulo-lista-ra.page.scss'],
})
export class ModuloListaRaPage implements OnInit {

  @Input('user') usuario: Usuario;
  public todo: FormGroup;
  @ViewChild(IonTitle) public ionTitle: IonTitle;
  @ViewChild(IonModal) modal: IonModal;
  public usuarios: Usuario[] = [];
  public results = this.usuarios;
  showText: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginS: LoginService,
    private modalCTRL: ModalController
  ) {
  }

  ngOnInit() {
    if (!this.usuario) {
      console.log("Crear usuario");
    } else {
      this.todo = this.formBuilder.group({
        nombre: [this.usuario.nombre, [Validators.required,
        Validators.minLength(5)]],
        correo: [this.usuario.correo],
        doc: [this.usuario.documentos],
        alta: [this.usuario.alta],
      })
    }
  }

  content() {
    this.showText = !this.showText;
  }

  logForm() {
    console.log(this.todo.value);
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }

}
