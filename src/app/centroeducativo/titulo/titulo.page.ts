import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CeTitleEditPage } from 'src/app/pages/ce-title-edit/ce-title-edit.page';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Titulo } from 'src/model/Titulo';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.page.html',
  styleUrls: ['./titulo.page.scss'],
})
export class TituloPage implements OnInit {
  public listTitulo: Titulo[] = [];
  public filter: Titulo[] = [];
  public tittle: any;
  public tituls: CeTitleEditPage[] = [];
  public results = this.tituls;
  //tema oscuro o claro
  darkMode: boolean;
  @Output() tittleUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private apiS: APIService,
    private login: LoginService,
    private alrtCtrl: AlertController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.load();
  }
  public async load() {
    this.theme();
    await this.login.keepSession();
    this.apiS.getTitulo().subscribe(listTitulo => {
      this.listTitulo = listTitulo;
    })

    this.apiS.getTitulo().subscribe(listTitulo => {
      this.filter = listTitulo;
      return this.filter
    })
  }

  cancel() {
    this.tittleUpdate.emit(true);
    this.router.navigate(['/centroeducativo/titulo']);
    this.load();
  }

  public async addTittle() {
    const modal = await this.modalCtrl.create({
      component: CeTitleEditPage,
      componentProps: {
        mode: "create"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async editTitle(title: Titulo) {
    const modal = await this.modalCtrl.create({
      component: CeTitleEditPage,
      componentProps: {
        atribtitle: title,
        mode: "edit"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listTitulo;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((titulo: any) => {
        return (titulo.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  public async editAvatar(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
  }

  navToModule(tittle: Titulo) {
    const dynamicPath = '/modulo/' + tittle.nombre + ";id=" + tittle.id;
    this.router.navigateByUrl(dynamicPath), { queryParams: tittle };
  }

theme(){ 
    //A traves de localStorage se obtene la cadena 'darkTheme'
    let theme =localStorage.getItem('darkTheme');
    //Se comprueba si esta 'true' o 'false' para detectar el cambio de tema
    if(theme=="False"){
      if(document.body.classList.contains('dark')){
        document.body.classList.toggle('dark'); 
      }
    }else{
      if(!document.body.classList.contains('dark')){
        document.body.classList.toggle('dark'); 
      }
    }
  }

  //Funcion auxiliar para theme
  change() {
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=true;
      localStorage.setItem('darkTheme', "True");
    }else{
      this.darkMode=false;
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  cerrarSesion() {
    this.login.logout();
  }
}

