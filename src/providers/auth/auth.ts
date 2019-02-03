import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthProvider {
  Usuario:any;
  UserId:any;
  nombre:any;
  
  constructor(private afAuth :  AngularFireAuth, private afDB : AngularFireDatabase) {
    console.log('Hello AuthProvider Provider');
  }

      // Registro de usuario
      registerUser(email:string, password:string, nombre:string, rut:string){
        return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
        .then((res)=>{
         // El usuario se ha creado correctamente.
        var user = firebase.auth().currentUser;
        var correo, uid;
        if (user != null) {
          correo = user.email;
          uid = user.uid;  
          this.afDB.database.ref('Usuarios/'+uid).set({email: correo, nombre: nombre, rut: rut});
        }
        })
        .catch(err=>Promise.reject(err))
     }

      // Login de usuario
 loginUser(email:string, password:string){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then(user=>Promise.resolve(user))
    .catch(err=>Promise.reject(err))
}

// Devuelve la session
get Session(){
  return this.afAuth.authState;
 }

  // Logout de usuario
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      // hemos salido
    })
  }

  usuarioActual(){
    var user = firebase.auth().currentUser;
    let email = user.email;
    return email;
  }

  datosUsuarioActual(){
    var user = firebase.auth().currentUser;
    let uid = user.uid; 
    return this.afDB.list('Usuarios/' + uid).valueChanges();    
  }
  
 

}
