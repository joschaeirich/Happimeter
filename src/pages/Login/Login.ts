import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { RegisterPage} from '../Register/Register';
import { MainPage } from '../Main/Main';

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
    this.auth.login(this.registerCredentials).map(res => res.json()).subscribe(response => {
      console.log(response);
      if (response.status==200) {
        this.auth.token = response.token;
        this.loading.dismiss().catch(x => {});
        this.navCtrl.setRoot(MainPage);

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
    this.loading.dismiss().catch(x => {});

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}