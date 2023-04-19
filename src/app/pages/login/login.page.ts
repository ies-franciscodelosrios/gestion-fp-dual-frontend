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
  constructor(private loginS: LoginService,
    private apiS: APIService,
    private router: Router) {
  }

  public logging=false;
  darkMode: boolean;

  ngOnInit() {
    if (localStorage.getItem('login') != null) {
      this.loginS.user = JSON.parse(localStorage.getItem('login')!);
      //this.router.navigate(['/login']);
    }
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme();
  }

  public async signin() {
    this.logging=true;
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
    if(this.darkMode){
      console.log("esta oscuro")
      document.body.classList.toggle( 'dark' );
    }
  }
}