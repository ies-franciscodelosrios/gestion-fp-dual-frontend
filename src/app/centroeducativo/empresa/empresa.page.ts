import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/model/Usuario';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.page.html',
  styleUrls: ['./empresa.page.scss'],
})
export class EmpresaPage implements OnInit {
  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController) {
     }

  ngOnInit() {
  }


  public async nuevaempresa(){
    const modal = await this.modalCtrl.create({
      component: ModalController
    });
    return await modal.present();
  
  }


  //sin uso pero es para solicitar datos con Springboot (En desarrollo)
  sendData(usuario:Usuario) {
    this.http.post('http://localhost:8080/gestionfp/user', usuario)
      .subscribe(response => {
        console.log(response);
      });
  }
}
