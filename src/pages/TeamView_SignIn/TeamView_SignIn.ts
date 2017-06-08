import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-TeamView_SignIn',
  templateUrl: 'TeamView_SignIn.html'
})
export class TeamView_SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamView_SignInPage');
  }

}
