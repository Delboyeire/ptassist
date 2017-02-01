import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Pipe} from "@angular/core/src/metadata/directives";

/*
  Generated class for the ProgramViewEdit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-program-view-edit',
  templateUrl: 'program-view-edit.html'
})
export class ProgramViewEditPage {
  items: any;
  jsonitems: string;



  constructor(public navCtrl: NavController) {

    var text = '{ "programName":"Chest", "Exercises":["ex1":{"name":"bench press","sets":3}, "ex2":{"name":"bench press","sets":3}], "city":"New York"}';

    this.items = JSON.parse( text);
  }


  ionViewDidLoad() {
    console.log('Hello ProgramViewEditPage Page');
  }

}
