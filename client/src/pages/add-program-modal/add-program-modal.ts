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
  selector: 'page-add-program-modal',
  templateUrl: 'add-program-modal.html'
})

export class AddProgramModalPage {

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
    this.exercise_list = this.exerciseService.exercises;
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
  addProgram(){
    this.showLoader();
    this.program.patchValue({createdby: this.authService.user._id});
    this.newProgram = this.program.value;

    this.programService.createProgram(this.newProgram).then((result) => {
      this.loading.dismiss();
      //this.exercises = result;
      console.log("exercise created");
      this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
      this.viewCtrl.dismiss();


    });
  }
  addClientProgram(){
    this.showLoader();
    this.program.patchValue({createdby: this.authService.user._id});
    this.newProgram = this.program.value;
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
