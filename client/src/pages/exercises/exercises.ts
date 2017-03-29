import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Exercises } from '../../providers/exercises';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { VideoModalPage } from '../video-modal/video-modal'
import {AddExerciseModalPage} from "../add-exercise-modal/add-exercise-modal";


@Component({
  selector: 'page-exercises',
  templateUrl: 'exercises.html'
})
export class ExercisesPage {

  exercises: any;
  loading: any;

  constructor(public navCtrl: NavController,public toastCtrl: ToastController, public exerciseService: Exercises, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {

  }


  ionViewDidLoad(){

    this.exerciseService.getExercises().then((data) => {
      this.exercises = data;
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  deleteExercise(exercise){

    this.showLoader();

    //Remove from database
    this.exerciseService.deleteExercise(exercise._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.exercises.indexOf(exercise);

      if(index > -1){
        this.exercises.splice(index, 1);
      }

    }, (err) => {
      this.loading.dismiss();
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  showVideo(exercise) {
    console.log("in exercise.ts :" + exercise.video);
    //var video = exercise.video;
    let modal = this.modalCtrl.create(VideoModalPage,{ video: exercise.video });
    modal.present();
  }
  showAddExerciseModal() {
    let modal = this.modalCtrl.create(AddExerciseModalPage);
    modal.onDidDismiss(() => {
      this.exerciseService.getExercises().then((data) => {
        this.exercises = data;
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

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }


}
