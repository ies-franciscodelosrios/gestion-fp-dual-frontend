import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Rol } from 'src/model/Rol';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo: any;
  private darkMode:boolean;
  public logging:boolean;
  constructor(private loginS: LoginService,
    private apiS: APIService,
    private router: Router) {
  }

  
  ionViewWillEnter() {
    this.theme();
    this.logging=false;
  }
  ngOnInit() {
   
  }

  public async signin() {
    this.logging=true;
    if (localStorage.getItem('login') != null) {
      this.loginS.user = JSON.parse(localStorage.getItem('login')!);
    }
   let valid= await this.loginS.login();
    if(valid){
      this.redirectLogged(this.loginS.user.id_rol);
    }else{
      this.logging = false;
    }
  }

  public async redirectLogged(rol?: number): Promise<any> {
    if (rol == 1) {
      this.router.navigate(['/admin']);
    } else if (rol == 2) {
      this.router.navigate(['/centroeducativo']);
    }else if (rol == 3) {
      this.router.navigate(['/empresa']);
    }else if (rol == 4) {
      this.router.navigate(['/alumnos']);
    }
  }

  
  theme(){ 
    //En caso de que no se haya guardado la variable se deja false por defecto
    if(localStorage.getItem('darkTheme')==null){
     localStorage.setItem('darkTheme', "False");
    }
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

}