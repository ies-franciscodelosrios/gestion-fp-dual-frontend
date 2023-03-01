import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminPageModule } from './admin/admin.module';
import { TabsPageModule } from './tabs_centrosEducativo/tabs.module';
import { APIService } from './services/api.service';
import { EmpresaPageModule } from './centroeducativo/empresa/empresa.module';
import { TareasPageModule } from './empresa/tareas/tareas.module';
import { TabsAlumnoModule } from './tabs_alumno/tabs.module';
import es from '@angular/common/locales/es';
registerLocaleData(es);



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, 
    TabsPageModule ,TareasPageModule, AdminPageModule, EmpresaPageModule, TabsAlumnoModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: LOCALE_ID, useValue: 'es-*'  },APIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
