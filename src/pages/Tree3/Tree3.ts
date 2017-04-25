import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage} from '../Main/Main';

/*
  Generated class for the Tree3 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-Tree3',
  templateUrl: 'Tree3.html'
})
export class Tree3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tree3Page');
  }
   backButton(){
      this.navCtrl.push(MainPage);
  }

}
