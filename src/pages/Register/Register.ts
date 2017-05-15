import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
 
@Component({
  selector: 'page-Register',
  templateUrl: 'Register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', name: '' };
 
  constructor(private nav: NavController, private auth: Auth, private alertCtrl: AlertController) { }
 
  public register() {
    this.auth.register(this.registerCredentials).subscribe(response => {
      console.log(response)
      if (response) {
        this.createSuccess = true;
        console.log(this.registerCredentials)
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