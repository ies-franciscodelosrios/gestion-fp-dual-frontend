import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { Rol } from 'src/model/Rol';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: Usuario;

  constructor(
    private platform: Platform,
    private apiS: APIService,
    private router: Router) {
    GoogleAuth.initialize({
      clientId: '67865224389-e65ir4vhqavhm38n116qb2ebtp58h9an.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  //permite hacer un login comparando si el correo escrito existe en la bbdd y se logueara en una pagina o en otra dependiendo del correo
  public async login() {
    let result: boolean = false;
    try {
      let userlog = await GoogleAuth.signIn();
      const mailLog = userlog.email
      this.user = await lastValueFrom(this.apiS.getMailUsuario(mailLog));
      localStorage.setItem('login', JSON.stringify(this.user));
      result=true;
    } catch (err) {
      console.error(err)
    }
    return result;
  }

  public async logout() {
    localStorage.removeItem('login');
    await GoogleAuth.signOut();
    this.router.navigate(['/login']);
  }

  public isLogged(): boolean {
    if (this.user != null) return true; else return false;
  }

  public async keepSession(){
    if(localStorage.getItem('login') == null) {
      this.router.navigate(['']);
      return;
    }
    else { 
      let a= ''+localStorage.getItem('login');
      this.user = JSON.parse(a);
    }
  }
}
