import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user= { email : '', password : '', password2 : '', nombre: '', rut : ''};
  crearCuenta = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth : AuthProvider,
    public alertCtrl : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin(){

    if(this.user.password == this.user.password2){
    
    this.auth.registerUser(this.user.email,this.user.password, this.user.nombre, this.user.rut)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  } else{
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Contraseñas no coinciden',
      buttons: ['Aceptar']
    });
    alert.present();
    this.user.password = "";
    this.user.password2 = "";
  }

  }

  login(){
    this.auth.loginUser(this.user.email,this.user.password ).then((user) => {
      this.navCtrl.push('InicioPage',{email: this.user.email});
      })
     .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })
  }

  formularioCrear(){
    this.crearCuenta = true;
  }

}
