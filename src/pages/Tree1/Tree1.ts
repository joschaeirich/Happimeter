import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage} from '../Main/Main';

/*
  Generated class for the Tree1 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Tree1',
  templateUrl: 'Tree1.html'
})
export class Tree1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tree1Page');
  }
   backButton(){
      this.navCtrl.push(MainPage);
  }

}
