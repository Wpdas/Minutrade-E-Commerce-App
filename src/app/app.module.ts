import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProductPage } from '../pages/product/product';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeStorage } from '@ionic-native/native-storage';

import { UserPopover } from '../popovers/UserPopover';

import { DescriptionProductModal } from '../modals/DescriptionProductModal';
import { CommentModal } from '../modals/CommentModal';

import { SQLite } from '@ionic-native/sqlite';

import { SocialSharing } from '@ionic-native/social-sharing';

//Directivas
import { Elastic } from '../directives/Elastic'; //Diretiva para ajustar altura do input de texto na tela de Inserir Comentario

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    UserPopover,
    ProductPage,
    DescriptionProductModal,
    CommentModal,
    Elastic
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage,
    LoginPage,
    UserPopover,
    ProductPage,
    DescriptionProductModal,
    CommentModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    SQLite,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
