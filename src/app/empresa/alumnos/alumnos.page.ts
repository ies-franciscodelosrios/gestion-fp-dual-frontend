import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.page.html',
  styleUrls: ['./alumnos.page.scss'],
})
export class AlumnosPage implements OnInit {
  public alumnos:Array<Usuario>=[]=[];
  constructor( private apiS: APIService ) { }

  ngOnInit() {
    this.apiS.GetUsuarioAlumno().subscribe(rol => {
      this.alumnos =<Usuario[]> rol.user;
      return this.alumnos 
    })
  }
  cerrarSesion(){
    
  }
}
