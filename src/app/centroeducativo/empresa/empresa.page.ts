import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ModalController } from '@ionic/angular';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  public titulo: string;
  empresa = 'Empresa';
  public listEmpresa: Usuario[] = [];
  public empresas: UsuarioEditPage[] = [];

  constructor(
    private titleSV: Title,
    private apiS: APIService,
    private modalCtrl: ModalController) {
    this.titulo = this.titleSV.getTitle();
  }

  ngOnInit() {
    this.apiS.GetUsuarioEmpresa().subscribe(rol => {
      this.listEmpresa = <Usuario[]>rol.user;
      return this.listEmpresa
    })
  }

  public async nuevaempresa() {
    let emp = document.getElementById("Alumno");
    if (emp != null) {
      emp.id = "Empresa"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps: {
        empresa: this.empresa,
        componentProps: { mode: "create" }
      }
    });
    return await modal.present();
  }
  public async editaempresa(empr: Usuario) {
    let emp = document.getElementById("Alumno");
    if (emp != null) {
      emp.id = "Empresa"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps: { mode: "edit", atribuser: empr }
    });
    return await modal.present();
  }
  cerrarSesion() {
  }
}
