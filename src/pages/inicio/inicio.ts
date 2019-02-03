import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { AulasProvider } from '../../providers/aulas/aulas';
import { AulaPage } from '../aula/aula';
import { ToastController } from 'ionic-angular';

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
  inicioAula = "buscar";
  //
  asignatura:string;
  curso:string;
  codigo:string;
  //
  misAulas:Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider, 
    public aulas: AulasProvider, public toastCtrl: ToastController) {
    /*this.datosUsuarioActual = this.auth.datosUsuarioActual().subscribe(usuario=>{
      this.datosUsuarioActual = usuario;
    })
    */
   
   this.user = this.auth.datosUsuarioActual();
   this.auth.datosUsuarioActual().subscribe(val => console.log(val));
   //Esta linea asigna el Json a un arreglo para poder leer los childs indice por indice, de otra manera me imprime todo el json.
   this.auth.datosUsuarioActual().subscribe(valores => this.datosUsuario = valores);

   //Recupero los codigos de mis aulas
    this.misAulas = this.aulas.misAulas();
  }

  ionViewDidLoad() {
   this.email = this.auth.usuarioActual();
  }

  logOut(){
    this.auth.logout();
  }

  crearAula(){
    this.aulas.crearAula(this.asignatura, this.curso, this.codigo);
    this.asignatura = "";
    this.curso = "";
    const toast = this.toastCtrl.create({
      message: 'Aula virtual creada exitosamente ٩ʕ•͡×•ʔ۶',
      duration: 3000
    });
    toast.present();
    this.inicioAula = "buscar";
  }

  ingresarAula(){
    this.aulas.ingresarAula(this.codigo);
    this.codigo = "";
    const toast = this.toastCtrl.create({
      message: 'Aula virtual ingresada correctamente ٩ʕ•͡×•ʔ۶',
      duration: 3000
    });
    toast.present();
  }

  irAlAula(codigoAula, nombreUsuario){
    this.navCtrl.push('AulaPage',{CodigoAula:codigoAula, NombreUsuario:nombreUsuario});
  }

}
