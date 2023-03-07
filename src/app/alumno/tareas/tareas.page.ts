import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  //donde se van a guradar los encargos
  public encargos: Array<Encargo> = [] = [];
  constructor(private apiS: APIService, private login: LoginService) { }

  ngOnInit() {
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
  
  }

  refresEncargos(){
    this.apiS.getEncargosAlumno(this.login.user.id).subscribe((datos) => {
      for (let elemento of datos) {
        this.encargos.push(<any>elemento);
      }
    });
    
  }
}

