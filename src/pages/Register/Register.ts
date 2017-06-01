import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { GlobalVariables } from '../../providers/globalVariables';

@Component({
  selector: 'page-Register',
  templateUrl: 'Register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', name: '' };

  constructor(private nav: NavController, private auth: Auth, private alertCtrl: AlertController, public navParams: NavParams,private api: GlobalVariables) { }

  public register() {
    this.auth.register(this.registerCredentials).map(res => res.json()).subscribe(response => {
      if (response.status == 200) {
        this.auth.token = response.token;
        this.api.token = response.token;
        this.createSuccess = true;
        this.showPopup("Success", "Account created.");
      } else {
        this.showPopup("Error", "Problem creating account.");
      }
    },
      error => {
        this.showPopup("Error", error);
      });
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

}