import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public userinfo: any;
  constructor(private loginS: LoginService,
    private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('login') != null) {
      this.loginS.user = JSON.parse(localStorage.getItem('login')!);
      this.router.navigate(['/tabs_centrosEducativo']);
    }
    if (this.loginS.isLogged()) {
      this.router.navigate(['/tabs_centrosEducativo']);
    }
  }

  public async signin() {
    await this.loginS.login();
    this.router.navigate(['/tabs_centrosEducativo']);
  }
}