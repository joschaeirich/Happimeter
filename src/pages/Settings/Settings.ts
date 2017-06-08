import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { MainPage } from '../Main/Main';
import { LoginPage } from '../Login/Login';


import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';

import { Http } from '@angular/http';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  account: any;

  constructor(public navCtrl: NavController, public http: Http, public auth: Auth, private alertCtrl: AlertController, public storage: Storage, private api: GlobalVariables) {



  }
  backButton() {
    this.navCtrl.push(MainPage);
  }




  logOut() {

    let alert = this.alertCtrl.create({
      title: 'Log Out',
      message: 'Do you want to log out?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.api.logout();
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  deleteAccount() {



    let alert = this.alertCtrl.create({
      title: 'Delete Account',
      message: 'Do you want to delete your account?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            return;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.api.deleteAccount().subscribe(del => {
              console.log(del)
              this.storage.set('login_token', null);
              this.navCtrl.push(LoginPage);
            });

          }
        }
      ]
    });
    alert.present();
  }
}
