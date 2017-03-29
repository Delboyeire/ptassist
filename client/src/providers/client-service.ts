import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from '../providers/auth';
import 'rxjs/add/operator/map';
/*
  Generated class for the ClientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ClientService {
  public token: any;
  public trainerId: any;
  public currentCLient: any;
  constructor(public http: Http, public storage: Storage, public authService: Auth) {

    this.storage.get('user').then((value) => {

      this.trainerId = value._id;
      console.log(this.trainerId);

    });
    this.storage.get('token').then((value) => {

      this.token = value;
      console.log(this.token);

    });

  }
  createClientAccount(details){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://ptassist.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe(res => {

          let data = res.json();
          //this.token = data.token;
          //this.storage.set('token', data.token);
          resolve(data);

        }, (err) => {
          reject(err);
        });

    });

  }
  deleteClient(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/auth/delete/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }
  returnClientPrograms(client_id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs/client_programs/' + client_id, {headers: headers})
        .subscribe(res => {
          var data = res.json();
          resolve(data);
      }, (err) => {
        reject(err);
      });

    });

  }
  getClients(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/auth/' + this.authService.user._id, {headers: headers})
        .map(res => res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err);
          });

    });

  }
  getClientDetails(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/auth/clientdetail/' + id, {headers: headers})
        .subscribe(res => {

          let data = res.json();
          this.currentCLient = data.user;

          resolve(data);
        }, (err) => {
          reject(err);
        });

    });

  }
}
