import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { ProgramService } from '../../providers/program-service';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login/login';
import { AddProgramModalPage } from "../add-program-modal/add-program-modal";
import { Storage } from '@ionic/storage';

/*
  Generated class for the ProgramList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-program-list',
  templateUrl: 'program-list.html'
})
export class ProgramListPage {

  programs: any;
  loading: any;
  trainerid: any;

  constructor(public storage: Storage, public navCtrl: NavController,public toastCtrl: ToastController, public programService: ProgramService, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.storage.get('user').then((value) => {

      this.trainerid = value._id;

    });
  }


  ionViewDidLoad(){

    this.programService.getTrainersPrograms().then((data) => {
      this.programs = data;
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });

  }

  deleteExercise(program){

    this.showLoader();

    //Remove from database
    this.programService.deleteProgram(program._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.programs.indexOf(program);

      if(index > -1){
        this.programs.splice(index, 1);
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

  showAddProgramModal() {
    let modal = this.modalCtrl.create(AddProgramModalPage);
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

  logout(){

    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);

  }


}
