import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { ClientData } from '../../providers/client-data';
import { AddClientPage } from '../add-client/add-client'
import { ClientViewHomePage } from '../client-view-home/client-view-home'
import { Auth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {
  public clientList: any;
  public trainerId: any;


  constructor(public nav: NavController, public clientData: ClientData, public navParams: NavParams, public auth: Auth, public user: User) {
    this.clientData = clientData;
    this.trainerId = this.user.id;
    this.clientData.getClientList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          name: snap.val().name,
          email: snap.val().email,
          username: snap.val().username
        });
      });
      this.clientList = rawList;
    });

  }
  goToAddClient(){
    this.nav.push(AddClientPage,{trainerId: this.user.id,});
  }
  goToClientViewHome(clientusername: string){
    // push another page on to the navigation stack
    // causing the nav controller to transition to the new page
    // optional data can also be passed to the pushed page.
    this.nav.push(ClientViewHomePage, {
      clientusername: clientusername
    });
  }

}
