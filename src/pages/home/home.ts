import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { NSKeys } from '../../utils/NSKeys';
import { PopoverController } from 'ionic-angular';
import { UserPopover } from '../../popovers/UserPopover';

//Lista de produtos
import { SimulatedProducts } from '../../products/SimulatedProducts';

//Pagina de Produto
import { ProductPage } from '../product/product';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //Dados do usuario a ser bindado/exibido no display
  public user: any;
  //Estado de dados do usuario (define se ja esta com as propriedade carregadas)
  public userReady: boolean = false;

  //Produtos
  public products = new Array();

  constructor(public navCtrl:NavController, public nativeStorage:NativeStorage, public popoverCtrl:PopoverController) {

    //Seta os dados dos produtos
    this.products = SimulatedProducts.products;
  }

  /**
   * Exibe Popover.
   * @param e Evento
   */
  presentPopover(e){
    let popover = this.popoverCtrl.create(UserPopover);
    popover.present({
      ev:e
    });
  }

  /**
   * Chamado automaticamente quando iniciado
   */
  ionViewCanEnter(){

    //Simula dados do usuario (Para emulacao)
    /*this.user = {
      name: 'Wenderson Pires',
      picture: 'https://scontent.fplu11-1.fna.fbcdn.net/v/t1.0-9/14068301_1451100941601566_9220607836002515674_n.jpg?oh=c0d37fc4b90032bfd4a2cf3e82040923&oe=59527476'
    };*/

    //this.userReady = true;
    //Simula dados do usuario

    //Resgata dados do usuario logado
    this.nativeStorage.getItem(NSKeys.FACEBOOK_USER)
    .then((data) => {

      //Seta os dados do usuario
      this.user = {
        name: data.name,
        picture: data.picture
      };

      //Define o status do usuario como pronto
      this.userReady = true;
    }, (error) => {

      //Se ocorrer algum erro ao resgatar os dados do usuario...
      console.log(error);
    });
  }

  /**
   * Abre display com dados do produto clicado
   * @param product Atributos do Produto {id, name, price, thumb, description}
   */
  openProduct(product:any){

    //Vai para Display de exibicao de dados dos produto (parametros dos produtos tambem e passado)
    this.navCtrl.push(ProductPage, {product:product});
  }

}
