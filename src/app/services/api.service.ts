import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Titulo } from 'src/model/Titulo';
import { Usuario } from 'src/model/Usuario';


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

  addUsuario(user: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.user
    return this.http.post(url, user, {

    });
  }


  //devuelve un valor al frontend
  GetUsuarioAdmin(): Observable<Usuario> {
    const url = environment.api.url + environment.api.endpoints.roles + '/1'
    return this.http.get(url, {
    });
  }

  GetUsuarioCentro(): Observable<Usuario> {
    const url = environment.api.url + environment.api.endpoints.roles + '/2'
    return this.http.get(url, {
    });
  }

  GetUsuarioEmpresa(): Observable<Usuario> {
    const url = environment.api.url + environment.api.endpoints.roles + '/3'
    return this.http.get(url, {
    });
  }

  GetUsuarioAlumno(): Observable<Usuario> {
    const url = environment.api.url + environment.api.endpoints.roles + '/4'
    return this.http.get(url, {
    });
  }
  GetTitulo(): Observable<Titulo[]> {
    const url = environment.api.url + environment.api.endpoints.titulo
    return this.http.get <Titulo[]>(url, {
    });
  }




}
