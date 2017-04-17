import { Component } from '@angular/core';
import { Facebook } from 'ionic-native'
import { NativeStorage } from '@ionic-native/native-storage';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NSKeys } from '../../utils/NSKeys';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  //ID do aplicativo Facebook
  private FB_APP_ID: number = 204033816757803;

  constructor(public navCtrl: NavController, public nativeStorage:NativeStorage) {

    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }
  
  facebookLogin(){

    //Array de permissões
    let permissions:string[];
    let nav = this.navCtrl;

    //Permissao necessaria para aplicacao (Facebook)
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then((response) => {

      //Obtem dados da chave token e suas propriedades (id do usuario retornado)
      let userID = response.authResponse.userID;
      let params = new Array();

      //Solicita o nome do usuario
      Facebook.api('/me?fields=name', params)
      .then((user) => {

        //Imagem de perfil do usuario
        user.picture = "https://graph.facebook.com/" + userID + "/picture?type=small";

        //Armazena os dados necessarios do usuario no storage nativo (entende-se como logado)
        this.nativeStorage.setItem(NSKeys.FACEBOOK_USER, {
          name: user.name,
          picture: user.picture
        }).then(() => {

          //Apos armazenar os dados do usuario, chama o display principal
          nav.push(HomePage)
        }, (error) => {

          //Caso ocorra algum erro ao armazenar os dados do usuario...
          console.log(error);
        })

      });
    }, (error) => {
      //Caso ocorra algum erro ao processa a chamada da API do Facebook...
      console.log(error);
    });
  }

}
