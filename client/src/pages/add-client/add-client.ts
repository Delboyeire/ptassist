import {NavController, LoadingController, AlertController, NavParams} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data'
import { Auth, User} from '@ionic/cloud-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html'
})
export class AddClientPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  nameChanged: boolean = false;
  usernameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  trainerUsername: any;
  userProfile: any;
  clientList: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController,
              public navParams: NavParams,public auth: Auth, public user: User) {
    this.trainerUsername = this.user.details.username;

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      name : ['',Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])]
    })
    this.userProfile = firebase.database().ref('/userProfile');

  }

  /**
   * Receives an input field and sets the corresponding fieldChanged property to 'true' to help with the styles.
   */
  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupClient(){
    this.submitAttempt = true;


    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      var randomPass = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for( var i=0; i < 7 ; i++ ) {
        randomPass += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      this.authData.signUpClient(this.signupForm.value.email,randomPass,this.signupForm.value.name, this.signupForm.value.username);
      this.authData.createClientProfile(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.name,
                                        this.user.details.username);
      firebase.database().ref('userProfile/' + this.trainerUsername + '/clientList/' + this.signupForm.value.username ).set({
        email: this.signupForm.value.email,
        name: this.signupForm.value.name,
        username: this.signupForm.value.username,
        trainerUsername: this.trainerUsername
      });
      this.authData.sendInitialPasswordReset(this.signupForm.value.email);
      this.loading.dismiss();
      this.nav.pop();
    }
  }
}
