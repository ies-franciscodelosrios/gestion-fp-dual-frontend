import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  public alumnos: UsuarioEditPage[] = [];
  public listAlumno: Usuario[] = [];

  constructor(
    private apiS: APIService,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.apiS.GetUsuarioAlumno().subscribe(rol => {
      this.listAlumno = <Usuario[]>rol.user;
      return this.listAlumno
    })
  }

  public async nuevoalumno() {
    let emp = document.getElementById("Empresa");
    if (emp != null) {
      emp.id = "Alumno"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps: { mode: "create" }
    });
    return await modal.present();
  }

  public async editalumno(alum: Usuario) {
    let emp = document.getElementById("Empresa");
    if (emp != null) {
      emp.id = "Alumno"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps: { mode: "edit", atribuser: alum }
    });
    return await modal.present();
  }
  cerrarSesion() {
  }
}
