import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { DescriptionProductModal } from '../../modals/DescriptionProductModal';
import { CommentModal } from '../../modals/CommentModal';

//SQLite para armazenar comentarios
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

//Share
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  //Propriedades do produto
  public product:any;

  //Comentarios
  public comments = new Array();
  public commentsReady:boolean = false;

  //Existe comentario?
  private existsComment:boolean = false;

  //Banco de Dados Aberto
  private dataBase:SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController, private sqlite:SQLite, public socialSharing:SocialSharing) {

    //Seta os dados do produto passado por parametro
    this.product = navParams.get("product");

    //Cria banco caso nao exista
    sqlite.create({
      name: 'minutrade_app.db',
      location: 'default'
    })
    .then((db: SQLiteObject) => {

      //Seta o SQLiteObject
      this.dataBase = db;

      db.executeSql('CREATE TABLE IF NOT EXISTS comments(productID INT(11), username VARCHAR(50), comment VARCHAR(500))', {})
      .then(() => {
        console.log('SQL Executado')

        //Busca comentarios
        this.getComments();
      })
      .catch( e => console.log(e));
    })
    .catch(e => console.log(e));

  }

  /**
   * Busca comentarios da Base de Dados
   */
  getComments(){

      this.dataBase.executeSql('SELECT username, comment FROM comments WHERE productID = ?', [this.product.id])
      .then((data) => {
        console.log('SQL Executado')

        //Processa dados
        let totalValues = data.rows.length;
        for(let i:number = 0; i < totalValues; i++){
          this.comments.push({username: data.rows.item(i).username, comment: data.rows.item(i).comment});
        }

        //Se nao tiver comentario, insere uma aviso
        if(this.comments.length == 0) {
          this.comments.push({username: 'Nenhum comentário.', comment:'Seja o primeiro a comentar :)'})
        } else {
          this.existsComment = true;
        };

        this.commentsReady = true;

      })
      .catch( e => console.log(e));
  }

  /**
   * Abre Modal de descricao
   * @param description Descricao do produto
   */
  openDescription(description:string){

    let descriptionProductModal = this.modalCtrl.create(DescriptionProductModal, {description:description});
    descriptionProductModal.present();
  }

  /**
   * Abre o Modal de inserir comentario
   * @param productID ID do produto que vai receber o comentario
   * @param productName Nome do Produto
   */
  openCommentDisplay(productID:number, productName:string){

    let commentModal = this.modalCtrl.create(CommentModal, {productID: productID, productName:productName});
    //Ao fechar este modal, atualiza a lista de comentarios
    commentModal.onDidDismiss(newComment => {

      //Se existir novo comentário importado do Modal...
      if(newComment){

        //Apaga alerta
        if(!this.existsComment) this.comments = new Array();
        this.existsComment = true; //Define que agora existe comentario

        //Atualiza comentarios inserindo o comentario novo registrado
        this.comments.push(newComment);
      }

    })
    commentModal.present();
  }

  /**
   * Compartilha o produto na rede social (Facebook)
   * @param productName Nome do produto
   * @param productThumb Link da imagem do produto
   */
  shareProduct(productName:string, productThumb:string){

    //Compartilha produto
    this.socialSharing.share(productName, null, productThumb, productThumb)
    .then(() => {
      //Dados compartilhados...
    })
    .catch(() => {
      //Erro...
    });
  }

}
