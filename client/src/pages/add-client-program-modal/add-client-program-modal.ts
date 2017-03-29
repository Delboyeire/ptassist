import { Component } from '@angular/core';
import { NavController , ModalController, AlertController, LoadingController, ViewController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import { Auth } from '../../providers/auth';
import { Exercises } from '../../providers/exercises';
import { ProgramService } from '../../providers/program-service';


/*
 Generated class for the AddExerciseModal page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-add-client-program-modal',
  templateUrl: 'add-client-program-modal.html'
})

export class AddClientProgramModalPage {

  loading: any;
  program : FormGroup;
  trainerid: any;
  newProgram : any;
  exercise_list: any;
  current_client : any;


  constructor(public navParams: NavParams,public navCtrl: NavController,public viewCtrl: ViewController,public exerciseService: Exercises, private formBuilder: FormBuilder,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public programService: ProgramService, public loadingCtrl: LoadingController) {
    this.program = this.formBuilder.group({
      title: ['', Validators.required],
      createdby: [''],
      description: ['',Validators.required],
      exercises: this.formBuilder.array([
        this.initExercise()
      ])

    });
    this.current_client = navParams.get('client');
    this.exerciseService.getExercises().then((data) => {
      this.exercise_list = data;
    });
  }
  initExercise() {

    return this.formBuilder.group({
      exercise: ['', Validators.required],
      sets: ['', Validators.required]
    });
  }
  addExercise() {
    // add exercise to the list
    const control = <FormArray>this.program.controls['exercises'];
    control.push(this.initExercise());
  }
  removeExercise(i: number) {
    // remove exercise from the list
    const control = <FormArray>this.program.controls['exercises'];
    control.removeAt(i);
  }

  addClientProgram(){
    this.showLoader();
    this.program.patchValue({createdby: this.authService.user._id});
    this.newProgram = this.program.value;
    console.log("Current Client: " + this.current_client._id);
    this.programService.addClientProgram(this.newProgram,this.current_client._id ).then((result) => {
      this.loading.dismiss();
      //this.exercises = result;
      console.log("program created");
      this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
      this.viewCtrl.dismiss();


    });
  }
  showLoader(){

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }
  dismiss() {
    this.viewCtrl.dismiss()
  }


}
