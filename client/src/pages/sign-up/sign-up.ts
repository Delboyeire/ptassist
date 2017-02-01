import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { Auth, User, UserDetails,IDetailedError } from '@ionic/cloud-angular';



@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignupPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  nameChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;


  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
              public loadingCtrl: LoadingController, public alertCtrl: AlertController, public auth: Auth, public user: User) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      name : ['',Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      username: ['', Validators.compose([Validators.minLength(10),Validators.required])]
    })
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
  signupUser(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } else {
      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
      let details: UserDetails = {name: this.signupForm.value.name,'email': this.signupForm.value.email,
                                  'password': this.signupForm.value.password, username:this.signupForm.value.username};

      this.auth.signup(details).then(() => {
        // `this.user` is now registered
        this.user.set('isTrainer', true);
        this.user.save();

      }, (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('A user has already signed up with the supplied email');
          } else if (e === 'required_email') {
            alert('Missing email field.');
          } else if (e === 'required_password') {
            alert('Missing password field');
          } else if (e === 'conflict_username') {
            alert('A user has already signed up with the supplied username');
          }else if (e === 'invalid_email') {
            alert('The email did not pass validation.');
          }
        }
      });

      this.loading.dismiss();
      this.authData.loginUser(this.signupForm.value.email,this.signupForm.value.password);
      this.authData.createTrainerProfile();
    }
  }
}
