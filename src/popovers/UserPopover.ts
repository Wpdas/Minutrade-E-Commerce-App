import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { NSKeys } from '../utils/NSKeys';
import { Facebook } from 'ionic-native';
import { LoginPage } from '../pages/login/login';

@Component({
  template:`
    <ion-list>
      <ion-list-header>{{userName}}</ion-list-header>
      <button ion-item (click)="logoutFacebook()">Logout</button>
    </ion-list>
  `
})
export class UserPopover {

    //Nome do usuario
    public userName:string = 'Carregando...';

    constructor(public viewCtrl: ViewController, public nativeStorage:NativeStorage, public navCtrl:NavController) {

        nativeStorage.getItem(NSKeys.FACEBOOK_USER)
        .then((data) => {

            //Seta o nome do usuario
            this.userName = data.name;

        }, (error) => {

            //Se ocorrer erro...
            console.log(error)
        })
    }

    /**
     * Faz logout do Facebook e do Aplicativo
     */
    logoutFacebook(){

        //Fecha popover
        this.viewCtrl.dismiss();

        //Logout
        Facebook.logout()
        .then((response) => {

            //Uma vez que o usuario foi deslogado, os dados sao apagados do storage
            this.nativeStorage.remove(NSKeys.FACEBOOK_USER);

            //Direciona o app para o display inicial de login
            this.navCtrl.push(LoginPage);
        }, (error) => {

            //Caso ocorra erro ao apagar dados do storage
            console.log(error);
        })
    }
}