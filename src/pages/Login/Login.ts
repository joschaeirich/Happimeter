import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';

import { MainPage } from '../Main/Main';
import { LegalPage } from '../Legal/Legal';

import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';


@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private navCtrl: NavController, public http: Http, private auth: Auth, private alertCtrl: AlertController, private loadingCtrl: LoadingController, public storage: Storage
    , private api: GlobalVariables) {


    storage.ready().then(() => {
      storage.get('login_token').then((val) => {
        if (val != null) {
          this.auth.token = val;
          this.navCtrl.setRoot(MainPage);
        }
      })

    });

  }

  public createAccount() {
    this.navCtrl.push(LegalPage);
  }


  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).map(res => res.json()).subscribe(response => {
      //console.log(response);
      if (response.status == 200) {
        this.auth.token = response.token;
        this.api.token = response.token;
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




  forgotPassword() {

    let alert = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: 'Please enter your email below and we will send you an email with a new password',
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            return;
          }
        },
        {
          text: 'Send',
          handler: data => {
            if (data.email) {

              this.api.lostPassword(data.email).subscribe(pas => {
     
                })
                ;
            }
          }
        }

      ]
    });
    alert.present();
  }


}