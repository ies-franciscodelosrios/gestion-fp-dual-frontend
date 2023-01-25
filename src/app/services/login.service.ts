import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public user:any;

  constructor(
    private platform:Platform) {
    GoogleAuth.initialize({
      clientId: '972392582120-pv6c028tmu0v1mfvsnd87229b9l9a4dl.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  }

  public async login(){
    let user = await GoogleAuth.signIn();
    this.user=user;
    localStorage.setItem('login',JSON.stringify(user));
  }
  
  public async logout(){
    localStorage.removeItem('login');
    await GoogleAuth.signOut();
    this.user=null;
  }

  public isLogged():boolean{
    if(this.user) {
      return true;
    }
    else {
      return false;
    }
  }
}
