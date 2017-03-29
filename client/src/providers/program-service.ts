import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Auth } from './auth';
import 'rxjs/add/operator/map';

@Injectable()
export class ProgramService {
  token:any;
  programs: any;

  constructor(public http: Http, public storage: Storage, public authService: Auth) {
    this.getTrainersPrograms().then((data) => {
      this.programs = data;
    });
  }
  getPrograms(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }
  getTrainersPrograms(){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://ptassist.herokuapp.com/api/programs/trainer/' + this.authService.user._id, {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

  }

  createProgram(program){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('https://ptassist.herokuapp.com/api/programs', JSON.stringify(program), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }
  addClientProgram(program,client_id){

    return new Promise((resolve, reject) => {
     // var newprogram = {'programid': programid };
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('https://ptassist.herokuapp.com/api/programs/client/' + client_id,JSON.stringify(program), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });

    });

  }

  deleteProgram(id){

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://ptassist.herokuapp.com/api/programs/' + id, {headers: headers}).subscribe((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      });

    });

  }
  returnProgram(programId){
    for( let program of this.programs){
      if (program._id == programId){
        return program;
      }
    }
  }

}
