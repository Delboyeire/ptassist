import { Component } from '@angular/core';
import { ClientListPage } from '../client-list/client-list';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { Auth, User} from '@ionic/cloud-angular';
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  trainerId: any;
  trainerName: any;
  constructor(public navCtrl: NavController, public authData: AuthData, public  navParams: NavParams,public auth: Auth, public user: User) {
    this.navParams = navParams;
    this.trainerId = this.user.id;
    this.trainerName = this.user.details.name;

  }
  createTrainerProfile(){
    this.authData.createTrainerProfile();
  }

  goToClientList(){
    this.navCtrl.push(ClientListPage, {
      trainerId : this.trainerId,
    });
  }
  logOut() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }


}
