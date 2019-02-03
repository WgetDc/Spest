import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AulasProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AulasProvider {
  //
  ObtenerNombreAula:Observable<any[]>;
  aula = "";
  asignatura = "";
  curso = "";

  constructor(private afAuth :  AngularFireAuth, private afDB : AngularFireDatabase) {
    console.log('Hello AulasProvider Provider');
  }

  crearAula(asignatura:string, curso:string, codigo:string){
    this.afDB.database.ref('Aula/'+codigo).set({Asignatura: asignatura, Curso: curso});
  }

  ingresarAula(codigo:string){
    var user = firebase.auth().currentUser;
    let uid = user.uid; 
    this.afDB.database.ref('Aula/'+ codigo + '/Usuarios' + '/' + uid).set({Pertenece:"Si", Nivel:1, Ataque:6, IdUsuario:uid});

    // Test for the existence of certain keys within a DataSnapshot / Recupera valores espesificos de una ruta de realtime database
    var ref = firebase.database().ref('Aula/');
    ref.once("value")
      .then(function(snapshot) {
        var aula = snapshot.child(codigo).val(); // {Asignatura:"lenguaje",Curso:"8A"} Esta linea me devuelve un objeto con todos los valores de ese child
        var asignatura = snapshot.child(codigo + "/Asignatura").val(); // "Lenguaje"
        var curso = snapshot.child(codigo).child("Curso").val(); // "8A"
        //console.log(aula);
        //console.log(asignatura);
        //console.log(curso);
        firebase.database().ref('Usuarios/' + uid + '/MisAulas/' + codigo).set({CodigoAula : codigo, Asignatura: asignatura, Curso: curso}); //Ingresamos Codigo, asignatura y curso, en los cursos de cada usuario para que aparescan los cursos disponibles en el inicio
      });    
   // this.afDB.database.ref('Usuarios/' + uid + '/MisAulas/' + codigo).set({CodigoAula : codigo, Asignatura: asignatura, Curso: curso});
      var ref2 = firebase.database().ref('Usuarios/');  //Aqui nos dedicamos solo a obtener el nombre de usuario para poder grabarlo y obtenerlo a la hora de modifica las estadisticas
      ref2.once("value")
        .then(function(snapshot){
          var nombre = snapshot.child(uid).child("nombre").val();
          console.log(nombre);
          firebase.database().ref('Aula/'+ codigo + '/Usuarios' + '/' + uid).set({Pertenece:"Si", Nivel:1, Ataque:6, IdUsuario:uid, NombreUsuario:nombre});
        });
  }

  misAulas(){
    var user = firebase.auth().currentUser;
    let uid = user.uid; 
    return this.afDB.list('Usuarios/' + uid + '/MisAulas/').valueChanges();
  }

  enviarMensaje(mensaje:string, codigo:string, nombreUsuario:string){
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes();
    var fechaYHora = fecha + " " + hora;
    

    var idMensaje = Date.now();

    var user = firebase.auth().currentUser;    
    let uid = user.uid; 
    this.afDB.database.ref('Aula/'+ codigo + '/Mensajes' + '/' + idMensaje).set({Usuario:uid, Nombre:nombreUsuario, Mensaje:mensaje, Fecha: fechaYHora});
    
    var ref2 = firebase.database().ref('Aula/');  //Aqui nos dedicamos solo a obtener el nombre de usuario para poder grabarlo y obtenerlo a la hora de modifica las estadisticas
      ref2.once("value")
        .then(function(snapshot){
          var ataque = snapshot.child(codigo + "/Usuarios/" + uid).child("Ataque").val();
          var nivel = snapshot.child(codigo + "/Usuarios/" + uid).child("Nivel").val();
          console.log("El ataque es :" + ataque);
          console.log("El nivel es: " +nivel);
          firebase.database().ref('Aula/'+ codigo + '/Mensajes' + '/' + idMensaje).set({Usuario:uid, Nombre:nombreUsuario, Mensaje:mensaje, Fecha: fechaYHora, Ataque: ataque, Nivel:nivel});

        });
  }

  recuperarMensajes(codigo:string){
    var user = firebase.auth().currentUser;
    let uid = user.uid; 
    return this.afDB.list('Aula/' + codigo + '/Mensajes/').valueChanges();
  }

  subirArchivo(codigo:string, nombre:string, descripcion:string, link:string){
    var hoy = new Date();
    var fecha = hoy.getDate() + "/" + (hoy.getMonth() + 1) + "/" + hoy.getFullYear();
    var hora = hoy.getHours() + ":" + hoy.getMinutes();
    var fechaYHora = fecha + " " + hora;
    var user = firebase.auth().currentUser;    
    let uid = user.uid; 
    var idArchivo = Date.now();
    this.afDB.database.ref('Aula/'+ codigo + '/Archivos' + '/' + idArchivo).set({NombreArchivo:nombre, DescripcionArchivo:descripcion,
    linkArchivo:link, FechaSubida:fechaYHora, Usuario:uid});
  }

  recuperarArchivos(codigo:string){
    return this.afDB.list('Aula/' + codigo + '/Archivos/').valueChanges();
  }

  recuperarUsuarios(codigo:string){
    return this.afDB.list('Aula/' + codigo + '/Usuarios/').valueChanges();
  }

  subirDeNivel(uid, nivel, ataque, codigo){
    let nuevoNivel = nivel + 1;
    let nuevoAtaque = ataque + (Math.floor((Math.random() * (7-2))+2));
    this.afDB.database.ref('Aula/'+ codigo + '/Usuarios/' + uid + "/").update({Nivel:nuevoNivel, Ataque:nuevoAtaque});
  }

/*  editarEstadisticas(){
    var ref = firebase.database().ref('Usuarios/');
    ref.once("value")
      .then(function(snapshot) {
        var user = firebase.auth().currentUser;    
        let uid = user.uid;
        var perfil = snapshot.child(uid).child("rut").val();
        console.log(perfil);      
      });  
  }
  */

}
