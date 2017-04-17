import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Importa NativeStorage para armazenar dados no storage nativo
import { NativeStorage } from '@ionic-native/native-storage';

//Tabs
//import { TabsPage } from '../pages/tabs/tabs';

//Displays
import { WelcomePage } from '../pages/welcome/welcome'
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

//Utils
import { NSKeys } from '../utils/NSKeys';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any; // = WelcomePage; //Inicia com a tela de boas vindas do app (!) Opcional

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, nativeStorage: NativeStorage) {

    //Define cor do Status Bar
    statusBar.overlaysWebView(true);
    statusBar.backgroundColorByHexString('#3b5998');

    platform.ready().then(() => {

      //Verifica se o usuário já está logado
      //(!) Alguns dados necessários são armazenados para evitar que o usuário tenha que fazer login toda vez que abrir o app
      let env = this;
      
      nativeStorage.getItem(NSKeys.FACEBOOK_USER)
      .then( (data) => {

        //Uma vez que recebeu os dados, quer dizer que o usuário já fez login e os dados estam armazenados
        //O usuário entra diretamente sem ser necessário login
        env.rootPage = HomePage;
        splashScreen.hide();

      }, (error) => {

        //Caso não tenha dados registrados do usuário, vai para tela inicial de login
        env.rootPage = LoginPage;
        //env.rootPage = WelcomePage;
        splashScreen.hide();

      });

      statusBar.styleDefault();
    });
  }
}
