import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';

import { MainPage } from '../pages/Main/Main';
//import { LoginPage } from '../pages/Login/Login';
//import { Auth } from '../providers/auth';





@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = MainPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.hide();
      splashScreen.hide();


    });
  }
  





/*
  !!!!!!!!!!!! INCLUDE , LoadingController  TO IMPORT PLATFORM FORM IONIC ANGULAR
  
    constructor(public auth: Auth, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public loadingCtrl: LoadingController) {

    this.presentLoading();

    this.auth.login().then((isLoggedIn) => {

      if (isLoggedIn) {
        this.rootPage = MainPage
      } else {
        this.rootPage = LoginPage;
      }

      this.loader.dismiss();
    });
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Authenticating"
    });
    this.loader.present();
  }
rootPage: any;
loader: any;
  
  */
  

  

}


