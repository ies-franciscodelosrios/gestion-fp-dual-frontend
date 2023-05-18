import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IonAccordion, ModalController, NavParams } from '@ionic/angular';
import { CeModuleRaEditPage } from 'src/app/pages/ce-module-ra-edit/ce-module-ra-edit.page';
import { APIService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/login.service';
import { Ce } from 'src/model/Ce';
import { ActivatedRoute, Router } from '@angular/router';
import { Ra } from 'src/model/Ra';
import { Modulo } from 'src/model/Modulo';
import { Titulo } from 'src/model/Titulo';

@Component({
  selector: 'app-ra',
  templateUrl: './ra.page.html',
  styleUrls: ['./ra.page.scss'],
})

export class RaPage implements OnInit {
  public letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  public numero = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public formRA: FormGroup;
  public ListaRa: Ra[] = [];
  public ListaCe: Ce[] = [];
  public abreIndice: number = -1;
  public modulId: number;
  public modulName: string;
  public modulCMB: string;
  public module: Modulo;
  public tittleId: Number;
  public tittleName: string;
   //tema oscuro o claro
   darkMode: boolean;
  @Output() RaUpdate: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChildren(IonAccordion) accordions: QueryList<IonAccordion>;
  constructor(
    private apiS: APIService,
    private router: Router,
    private login: LoginService,
    private modalCtrl: ModalController,
    private actroute: ActivatedRoute,
  ) {
  }

  ngOnInit() { 
    this.load();
  }
  public async load() {
    await this.login.keepSession();
    this.router.getCurrentNavigation()?.extras.state;
      this.tittleId = history.state.tid;
      this.tittleName = history.state.tname;
    this.actroute.paramMap.subscribe(params => {
      const moduleId = params.get('id') ?? '0'; // se utiliza '0' como valor predeterminado si el valor es nulo
      this.modulId = Number(moduleId);
      const moduleName = params.get('nombre') ?? '';
      this.modulName = String(moduleName);
      const moduleCmb = params.get('cod_mod_boja') ?? '';
      this.modulCMB = String(moduleCmb);
      this.module = { id: this.modulId, nombre: this.modulName, cod_mod_boja: this.modulCMB };
    });

    this.apiS.getRAByModul(this.module).subscribe(modul => {
      this.ListaRa = <Ra[]>modul.ra;
      return this.ListaRa;
    });
  }

  public async addRa() {
    const modal = await this.modalCtrl.create({
      component: CeModuleRaEditPage,
      componentProps: {
        nommodul: this.module.nombre,
        codmodul: this.module.cod_mod_boja,
        idmodul: this.module.id,
        mode: "create"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  public async editRa(atribRa: Ra) {
    const modal = await this.modalCtrl.create({
      component: CeModuleRaEditPage,
      componentProps: {
        nommodul: this.module.nombre,
        codmodul: this.module.cod_mod_boja,
        idmodul: this.module.id,
        atribRa: atribRa,
        mode: "edit"
      }
    });
    modal.onDidDismiss().then(() => {
      window.location.reload();
    });
    return await modal.present();
  }

  toggleAccordion(index: number) {
    if (index === this.abreIndice) {
      // Si el índice es el mismo que el actual, cerrar el accordion
      this.abreIndice = -1;
    } else {
      // Si el índice es diferente al actual, abrir el accordion
      this.abreIndice = index;
    }
  }
  
  backToModule() {
    const dynamicPath = '/modulo/'+ this.tittleName +";id=" + this.tittleId;
    this.router.navigateByUrl(dynamicPath);
  }

  cambio() {
    document.body.classList.toggle('dark');
  }

  cerrarSesion() {
    this.login.logout();
  }

}
