import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { RegisterPage} from '../Register/Register';

@Component({
  selector: 'page-Login',
  templateUrl: 'Login.html'
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };


  constructor(private navCtrl: NavController, private auth: Auth, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }


  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        this.navCtrl.setRoot('MainPage');
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
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}