import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
  email:any;
  datosUsuarioActual:any;
  user:Observable<any[]>;
  datosUsuario = [];
  nuevoCurso = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider) {
    /*this.datosUsuarioActual = this.auth.datosUsuarioActual().subscribe(usuario=>{
      this.datosUsuarioActual = usuario;
    })
    */
   
   this.user = this.auth.datosUsuarioActual();
   this.auth.datosUsuarioActual().subscribe(val => console.log(val));
   //Esta linea asigna el Json a un arreglo para poder leer los childs indice por indice, de otra manera me imprime todo el json.
   this.auth.datosUsuarioActual().subscribe(valores => this.datosUsuario = valores);
  }

  ionViewDidLoad() {
   this.email = this.auth.usuarioActual();
  }

  logOut(){
    this.auth.logout();
  }

  agregarNuevoCurso(){
    this.nuevoCurso = true;
  }

}
