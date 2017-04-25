import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MainPage} from '../Main/Main';

@Component({
  selector: 'page-Achievement',
  templateUrl: 'Achievement.html'
})
export class AchievementPage {

  constructor(public navCtrl: NavController) {}

    backButton(){
      this.navCtrl.push(MainPage);
    }

  }

