import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { ClientDetailPage } from '../../pages/client-detail/client-detail'
import { ProgramViewEditPage } from '../../pages/program-view-edit/program-view-edit';

@Component({
  selector: 'page-client-view-home',
  templateUrl: 'client-view-home.html'
})
export class ClientViewHomePage {
  client: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.client = navParams.get('client');

  }
  goToClientDetailPage(){
      this.navCtrl.push(ClientDetailPage, {
        client: this.client
      });
  }
  goToClientProgramPage(){
    this.navCtrl.push(ProgramViewEditPage, {
      client: this.client
    });
  }



  }



