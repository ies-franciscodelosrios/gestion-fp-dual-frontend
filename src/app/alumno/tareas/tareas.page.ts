import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  //tema oscuro o claro
  darkMode: boolean;
  //donde se van a guradar los encargos
  public encargos: Array<Encargo> = [] = [];
  constructor(
    private apiS: APIService, 
    private login: LoginService,
    private router:Router) { }

  ngOnInit() {
    this.login.keepSession();
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
    this.login.getRol();
    this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.theme();
  }

  refresEncargos(){
    this.apiS.getEncargosAlumno(this.login.user.id).subscribe((datos) => {
      for (let elemento of datos) {
        this.encargos.push(<any>elemento);
      }
    });  
  }

  cerrarSesion(){
    this.login.logout();
    console.log("Cerrando")
  }

  theme(){
    if(this.darkMode){
      console.log("esta oscuro")
      document.body.classList.toggle( 'dark' );
    }
  }
  cambio() {
    document.body.classList.toggle( 'dark' );
  }
  
   
}

