import { Component } from '@angular/core';
import { NavController , NavParams} from 'ionic-angular';
import { ClientData } from '../../providers/client-data';

/*
  Generated class for the ClientDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-client-detail',
  templateUrl: 'client-detail.html'
})
export class ClientDetailPage {
  clientUsername: any;
  clientDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public clientData: ClientData) {

    this.clientUsername = navParams.get('clientusername');
    this.clientData = clientData;
    this.clientData.getClientDetails(this.clientUsername).on('value', (data) => {
      this.clientDetails = data.val();

    });
    console.log(this.clientDetails.name);
    console.log(this.clientDetails.username);
    console.log(this.clientDetails.email);
  }



}
