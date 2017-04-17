import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  template:`
    <ion-header>

        <ion-toolbar color="facebook">

            <ion-title>Descrição</ion-title>

            <ion-buttons end>
                <button ion-button icon-only color="royal" (click)="dismiss()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-buttons>

        </ion-toolbar>

    </ion-header>
    <ion-content padding>
        <p class="descriptionProduct">{{description}}</p>
    </ion-content>
  `
})
export class DescriptionProductModal {

    //Nome do usuario
    public description:string;

    constructor(public viewCtrl: ViewController, public navParams: NavParams) {
        this.description = navParams.get('description');
    }

    //Fecha este Modal
    dismiss(){
        this.viewCtrl.dismiss();
    }
}