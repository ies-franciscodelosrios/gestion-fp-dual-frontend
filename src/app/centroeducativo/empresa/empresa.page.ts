import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  public titulo:string;
  empresa = 'Empresa';
  public empresas: UsuarioEditPage[] = [];
  public results = this.empresas;

  constructor(
    private titleSV: Title,
    private http: HttpClient,
    private router: Router,
    private modalCtrl: ModalController) { 
      this.titulo = this.titleSV.getTitle();
    }

  ngOnInit() {
  }

  public async nuevaempresa() {
    let emp = document.getElementById("Alumno");

    if (emp != null ) {
      emp.id= "Empresa"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage,
      componentProps:{
        empresa: this.empresa
      }
    });
    return await modal.present();
  }

}
