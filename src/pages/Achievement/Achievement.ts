import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MainPage } from '../Main/Main';
import { Auth } from '../../providers/auth';

import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-Achievement',
  templateUrl: 'Achievement.html'
})
export class AchievementPage {

  treeImage:any;

  constructor(public navCtrl: NavController, public http: Http, public auth: Auth) { }


  ionViewDidLoad() {
    var url = "http://www.pascalbudner.de:8080/v1";

    var headers: Headers = new Headers();
    headers.append("Authorization", "Bearer " + this.auth.token);

    

    this.http.get(url + "/statistics/trees", { "headers": headers }).map(tre => tre.json()).subscribe(tre => {
      
    var treeNumber = tre.number_of_trees;
      console.log(treeNumber);
    
    if(treeNumber==0){
      this.treeImage = 'assets/Achievement/mountains_background.svg'
    }else if(treeNumber<=5){
      this.treeImage = 'assets/Achievement/achievement_1.svg'
    }else if(treeNumber<=10){
      this.treeImage = 'assets/Achievement/achievement_2.svg'
    }else if(treeNumber<=15){
      this.treeImage = 'assets/Achievement/achievement_3.svg'
    }else if(treeNumber<20){
      this.treeImage = 'assets/Achievement/achievement_4.svg'
    }else if(treeNumber<=25){
      this.treeImage = 'assets/Achievement/achievement_5.svg'
    }else if(treeNumber<=30){
      this.treeImage = 'assets/Achievement/achievement_6.svg'
    }else if(treeNumber<=35){
      this.treeImage = 'assets/Achievement/achievement_7.svg'
    }else if(treeNumber<=40){
      this.treeImage = 'assets/Achievement/achievement_8.svg'
    }else if(treeNumber<=45){
      this.treeImage = 'assets/Achievement/achievement_9.svg'
    }else if(treeNumber<=50){
      this.treeImage = 'assets/Achievement/achievement_10.svg'
    }else if(treeNumber<=55){
      this.treeImage = 'assets/Achievement/achievement_11.svg'
    }else if(treeNumber<=60){
      this.treeImage = 'assets/Achievement/achievement_12.svg'
    }else if(treeNumber<=65){
      this.treeImage = 'assets/Achievement/achievement_13.svg'
    }else if(treeNumber<=70){
      this.treeImage = 'assets/Achievement/achievement_14.svg'
    }else if(treeNumber<=75){
      this.treeImage = 'assets/Achievement/achievement_15.svg'
    }else if(treeNumber<=80){
      this.treeImage = 'assets/Achievement/achievement_16.svg'
    }else if(treeNumber<=85){
      this.treeImage = 'assets/Achievement/achievement_17.svg'
    }

      
    });

    
  }

  backButton() {
    this.navCtrl.push(MainPage);
  }

}

