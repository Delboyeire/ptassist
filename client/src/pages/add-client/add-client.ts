import { Component } from '@angular/core';
import { Auth } from '../../providers/auth';
import { NavController , ModalController, AlertController, LoadingController, ViewController, ToastController} from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { ClientService } from '../../providers/client-service'


@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html'
})
export class AddClientPage {


  trainerId: any;
  clientform : FormGroup;
  loading: any;


  constructor(public storage: Storage, public clientService: ClientService, public toastCtrl: ToastController, public navCtrl: NavController,public viewCtrl: ViewController, private formBuilder: FormBuilder,public modalCtrl: ModalController,
              public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
    this.storage.get('user').then((value) => {

      this.trainerId = value._id;
      console.log(this.trainerId);
      });

    this.clientform = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['',Validators.required],
      role: ['client'],
      name:['',Validators.required],
      trainer:['']
    });

  }
  registerClient(){

    this.showLoader();
    this.clientform.patchValue({trainer: this.trainerId});
    let details = this.clientform.value;
    console.log(details);
    this.clientService.createClientAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      let toast = this.toastCtrl.create({
        message: "Client Created",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.viewCtrl.dismiss();
    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
      let toast = this.toastCtrl.create({
        message: "Not Allowed",
        duration: 3000,
        position: 'top'
      });
      toast.present();
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
