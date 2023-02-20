import { Component,ElementRef, OnInit,ViewChild} from '@angular/core';
import { InfiniteScrollCustomEvent, IonTitle, IonInfiniteScroll, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { UsuarioEditPage } from 'src/app/pages/usuario-edit/usuario-edit.page';
import { Usuario } from 'src/model/Usuario';
import { APIService } from 'src/app/services/api.service';



@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  @ViewChild(IonTitle) public ionTitle: IonTitle;
  @ViewChild('infinitescroll') infinitescroll : ElementRef;
  public users:UsuarioEditPage[] =[];
  public results = this.users;
  public listAlumno: Usuario[] = [];
  
  constructor(
    private http: HttpClient,
    private apiS: APIService,
    private modalCtrl: ModalController) {
     }

  ngOnInit() {
    this.apiS.GetUsuarioAlumno().subscribe(rol => {
      this.listAlumno =<Usuario[]> rol.user;
      return this.listAlumno 
    })
  }
  
  public async nuevoalumno(){
    let emp = document.getElementById("Empresa");

    if (emp != null ) {
      emp.id= "Alumno"
    }
    const modal = await this.modalCtrl.create({
      component: UsuarioEditPage
    });
    return await modal.present();
  
  }

  handleChange(event: { target: { value: string; }; } | null) {
    if (event == null) return;
    const query = event.target.value.toLowerCase();
    if (event.target.value.length <= 0) {
      this.users = this.results
    }
    else {
      //this.users = this.results.filter(d => d.name.toLowerCase().indexOf(query) > -1);
    }
  }
  cerrarSesion(){
    
  }
}
