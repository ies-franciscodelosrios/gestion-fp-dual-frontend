import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';
import { InfoAlumnoPage } from 'src/app/pages/info-alumno/info-alumno.page';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

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
    private login: LoginService
    ) {}

  ngOnInit() {
    this.login.keepSession;
    this.apiS.getUsuarioAlumno().subscribe(rol => {s
      this.alumnos =<Usuario[]> rol.user;
      return this.alumnos 
    })
  }

  public async viewAlumn(alumno:any){
    const modal = await this.modalCtrl.create({
      component : InfoAlumnoPage,
      componentProps: { user : alumno},
    });
    console.log(modal)
    return await modal.present();
  }

  cerrarSesion(){
    this.login.logout
  }
}
