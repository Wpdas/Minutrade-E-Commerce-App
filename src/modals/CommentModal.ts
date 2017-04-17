import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { NSKeys } from '../utils/NSKeys';

//SQLite para armazenar comentarios
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  template:`
    <ion-header>

        <ion-toolbar color="facebook">

            <ion-title>Inserir Comentário</ion-title>

            <ion-buttons end>
                <button ion-button icon-only color="royal" (click)="dismiss()">
                    <ion-icon name="close"></ion-icon>
                </button>
            </ion-buttons>

        </ion-toolbar>

    </ion-header>
    <ion-content padding>

        <ion-grid fixed>

            <!-- Nome do Produto -->
            <ion-row>
            <ion-col col-sm>
                <h6 class="titleProductGlobal">{{productName}}</h6>
            </ion-col>
            </ion-row>

        </ion-grid>
        
        <ion-list inset>

            <ion-item>
                <ion-label>Comentário</ion-label>
                <ion-textarea placeholder="Insira um comentário" elastic [(ngModel)]="commentText"></ion-textarea>
            </ion-item>

        </ion-list>

        <div padding>
            <button ion-button block (click)="sendComment()">Enviar</button>
        </div>

    </ion-content>
  `
})
export class CommentModal {

    //ID do produto que vai receber o comentario
    private productID:string;
    //Nome do Produto
    public productName:string;

    //Nome do usuario
    private userName:string = '';

    //Texto escrito pelo usuario
    public commentText:string = '';

    constructor(public viewCtrl: ViewController, public navParams: NavParams, public sqlite:SQLite, private nativeStorage:NativeStorage, public alertCtrl:AlertController) {
        this.productID = navParams.get('productID');
        this.productName = navParams.get('productName');

        //Seta o nome do usuario
        nativeStorage.getItem(NSKeys.FACEBOOK_USER)
        .then((data) => {
            this.userName = data.name
        }, (error) => {
            console.log(error);
        })
    }

    //Envia comentario
    sendComment(){

        //Valida comentario
        if(this.commentText.length > 5){

            this.sqlite.create({
                name: 'minutrade_app.db',
                location: 'default'
            })
            .then((db: SQLiteObject) => {
            
            db.executeSql('INSERT INTO comments VALUES (?,?,?)', [this.productID, this.userName, this.commentText])
            .then(() => console.log('Comentário Inserido'))
            .catch( e => console.log(e));
            })
            .catch(e => console.log(e));

            //Informa que o comentario foi inserido
            let confirmAlert = this.alertCtrl.create({
                title: 'Obrigado!',
                subTitle: 'Seu comentário foi registrado :)',
                buttons: [{
                    text: 'Beleza',
                    handler: () => {

                        //Fecha Modal e passa os novos dados
                        this.viewCtrl.dismiss({username: this.userName, comment:this.commentText});
                    }
                }]
            });

            confirmAlert.present();

        } else {

            let simpleAlert = this.alertCtrl.create({
                title: 'Ops!',
                subTitle: 'Por favor, digite um comentário mais detalhado.',
                buttons: ['Beleza']
            });

            simpleAlert.present();
            
        }
    }

    //Fecha este Modal
    dismiss(){
        this.viewCtrl.dismiss();
    }
}