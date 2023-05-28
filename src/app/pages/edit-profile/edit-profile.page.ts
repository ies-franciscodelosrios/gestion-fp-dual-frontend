import { Component, OnInit, Input } from '@angular/core';
import { ModalController} from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { PhotoService } from 'src/app/services/photo.service'
import { Usuario } from 'src/model/Usuario';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})

export class EditProfilePage implements OnInit {
  public formProfile: FormGroup;
  public image?: string;
  private imageBase64?: string;
  private user?:Usuario;
  constructor(
    private modalCTRL: ModalController,
    private formBuilder: FormBuilder,
    private apiS: APIService,
    private photoService:PhotoService
  ) { }

  ngOnInit() {
    this.formProfile = this.formBuilder.group({})
    this.user=JSON.parse(localStorage.getItem('login')!);
    this.image=this.user?.imagen;
  }

  async chooseImage(){
    await this.photoService.addNewToGallery();
    this.image= this.photoService.webviewPath;
   
  }

  cancel() {
    this.modalCTRL.dismiss(null, 'cancel');
  }

  async submitForm() {
    this.imageBase64=this.photoService.base64Image;
    if(this.user!=null && this.imageBase64!=null){
      let rol;
      switch(this.user.id_rol){
        case 1:
         rol= 'Admin'
        break;
        case 2:
         rol= 'Centro Educativo'
        break;
        case 3:
         rol= 'Empresa'
        break;
        case 4:
          rol='Alumno'
        break;
        
      }
      this.user.imagen=this.imageBase64;
      this.apiS.addUsuario({
        id: this.user.id,
        nombre: this.user.nombre,
        correo: this.user.correo,
        documentos: this.user.documentos,
        "rol": {  
          "nombre": 'Alumno',
        },
        alta: this.user.alta,
        imagen: this.user.imagen
      }).subscribe(
        data=>{
          console.log(data);
        }
     );
      
    }
    
    this.modalCTRL.dismiss();

  }

}
