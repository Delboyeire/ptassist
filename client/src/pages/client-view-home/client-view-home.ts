import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ClientData } from '../../providers/client-data';
import { ClientDetailPage } from '../../pages/client-detail/client-detail'
import { ProgramViewEditPage } from '../../pages/program-view-edit/program-view-edit';

@Component({
  selector: 'page-client-view-home',
  templateUrl: 'client-view-home.html'
})
export class ClientViewHomePage {
  clientUsername: any;
  clientDetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public clientData: ClientData) {

    this.clientUsername = navParams.get('clientusername');
    this.clientData = clientData;
    this.clientData.getClientDetails(this.clientUsername).on('value', (data) => {
      this.clientDetails = data.val();

    });

  }
  goToClientDetailPage(clientusername: string){
      this.navCtrl.push(ClientDetailPage, {
        clientusername: clientusername
      });
  }
  goToClientProgramPage(clientusername: string){
    this.navCtrl.push(ProgramViewEditPage, {
      clientusername: clientusername
    });
  }



  }



