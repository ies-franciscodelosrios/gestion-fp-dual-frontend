import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ModalController } from '@ionic/angular';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Title } from '@angular/platform-browser';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  public titulo: string;
  empresa = 'Empresa';
  public listEmpresa: Usuario[] = [];
  public filter: Usuario[] = [];
  public empresas: UsuarioEditPage[] = [];
  

  constructor(
    private titleSV: Title,
    private apiS: APIService,
    private login: LoginService,
    private router:Router,
    private modalCtrl: ModalController) {
    this.titulo = this.titleSV.getTitle();
  }

  ngOnInit() {
    this.apiS.getUsuarioEmpresa().subscribe(rol => {
      this.listEmpresa = <Usuario[]>rol.user;
      return this.listEmpresa
    })
    this.apiS.getUsuarioEmpresa().subscribe(rol => {
      this.filter = <Usuario[]>rol.user;
      return this.filter
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
        mode: "create" 
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
      componentProps: {
        mode: "edit",
        atribuser: empr }
    });
    return await modal.present();
  }
  
  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listEmpresa;
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
