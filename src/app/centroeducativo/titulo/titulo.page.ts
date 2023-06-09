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
    this.changeButton();
  }

  ionViewWillEnter() {
    this.theme();
  }
  
  public async load() {
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
        mode: "create",
      },
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
        mode: "edit",
        adjustSize: true
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

  navToModule(tittle: Titulo) {
    const dynamicPath = '/modulo/' + tittle.nombre + ";id=" + tittle.id;
    this.router.navigateByUrl(dynamicPath), { queryParams: tittle };
  }

  theme(){ 
    //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
    //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //si la pagina esta en oscuro
      if(document.body.classList.contains('dark')){
        //cambia a claro 
        document.body.classList.toggle('dark'); 
      }
    //En caso de que el tema oscuro este activado
    }else{
      //si la pagina NO esta oscuro
      if(!document.body.classList.contains('dark')){
        //cambia a oscuro
        document.body.classList.toggle('dark'); 
      }
    }
  }

  change() {
     //obtiene la variable del tema oscuro del localstore
    let theme =localStorage.getItem('darkTheme');
     //En caso de que el tema oscuro esta desactivado
    if(theme=="False"){
      //Cambiamos darkMode a true para dejar el boton de tema oscuro como encendido
      this.darkMode=true;
      //Guardamos darkTheme con "True" para entender que el tema oscuro esta activo
      localStorage.setItem('darkTheme', "True");
    }else{
       //Cambiamos darkMode a false para dejar el boton de tema oscuro como apagado
      this.darkMode=false;
      //Guardamos darkTheme con "False" para entender que el tema oscuro esta desactivado
      localStorage.setItem('darkTheme', "False");
    }
    document.body.classList.toggle('dark');
  }

  changeButton(){
    //En caso de que la darkTheme sea False o True el boton de tema oscuro cambiara
    let theme =localStorage.getItem('darkTheme');
    if(theme=="False"){
      this.darkMode=false;
    }else{
      this.darkMode=true;
    }
  }

  cerrarSesion() {
    this.login.logout();
  }
}

