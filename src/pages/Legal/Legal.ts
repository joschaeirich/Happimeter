import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegisterPage} from '../Register/Register'; 
import { LoginPage} from '../Login/Login'; 

@Component({
  selector: 'page-Legal',
  templateUrl: 'Legal.html'
})

export class LegalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LegalPage');
  }

RegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
  LoginPage() {
    this.navCtrl.push(LoginPage);
  }
}
