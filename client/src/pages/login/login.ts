import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Auth, User} from '@ionic/cloud-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { ClientData } from '../../providers/client-data';
import { HomePage } from '../home/home';
import { SignupPage } from '../sign-up/sign-up'
import { ResetPasswordPage } from '../reset-password/reset-password';
import { HomeClientPage } from '../home-client/home-client';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  isTrainer : any ;
  userDetails: any;

  constructor(public nav: NavController, public authData: AuthData,
              public formBuilder: FormBuilder,public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public auth: Auth, public user: User, public clientData: ClientData) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
    this.clientData = clientData;
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  loginUser(){
    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      this.auth.login('basic', {'email': this.loginForm.value.email, 'password': this.loginForm.value.password}).then(()=>{

        this.clientData.getClientDetails(this.user.details.username).on('value', (data) => {
          this.userDetails = data.val();

        });


          this.nav.setRoot(HomePage);



      });
      this.loading.dismiss();
      return this.user.load(this.user.id);
    }
  }
  goToResetPassword(){
    this.nav.push(ResetPasswordPage);
  }
  goToSignUp(){
    this.nav.push(SignupPage);
  }


}
