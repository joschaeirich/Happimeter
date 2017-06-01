import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MainPage } from '../Main/Main';
import { Auth } from '../../providers/auth';

import { Http } from '@angular/http';

import { GlobalVariables } from '../../providers/globalVariables'

@Component({
  selector: 'page-Achievement',
  templateUrl: 'Achievement.html'
})
export class AchievementPage {

  treeImage:any;

  constructor(public navCtrl: NavController, public http: Http, public auth: Auth,private api: GlobalVariables) { }


  ionViewDidLoad() {
  
  
  

    

    this.api.getNumberOfTrees().subscribe(tre => {
      
    var treeNumber = tre.number_of_trees;
      console.log(treeNumber);
    
    if(treeNumber==0){
      this.treeImage = 'assets/Achievement/mountains_background.png'
    }else if(treeNumber<=5){
      this.treeImage = 'assets/Achievement/achievement_1.png'
    }else if(treeNumber<=10){
      this.treeImage = 'assets/Achievement/achievement_2.png'
    }else if(treeNumber<=15){
      this.treeImage = 'assets/Achievement/achievement_3.png'
    }else if(treeNumber<20){
      this.treeImage = 'assets/Achievement/achievement_4.png'
    }else if(treeNumber<=25){
      this.treeImage = 'assets/Achievement/achievement_5.png'
    }else if(treeNumber<=30){
      this.treeImage = 'assets/Achievement/achievement_6.png'
    }else if(treeNumber<=35){
      this.treeImage = 'assets/Achievement/achievement_7.png'
    }else if(treeNumber<=40){
      this.treeImage = 'assets/Achievement/achievement_8.png'
    }else if(treeNumber<=45){
      this.treeImage = 'assets/Achievement/achievement_9.png'
    }else if(treeNumber<=50){
      this.treeImage = 'assets/Achievement/achievement_10.png'
    }else if(treeNumber<=55){
      this.treeImage = 'assets/Achievement/achievement_11.png'
    }else if(treeNumber<=60){
      this.treeImage = 'assets/Achievement/achievement_12.png'
    }else if(treeNumber<=65){
      this.treeImage = 'assets/Achievement/achievement_13.png'
    }else if(treeNumber<=70){
      this.treeImage = 'assets/Achievement/achievement_14.png'
    }else if(treeNumber<=75){
      this.treeImage = 'assets/Achievement/achievement_15.png'
    }else if(treeNumber<=80){
      this.treeImage = 'assets/Achievement/achievement_16.png'
    }else if(treeNumber<=85){
      this.treeImage = 'assets/Achievement/achievement_17.png'
    }else if(treeNumber<=100){
      this.treeImage = 'assets/Achievement/achievement_18.png'
    }

      
    });

    
  }

  backButton() {
    this.navCtrl.push(MainPage);
  }

}

