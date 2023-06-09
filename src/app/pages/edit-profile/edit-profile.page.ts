import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { PhotoService } from 'src/app/services/photo.service'
import { Usuario } from 'src/model/Usuario';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {
  //formulario 
  public formProfile: FormGroup;
  //imagen que muestra
  public image?: string;
  //imagen escogida codificada en base64
  private imageBase64?: string;
  //usuario al que se desea modificar la imagen de perfil
  private user?:Usuario;
  constructor(
    private modalCTRL: ModalController,
    private formBuilder: FormBuilder,
    private apiS: APIService,
    private photoService:PhotoService
  ) { }
  
  ngOnInit() {
    this.formProfile = this.formBuilder.group({})
    //se inicializa el user al usuario que ha iniciado cesión
    this.user=JSON.parse(localStorage.getItem('login')!);
    //image tomara la imagen del usuario en caso de que tenga
    this.image=this.user?.imagen;
  }

  //abre una ventana del explorador del equipo local para escoger una imagen
  async chooseImage(){
    await this.photoService.addNewToGallery();
    this.image= this.photoService.webviewPath;
   
  }

  //cierra el modal
  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  //actualiza el usuario con la imagen escogida
 async submitForm() {
  //coge la imagen escogida por el usuario
  this.imageBase64=this.photoService.base64Image;
  if(this.user!=null && this.imageBase64!=null){
    let rol;
    switch(this.user.id_rol){
      case 1:
       rol= 'admin'
      break;
      case 2:
       rol= 'centro educativo'
      break;
      case 3:
       rol= 'empresa'
      break;
      case 4:
        rol='alumno'
      break;
    }
    //se modifica la imagen del usuario con la que elegio 
    this.user.imagen=this.imageBase64;
    //se actualiza en el back
    this.apiS.addUsuario({
      id: this.user.id,
      nombre: this.user.nombre,
      correo: this.user.correo,
      documentos: this.user.documentos,
      "rol": {  
        "nombre": rol,
      },
      alta: this.user.alta,
      imagen: this.user.imagen
    }).subscribe(
      data=>{
        console.log(data);
      }
    ); 
   localStorage.setItem('login', JSON.stringify(this.user));
    }
    this.modalCTRL.dismiss();
  }
  
    
}
