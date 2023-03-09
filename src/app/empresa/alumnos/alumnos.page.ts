import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';
import { InfoAlumnoPage } from 'src/app/pages/info-alumno/info-alumno.page';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  public alumnos:Array<Usuario>=[]=[];
  constructor(
    private modalCtrl: ModalController,
    private apiS: APIService,
    private login: LoginService,
    private route: Router
    ) {}

  ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers(){
    await this.login.keepSession();

    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe(periodos=>{
      for (let elemento of periodos) {
        this.alumnos.push(<any>elemento.id_alumno)
      }
    })
  }

  public async viewAlumn(alumno:any){
    const modal = await this.modalCtrl.create({
      component : InfoAlumnoPage,
      componentProps: { user : alumno},
    });
    return await modal.present();
  }

  cerrarSesion(){
    this.login.logout();
  }
}
