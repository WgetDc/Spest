import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AulasProvider } from '../../providers/aulas/aulas';
import { Observable } from 'rxjs/Observable';
import { Content } from 'ionic-angular';
import * as firebase from 'firebase/app';

/**
 * Generated class for the AulaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-aula',
  templateUrl: 'aula.html',
})
export class AulaPage {
  @ViewChild(Content) content: Content;
  codigoAula:string;
  mensaje:string;
  mensajesRecuperados:Observable<any[]>;
  archivosRecuperados:Observable<any[]>;
  usuariosRecuperados:Observable<any[]>;
  nombreUsuario:string;
  AulaSegment = "Mensajes";
  subir = false;
  nombreArchivo:string;
  descripcionArchivo:string;
  linkArchivo:string;  
  perfilUsuario:string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public aulas: AulasProvider, public toastCtrl: ToastController) {
    console.log(this.navParams.get("CodigoAula"));
    this.codigoAula = this.navParams.get("CodigoAula");
    this.nombreUsuario = this.navParams.get("NombreUsuario");
    this.perfilUsuario = this.navParams.get("PerfilUsuario");
    this.mensajesRecuperados = this.aulas.recuperarMensajes(this.codigoAula);
    this.archivosRecuperados = this.aulas.recuperarArchivos(this.codigoAula);
    this.usuariosRecuperados = this.aulas.recuperarUsuarios(this.codigoAula);
  }

  ionViewDidLoad() {    
    this.usuariosRecuperados = this.aulas.recuperarUsuarios(this.codigoAula);
    setTimeout(() => {
      this.content.scrollToBottom(300);
   }, 1000);
  }

  enviarMensaje(){
   this.aulas.enviarMensaje(this.mensaje, this.codigoAula, this.nombreUsuario);
   this.mensaje = "";
   this.ionViewDidLoad();
  }

  activarSubirArchivo(){
    this.subir = true;
    this.AulaSegment = "Biblioteca";
  }

  subirArchivo(){
    this.aulas.subirArchivo(this.codigoAula, this.nombreArchivo, this.descripcionArchivo, this.linkArchivo);
    this.subir = false;
    this.nombreArchivo = "";
    this.descripcionArchivo = "";
    this.linkArchivo = "";
    const toast = this.toastCtrl.create({
      message: 'El archivo se subio correctamente ٩ʕ•͡×•ʔ۶',
      duration: 3000
    });
    toast.present();
  }

  cambiarVistaEstadisticas(){
    this.AulaSegment ="Estadisticas";
  }

  subirDeNivel(Uid, Nivel, Ataque){
    this.aulas.subirDeNivel(Uid,Nivel,Ataque,this.codigoAula);
  }



}
