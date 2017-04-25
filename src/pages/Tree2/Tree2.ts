import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage} from '../Main/Main';

/*
  Generated class for the Tree2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Tree2',
  templateUrl: 'Tree2.html'
})
export class Tree2Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tree2Page');
  }
 backButton(){
      this.navCtrl.push(MainPage);
  }
}
