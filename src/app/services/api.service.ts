import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from 'src/model/Rol';
import { Titulo } from 'src/model/Titulo';
import { Usuario } from 'src/model/Usuario';
import { map } from 'rxjs/operators';
import { PeriodoPracticas } from 'src/model/PeriodoPracticas';
import { Tarea } from 'src/model/Tarea';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(private http: HttpClient) { }

  //añade un contenido a la bbdd
  addTitulo(titulo: any): Observable<any> {
    console.log(environment.api.url + environment.api.endpoints.titulo)
    const url = environment.api.url + environment.api.endpoints.titulo
    return this.http.post(url, titulo);
  }

  addTarea(encargo: any): Observable<any> {
    console.log(environment.api.url + environment.api.endpoints.titulo)
    const url = environment.api.url + environment.api.endpoints.encargo
    return this.http.post(url, encargo);
  }

  addUsuario(user: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.user
    return this.http.post(url, user, {

    });
  }

  //devuelve un valor al frontend
  GetUsuarioAdmin(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/1'
    return this.http.get<Rol>(url, {
    });
  }
  GetUsuarioCentro(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/2'
    return this.http.get<Rol>(url, {
    });
  }

  GetUsuarioAlumno(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/4'
    return this.http.get<Rol>(url, {
    });
  }

  GetUsuarioEmpresa(): Observable<Rol> {
    const rolUrl = environment.api.url + environment.api.endpoints.roles + '/3'
    return this.http.get<Rol>(rolUrl, {
    });
  }

  GetTitulo(): Observable<Titulo[]> {
    const url = environment.api.url + environment.api.endpoints.titulo
    return this.http.get<Titulo[]>(url, {
    });
  }

  GetPP(): Observable<PeriodoPracticas[]> {
    const url = environment.api.url + environment.api.endpoints.periodopracticas
    return this.http.get<PeriodoPracticas[]>(url, {
    });
  }

  getEncargos():Observable<any>{
    const url = environment.api.url+environment.api.endpoints.encargo
    return this.http.get(url);
  }

  updateEncargo(encargo:any):Observable<any>{
    const url = environment.api.url+environment.api.endpoints.encargo
    return this.http.put(url, encargo);

  }
}
