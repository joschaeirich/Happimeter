import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MainPage} from '../Main/Main';

@Component({
  selector: 'page-MoodTable',
  templateUrl: 'MoodTable.html'
})
export class MoodTablePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoodTablePage');
  }

   backButton(){
      this.navCtrl.push(MainPage);
  }

}
