import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { MainPage } from '../Main/Main';
import { LoginPage } from '../Login/Login';


import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  account: any;

  constructor(public navCtrl: NavController, public http: Http, public auth: Auth, private alertCtrl: AlertController, public storage: Storage) {



  }
  backButton() {
    this.navCtrl.push(MainPage);
  }




  logOut() {
    var url = "https://www.pascalbudner.de:8080/v1";
    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

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

            this.http.delete(url + "/auth", { "headers": headers }).map(res => res.json()).subscribe(res => {
              // console.log(res) 
              this.storage.set('login_token', null);
              this.navCtrl.push(LoginPage);
            
            });
          }
        }
      ]
    });
    alert.present();
  }

  deleteAccount() {
    var url = "https://www.pascalbudner.de:8080/v1";
    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

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

            this.http.delete(url + "/me", { "headers": headers }).map(del => del.json()).subscribe(del => {
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
