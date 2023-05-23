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
import { Modulo } from 'src/model/Modulo';
import { Ra } from 'src/model/Ra';
import { Ce } from 'src/model/Ce';

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

  addModulo(modulo: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.modulos
    return this.http.post(url, modulo);
  }

  addRA(ra: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.ra
    return this.http.post(url, ra);
  }

  addCE(ce: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.ce
    return this.http.post(url, ce);
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
  addPractica(practica: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.periodopracticas
    return this.http.post(url, practica, {

    });
  }
  //devuelve un valor al frontend
  getUsuarioAdmin(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/1'
    return this.http.get<Rol>(url, {
    });
  }
  getUsuarioCentro(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/2'
    return this.http.get<Rol>(url, {
    });
  }

  getUsuarioAlumno(): Observable<Rol> {
    const url = environment.api.url + environment.api.endpoints.roles + '/4'
    return this.http.get<Rol>(url, {
    });
  }

  getUsuarioEmpresa(): Observable<Rol> {
    const rolUrl = environment.api.url + environment.api.endpoints.roles + '/3'
    return this.http.get<Rol>(rolUrl, {
    });
  }

  getTitulo(): Observable<Titulo[]> {
    const url = environment.api.url + environment.api.endpoints.titulo
    return this.http.get<Titulo[]>(url, {
    });
  }

  getRA(): Observable<Ra[]> {
    const url = environment.api.url + environment.api.endpoints.ra
    return this.http.get<Ra[]>(url, {
    });
  }

  getPP(): Observable<PeriodoPracticas[]> {
    const url = environment.api.url + environment.api.endpoints.periodopracticas
    return this.http.get<PeriodoPracticas[]>(url, {
    });
  }

  getCE(): Observable<Ce[]> {
    const url = environment.api.url + environment.api.endpoints.ce
    return this.http.get<Ce[]>(url, {
    });
  }

  getMailUsuario(email: string): Observable<Usuario> {
    const url = environment.api.url + environment.api.endpoints.mail + email
    return this.http.get<Usuario>(url, {
    });
  }

  getEncargosAlumno(id?: number): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.encargoAlumno +  id
    return this.http.get(url);
  }

  getEncargos(): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.encargo
    return this.http.get(url);
  }

  getCentroEducativo(): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.user
    return this.http.get<Usuario>(url, {
    });
  }

  getEncargosEmpresa(id?: number): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.encargoEmpresa + id
    return this.http.get(url);
  }

  getPeriodobyEmpresa(id?: number): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.periodoEmpresa + id
    return this.http.get(url);
  }

  getModulo(): Observable<Modulo[]> {
    const url = environment.api.url + environment.api.endpoints.modulos
    return this.http.get<Modulo[]>(url, {
    });
  }

  getModuleByTittle(id: Titulo): Observable<Titulo> {
    const url = environment.api.url + environment.api.endpoints.titulo + "/" + id.id
    return this.http.get<Titulo>(url, {
    });
  }


  //actualiza un valor al backend
  updatePractica(practica: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.periodopracticas
    return this.http.put(url, practica, {
    });
  }

  updateCentroEducativo(user: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.user
    return this.http.put(url, user);
  }

  updateEncargo(encargo: any): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.encargo
    return this.http.put(url, encargo);
  }

  //elimina un valor del backend
  deleteUsuario(id?: number): Observable<any> {
    const url = environment.api.url + environment.api.endpoints.user + id
    return this.http.delete(url);
  }

  deleteEncargo(id?: number) {
    const url = environment.api.url + environment.api.endpoints.encargo + id
    return this.http.delete(url);
  }

  deletePP(id?: number) {
    const url = environment.api.url + environment.api.endpoints.periodopracticas + id
    return this.http.delete(url);
  }

  deleteTitulo(id?: number) {
    const url = environment.api.url + environment.api.endpoints.titulo + id
    return this.http.delete(url);
  }

  deleteModulo(id?: number) {
    const url = environment.api.url + environment.api.endpoints.modulos + id
    return this.http.delete(url);
  }

  deleteRa(id?: number) {
    const url = environment.api.url + environment.api.endpoints.ra + id
    return this.http.delete(url);
  }

  deleteCe(id?: number) {
    const url = environment.api.url + environment.api.endpoints.ce + id
    return this.http.delete(url);
  }

}
