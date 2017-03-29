import { Component } from '@angular/core';
import { NavController, LoadingController , ToastController} from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../sign-up/sign-up';
import {HomeClientPage} from "../home-client/home-client";
import {ClientViewHomePage} from "../client-view-home/client-view-home";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string;
  password: string;
  loading: any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public authService: Auth, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

    this.showLoader();

    //Check if already authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.SetHomePage();
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: 'Not already authorized',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.loading.dismiss();
    });

  }

  login(){

    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      this.SetHomePage();
    }, (err) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: err,
        duration: 3000,
        position: 'top'
      });
      toast.present();
      console.log(err);
    });

  }

  launchSignup(){
    this.navCtrl.push(SignupPage);
  }
  SetHomePage(){
    var role = this.authService.user.role;
    if(role == 'client'){
      this.navCtrl.push(ClientViewHomePage, {
        client: this.authService.user
      });
    }else{
      this.navCtrl.setRoot(HomePage);
    }

  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

}
