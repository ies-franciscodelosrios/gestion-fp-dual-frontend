import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';
import { Rol } from 'src/model/Rol';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user: Usuario;


  constructor(
    private platform: Platform, private apiS: APIService,) {
    GoogleAuth.initialize({
      clientId: '67865224389-e65ir4vhqavhm38n116qb2ebtp58h9an.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  //permite hacer un login comparando si el correo escrito existe en la bbdd y se logueara en una pagina o en otra dependiendo del correo
  public async  login() {
    let userlog = await GoogleAuth.signIn();
    const mailLog = userlog.email
    localStorage.setItem('login', JSON.stringify(userlog));
   
    this.apiS.GetMailUsuario(mailLog).subscribe(userDb => {
      this.user = userDb;
    })
  }

  public async logout() {
    localStorage.removeItem('login');
    await GoogleAuth.signOut();
  }

}
