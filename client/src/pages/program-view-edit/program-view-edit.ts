import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, LoadingController, ToastController , NavParams } from 'ionic-angular';
import {Pipe} from "@angular/core/src/metadata/directives";
import {AddProgramModalPage} from "../add-program-modal/add-program-modal";
import {AddClientProgramModalPage} from "../add-client-program-modal/add-client-program-modal";
import {Auth} from "../../providers/auth";
import {Exercises} from "../../providers/exercises";
import { ProgramService } from '../../providers/program-service';
import {VideoModalPage} from "../video-modal/video-modal";
import {ClientService} from "../../providers/client-service";

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

  client: any;
  programs: any;
  exercises: any;
  selectedProgramid: any;
  selectedProgram: any;
  program_exercises: any;
  loading:any;
  clientprogram_ids : any ;
  clientprograms = [];



  constructor(public navCtrl: NavController, public programService: ProgramService, public clientService: ClientService, public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController, public navParams: NavParams) {


    this.client = navParams.get('client');
    this.programService.getTrainersPrograms().then((data) =>{
      this.programs = data;

    });
    this.clientService.returnClientPrograms(this.client._id).then((data) =>{
      this.clientprogram_ids = data;
    })
    console.log(this.clientprogram_ids);
    this.exercises = this.exerciseService.exercises;





  }
  ionViewDidLoad(){

      for(let cprogram of this.clientprogram_ids){
        console.log("cprogram :" + cprogram);
        var tempprog = this.programService.returnProgram(cprogram);
        if(tempprog){
          this.clientprograms.push({'program_details': tempprog});
        }
      }


  }

  showAddClientProgramModal() {
    let modal = this.modalCtrl.create(AddClientProgramModalPage, {"client": this.client});
    modal.onDidDismiss(() => {
      this.programService.getPrograms().then((data) => {
        this.programs = data;
        let toast = this.toastCtrl.create({
          message: "Exercise Created",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }, (err) => {
        let toast = this.toastCtrl.create({
          message: "Not Allowed",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    });
    modal.present();
  }
  showExercises() {
    for(let program of this.programs){
      if(program._id === this.selectedProgramid){
        this.selectedProgram = program;
      }
    }
    this.program_exercises = [];

    for(let pexericise of this.selectedProgram.exercises){
      var details1 =  this.exerciseService.returnExercise(pexericise.exercise);
      this.program_exercises.push({'details': this.exerciseService.returnExercise(pexericise.exercise), 'sets': pexericise.sets});
      console.log("details" + details1.name);
    }
  }
  showVideo(exercise) {
    console.log("in exercise.ts :" + exercise.video);
    //var video = exercise.video;
    let modal = this.modalCtrl.create(VideoModalPage,{ video: exercise.video });
    modal.present();
  }
  addClientProgram(){
    this.showLoader();
    console.log("Current Client: " + this.client._id);
    this.programService.addClientProgram(this.selectedProgram,this.client._id ).then((result) => {
      this.loading.dismiss();
      console.log("program created");
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
}
