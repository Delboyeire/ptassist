import { Component } from '@angular/core';
import {NavController, NavParams, ToastController, ModalController, LoadingController} from 'ionic-angular';
import { AddClientPage } from '../add-client/add-client'
import { ClientViewHomePage } from '../client-view-home/client-view-home'
import {ClientService} from "../../providers/client-service";

@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {
  public clientList: any;
  loading : any;


  constructor(public nav: NavController,public toastCtrl: ToastController,public loadingCtrl: LoadingController,public modalCtrl: ModalController, public clientService: ClientService, public navParams: NavParams) {


  }
  ionViewDidLoad(){

    this.clientService.getClients().then((data) => {
      console.log(data);
      this.clientList = data;
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  goToClientViewHome(client){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.nav.push(ClientViewHomePage, {
      client: client
    });
  }
  showAddClientModal() {
    let modal = this.modalCtrl.create(AddClientPage);


    modal.present();
  }
  deleteClient(client){

    this.showLoader();

    //Remove from database
    this.clientService.deleteClient(client._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.clientList.indexOf(client);

      if(index > -1){
        this.clientList.splice(index, 1);
      }

    }, (err) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
