import { Component, Input, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';
import { InfoAlumnoPage } from 'src/app/pages/info-alumno/info-alumno.page';
import { ModalController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  //tema oscuro o claro
  darkMode: boolean;
  public alumnos:Array<Usuario>=[]=[];
  public filter: Array<Usuario>=[]=[];
  public permision: boolean;
  constructor(
    private modalCtrl: ModalController,
    private apiS: APIService,
    private login: LoginService,
    private route: Router
    ) {}

  ionViewWillEnter() {
    this.login.keepSession(); 
    //this.loadUsers(); 
    //se obtienen los encargos y se insertan en el array encargos
  }

  ngOnInit() {
    this.loadUsers();
  }

  public async loadUsers(){
    this.permision = true; 
    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe(periodos=>{
      for (let elemento of periodos) {
        this.alumnos.push(<any>elemento.id_alumno)
      }
    })
    this.apiS.getPeriodobyEmpresa(this.login.user.id).subscribe(periodos=>{
      for (let elemento of periodos) {
        this.filter.push(<any>elemento.id_alumno)
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

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.alumnos;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((usuario: any) => {
        return (usuario.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  cerrarSesion(){
    this.login.logout();
  }

  public async editProfile(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
}
