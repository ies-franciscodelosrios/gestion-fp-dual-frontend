import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'src/app/services/api.service';
import { Encargo } from 'src/model/Encargo';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.page.html',
  styleUrls: ['./tareas.page.scss'],
})
export class TareasPage implements OnInit {
  //donde se van a guradar los encargos
  public encargos: Array<Encargo> = [] = [];
  constructor(private apiS: APIService) { }

  ngOnInit() {
    //se obtienen los encargos y se insertan en el array encargos
    this.refresEncargos();
  }

  refresEncargos(){
    this.apiS.getEncargos().subscribe((datos) => {
      for (let elemento of datos) {
        this.encargos.push(<any>elemento);
      }
    });
  }
}

