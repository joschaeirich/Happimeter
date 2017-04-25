import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MainPage} from '../Main/Main';

@Component({
  selector: 'page-Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

    

  }
   backButton(){
      this.navCtrl.push(MainPage);
  }

}
