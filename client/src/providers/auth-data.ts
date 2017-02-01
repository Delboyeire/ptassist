import {Injectable} from '@angular/core';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

@Injectable()
export class AuthData {

  public userProfile: any;
  public trainerId: any;
  public clientList:any;
  public newClientId: any;


  constructor(public auth: Auth, public user: User,public alertCtrl: AlertController) {

    this.userProfile = firebase.database().ref('/userProfile');
    this.trainerId = this.user.id;




  }
  loginUser(email: string, password: string): any {
    let details = {'email': email, 'password': password};
    this.auth.login('basic', details);
    }
  signupUser(email: string, password: string, name: string, username: string): any {
    let details: UserDetails = {'email': email, 'password': password, username: username};
    this.auth.signup(details).then(() => {
      this.user.details.name = name;
      this.user.set('isTrainer', true);
      this.user.save();
      this.userProfile.child(details.username).set({email: email, name: name, username: username, isTrainer: true});


    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        let alert = this.alertCtrl.create({
          message: e.toString(),
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }

    });

  }
  signUpClient(email: string, password: string, name: string, username: string): any {

    let details: UserDetails = {'email': email, 'password': password, 'username' : username};
    //Create client
    this.auth.signup(details).then(() => {
      console.log("Client Signed up :-) ");
    }, (err: IDetailedError<string[]>) => {
      for (let e of err.details) {
        let alert = this.alertCtrl.create({
          message: e.toString(),
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      }
    });

    return details.username;

  }
  sendInitialPasswordReset(email: string){
    this.auth.requestPasswordReset(email);
  }

  createTrainerProfile(){
    this.userProfile = firebase.database().ref('/userProfile');
    this.userProfile.child(this.user.details.username).set({email: this.user.details.email, name: this.user.details.name, username: this.user.details.username, isTrainer: true});
  }
  createClientProfile(clientUsername: string, clientEmail: string, clientName: string,clientTrainer: string){
    this.userProfile = firebase.database().ref('/userProfile');
    this.userProfile.child(clientUsername).set({email: clientEmail, name: clientName, username: clientUsername, trainerUsername: clientTrainer, isTrainer: false});
  }
  addClientToClientList(clientUsername: string, clientEmail: string, clientName: string,clientTrainer: string){
    this.clientList = firebase.database().ref('/userProfile' + clientTrainer + '/clientList');
    this.clientList.child(clientUsername).set({email: clientEmail, name: clientName, username: clientUsername});
  }

  logoutUser(){
     this.auth.logout();
  }
}
