import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {Deploy} from '@ionic/cloud-angular';
import firebase from 'firebase';
import { LoginPage } from '../pages/login/login';
import { Auth, User } from '@ionic/cloud-angular';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;


  constructor(platform: Platform,public deploy: Deploy ,public auth: Auth, public user: User) {

   firebase.initializeApp({
      apiKey: "AIzaSyDGVQ1ELzobjtuAYz2Ag-ET9aYrIEjzMCU",
      authDomain: "ptassist-7674c.firebaseapp.com",
      databaseURL: "https://ptassist-7674c.firebaseio.com",
      storageBucket: "ptassist-7674c.appspot.com",
      messagingSenderId: "861149887378"
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
