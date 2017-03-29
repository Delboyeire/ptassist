import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClientListPage } from '../pages/client-list/client-list';
import { ProgramListPage } from '../pages/program-list/program-list';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/sign-up/sign-up';
import { AddClientPage } from '../pages/add-client/add-client'
import { Auth } from '../providers/auth';
import { Exercises } from '../providers/exercises';
import { ClientService } from '../providers/client-service'
import { ProgramService } from '../providers/program-service'
import { ExercisesPage } from '../pages/exercises/exercises'
import { ClientViewHomePage } from '../pages/client-view-home/client-view-home';
import { ClientDetailPage } from '../pages/client-detail/client-detail';
import { HomeClientPage } from '../pages/home-client/home-client';
import { ProgramViewEditPage } from '../pages/program-view-edit/program-view-edit';
import { VideoModalPage } from '../pages/video-modal/video-modal'
import { AddExerciseModalPage } from "../pages/add-exercise-modal/add-exercise-modal";
import { AddProgramModalPage } from "../pages/add-program-modal/add-program-modal";
import { AddClientProgramModalPage } from "../pages/add-client-program-modal/add-client-program-modal";
import { Storage } from '@ionic/storage';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id':  "f0c0fa4c"
  }
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ClientListPage,
    ResetPasswordPage,
    SignupPage,
    AddClientPage,
    ClientViewHomePage,
    ClientDetailPage,
    HomeClientPage,
    ProgramViewEditPage,
    ExercisesPage,
    VideoModalPage,
    AddExerciseModalPage,
    AddProgramModalPage,
    AddClientProgramModalPage,
    ProgramListPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ClientListPage,
    ResetPasswordPage,
    SignupPage,
    AddClientPage,
    ClientViewHomePage,
    ClientDetailPage,
    HomeClientPage,
    ProgramViewEditPage,
    ExercisesPage,
    VideoModalPage,
    AddExerciseModalPage,
    AddProgramModalPage,
    AddClientProgramModalPage,
    ProgramListPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    Exercises,
    Auth,
    ClientService,
    ProgramService
    ]
})
export class AppModule {}
