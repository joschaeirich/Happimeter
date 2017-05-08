import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { RegisterPage } from '../Register/Register';
import { MainPage } from '../Main/Main';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private navCtrl: NavController, private auth: Auth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public storage: Storage) {


    storage.ready().then(() => {

      // set a key/value


      // Or to get a key/value pair
      storage.get('login_token').then((val) => {
        if (val != null) {
          this.auth.token = val;
          this.navCtrl.setRoot(MainPage);
          //  console.log(val)
        }
      })
    });

  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }


  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).map(res => res.json()).subscribe(response => {
      //console.log(response);
      if (response.status == 200) {
        this.auth.token = response.token;
        this.loading.dismiss().catch(x => { });
        this.navCtrl.setRoot(MainPage);
        this.storage.set('login_token', response.token);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss().catch(x => { });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }



}