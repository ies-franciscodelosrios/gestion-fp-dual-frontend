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
    //this.loadUsers();
    //se obtienen los encargos y se insertan en el array encargos
    this.theme(); 
  }

  ngOnInit() {
    this.loadUsers();
    this.changeButton();
  }

  public async loadUsers(){
    await this.login.keepSession(); 
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

  theme(){ 
    //pilla el tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //Em caso de  tema oscuro esta desactivado
    if(theme=="False"){
      //si la pagina esta oscuro
      if(document.body.classList.contains('dark')){
        //cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //Em caso de tema oscuto esta activado
    }else{
      //si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')){
        //cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  cambio() {
    //pilla el tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //Em caso de  tema oscuro esta desactivado
    if(theme=="False"){
      //El boton de tema oscuro se activa
      this.darkMode=true;
      //cambiamos a que guarde que tenga el tema oscuro
      localStorage.setItem('darkTheme', "True");
    }else{
      //El boton de tema oscuro se desactiva
      this.darkMode=false;
      //cambiamos a que guarde que NO tenga el tema oscuro
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  changeButton(){
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=false;
    }else{
      this.darkMode=true;
    }
  }

  public async editProfile(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }
}
