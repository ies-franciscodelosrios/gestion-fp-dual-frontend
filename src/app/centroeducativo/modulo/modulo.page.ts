import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CeModuleEditPage } from 'src/app/pages/ce-module-edit/ce-module-edit.page';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { APIService } from 'src/app/services/api.service';
import { Modulo } from 'src/model/Modulo';
import { RaPage } from '../ra/ra.page';
import { Titulo } from 'src/model/Titulo';
import { EditProfilePage } from 'src/app/pages/edit-profile/edit-profile.page';

@Component({
  selector: 'app-modulo',
  templateUrl: './modulo.page.html',
  styleUrls: ['./modulo.page.scss'],
})
export class ModuloPage implements OnInit {
  public permision: boolean;
  public Tittles: Titulo;
  public tittleId: number;
  public tittleName: string;
  public listModulo: Modulo[] = [];
  public filter: Modulo[] = [];
  //tema oscuro o claro
  darkMode: boolean;

  @Output() modulUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(
    private apiS: APIService,
    private login: LoginService,
    private router: Router,
    private modalCtrl: ModalController,
    private actroute: ActivatedRoute) {
  }

  ngOnInit() {
   this.load();
  }

  public async load() {
    this.theme();
    await this.login.keepSession();
    // Obtiene el titulo seleccionado de su origen de datos según su id
    this.actroute.paramMap.subscribe(params => {
      const tittleId = params.get('id') ?? '0'; // se utiliza '0' como valor predeterminado si el valor es nulo
      this.tittleId = Number(tittleId);
      const tittleName = params.get('nombre') ?? '';
      this.tittleName = String(tittleName);
      this.Tittles = { id: this.tittleId, nombre: this.tittleName };
    })
    this.apiS.getModuleByTittle(this.Tittles).subscribe(tittle => {
      this.listModulo = <Modulo[]>tittle.modulo;
      return this.listModulo;
    });
    this.apiS.getModuleByTittle(this.Tittles).subscribe(tittle => {
      this.filter = <Modulo[]>tittle.modulo;
      return this.filter;
    });
  }

  backToTitle() {
    this.router.navigate(['/centroeducativo/titulo'])
  }

  public async listaRAModul(atribModul: any) {
    const modal = await this.modalCtrl.create({
      component: RaPage,
      componentProps: {
        codmodul: atribModul.cod_mod_boja,
        nommodul: atribModul.nombre,
        idmodul: atribModul.id
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async addModul() {
    const modal = await this.modalCtrl.create({
      component: CeModuleEditPage,
      componentProps: {
        atribTittle: this.Tittles,
        mode: "create",
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async editModule(modul: Modulo) {
    const modal = await this.modalCtrl.create({
      component: CeModuleEditPage,
      componentProps: {
        atribModule: modul,
        atribTittle: this.Tittles,
        mode: "edit"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  cancel() {
    this.modulUpdate.emit(true);
    this.load();
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    this.filter = this.listModulo;
    if (searchTerm && searchTerm.trim() != '') {
      this.filter = this.filter.filter((modulo: any) => {
        return (modulo.nombre?.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      })
    }
  }

  navToRa(module: Modulo) {
    const dynamicPath = '/ra/'+ module.nombre +";id=" + module.id;
    this.router.navigateByUrl(dynamicPath, { state: { tid: this.tittleId , tname: this.tittleName  } });
  }

  public async editAvatar(){
    const modal = await this.modalCtrl.create({
      component: EditProfilePage,
      componentProps: { },
    });
    return await modal.present();
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


