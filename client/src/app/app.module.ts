import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ClientListPage } from '../pages/client-list/client-list';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/sign-up/sign-up';
import { AddClientPage } from '../pages/add-client/add-client'
import { AuthData } from '../providers/auth-data';
import { ClientData } from '../providers/client-data';
import { ClientViewHomePage } from '../pages/client-view-home/client-view-home';
import { ClientDetailPage } from '../pages/client-detail/client-detail';
import { HomeClientPage } from '../pages/home-client/home-client';
import { ProgramViewEditPage } from '../pages/program-view-edit/program-view-edit';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id':  "a986b96b"
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
    ProgramViewEditPage

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
    ProgramViewEditPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    ClientData
    ]
})
export class AppModule {}
