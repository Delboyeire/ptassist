import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Auth, User } from '@ionic/cloud-angular';

@Injectable()
export class ClientData {
  public currentUser: any;
  public clientList: any;
  public currentClient: any;
  public userProfileRef: any;
  public clientDetails: any;
  public userUsername: any;


  constructor(public auth: Auth, public user: User ) {
    this.userUsername = this.user.details.username;
    this.userProfileRef = firebase.database().ref('userProfile/');




  }

  getClientList(): any {
    var username = this.user.details.username;
    this.clientList = firebase.database().ref('userProfile/' + username + '/clientList');
    return this.clientList;
  }
  getClientDetails(username: string): any{
    console.log("In client data:" + username);
    this.clientDetails = this.userProfileRef.child(username);

    return this.clientDetails;
  }
  getIsTrainer(username: string): any{
    console.log("In client data:" + username);
    this.clientDetails = this.userProfileRef.child(username).child('isTrainer');


    return this.clientDetails;
  }
  /*addDiet(dietName,  dietDate, clientId, dietPlan): any {
    this.userProfileRef = firebase.database().ref('userProfile/' + clientId);

    return this.userProfileRef.child('dietList').push({
      dietName: dietName,
      dietDate: dietDate,
      dietPlan:  dietPlan

    });
  }
  getDietList(clientId): any {
    return firebase.database().ref('userProfile/' + clientId + '/dietList')
}
  addProgram(programName,programDate, clientId, programPlan): any {
    return this.clientList.child(clientId).child('programList').push({
      programName: programName,
      programDate: programDate,
      programPlan:  programPlan

    });
  }*/

}
