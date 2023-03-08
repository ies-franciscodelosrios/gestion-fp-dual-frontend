import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';
import { InfoAlumnoPage } from 'src/app/pages/info-alumno/info-alumno.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  public alumnos:Array<Usuario>=[]=[];
  constructor(private modalCtrl: ModalController, private apiS: APIService ) { }

  ngOnInit() {
    this.apiS.GetUsuarioAlumno().subscribe(rol => {
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
    
  }
}
