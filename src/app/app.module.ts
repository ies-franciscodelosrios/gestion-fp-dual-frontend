import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AdminPageModule } from './admin/admin.module';
import { TabsPageModule } from './tabs_centrosEducativo/tabs.module';
import { APIService } from './services/api.service';
import { AlumnoPageModule } from './centroeducativo/alumno/alumno.module';
import { EmpresaPageModule } from './centroeducativo/empresa/empresa.module';
import { TareaComponent } from './components/tarea/tarea.component';
import { TareasPageModule } from './empresa/tareas/tareas.module';
import { TabsAlumnoModule } from './tabs_alumno/tabs.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule, AppRoutingModule, TabsPageModule, TareasPageModule, AdminPageModule, EmpresaPageModule, TabsAlumnoModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },APIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
