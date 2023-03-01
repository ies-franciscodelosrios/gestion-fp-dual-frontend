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

  ngOnInit() {
    if (localStorage.getItem('login') != null) {
      this.loginS.user = JSON.parse(localStorage.getItem('login')!);
      this.router.navigate(['/login']);
    }
  }

  public async signin() {
    await this.loginS.login();
    }
}