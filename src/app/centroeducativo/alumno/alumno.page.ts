import { Component, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  //public alumnos: UsuarioEditPage[] = [];
  public listAlumno: Usuario[] = [];
  public filter: Usuario[] = [];
  public permision: boolean;
  constructor(
    private apiS: APIService,
    private login: LoginService,
    private router: Router,
    private modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.load();
  }
  public async load() {
    await this.login.keepSession();
    this.permision = true;
    this.apiS.getUsuarioAlumno().subscribe(rol => {
      this.listAlumno = <Usuario[]>rol.user;
      return this.listAlumno
    })
    this.apiS.getUsuarioAlumno().subscribe(rol => {
      this.filter = <Usuario[]>rol.user;
      return this.filter
    })
  }
  
  public async nuevoalumno() {
    let emp = document.getElementById("Empresa");
    if (emp != null) {
      emp.id = "Alumno"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps: {
        mode: "create"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
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
      componentProps: {
        mode: "edit",
        atribuser: alum
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listAlumno;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((usuario: any) => {
        return (usuario.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}
