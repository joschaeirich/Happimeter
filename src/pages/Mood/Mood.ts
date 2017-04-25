import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MoodInputPage} from '../MoodInput/MoodInput';
import { MainPage} from '../Main/Main';

@Component({
  selector: 'page-Mood',
  templateUrl: 'Mood.html'
})
export class MoodPage {

  constructor(public navCtrl: NavController) {}
    nextPage(){
      this.navCtrl.push(MoodInputPage); 
  }
    backButton(){
      this.navCtrl.push(MainPage);
  }
}
